import axios from 'axios';

import { refreshToken } from 'services/user';
import * as httpClient from 'utils/httpClient';

jest.mock('services/user');

describe('interceptors', () => {
  const responseSuccessCallback = (axios.interceptors.response.use as jest.Mock)
    .mock.calls[0][0];
  const responseErrorCallback = (axios.interceptors.response.use as jest.Mock)
    .mock.calls[0][1];

  describe('success response callback', () => {
    it('extracts the body from data key and converts key to camel case', () => {
      const response = { data: { 'user-email': 'user@mail.com' } };

      expect(responseSuccessCallback(response)).toMatchObject({
        userEmail: 'user@mail.com',
      });
    });
  });

  describe('error response callback', () => {
    it('throws an error', async () => {
      const errorResponse = {
        response: {
          status: 422,
          data: {
            errors: [
              {
                detail: 'Questions is invalid',
              },
            ],
          },
        },
      };

      try {
        await responseErrorCallback(errorResponse);
      } catch (error) {
        expect(error).toMatchObject({
          status: errorResponse.response.status,
          body: errorResponse.response.data,
        });
      }
    });

    describe('given invalid_token error code', () => {
      it('requests the original request with new access token', async () => {
        const mockedRefreshToken = refreshToken as jest.Mock;
        mockedRefreshToken.mockResolvedValue({ accessToken: 'newAccessToken' });

        const errorResponse = {
          config: {
            headers: { Authorization: 'Bearer InvalidToken' },
            url: '/me',
          },
          response: {
            status: 401,
            data: {
              errors: [
                {
                  code: 'invalid_token',
                },
              ],
            },
          },
        };

        await responseErrorCallback(errorResponse);

        expect(axios).toHaveBeenCalledWith({
          headers: { Authorization: 'Bearer newAccessToken' },
          url: '/me',
        });
      });
    });

    describe('when failed to refresh token', () => {
      it('throws the original response error', async () => {
        const mockedRefreshToken = refreshToken as jest.Mock;
        mockedRefreshToken.mockRejectedValue({ status: 401 });

        const errorResponse = {
          response: {
            status: 401,
            data: {
              errors: [
                {
                  code: 'invalid_token',
                },
              ],
            },
          },
        };

        try {
          await responseErrorCallback(errorResponse);
        } catch (error) {
          expect(error).toMatchObject({
            status: errorResponse.response.status,
            body: errorResponse.response.data,
          });
        }
      });
    });
  });
});

describe('get', () => {
  it('requests to the given url', () => {
    httpClient.get('/me');

    expect(axios.get).toHaveBeenCalledWith('/me', {});
  });
});

describe('post', () => {
  it('requests to the given url and body', () => {
    httpClient.post('/login', {
      email: 'user@mail.com',
      password: 'password123',
    });

    expect(axios.post).toHaveBeenCalledWith(
      '/login',
      {
        email: 'user@mail.com',
        password: 'password123',
      },
      {}
    );
  });
});

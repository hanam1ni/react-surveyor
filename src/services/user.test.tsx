import * as userService from 'services/user';

import { get, post } from 'utils/httpClient';
import { getUserToken, setUserToken } from 'utils/userToken';

import { build } from '@support/factory';

jest.mock('utils/httpClient');
jest.mock('utils/userToken');

describe('login', () => {
  describe('given a valid credentials', () => {
    it('sets access token and refresh token from response', async () => {
      const userToken = build('userToken');
      const response = { data: { attributes: userToken } };
      const mockedPost = post as jest.Mock;
      mockedPost.mockResolvedValue(response);

      await userService.login('user@mail.com', 'password123');

      expect(setUserToken).toHaveBeenCalledWith(
        userToken.accessToken,
        userToken.refreshToken
      );
    });
  });

  describe('given an invalid credentials', () => {
    it('throws an error', async () => {
      const response = { status: 400 };
      const mockedPost = post as jest.Mock;
      mockedPost.mockRejectedValue(response);

      try {
        await userService.login('invalid@mail.com', 'invalidPassword');
      } catch (error) {
        expect(error).toMatchObject(response);
      }
    });
  });
});

describe('refreshToken', () => {
  describe('given a valid refresh token', () => {
    beforeEach(() => {
      const userToken = build('userToken');
      const mockedGetUserToken = getUserToken as jest.Mock;
      mockedGetUserToken.mockReturnValue(userToken);
    });

    it('sets access token and refresh token from response', async () => {
      const userToken = build('userToken');
      const response = { data: { attributes: userToken } };
      const mockedPost = post as jest.Mock;
      mockedPost.mockResolvedValue(response);

      await userService.refreshToken();

      expect(setUserToken).toHaveBeenCalledWith(
        userToken.accessToken,
        userToken.refreshToken
      );
    });
  });

  describe('given an invalid refresh token', () => {
    it('throws an error', async () => {
      const response = { status: 401 };
      const mockedPost = post as jest.Mock;
      mockedPost.mockRejectedValue(response);

      try {
        await userService.refreshToken();
      } catch (error) {
        expect(error).toMatchObject(response);
      }
    });
  });
});

describe('getUserProfile', () => {
  describe('given a valid access token', () => {
    it('returns the user profile', async () => {
      const userToken = build('userToken');
      const mockedGetUserToken = getUserToken as jest.Mock;
      mockedGetUserToken.mockReturnValue(userToken);

      const user = build('user');
      const response = { data: { attributes: user } };
      const mockedGet = get as jest.Mock;
      mockedGet.mockResolvedValue(response);

      const userProfile = await userService.getUserProfile();

      expect(userProfile).toMatchObject(user);
    });
  });

  describe('given an invalid access token', () => {
    it('throws an error', async () => {
      const userToken = build('userToken');
      const mockedGetUserToken = getUserToken as jest.Mock;
      mockedGetUserToken.mockReturnValue(userToken);

      const response = { status: 401 };
      const mockedGet = get as jest.Mock;
      mockedGet.mockRejectedValue(response);

      try {
        await userService.getUserProfile();
      } catch (error) {
        expect(error).toMatchObject(response);
      }
    });
  });
});

describe('resetPassword', () => {
  it('makes a request with the given email', async () => {
    const response = {
      meta: {
        message:
          'If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.',
      },
    };
    const mockedPost = post as jest.Mock;
    mockedPost.mockResolvedValue(response);

    await userService.resetPassword('user@mail.com');

    expect(mockedPost).toHaveBeenCalledWith(
      '/passwords',
      expect.objectContaining({
        user: { email: 'user@mail.com' },
      })
    );
  });
});

import * as userService from 'services/user';

import { get, post } from 'utils/httpClient';
import { getUserToken, setUserToken } from 'utils/userToken';
import { build } from '@support/factory';

jest.mock('utils/httpClient');
jest.mock('utils/userToken');

describe('login', () => {
  describe('when given valid credentials', () => {
    it('sets access token and refresh token from response', async () => {
      const userToken = build('userToken');
      const response = { data: { attributes: userToken } };
      post.mockResolvedValue(response);

      await userService.login('user@mail.com', 'password123');

      expect(setUserToken).toHaveBeenCalledWith(
        userToken.access_token,
        userToken.refresh_token
      );
    });
  });

  describe('when given invalid credentials', () => {
    it('throws an error', async () => {
      const response = { status: 400 };
      post.mockRejectedValue(response);

      try {
        await userService.login('invalid@mail.com', 'invalidPassword');
      } catch (error) {
        expect(error).toMatchObject(response);
      }
    });
  });
});

describe('getUserProfile', () => {
  describe('when the access token is valid', () => {
    it('returns the user profile', async () => {
      const userToken = build('userToken');
      getUserToken.mockReturnValue(userToken);

      const user = build('user');
      const response = { data: { attributes: user } };
      get.mockResolvedValue(response);

      const userProfile = await userService.getUserProfile();

      expect(userProfile).toMatchObject(user);
    });
  });

  describe('when the access token is invalid', () => {
    it('throws an error', async () => {
      const userToken = build('userToken');
      getUserToken.mockReturnValue(userToken);

      const response = { status: 401 };
      get.mockRejectedValue(response);

      try {
        await userService.getUserProfile();
      } catch (error) {
        expect(error).toMatchObject(response);
      }
    });
  });
});

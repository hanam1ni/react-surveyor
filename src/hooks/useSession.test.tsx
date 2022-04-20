import { renderHook } from '@testing-library/react-hooks';

import useSession from './useSession';
import { getUserProfile } from 'services/user';

import { build } from '@support/factory';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');

describe('useSession', () => {
  describe('when fetch user profile successful', () => {
    it('returns the user profile and sets loading status as false', async () => {
      const userResponse = build('user');
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockResolvedValue(userResponse);

      const { result, waitForNextUpdate } = renderHook(() => useSession());

      await waitForNextUpdate();

      const { user, loading } = result.current;
      expect(user).toBe(userResponse);
      expect(loading).toBe(false);
    });
  });

  describe('when failed to fetch user profile', () => {
    it('redirects to login page', async () => {
      const { push } = mockUseRouter();

      const errorResponse = {
        body: {
          errors: [
            { code: 'invalid_token', detail: 'The access token is invalid' },
          ],
        },
        status: 401,
      };
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockRejectedValue(errorResponse);

      const { waitForNextUpdate } = renderHook(() => useSession());

      await waitForNextUpdate();

      expect(push).toHaveBeenCalledWith('/login');
    });
  });

  describe('given redirect is false', () => {
    it('does NOT redirect the user', async () => {
      const { push } = mockUseRouter();

      const errorResponse = {
        body: {
          errors: [
            { code: 'invalid_token', detail: 'The access token is invalid' },
          ],
        },
        status: 401,
      };
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockRejectedValue(errorResponse);

      const { waitForNextUpdate } = renderHook(() =>
        useSession({ redirect: true })
      );

      await waitForNextUpdate();

      expect(push).not.toHaveBeenCalledWith('/login');
    });
  });
});

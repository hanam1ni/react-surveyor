import { renderHook } from '@testing-library/react-hooks';

import useSession from './useSession';
import { getUserProfile } from 'services/user';
import { ACTIONS, StoreProvider } from 'store';
import reducer from 'store/reducer';

import { build } from '@support/factory';
import { mockUseRouter } from '@support/useRouter';

jest.mock('services/user');
jest.mock('store/reducer');

describe('useSession', () => {
  describe('when fetch user profile successful', () => {
    it('sets the user profile in the store and loading status as false', async () => {
      const userResponse = build('user');
      const mockedGetUserProfile = getUserProfile as jest.Mock;
      mockedGetUserProfile.mockResolvedValue(userResponse);

      const { result, waitForNextUpdate } = renderHook(() => useSession(), {
        wrapper: StoreProvider,
      });

      await waitForNextUpdate();

      expect(reducer).toHaveBeenCalledWith(expect.any(Object), {
        type: ACTIONS.SET_USER_PROFILE,
        value: userResponse,
      });
      const { loading } = result.current;
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

      const { waitForNextUpdate, result } = renderHook(() => useSession());

      await waitForNextUpdate();

      expect(result.current.error).toMatchObject(errorResponse);
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

      const { waitForNextUpdate, result } = renderHook(() =>
        useSession({ redirect: false })
      );

      await waitForNextUpdate();

      expect(result.current.error).toMatchObject(errorResponse);
      expect(push).not.toHaveBeenCalledWith('/login');
    });
  });
});

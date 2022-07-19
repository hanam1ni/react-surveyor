import * as userToken from 'utils/userToken';

describe('clearUserToken', () => {
  it('clears the access token and refresh token', () => {
    localStorage.setItem('accessToken', 'user_access_token');
    localStorage.setItem('refreshToken', 'user_refresh_token');

    userToken.clearUserToken();

    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('refreshToken')).toBeNull();
  });
});

describe('setUserToken', () => {
  it('sets the given access token and refresh token', () => {
    userToken.setUserToken('user_access_token', 'user_refresh_token');

    expect(localStorage.getItem('accessToken')).toBe('user_access_token');
    expect(localStorage.getItem('refreshToken')).toBe('user_refresh_token');
  });
});

describe('getUserToken', () => {
  it('returns access token and refresh token from local storage', () => {
    localStorage.setItem('accessToken', 'user_access_token');
    localStorage.setItem('refreshToken', 'user_refresh_token');

    const { accessToken, refreshToken } = userToken.getUserToken();

    expect(accessToken).toBe('user_access_token');
    expect(refreshToken).toBe('user_refresh_token');
  });
});

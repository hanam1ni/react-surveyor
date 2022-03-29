import * as userToken from 'utils/userToken';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

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

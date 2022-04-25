import { get, post } from 'utils/httpClient';
import { getUserToken, setUserToken } from 'utils/userToken';

export interface UserProfile {
  email: string;
  name: string;
  avatarUrl: string;
}

export const login = async (email: string, password: string) => {
  const requestBody = {
    grant_type: 'password',
    email,
    password,
    client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,
  };

  const {
    data: {
      attributes: { accessToken: accessToken, refreshToken: refreshToken },
    },
  } = await post('/oauth/token', requestBody);

  setUserToken(accessToken, refreshToken);
};

export const refreshToken = async () => {
  const { refreshToken } = getUserToken();
  const requestBody = {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,
  };

  const {
    data: {
      attributes: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    },
  } = await post('/oauth/token', requestBody);

  setUserToken(newAccessToken, newRefreshToken);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const { accessToken } = getUserToken();

  const response = await get('/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.data.attributes;
};

export const resetPassword = async (email: string) => {
  const requestBody = {
    user: {
      email,
    },
    client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,
  };

  return await post('/passwords', requestBody);
};

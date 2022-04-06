import { get, post } from 'utils/httpClient';
import { getUserToken, setUserToken } from 'utils/userToken';

export interface UserProfile {
  email: string;
  name: string;
  avatar_url: string;
}

export const login = async (email: string, password: string) => {
  const requestBody = {
    grant_type: 'password',
    email: email,
    password: password,
    client_id: process.env.NEXT_PUBLIC_AUTH_CLIENT_ID,
    client_secret: process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET,
  };

  return post('/oauth/token', requestBody).then(
    ({
      data: {
        attributes: { access_token: accessToken, refresh_token: refreshToken },
      },
    }) => setUserToken(accessToken, refreshToken)
  );
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const { accessToken } = getUserToken();

  return get('/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then(({ data: { attributes: user } }) => user);
};

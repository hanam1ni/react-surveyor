import axios, { AxiosError } from 'axios';
import { refreshToken } from 'services/user';
import { setUserToken } from 'utils/userToken';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError) => {
    const [{ code: errorCode }] = error.response?.data.errors;

    if (errorCode == 'invalid_token') {
      return handleInvalidAccessToken(error);
    } else {
      return Promise.reject({
        status: error.response?.status,
        body: error.response?.data,
      });
    }
  }
);

const handleInvalidAccessToken = async (error: AxiosError) => {
  try {
    const { accessToken, refreshToken: userRefreshToken } =
      await refreshToken();

    const originalRequestConfig = error.config;

    if (originalRequestConfig.headers) {
      originalRequestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    setUserToken(accessToken, userRefreshToken);

    return axios(originalRequestConfig);
  } catch {
    return Promise.reject({
      status: error.response?.status,
      body: error.response?.data,
    });
  }
};

export const get = async (url: string, options = {}) =>
  httpClient.get(url, options);

export const post = async (url: string, body = {}, options = {}) =>
  httpClient.post(url, body, options);

import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import qs from 'qs';

import { refreshToken } from 'services/user';

export interface ErrorResponse {
  status: number | undefined;
  body: any | undefined;
}

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  paramsSerializer: (params) => qs.stringify(params),
});

httpClient.interceptors.response.use(
  (response) => {
    return camelcaseKeys(response.data, { deep: true });
  },
  (error: AxiosError) => {
    const [{ code: errorCode }] = error.response?.data.errors;

    if (errorCode == 'invalid_token') {
      return handleInvalidAccessToken(error);
    } else {
      throw {
        status: error.response?.status,
        body: error.response?.data,
      };
    }
  }
);

const handleInvalidAccessToken = async (error: AxiosError) => {
  try {
    const { accessToken } = await refreshToken();

    const originalRequestConfig = error.config;

    if (originalRequestConfig.headers) {
      originalRequestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return axios(originalRequestConfig);
  } catch {
    return Promise.reject({
      status: error.response?.status,
      body: error.response?.data,
    });
  }
};

export const get = async (
  url: string,
  options = {}
): Promise<{ [key: string]: any }> => httpClient.get(url, options);

export const post = async (
  url: string,
  body = {},
  options = {}
): Promise<{ [key: string]: any }> => httpClient.post(url, body, options);

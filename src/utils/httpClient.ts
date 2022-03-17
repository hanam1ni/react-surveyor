import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

httpClient.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject({ status: error.response.status, body: error.response.data })
);

export const get = async (url: string, options = {}) =>
  httpClient.get(url, options);

export const post = async (url: string, body = {}, options = {}) =>
  httpClient.post(url, body, options);

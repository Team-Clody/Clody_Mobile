import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '@env';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export enum HeaderType {
  SOCIAL_TOKEN = 'SOCIAL_TOKEN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  SIGN_UP = 'SIGN_UP',
  WITH_TOKEN = 'WITH_TOKEN',
}

// UserManager 임시 구현
class UserManager {
  accessToken: string | null =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NjU1NTU5OTIsImV4cCI6MTc2Njc2NTU5MiwidHlwZSI6ImFjY2VzcyIsInVzZXJJZCI6Nzh9.m8emxbK_Ccnb6zgjRnNkzoPsHObjiMN_92bAjHL6QBuBGuTMRC5GhGMKYIj8IULsWAQZmtbZp0-k-DlSmQvySw';
  refreshToken: string | null = null;
  socialToken: string | null = null;
}

export const userManager = new UserManager();

export const APIConstants = {
  contentType: 'Content-Type',
  applicationJSON: 'application/json',
  auth: 'Authorization',
  timeZone: 'Time-Zone',
  seoul: 'Asia/Seoul',
  OS: 'OS',
  iOS: 'iOS',

  get accessToken(): string {
    return 'Bearer ' + (userManager.accessToken ?? '');
  },

  get refreshToken(): string {
    return 'Bearer ' + (userManager.refreshToken ?? '');
  },

  get appleAccessToken(): string {
    return userManager.socialToken ?? '';
  },
};

export const getHeaders = (type: HeaderType): Record<string, string> => {
  const { contentType, applicationJSON, auth, timeZone, seoul, OS, iOS } =
    APIConstants;

  switch (type) {
    case HeaderType.SOCIAL_TOKEN:
      return {
        [contentType]: applicationJSON,
        [auth]: APIConstants.appleAccessToken,
      };

    case HeaderType.WITH_TOKEN:
      return {
        [contentType]: applicationJSON,
        [OS]: iOS,
        [auth]: APIConstants.accessToken,
        [timeZone]: seoul,
      };

    case HeaderType.ACCESS_TOKEN:
      return {
        [contentType]: applicationJSON,
        [auth]: APIConstants.accessToken,
        [timeZone]: seoul,
      };

    case HeaderType.REFRESH_TOKEN:
      return {
        [contentType]: applicationJSON,
        [auth]: APIConstants.refreshToken,
      };

    case HeaderType.SIGN_UP:
      return {
        [contentType]: applicationJSON,
        [auth]: APIConstants.appleAccessToken,
        [OS]: iOS,
        [timeZone]: seoul,
      };

    default:
      return {
        [contentType]: applicationJSON,
      };
  }
};

export const APIKit = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  timeoutErrorMessage: 'timeout',
});

export const createAPIRequest = <T>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  headerType: HeaderType,
  data?: any,
  config?: AxiosRequestConfig,
) => {
  const headers = getHeaders(headerType);

  return APIKit.request<ApiResponse<T>>({
    method,
    url,
    data,
    headers: {
      ...headers,
      ...config?.headers,
    },
    ...config,
  });
};

APIKit.interceptors.request.use(config => {
  if (!config.headers.get('Content-Type')) {
    config.headers.set('Content-Type', 'application/json');
  }
  return config;
});

APIKit.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('🔥 에러 발생');
    console.log('URL:', error.config?.url);
    console.log('Status:', error.response?.status);
    console.log('Headers:', error.config?.headers);
    console.log('Response data:', error.response?.data);
  },
);

import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '@env';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  status: number;
  message: string;
  data?: any;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
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
  // TODO: 현지화 대응 필요 (DeviceManager?)
  seoul: 'Asia/Seoul',
  OS: 'OS',
  // TODO: OS 대응 필요 (DeviceManager?)
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
    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || '알 수 없는 오류가 발생했습니다';
    const data = error.response?.data;

    const apiError = new ApiError(status, message, data);
    handleApiError(apiError);

    return Promise.reject(apiError);
  },
);

const handleApiError = (error: ApiError) => {
  switch (error.status) {
    case 400:
      console.error('❌ 잘못된 요청:', error.message);
      break;
    case 401:
      // TODO: refresh token 로직 필요
      console.error('🔒 토큰 만료:', error.message);
      break;
    case 403:
      console.error('🚫 권한 없음:', error.message);
      break;
    case 404:
      console.error('🔍 리소스를 찾을 수 없음:', error.message);
      break;
    case 500:
      console.error('💥 서버 오류:', error.message);
      break;
    default:
      console.error('⚠️ API 오류:', error.message);
  }
};

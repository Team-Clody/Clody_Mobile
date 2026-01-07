import axios, { AxiosRequestConfig } from 'axios';
import { BASE_URL } from '@env';
import { userManager } from '../storage/userManager';

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
  AUTH_CODE = 'AUTH_CODE',
  PLATFORM_TOKEN = 'PLATFORM_TOKEN',
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  POST_DIARY = 'POST_DIARY',
  TIME_ZONE = 'TIME_ZONE',
}

// LocalizationConstant 임시 구현
class LocalizationConstant {
  static timeZoneCode: string = 'Asia/Seoul';
  static acceptLanguage: string = 'ko-KR';
}

export { LocalizationConstant };

export const APIConstants = {
  contentType: 'Content-Type',
  applicationJSON: 'application/json',
  auth: 'Authorization',
  access: 'accessToken',
  refresh: 'refreshToken',
  Bearer: 'Bearer ',
  timeZone: 'Time-Zone',
  acceptLanguage: 'Accept-Language',
};

export const getHeaders = async (
  type: HeaderType,
  platformToken?: string,
): Promise<Record<string, string>> => {
  const {
    contentType,
    applicationJSON,
    auth,
    Bearer,
    timeZone,
    acceptLanguage,
  } = APIConstants;

  switch (type) {
    case HeaderType.AUTH_CODE: {
      const accessToken = await userManager.getAccessToken();
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + accessToken,
      };
    }

    case HeaderType.PLATFORM_TOKEN:
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + (platformToken || ''),
      };

    case HeaderType.ACCESS_TOKEN: {
      const accessToken = await userManager.getAccessToken();
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + accessToken,
      };
    }

    case HeaderType.REFRESH_TOKEN: {
      const refreshToken = await userManager.getRefreshToken();
      return {
        [auth]: Bearer + refreshToken,
      };
    }

    case HeaderType.POST_DIARY: {
      const accessToken = await userManager.getAccessToken();
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + accessToken,
        [timeZone]: LocalizationConstant.timeZoneCode,
        [acceptLanguage]: LocalizationConstant.acceptLanguage,
      };
    }

    case HeaderType.TIME_ZONE: {
      const accessToken = await userManager.getAccessToken();
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + accessToken,
        [timeZone]: LocalizationConstant.timeZoneCode,
      };
    }

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

export const createAPIRequest = async <T>(
  method: 'get' | 'post' | 'put' | 'delete' | 'patch',
  url: string,
  headerType: HeaderType,
  data?: any,
  config?: AxiosRequestConfig,
  platformToken?: string,
) => {
  const headers = await getHeaders(headerType, platformToken);

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

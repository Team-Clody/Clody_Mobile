import axios, {
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from '@env';
import { tokenStorage } from '../storage/tokenStorage';
import { AuthAPI } from '../api/authAPI';

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
  NON_AUTH = 'NON_AUTH',
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
      const accessToken = await tokenStorage.getAccessToken();
      if (!accessToken) {
        throw new Error('accessToken이 없습니다.');
      }
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + accessToken,
      };
    }

    case HeaderType.NON_AUTH: {
      return {
        [contentType]: applicationJSON,
      };
    }

    case HeaderType.PLATFORM_TOKEN: {
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + (platformToken || ''),
      };
    }

    case HeaderType.ACCESS_TOKEN: {
      const accessToken = await tokenStorage.getAccessToken();
      if (!accessToken) {
        throw new Error('accessToken이 없습니다.');
      }
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + accessToken,
      };
    }

    case HeaderType.REFRESH_TOKEN: {
      const refreshToken = await tokenStorage.getRefreshToken();
      if (!refreshToken) {
        throw new Error('refreshToken이 없습니다.');
      }
      return {
        [auth]: Bearer + refreshToken,
      };
    }

    case HeaderType.POST_DIARY: {
      const accessToken = await tokenStorage.getAccessToken();
      if (!accessToken) {
        throw new Error('accessToken이 없습니다.');
      }
      return {
        [contentType]: applicationJSON,
        [auth]: Bearer + accessToken,
        [timeZone]: LocalizationConstant.timeZoneCode,
        [acceptLanguage]: LocalizationConstant.acceptLanguage,
      };
    }

    case HeaderType.TIME_ZONE: {
      const accessToken = await tokenStorage.getAccessToken();
      if (!accessToken) {
        throw new Error('accessToken이 없습니다.');
      }
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

/**
 * 토큰 재발급 관련 상태 관리
 */
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * 토큰 재발급을 수행합니다.
 * 경쟁 상태를 방지하기 위해 이미 재발급이 진행 중이면 기존 Promise를 반환합니다.
 * @returns 새로운 accessToken
 * @throws 재발급 실패 시 에러
 */
const refreshAccessToken = async (): Promise<string> => {
  // 이미 재발급이 진행 중이면 기존 Promise 반환
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      console.log('[HTTP] 토큰 재발급 시작');
      const response = await AuthAPI.reissueToken();

      await tokenStorage.saveTokens(
        response.accessToken,
        response.refreshToken,
      );

      console.log('[HTTP] 토큰 재발급 성공');
      isRefreshing = false;
      refreshPromise = null;

      return response.accessToken;
    } catch (error) {
      console.error('[HTTP] 토큰 재발급 실패:', error);
      isRefreshing = false;
      refreshPromise = null;

      await tokenStorage.clearTokens();

      // TODO: 로그인 화면으로 이동하는 로직 구현

      const apiError = new ApiError(
        401,
        '토큰 재발급에 실패했습니다. 다시 로그인해주세요.',
      );
      throw apiError;
    }
  })();

  return refreshPromise;
};

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

  const authHeader = config.headers.get('Authorization');
  console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
  console.log(`[HTTP] Authorization: ${authHeader || 'None'}`);

  return config;
});

// APIKit.interceptors.response.use(
//   response => response,
//   async (error: AxiosError<ApiErrorResponse>) => {
//     const originalRequest = error.config as InternalAxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     const status = error.response?.status || 500;
//     const message =
//       error.response?.data?.message || '알 수 없는 오류가 발생했습니다';
//     const data = error.response?.data;

//     if (status === 401 && originalRequest && !originalRequest._retry) {
//       // 재발급 API 자체가 401을 받은 경우 무한 루프 방지
//       if (originalRequest.url?.includes('/api/v1/auth/reissue')) {
//         const apiError = new ApiError(status, message, data);
//         handleApiError(apiError);
//         return Promise.reject(apiError);
//       }

//       originalRequest._retry = true;

//       try {
//         const newAccessToken = await refreshAccessToken();

//         if (originalRequest.headers) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }

//         return APIKit(originalRequest);
//       } catch (refreshError) {
//         return Promise.reject(refreshError);
//       }
//     }

//     const apiError = new ApiError(status, message, data);
//     handleApiError(apiError);
//     return Promise.reject(apiError);
//   },
// );

APIKit.interceptors.response.use(
  res => res,
  async (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status ?? 500;

    const originalRequest = {
      ...error.config,
      headers: {
        ...(error.config?.headers || {}),
      },
    } as InternalAxiosRequestConfig & { _retry?: boolean };

    if (status === 401 && !originalRequest._retry) {
      if (originalRequest.url?.includes('/api/v1/auth/reissue')) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      const newAccessToken = await refreshAccessToken();

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return APIKit.request(originalRequest);
    }

    return Promise.reject(error);
  },
);

const handleApiError = (error: ApiError) => {
  switch (error.status) {
    case 400:
      console.error('❌ 잘못된 요청:', error.message);
      break;
    case 401:
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

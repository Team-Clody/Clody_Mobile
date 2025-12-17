import axios from 'axios';
import { BASE_URL } from '@env';

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const APIKit = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  timeoutErrorMessage: 'timeout',
});

APIKit.interceptors.request.use(config => {
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3NjU1NTU5OTIsImV4cCI6MTc2Njc2NTU5MiwidHlwZSI6ImFjY2VzcyIsInVzZXJJZCI6Nzh9.m8emxbK_Ccnb6zgjRnNkzoPsHObjiMN_92bAjHL6QBuBGuTMRC5GhGMKYIj8IULsWAQZmtbZp0-k-DlSmQvySw';

  config.headers?.set('Content-Type', 'application/json');
  config.headers?.set('Authorization', 'Bearer ' + token);

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

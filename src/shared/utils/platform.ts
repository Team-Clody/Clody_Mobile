import { Platform } from 'react-native';

/**
 * 현재 플랫폼이 iOS인지 확인
 */
export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

/**
 * 현재 플랫폼이 Android인지 확인
 */
export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

/**
 * 현재 플랫폼 정보 반환
 */
export const getPlatform = (): typeof Platform.OS => {
  return Platform.OS;
};

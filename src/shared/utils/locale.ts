import * as RNLocalize from 'react-native-localize';

/**
 * 기기의 현재 로케일 정보 반환
 * @returns 로케일 정보 (예: 'ko-KR', 'en-US')
 */
export const getDeviceLocale = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales.length === 0) {
    return 'en-US';
  }

  const locale = locales[0];
  return `${locale.languageCode}-${locale.countryCode}`;
};

/**
 * 기기의 언어 코드 반환
 * @returns 언어 코드 (예: 'ko', 'en')
 */
export const getLanguageCode = (): string => {
  const locales = RNLocalize.getLocales();
  if (locales.length === 0) {
    return 'en';
  }

  return locales[0].languageCode.toLowerCase();
};

/**
 * 기기의 언어가 한국어인지 확인
 * @returns 한국어면 true, 그 외면 false
 */
export const isKoreanLocale = (): boolean => {
  const locales = RNLocalize.getLocales();
  if (locales.length === 0) {
    return false;
  }

  const languageCode = locales[0].languageCode.toLowerCase();
  return languageCode === 'ko';
};

/**
 * 지역 타입 정의
 */
export type Region = 'domestic' | 'international';

/**
 * 기기의 지역 정보를 반환
 * 한국어 로케일이면 'domestic', 그 외면 'international'
 */
export const getRegion = (): Region => {
  return isKoreanLocale() ? 'domestic' : 'international';
};

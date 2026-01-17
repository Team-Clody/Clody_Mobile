import * as RNLocalize from 'react-native-localize';

/**
 * 기기의 현재 타임존 정보 반환
 * @returns 타임존 정보 (예: 'Asia/Seoul', 'America/New_York')
 */
export const getDeviceTimeZone = (): string => {
  const timeZone = RNLocalize.getTimeZone();
  if (!timeZone) {
    // 기본값으로 UTC 반환
    return 'UTC';
  }
  return timeZone;
};

/**
 * 타임존이 한국인지 확인
 * @returns 한국 타임존이면 true, 그 외면 false
 */
export const isKoreanTimeZone = (): boolean => {
  const timeZone = getDeviceTimeZone();
  return timeZone === 'Asia/Seoul';
};

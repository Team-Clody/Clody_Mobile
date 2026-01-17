import { getRegion } from './locale';
import { isIOS, isAndroid } from './platform';

/**
 * 로그인 버튼 타입 정의
 */
export type LoginButtonType = 'apple' | 'google' | 'kakao';

/**
 * 현재 플랫폼과 지역 정보를 기반으로 로그인 버튼 타입 결정
 * @returns 사용 가능한 로그인 버튼 타입 배열
 */
export const getAvailableLoginButtons = (): LoginButtonType[] => {
  const region = getRegion();
  const platform = isIOS() ? 'ios' : isAndroid() ? 'android' : null;

  if (!platform) {
    return [];
  }

  // iOS 국내: 애플 + 카카오
  if (platform === 'ios' && region === 'domestic') {
    return ['apple', 'kakao'];
  }

  // iOS 국외: 애플
  if (platform === 'ios' && region === 'international') {
    return ['apple'];
  }

  // Android 국내: 구글 + 카카오
  if (platform === 'android' && region === 'domestic') {
    return ['google', 'kakao'];
  }

  // Android 국외: 구글
  if (platform === 'android' && region === 'international') {
    return ['google'];
  }

  return [];
};

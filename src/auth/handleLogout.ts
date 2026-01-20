import { tokenStorage } from '../storage/tokenStorage';

/**
 * 로그아웃을 수행하고 로컬 토큰을 정리합니다.
 * @throws 토큰 정리 실패 시 에러
 */
export const handleLogout = async (): Promise<boolean> => {
  try {
    await tokenStorage.clearTokens();
    console.log('[Auth] 로그아웃이 완료되었습니다.');
    return true;
  } catch (error) {
    console.error('[Auth] 로그아웃 중 오류 발생:', error);
    return false;
  }
};

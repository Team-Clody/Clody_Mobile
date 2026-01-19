import { tokenStorage } from '../storage/tokenStorage';
import { AuthAPI } from '../api/authAPI';

/**
 * 회원탈퇴를 수행하고 로컬 토큰을 정리합니다.
 * @returns 탈퇴 성공 여부
 */
export const handleRevoke = async (): Promise<boolean> => {
  try {
    await AuthAPI.deleteUser();

    await tokenStorage.clearTokens();

    console.log('[Auth] 회원탈퇴가 완료되었습니다.');
    return true;
  } catch (error) {
    console.error('[Auth] 회원탈퇴 중 오류 발생:', error);

    try {
      await tokenStorage.clearTokens();
    } catch (clearError) {
      console.error('[Auth] 토큰 정리 중 오류 발생:', clearError);
    }
    return false;
  }
};

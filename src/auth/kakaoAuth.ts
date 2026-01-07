import { login } from '@react-native-seoul/kakao-login';

/**
 * 카카오 로그인을 수행하고 accessToken을 반환합니다.
 * @returns 카카오 accessToken
 * @throws 카카오 로그인 실패 시 에러
 */
export const kakaoLogin = async (): Promise<string> => {
  try {
    const token = await login();
    console.log('[Auth] Kakao login success', token);

    if (!token?.accessToken) {
      throw new Error('카카오 accessToken을 찾을 수 없습니다.');
    }

    return token.accessToken;
  } catch (e) {
    console.error('[Auth] Kakao login error', e);
    throw e;
  }
};

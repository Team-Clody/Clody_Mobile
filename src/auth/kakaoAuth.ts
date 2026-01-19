import { login, getProfile } from '@react-native-seoul/kakao-login';

export interface KakaoLoginResult {
  accessToken: string;
  email: string;
}

/**
 * 카카오 로그인을 수행하고 accessToken과 이메일을 반환합니다.
 * @returns 카카오 accessToken과 email
 * @throws 카카오 로그인 실패 시 에러
 */
export const kakaoLogin = async (): Promise<KakaoLoginResult> => {
  try {
    const token = await login();

    if (!token?.accessToken) {
      throw new Error('카카오 accessToken을 찾을 수 없습니다.');
    }

    const profile = await getProfile();
    const email = profile.email || '';

    console.log('[Auth] Kakao login success', token.accessToken, email);
    return { accessToken: token.accessToken, email };
  } catch (e: any) {
    console.error('[Auth] Kakao login error', e);
    throw e;
  }
};

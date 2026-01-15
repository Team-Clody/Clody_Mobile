import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_AUTH_IOS_CLIENT_ID, GOOGLE_AUTH_WEB_CLIENT_ID } from '@env';

/**
 * 구글 로그인을 초기화합니다.
 * 앱 시작 시 한 번 호출해야 합니다.
 */
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_AUTH_WEB_CLIENT_ID,
    iosClientId: GOOGLE_AUTH_IOS_CLIENT_ID,
  });
};

/**
 * 구글 로그인을 수행하고 idToken을 반환합니다.
 * @returns 구글 idToken
 * @throws 구글 로그인 실패 시 에러
 */
export const googleLogin = async (): Promise<string> => {
  try {
    // 구글 로그인 초기화 (이미 호출했다면 중복 호출해도 안전)
    configureGoogleSignIn();

    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const userInfo = await GoogleSignin.signIn();

    if (!userInfo?.data?.idToken) {
      throw new Error('구글 idToken을 찾을 수 없습니다.');
    }

    console.log('[Auth] Google login success', userInfo.data.idToken);
    return userInfo.data.idToken;
  } catch (e: any) {
    // 사용자가 취소한 경우
    if (e.code === 'SIGN_IN_CANCELLED') {
      console.log('[Auth] Google login canceled by user');
      throw new Error('사용자가 구글 로그인을 취소했습니다.');
    }

    console.error('[Auth] Google login error', e);
    throw e;
  }
};

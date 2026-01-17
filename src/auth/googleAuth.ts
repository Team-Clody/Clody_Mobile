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

export interface GoogleLoginResult {
  idToken: string;
  email: string;
}

/**
 * 구글 로그인을 수행하고 idToken과 email을 반환합니다.
 * @returns 구글 idToken과 email
 * @throws 구글 로그인 실패 시 에러
 */
export const googleLogin = async (): Promise<GoogleLoginResult> => {
  // 구글 로그인 초기화 (이미 호출했다면 중복 호출해도 안전)
  configureGoogleSignIn();

  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

  const userInfo = await GoogleSignin.signIn();

  if (!userInfo?.data?.idToken) {
    throw new Error('구글 idToken을 찾을 수 없습니다.');
  }

  return {
    idToken: userInfo.data.idToken,
    email: userInfo.data.user?.email || '',
  };
};

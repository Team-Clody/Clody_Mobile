import { AuthAPI } from '../api/authAPI';
import { tokenStorage } from '../storage/tokenStorage';
import { ApiError } from '../shared/http';
import { KakaoLoginResult } from './kakaoAuth';
import { AppleLoginResult } from './appleAuth';
import { GoogleLoginResult } from './googleAuth';

export type LoginResultType = 'success' | 'not_found' | 'error';

export interface LoginResult {
  type: LoginResultType;
  signupInfo?: {
    platform: 'kakao' | 'apple' | 'google';
    email: string;
    platformToken: string;
  };
}

/**
 * 카카오/애플 로그인 처리 함수
 * @param platform 로그인 플랫폼 ('kakao' | 'apple')
 * @param getPlatformData 플랫폼별 토큰과 이메일을 가져오는 함수
 * @returns 로그인 결과
 */
export const handleLogin = async (
  platform: 'kakao' | 'apple',
  getPlatformData: () => Promise<KakaoLoginResult | AppleLoginResult>,
): Promise<LoginResult> => {
  let platformData: KakaoLoginResult | AppleLoginResult;
  try {
    platformData = await getPlatformData();
  } catch {
    return { type: 'error' };
  }

  const platformToken = 'accessToken' in platformData
    ? platformData.accessToken
    : platformData.identityToken;

  const fcmToken =
    'fE95HlthQduywPbyucNu6B:APA91bFw7lZzzNI0Mzh3vK9GQfIW0yCm9DVO8r8X8hJIiGdoadOVLjTZb0m1VRNJgOHLlOK5uB1J2KNdJ-LQOdd6yHeWCigWlhCtQmh-jRAKiUJA7HoLpbA';

  const requestDTO = {
    platform,
    fcmToken,
  };

  try {
    const response = await AuthAPI.postSignin(platformToken, requestDTO);

    await tokenStorage.saveTokens(response.accessToken, response.refreshToken);

    return { type: 'success' };
  } catch (error) {
    console.error('[HandleLogin] 로그인에 실패하였습니다.', error);

    if (error instanceof ApiError && error.status === 404) {
      return {
        type: 'not_found',
        signupInfo: {
          platform,
          email: platformData.email,
          platformToken,
        },
      };
    }

    return { type: 'error' };
  }
};

/**
 * 구글 로그인 처리 함수
 * @param getGoogleData 구글 idToken과 email을 가져오는 함수
 * @returns 로그인 결과
 */
export const handleGoogleLogin = async (
  getGoogleData: () => Promise<GoogleLoginResult>,
): Promise<LoginResult> => {
  let googleData: GoogleLoginResult;
  try {
    googleData = await getGoogleData();
  } catch {
    return { type: 'error' };
  }

  const fcmToken =
    'fE95HlthQduywPbyucNu6B:APA91bFw7lZzzNI0Mzh3vK9GQfIW0yCm9DVO8r8X8hJIiGdoadOVLjTZb0m1VRNJgOHLlOK5uB1J2KNdJ-LQOdd6yHeWCigWlhCtQmh-jRAKiUJA7HoLpbA';

  const requestDTO = {
    idToken: googleData.idToken,
    fcmToken,
  };

  try {
    const response = await AuthAPI.postGoogleSignin(requestDTO);

    await tokenStorage.saveTokens(response.accessToken, response.refreshToken);

    return { type: 'success' };
  } catch (error) {
    console.error('[HandleLogin] Google 로그인에 실패하였습니다.', error);

    if (error instanceof ApiError && error.status === 404) {
      return {
        type: 'not_found',
        signupInfo: {
          platform: 'google',
          email: googleData.email,
          platformToken: googleData.idToken,
        },
      };
    }

    return { type: 'error' };
  }
};

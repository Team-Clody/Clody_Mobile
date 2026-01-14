import { AuthAPI } from '../api/authAPI';
import { tokenStorage } from '../storage/tokenStorage';

/**
 * 공통 로그인 처리 함수
 * @param platform 로그인 플랫폼 ('kakao' | 'apple' | 'google')
 * @param getPlatformToken 플랫폼별 accessToken/idToken을 가져오는 함수
 * @returns 성공 여부 (true: 성공, false: 실패)
 */
export const handleLogin = async (
  platform: 'kakao' | 'apple' | 'google',
  getPlatformToken: () => Promise<string>,
): Promise<boolean> => {
  try {
    const platformToken = await getPlatformToken();

    const fcmToken =
      'fE95HlthQduywPbyucNu6B:APA91bFw7lZzzNI0Mzh3vK9GQfIW0yCm9DVO8r8X8hJIiGdoadOVLjTZb0m1VRNJgOHLlOK5uB1J2KNdJ-LQOdd6yHeWCigWlhCtQmh-jRAKiUJA7HoLpbA';

    let response;

    if (platform === 'google') {
      const requestDTO = {
        idToken: platformToken,
        fcmToken,
      };

      response = await AuthAPI.postGoogleSignin(requestDTO);
    } else {
      const requestDTO = {
        platform,
        fcmToken,
      };

      response = await AuthAPI.postSignin(platformToken, requestDTO);
    }

    await tokenStorage.saveTokens(response.accessToken, response.refreshToken);

    return true;
  } catch (error: any) {
    console.error('[HandleLogin] 로그인에 실패하였습니다.', error);
    return false;
  }
};

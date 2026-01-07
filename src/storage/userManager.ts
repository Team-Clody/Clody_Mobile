import { tokenStorage } from './tokenStorage';

/**
 * UserManager - 토큰 저장소와 연동하여 토큰을 관리합니다.
 */
class UserManager {
  /**
   * 저장된 accessToken을 조회합니다.
   * @returns accessToken 또는 빈 문자열
   */
  async getAccessToken(): Promise<string> {
    const token = await tokenStorage.getAccessToken();
    return token || '';
  }

  /**
   * 저장된 refreshToken을 조회합니다.
   * @returns refreshToken 또는 빈 문자열
   */
  async getRefreshToken(): Promise<string> {
    const token = await tokenStorage.getRefreshToken();
    return token || '';
  }

  /**
   * 동기적으로 accessToken을 조회합니다.
   * 주의: 비동기 작업이므로 가능하면 getAccessToken()을 사용하세요.
   * @deprecated 비동기 메서드 사용을 권장합니다.
   */
  get accessTokenValue(): string {
    // 동기적 접근을 위한 임시 구현
    // 실제로는 비동기 메서드를 사용해야 합니다.
    return '';
  }

  /**
   * 동기적으로 refreshToken을 조회합니다.
   * 주의: 비동기 작업이므로 가능하면 getRefreshToken()을 사용하세요.
   * @deprecated 비동기 메서드 사용을 권장합니다.
   */
  get refreshTokenValue(): string {
    // 동기적 접근을 위한 임시 구현
    // 실제로는 비동기 메서드를 사용해야 합니다.
    return '';
  }
}

export const userManager = new UserManager();

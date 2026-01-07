import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEYS = {
  ACCESS_TOKEN: '@Clody:accessToken',
  REFRESH_TOKEN: '@Clody:refreshToken',
} as const;

/**
 * 토큰 저장소 관리 클래스
 * AsyncStorage를 사용하여 accessToken과 refreshToken을 저장/조회/삭제합니다.
 */
class TokenStorage {
  /**
   * accessToken과 refreshToken을 저장합니다.
   * @param accessToken 서버에서 받은 accessToken
   * @param refreshToken 서버에서 받은 refreshToken
   */
  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken),
        AsyncStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, refreshToken),
      ]);
      console.log('[TokenStorage] 토큰이 성공적으로 저장되었습니다.');
      console.log('[TokenStorage] 저장된 accessToken:', accessToken);
      console.log('[TokenStorage] 저장된 refreshToken:', refreshToken);
    } catch (error) {
      console.error('[TokenStorage] 토큰 저장에 실패했습니다.:', error);
      throw new Error('토큰 저장에 실패했습니다.');
    }
  }

  /**
   * 저장된 accessToken을 조회합니다.
   * @returns accessToken 또는 null
   */
  async getAccessToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
      return token;
    } catch (error) {
      console.error('[TokenStorage] accessToken 조회에 실패했습니다.:', error);
      return null;
    }
  }

  /**
   * 저장된 refreshToken을 조회합니다.
   * @returns refreshToken 또는 null
   */
  async getRefreshToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
      return token;
    } catch (error) {
      console.error('[TokenStorage] refreshToken 조회에 실패했습니다.:', error);
      return null;
    }
  }

  /**
   * 저장된 모든 토큰을 조회합니다.
   * @returns { accessToken, refreshToken } 또는 null
   */
  async getTokens(): Promise<{
    accessToken: string;
    refreshToken: string;
  } | null> {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.getAccessToken(),
        this.getRefreshToken(),
      ]);

      if (!accessToken || !refreshToken) {
        return null;
      }

      return { accessToken, refreshToken };
    } catch (error) {
      console.error('[TokenStorage] 토큰 조회에 실패했습니다.:', error);
      return null;
    }
  }

  /**
   * 저장된 모든 토큰을 삭제합니다.
   */
  async clearTokens(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN),
        AsyncStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN),
      ]);
      console.log('[TokenStorage] 토큰이 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('[TokenStorage] 토큰 삭제에 실패했습니다.:', error);
      throw new Error('토큰 삭제에 실패했습니다.');
    }
  }

  /**
   * accessToken만 업데이트합니다.
   * @param accessToken 새로운 accessToken
   */
  async updateAccessToken(accessToken: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, accessToken);
      console.log('[TokenStorage] accessToken 업데이트에 성공했습니다.');
    } catch (error) {
      console.error(
        '[TokenStorage] accessToken 업데이트에 실패했습니다.:',
        error,
      );
      throw new Error('accessToken 업데이트에 실패했습니다.');
    }
  }
}

export const tokenStorage = new TokenStorage();

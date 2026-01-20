import AsyncStorage from '@react-native-async-storage/async-storage';

const TERMS_KEYS = {
  ALL_AGREED: '@Clody:terms:allAgreed',
} as const;

class TermsStorage {
  async setAllAgreed(): Promise<void> {
    try {
      await AsyncStorage.setItem(TERMS_KEYS.ALL_AGREED, 'true');
      console.log('[TermsStorage] 모든 약관 동의가 로컬에 저장되었습니다.');
    } catch (error) {
      console.error('[TermsStorage] 약관 동의 저장에 실패했습니다.:', error);
      throw new Error('약관 동의 저장에 실패했습니다.');
    }
  }

  async hasLocalAgreement(): Promise<boolean> {
    try {
      const agreed = await AsyncStorage.getItem(TERMS_KEYS.ALL_AGREED);
      return agreed === 'true';
    } catch (error) {
      console.error('[TermsStorage] 약관 동의 조회에 실패했습니다.:', error);
      return false;
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TERMS_KEYS.ALL_AGREED);
      console.log('[TermsStorage] 약관 동의가 삭제되었습니다.');
    } catch (error) {
      console.error('[TermsStorage] 약관 동의 삭제에 실패했습니다.:', error);
      throw new Error('약관 동의 삭제에 실패했습니다.');
    }
  }
}

export const termsStorage = new TermsStorage();

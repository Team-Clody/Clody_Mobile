import AsyncStorage from '@react-native-async-storage/async-storage';

const SIGNUP_KEYS = {
  PLATFORM: '@Clody:signup:platform',
  EMAIL: '@Clody:signup:email',
  PLATFORM_TOKEN: '@Clody:signup:platformToken',
  NAME: '@Clody:signup:name',
  GENDER: '@Clody:signup:gender',
  BIRTH_DATE: '@Clody:signup:birthDate',
} as const;

export interface SignupData {
  platform: 'apple' | 'kakao' | 'google' | null;
  email: string;
  platformToken: string;
  name: string;
  gender: string | null;
  birthDate: string | null;
}

class SignupStorage {
  async setLoginInfo(
    platform: 'apple' | 'kakao' | 'google',
    email: string,
    platformToken: string,
  ): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.setItem(SIGNUP_KEYS.PLATFORM, platform),
        AsyncStorage.setItem(SIGNUP_KEYS.EMAIL, email),
        AsyncStorage.setItem(SIGNUP_KEYS.PLATFORM_TOKEN, platformToken),
      ]);
      console.log('[SignupStorage] 로그인 정보가 저장되었습니다.');
    } catch (error) {
      console.error('[SignupStorage] 로그인 정보 저장에 실패했습니다.:', error);
      throw new Error('로그인 정보 저장에 실패했습니다.');
    }
  }

  async setName(name: string): Promise<void> {
    try {
      await AsyncStorage.setItem(SIGNUP_KEYS.NAME, name);
    } catch (error) {
      console.error('[SignupStorage] 이름 저장에 실패했습니다.:', error);
      throw new Error('이름 저장에 실패했습니다.');
    }
  }

  async setBirthInfo(birthDate: string | null, gender: string | null): Promise<void> {
    try {
      if (birthDate) {
        await AsyncStorage.setItem(SIGNUP_KEYS.BIRTH_DATE, birthDate);
      } else {
        await AsyncStorage.removeItem(SIGNUP_KEYS.BIRTH_DATE);
      }

      if (gender) {
        await AsyncStorage.setItem(SIGNUP_KEYS.GENDER, gender);
      } else {
        await AsyncStorage.removeItem(SIGNUP_KEYS.GENDER);
      }
    } catch (error) {
      console.error('[SignupStorage] 생년월일/성별 저장에 실패했습니다.:', error);
      throw new Error('생년월일/성별 저장에 실패했습니다.');
    }
  }

  async getSignupData(): Promise<SignupData> {
    try {
      const [platform, email, platformToken, name, gender, birthDate] = await Promise.all([
        AsyncStorage.getItem(SIGNUP_KEYS.PLATFORM),
        AsyncStorage.getItem(SIGNUP_KEYS.EMAIL),
        AsyncStorage.getItem(SIGNUP_KEYS.PLATFORM_TOKEN),
        AsyncStorage.getItem(SIGNUP_KEYS.NAME),
        AsyncStorage.getItem(SIGNUP_KEYS.GENDER),
        AsyncStorage.getItem(SIGNUP_KEYS.BIRTH_DATE),
      ]);

      return {
        platform: platform as 'apple' | 'kakao' | 'google' | null,
        email: email || '',
        platformToken: platformToken || '',
        name: name || '',
        gender,
        birthDate,
      };
    } catch (error) {
      console.error('[SignupStorage] 회원가입 데이터 조회에 실패했습니다.:', error);
      return {
        platform: null,
        email: '',
        platformToken: '',
        name: '',
        gender: null,
        birthDate: null,
      };
    }
  }

  async clear(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(SIGNUP_KEYS.PLATFORM),
        AsyncStorage.removeItem(SIGNUP_KEYS.EMAIL),
        AsyncStorage.removeItem(SIGNUP_KEYS.PLATFORM_TOKEN),
        AsyncStorage.removeItem(SIGNUP_KEYS.NAME),
        AsyncStorage.removeItem(SIGNUP_KEYS.GENDER),
        AsyncStorage.removeItem(SIGNUP_KEYS.BIRTH_DATE),
      ]);
      console.log('[SignupStorage] 회원가입 데이터가 삭제되었습니다.');
    } catch (error) {
      console.error('[SignupStorage] 회원가입 데이터 삭제에 실패했습니다.:', error);
      throw new Error('회원가입 데이터 삭제에 실패했습니다.');
    }
  }
}

export const signupStorage = new SignupStorage();

import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { getRegion } from '../utils/locale';
import {
  getAvailableLoginButtons,
  LoginButtonType,
} from '../utils/loginButtons';
import { getDeviceLocale, getLanguageCode } from '../utils/locale';
import { getPlatform } from '../utils/platform';
import { getDeviceTimeZone } from '../utils/timezone';
import { Platform } from 'react-native';

/**
 * 기기 정보 컨텍스트 타입
 */
export interface DeviceContextValue {
  /** 현재 지역 ('domestic' | 'international') */
  region: 'domestic' | 'international';
  /** 현재 플랫폼 (예: 'ios', 'android', 'web')*/
  platform: typeof Platform.OS;
  /** 기기 로케일 (예: 'ko-KR', 'en-US') */
  locale: string;
  /** 언어 코드 (예: 'ko', 'en') */
  languageCode: string;
  /** 사용 가능한 로그인 버튼 타입 배열 */
  availableLoginButtons: LoginButtonType[];
  /** 한국어 로케일인지 여부 */
  isKorean: boolean;
  /** 기기 타임존 (예: 'Asia/Seoul', 'America/New_York') */
  timeZone: string;
  /** 한국어 사용 언어인지 여부 */
  isKoreanLanguage: boolean;
}

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined);

/**
 * DeviceProvider Props
 */
interface DeviceProviderProps {
  children: ReactNode;
}

/**
 * 기기 정보를 제공하는 Provider 컴포넌트
 * 앱 전역에서 기기 정보(플랫폼, 로케일, 지역 등)를 사용할 수 있도록 함
 */
export const DeviceProvider: React.FC<DeviceProviderProps> = ({ children }) => {
  const contextValue = useMemo<DeviceContextValue>(() => {
    const region = getRegion();
    const platform = getPlatform();
    const locale = getDeviceLocale();
    const languageCode = getLanguageCode();
    const availableLoginButtons = getAvailableLoginButtons();
    const isKorean = region === 'domestic';
    const isKoreanLanguage = languageCode === 'ko';

    const timeZone = getDeviceTimeZone();

    return {
      region,
      platform,
      locale,
      languageCode,
      availableLoginButtons,
      isKorean,
      isKoreanLanguage,
      timeZone,
    };
  }, []);

  return (
    <DeviceContext.Provider value={contextValue}>
      {children}
    </DeviceContext.Provider>
  );
};

/**
 * DeviceContext를 사용하는 커스텀 훅
 * @throws DeviceProvider로 감싸지지 않은 경우 에러 발생
 */
export const useDevice = (): DeviceContextValue => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};

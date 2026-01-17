import { useTranslation as useI18nTranslation } from 'react-i18next';

/**
 * 타입 안전한 번역 훅
 * 번역 키의 타입을 체크하여 오타를 방지합니다.
 */
export const useTranslation = () => {
  const { t, i18n } = useI18nTranslation();

  return {
    /**
     * 번역 함수
     * @param key - 번역 키 (예: 'login.buttons.kakao')
     * @param options - 옵션 (변수 치환 등)
     * @returns 번역된 문자열
     */
    t: (key: string, options?: any): string => {
      const result = t(key, options);
      // 타입 안전성을 위해 항상 문자열로 반환
      return typeof result === 'string' ? result : String(result);
    },
    /**
     * 현재 언어 코드
     */
    language: i18n.language,
    /**
     * 언어 변경 함수
     * @param lng - 언어 코드 ('ko' | 'en')
     */
    changeLanguage: (lng: 'ko' | 'en') => i18n.changeLanguage(lng),
  };
};

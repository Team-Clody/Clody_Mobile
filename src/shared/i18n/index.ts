import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLanguageCode } from '../utils/locale';

import koTranslation from '../../locales/ko/translation.json';
import enTranslation from '../../locales/en/translation.json';

/**
 * i18n 초기화
 */
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    ko: {
      translation: koTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  lng: getLanguageCode() === 'ko' ? 'ko' : 'en', // 초기 언어 설정 (한국어면 'ko', 그 외 'en')
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;

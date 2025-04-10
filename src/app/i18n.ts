'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationRu from './locales/ru/translation.json';
import translationEn from './locales/en/translation.json';
import translationDe from './locales/de/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      ru: { translation: translationRu },
      en: { translation: translationEn },
      de: { translation: translationDe },
    },
  });

export default i18n;
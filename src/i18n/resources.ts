import translationRu from '@/app/locales/ru/translation.json';
import translationEn from '@/app/locales/en/translation.json';
import translationDe from '@/app/locales/de/translation.json';
import type { Resource } from 'i18next';

export const resources: Resource = {
  ru: { translation: translationRu },
  en: { translation: translationEn },
  de: { translation: translationDe },
};
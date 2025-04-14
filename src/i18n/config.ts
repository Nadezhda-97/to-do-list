import { type InitOptions } from 'i18next';
import { resources } from './resources';
import { languages, fallbackLng } from './settings';

export const defaultNS = 'translation';

export const i18nConfig: InitOptions = {
  resources,
  fallbackLng,
  defaultNS,
  supportedLngs: languages,
  debug: false,
  interpolation: {
    escapeValue: false,
  },
};

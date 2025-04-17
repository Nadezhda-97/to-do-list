import { useEffect, useState } from 'react';
import i18n from '../i18n/client';
import Translations from '@/app/types/Translations';

export const useLanguageReady = (locale: string, translations: Translations): boolean => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const setupLanguage = async () => {
      if (!i18n.hasResourceBundle(locale, 'translation')) {
        i18n.addResourceBundle(locale, 'translation', translations, true, true);
      }

      if (i18n.language !== locale) {
        await i18n.changeLanguage(locale);
      }

      setIsReady(true);
    };

    setupLanguage();
  }, [locale, translations]);

  return isReady;
}
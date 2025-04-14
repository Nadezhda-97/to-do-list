import { createInstance } from 'i18next';
import { i18nConfig } from './config';
import { resources } from './resources';
import type { i18n } from 'i18next';

export async function getServerTranslation(
  locale: string,
  ns: string[] = ['translation']
): Promise<i18n> {
  const instance = createInstance();
  await instance.init({
    ...i18nConfig,
    lng: locale,
    resources,
    ns,
  });
  return instance;
}

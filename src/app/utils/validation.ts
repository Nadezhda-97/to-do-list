'use client'

//import i18n from '../i18n';
import Translations from "../types/Translations";

export const validateTask = (task: string, maxLength: number, translations: Translations): string | null => {
  if (task.trim() === '') return translations.errorRequired; /* t('errorRequired'); */
  if (task.length < 3) return translations.errorTooShort; /* t('errorTooShort'); */
  if (task.length > maxLength) return translations.errorTooLong.replace('{{max}}', String(maxLength)); /* t('errorTooLong', { max: maxLength }); */
  return null;
};
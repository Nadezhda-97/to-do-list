'use client'

import Translations from "../types/Translations";

export const validateTask = (task: string, maxLength: number, translations: Translations): string | null => {
  if (task.trim() === '') return translations.errorRequired;
  if (task.length < 3) return translations.errorTooShort;
  if (task.length > maxLength) return translations.errorTooLong.replace('{{max}}', String(maxLength));
  return null;
};
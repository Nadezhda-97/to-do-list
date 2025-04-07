'use client'

import i18n from '../i18n';

export const validateTask = (task: string, maxLength: number): string | null => {
  if (task.trim() === '') return i18n.t('errorRequired')
  if (task.length < 3) return i18n.t('errorTooShort');
  if (task.length > maxLength) return i18n.t('errorTooLong', { max: maxLength });
  return null;
};
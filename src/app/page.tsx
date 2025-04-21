import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { languages, fallbackLng } from '@/i18n/settings';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  const preferredLang = acceptLanguage?.split(',')[0].split('-')[0];

  const matchedLocale = languages.includes(preferredLang || '') ? preferredLang : fallbackLng;

  redirect(`/${matchedLocale}`);
}
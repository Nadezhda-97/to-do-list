import { NextRequest, NextResponse } from 'next/server';
import { languages, fallbackLng } from '@/i18n/settings';
import acceptLanguage from 'accept-language';

acceptLanguage.languages(languages);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Пропускаем если путь уже содержит язык или это статический файл
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    languages.some((lng) => pathname.startsWith(`/${lng}`))
  ) {
    return NextResponse.next(); /* return; */
  }

  // 1. Пытаемся получить язык из cookie
  const langFromCookie = req.cookies.get('language')?.value;

  // 2. Если нет — берём из accept-language заголовка
  const langFromHeader = acceptLanguage.get(req.headers.get('accept-language') || '');

  const selectedLang = languages.includes(langFromCookie || '') 
    ? langFromCookie 
    : langFromHeader || fallbackLng;

  // Редиректим с выбранным языком
  return NextResponse.redirect(new URL(`/${selectedLang}${pathname}`, req.url));
}

export const config = {
  matcher: [
    /*
      Запускаем middleware для всех путей, кроме:
      - статичных
      - уже локализованных
    */
    '/((?!_next|favicon.ico|.*\\..*).*)',
  ],
};

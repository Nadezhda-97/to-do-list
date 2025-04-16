import { NextRequest, NextResponse } from 'next/server';
import { languages, fallbackLng } from '@/i18n/settings';
import acceptLanguage from 'accept-language'; /* добавила */

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

  /* const lang = acceptLanguage.get(req.headers.get('accept-language')) || fallbackLng;
  return NextResponse.redirect(new URL(`/${lang}${pathname}`, req.url)); */

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

/* const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = languages;
const DEFAULT_LOCALE = fallbackLng;

function getLocale(request: NextRequest): string {
  const acceptLang = request.headers.get('accept-language');
  const locale = acceptLang?.split(',')[0].split('-')[0];
  return SUPPORTED_LOCALES.includes(locale || '') ? locale! : DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Пропускаем запросы к статике и API
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathnameParts = pathname.split('/');
  const localeInPath = pathnameParts[1];

  if (SUPPORTED_LOCALES.includes(localeInPath)) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    
    //  Обрабатываем все запросы, кроме тех, что начинаются с
    //  /_next/, /api/, /favicon.ico, /static, и т.п.
    
    '/((?!_next|api|favicon.ico|static|images|fonts).*)',
  ],
};

 */


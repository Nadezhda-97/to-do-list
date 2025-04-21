import { dir } from 'i18next';
import { languages } from '@/i18n/settings';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ToDo App',
  description: 'Multilingual ToDo App built with Next.js 13+',
};

/* interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
} */

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

/* export default async function LocaleLayout(props: LocaleLayoutProps) {
  const locale = props.params.locale;
  const direction = dir(locale);

  return (
    <div lang={locale} dir={direction}>
      {props.children}
    </div>
  );
} */

/* type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}; */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function LocaleLayout(props: any) {
  const { children, params } = props;
  const locale = params.locale;
  const direction = dir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        {children}
      </body>
    </html>
  )
}

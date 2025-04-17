import { dir } from 'i18next';
import { languages } from '@/i18n/settings';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const locale = props.params.locale;
  const direction = dir(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        {props.children}
      </body>
    </html>
  );
}

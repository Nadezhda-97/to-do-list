//import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ToDo App',
  description: 'Multilingual ToDo App built with Next.js 13+',
};

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const locale = params.locale;
  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  );
}

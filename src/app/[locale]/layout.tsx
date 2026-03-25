import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { locales, type Locale } from '../../../i18n';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UniVerse Agency — Digital Innovation',
  description:
    'UniVerse is a full-service digital agency specializing in app design, web design, hosting, and visual identity.',
  keywords: ['digital agency', 'web design', 'app design', 'branding', 'hosting'],
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'UniVerse Agency',
    description: 'We build digital universes.',
    type: 'website',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  setRequestLocale(locale as Locale);

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`dark ${inter.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-[#0a0a0f] text-white antialiased">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Navbar locale={locale} />
            <main className="min-h-screen">{children}</main>
            <Footer locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

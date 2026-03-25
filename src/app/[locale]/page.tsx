import { setRequestLocale } from 'next-intl/server';
import { type Locale } from '../../../i18n';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';

interface PageProps {
  params: { locale: string };
}

export default function LocalePage({ params: { locale } }: PageProps) {
  setRequestLocale(locale as Locale);

  return (
    <>
      <HeroSection locale={locale} />
      <ServicesSection locale={locale} />
      <AboutSection locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}

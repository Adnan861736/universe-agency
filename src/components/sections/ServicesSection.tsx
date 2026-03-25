'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Smartphone, Monitor, Server, Palette, CreditCard, TrendingUp } from 'lucide-react';
import { ServiceCard } from '@/components/ui/ServiceCard';

interface ServicesSectionProps {
  locale: string;
}

const servicesMeta = [
  {
    id: 'app-design',
    icon: <Smartphone size={20} />,
    accentGradient: 'from-violet-500 to-purple-600',
    images: [
      '/images/services/app-design-1.jpg',
      '/images/services/app-design-2.jpg',
      '/images/services/app-design-3.jpg',
      '/images/services/app-design-4.jpg',
      '/images/services/app-design-5.jpg',
    ],
  },
  {
    id: 'web-design',
    icon: <Monitor size={20} />,
    accentGradient: 'from-blue-500 to-cyan-500',
    images: [
      '/images/services/web-design-1.jpg',
      '/images/services/web-design-2.jpg',
      '/images/services/web-design-3.jpg',
      '/images/services/web-design-4.jpg',
      '/images/services/web-design-5.jpg',
    ],
  },
  {
    id: 'hosting',
    icon: <Server size={20} />,
    accentGradient: 'from-emerald-500 to-teal-600',
    images: [
      '/images/services/hosting-1.jpg',
      '/images/services/hosting-2.jpg',
      '/images/services/hosting-3.jpg',
      '/images/services/hosting-4.jpg',
      '/images/services/hosting-5.jpg',
    ],
  },
  {
    id: 'branding',
    icon: <Palette size={20} />,
    accentGradient: 'from-orange-500 to-pink-600',
    images: [
      '/images/services/branding-1.jpg',
      '/images/services/branding-2.jpg',
      '/images/services/branding-3.jpg',
      '/images/services/branding-4.jpg',
      '/images/services/branding-5.jpg',
    ],
  },
  {
    id: 'subscriptions',
    icon: <CreditCard size={20} />,
    accentGradient: 'from-yellow-500 to-orange-500',
    images: [
      '/images/services/subscriptions-1.jpg',
      '/images/services/subscriptions-2.jpg',
      '/images/services/subscriptions-3.jpg',
      '/images/services/subscriptions-4.jpg',
      '/images/services/subscriptions-5.jpg',
    ],
  },
  {
    id: 'marketing',
    icon: <TrendingUp size={20} />,
    accentGradient: 'from-rose-500 to-red-600',
    images: [
      '/images/services/marketing-1.jpg',
      '/images/services/marketing-2.jpg',
      '/images/services/marketing-3.jpg',
      '/images/services/marketing-4.jpg',
      '/images/services/marketing-5.jpg',
    ],
  },
];

export function ServicesSection({ locale }: ServicesSectionProps) {
  const t = useTranslations('services');
  const isRTL = locale === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const items = servicesMeta.map((_, i) => ({
    title:       t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

  return (
    <section id="services" className="py-16 md:py-24 bg-[#0d0d1a]">

      {/* ── Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`mb-10 md:mb-14 ${isRTL ? 'text-right' : 'text-center'}`}
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
            {t('title')}
          </h2>
          <p className={`text-base sm:text-lg text-gray-400 ${isRTL ? '' : 'max-w-2xl mx-auto'}`}>
            {t('subtitle')}
          </p>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE + TABLET (< 1024px) — horizontal scroll
      ══════════════════════════════════════════════ */}
      <div
        className="lg:hidden"
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'visible',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* inner track: plain div owns the flex so no motion interference */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignItems: 'stretch',
            gap: '1rem',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            paddingBottom: '1.25rem',
          }}
        >
          {servicesMeta.map((meta, i) => (
            <div
              key={meta.id}
              style={{
                width: 'min(82vw, 300px)',
                minWidth: 'min(82vw, 300px)',
                flexShrink: 0,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ height: '100%' }}
              >
                <ServiceCard
                  title={items[i].title}
                  description={items[i].description}
                  images={meta.images}
                  icon={meta.icon}
                  accentGradient={meta.accentGradient}
                />
              </motion.div>
            </div>
          ))}
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-1.5 pb-1 px-4">
          {servicesMeta.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full ${i === 0 ? 'w-5 bg-violet-500' : 'w-2 bg-gray-700'}`}
            />
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP (≥ 1024px) — 3-column grid (2 rows)
      ══════════════════════════════════════════════ */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-6">
          {servicesMeta.map((meta, i) => (
            <motion.div
              key={meta.id}
              className="flex"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ServiceCard
                title={items[i].title}
                description={items[i].description}
                images={meta.images}
                icon={meta.icon}
                accentGradient={meta.accentGradient}
              />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

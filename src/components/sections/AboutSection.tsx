'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';

interface AboutSectionProps {
  locale: string;
}

export function AboutSection({ locale }: AboutSectionProps) {
  const t = useTranslations('about');
  const isRTL = locale === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const stats: Array<{ value: string; label: string }> = [
    { value: t('stats.0.value'), label: t('stats.0.label') },
    { value: t('stats.1.value'), label: t('stats.1.label') },
    { value: t('stats.2.value'), label: t('stats.2.label') },
    { value: t('stats.3.value'), label: t('stats.3.label') },
  ];

  const highlights = locale === 'ar'
    ? ['تصميم يُلهم الثقة', 'تطوير يُرسي الأمان', 'استراتيجية تدفع النمو']
    : ['Design that inspires trust', 'Development that drives results', 'Strategy that fuels growth'];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };
  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="about" className="py-16 md:py-24 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`space-y-6 ${isRTL ? 'text-right lg:order-2' : 'text-left lg:order-1'}`}
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium">
                {t('badge')}
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                {t('title')}{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
                  {t('titleHighlight')}
                </span>
              </h2>
            </motion.div>

            <motion.p variants={itemVariants} className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {t('description1')}
            </motion.p>
            <motion.p variants={itemVariants} className="text-sm sm:text-base text-gray-400 leading-relaxed">
              {t('description2')}
            </motion.p>

            <motion.ul variants={containerVariants} className="space-y-3 pt-2">
              {highlights.map((item, i) => (
                <motion.li key={i} variants={itemVariants} className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-violet-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={statVariants}
                  className={`p-4 rounded-2xl bg-gray-800/60 border border-gray-700/50 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <span className="block text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400 mt-1 block">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Cosmic globe visual */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex items-center justify-center ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-violet-600/20 to-blue-600/20 blur-3xl" />
            </div>

            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-96 md:h-96">
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-violet-500/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-6 rounded-full border border-dashed border-blue-400/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-400" />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-violet-400" />
              </motion.div>

              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-violet-600 via-purple-700 to-blue-800 shadow-2xl shadow-violet-500/30 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-white/10 to-transparent" />
                <div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white/90 relative z-10 select-none">U</span>
              </div>

              <motion.div
                className="absolute -top-4 -right-4 px-3 py-2 rounded-xl bg-gray-800 shadow-lg border border-gray-700"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-xs font-bold text-violet-400">{locale === 'ar' ? '✦ ابتكار' : '✦ Innovation'}</span>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-xl bg-gray-800 shadow-lg border border-gray-700"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <span className="text-xs font-bold text-blue-400">{locale === 'ar' ? '✦ تصميم' : '✦ Design'}</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { WhatsAppIcon, FacebookIcon, TelegramIcon, BehanceIcon } from '@/components/ui/SocialIcons';

interface ContactSectionProps {
  locale: string;
}

export function ContactSection({ locale }: ContactSectionProps) {
  const t = useTranslations('contact');
  const isRTL = locale === 'ar';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: WhatsAppIcon,  href: 'https://wa.me/963956664834',                  label: locale === 'ar' ? 'واتساب'   : 'WhatsApp',   hover: 'hover:text-green-400  hover:border-green-500/50  hover:bg-green-500/10',  gradient: 'from-green-500  to-emerald-600' },
    { icon: TelegramIcon,  href: 'https://t.me/+963956664834',                  label: locale === 'ar' ? 'تيليغرام' : 'Telegram',   hover: 'hover:text-sky-400    hover:border-sky-500/50    hover:bg-sky-500/10',    gradient: 'from-sky-400    to-blue-500'   },
    { icon: FacebookIcon,  href: 'https://www.facebook.com/universetech2024',   label: locale === 'ar' ? 'فيسبوك'   : 'Facebook',   hover: 'hover:text-blue-400   hover:border-blue-500/50   hover:bg-blue-500/10',   gradient: 'from-blue-600   to-blue-800'   },
    { icon: BehanceIcon,   href: 'https://adnan861736.github.io/portfolio/',    label: locale === 'ar' ? 'بورتفوليو': 'Portfolio',  hover: 'hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/10', gradient: 'from-violet-500 to-purple-600'  },
  ];

  const infoItems = [
    { emoji: '📧', label: locale === 'ar' ? 'البريد الإلكتروني' : 'Email Us',      value: 'universetech2024@gmail.com' },
    { emoji: '📍', label: locale === 'ar' ? 'الموقع'           : 'Location',       value: locale === 'ar' ? 'إدلب، سرمدا' : 'Idlib, Sarmada' },
    { emoji: '🕐', label: locale === 'ar' ? 'ساعات العمل'      : 'Business Hours', value: locale === 'ar' ? 'الأحد–الخميس، 9ص–6م' : 'Sun–Thu, 9AM–6PM' },
  ];

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  const inputClass = `w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-800/80 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-sm ${isRTL ? 'text-right' : ''}`;

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-blue-500/3 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className={`text-center mb-12 md:mb-16 ${isRTL ? 'text-right' : ''}`}
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            {t('title')}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-500">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Form */}
          <motion.div variants={itemVariants} className={isRTL ? 'lg:order-2' : 'lg:order-1'}>
            <div className="bg-gray-900/80 rounded-3xl p-6 sm:p-8 border border-gray-800">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-900/30 flex items-center justify-center">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {locale === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Sent!'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {locale === 'ar' ? 'شكراً! سنرد عليك في أقرب وقت.' : "Thanks! We'll get back to you soon."}
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold hover:from-violet-500 hover:to-blue-500 transition-all"
                  >
                    {locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another'}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium text-gray-300 mb-1.5 ${isRTL ? 'text-right' : ''}`}>
                      {t('form.name')}
                    </label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                      placeholder={t('form.namePlaceholder')} dir={isRTL ? 'rtl' : 'ltr'} className={inputClass} />
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium text-gray-300 mb-1.5 ${isRTL ? 'text-right' : ''}`}>
                      {t('form.email')}
                    </label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      placeholder={t('form.emailPlaceholder')} dir="ltr" className={inputClass} />
                  </div>
                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={`block text-sm font-medium text-gray-300 mb-1.5 ${isRTL ? 'text-right' : ''}`}>
                      {t('form.message')}
                    </label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange}
                      placeholder={t('form.messagePlaceholder')} dir={isRTL ? 'rtl' : 'ltr'} className={`${inputClass} resize-none`} />
                  </div>
                  {/* Submit */}
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-sm hover:from-violet-500 hover:to-blue-500 transition-all shadow-lg shadow-violet-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? <><Loader2 size={16} className="animate-spin" />{locale === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}</>
                      : <><Send size={16} />{t('form.submit')}</>
                    }
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info & Social */}
          <motion.div variants={itemVariants} className={`space-y-6 sm:space-y-8 ${isRTL ? 'text-right lg:order-1' : 'lg:order-2'}`}>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">
                {locale === 'ar' ? 'ابقَ على تواصل' : 'Stay Connected'}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {locale === 'ar'
                  ? 'نحن هنا لمساعدتك في بناء مشروعك الرقمي. تواصل معنا عبر أي من القنوات التالية.'
                  : "We're here to help build your digital presence. Reach out through any channel below."}
              </p>
              {infoItems.map((item, i) => (
                // dir="rtl" on html reverses flex automatically — no flex-row-reverse needed
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-900/60 border border-gray-800">
                  <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</span>
                    <span className="block text-sm font-semibold text-gray-200 mt-0.5">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {locale === 'ar' ? 'تابعنا على' : 'Follow Us On'}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((s) => (
                  <a key={s.label} href={s.href}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl border border-gray-700 text-gray-400 ${s.hover} transition-all duration-200`}
                  >
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-sm flex-shrink-0`}>
                      <s.icon size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

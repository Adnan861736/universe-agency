'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { WhatsAppIcon, FacebookIcon, TelegramIcon, BehanceIcon } from '@/components/ui/SocialIcons';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const isRTL = locale === 'ar';

  const navLinks = [
    { key: 'home',     href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'about',    href: '#about' },
    { key: 'contact',  href: '#contact' },
  ] as const;

  const socialLinks = [
    { icon: WhatsAppIcon,  href: 'https://wa.me/963956664834',                label: 'WhatsApp',  color: 'hover:text-green-400  hover:border-green-500/50'  },
    { icon: TelegramIcon,  href: 'https://t.me/+963956664834',                label: 'Telegram',  color: 'hover:text-sky-400    hover:border-sky-500/50'    },
    { icon: FacebookIcon,  href: 'https://www.facebook.com/universetech2024', label: 'Facebook',  color: 'hover:text-blue-400   hover:border-blue-500/50'   },
    { icon: BehanceIcon,   href: 'https://adnan861736.github.io/portfolio/',  label: 'Portfolio', color: 'hover:text-violet-400 hover:border-violet-500/50' },
  ];

  const handleNavClick = (href: string) => {
    const el = document.getElementById(href.replace('#', ''));
    if (!el) return;
    const navH = window.innerWidth >= 768 ? 80 : 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/*
          dir="rtl" on <html> already makes grid columns flow R→L in Arabic.
          We only need text-right for text alignment.
        */}
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 ${isRTL ? 'text-right' : 'text-left'}`}>

          {/* Brand — full width on mobile, 1 col on md+ */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href={`/${locale}/`} className="inline-block">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-400">
                {nav('logo')}
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <div className={`w-16 h-3 rounded-full bg-gradient-to-r from-violet-500/40 to-blue-500/40 blur-sm ${isRTL ? '' : ''}`} />
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-gray-400 hover:text-violet-400 transition-colors duration-200"
                  >
                    {nav(link.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
              {locale === 'ar' ? 'تابعنا' : 'Follow Us'}
            </h3>
            {/* dir="rtl" on html already orders icons R→L — no flex-row-reverse needed */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className={`p-2 rounded-xl border border-gray-700 text-gray-400 ${s.color} hover:bg-white/5 transition-all duration-200`}
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-4 pt-1">
              <a href="#" className="text-xs text-gray-500 hover:text-violet-400 transition-colors">
                {t('links.privacy')}
              </a>
              <span className="text-gray-700">·</span>
              <a href="#" className="text-xs text-gray-500 hover:text-violet-400 transition-colors">
                {t('links.terms')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-10 pt-6 border-t border-gray-800">
          {/* dir="rtl" reverses justify-between automatically — no flex-row-reverse needed */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">{t('copyright')}</p>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span className="text-xs text-gray-500">
                {locale === 'ar' ? 'صُنع بـ ♥ للكون الرقمي' : 'Made with ♥ for the digital universe'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

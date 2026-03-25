'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X } from 'lucide-react';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const isRTL = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'home',     href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'about',    href: '#about' },
    { key: 'contact',  href: '#contact' },
  ] as const;

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Delay so mobile menu collapses before we calculate scroll position
    setTimeout(() => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const navH = window.innerWidth >= 768 ? 80 : 64;
      const top = el.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 150);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/90 backdrop-blur-lg border-b border-white/5 shadow-xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href={`/${locale}/`} className="flex-shrink-0 select-none">
            <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-blue-400">
              {t('logo')}
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 group"
              >
                {t(link.key)}
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rtl:origin-right" />
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher */}
            <Link
              href={`/${otherLocale}/`}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border border-violet-500/40 text-violet-400 hover:bg-violet-500/10 hover:border-violet-400 transition-all duration-200"
            >
              <Globe size={13} />
              <span>{t('langSwitch')}</span>
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all duration-200"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-gray-900/98 backdrop-blur-lg border-t border-white/5"
          >
            <div className={`px-4 py-3 flex flex-col gap-1 ${isRTL ? 'items-end' : 'items-start'}`}>
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {t(link.key)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

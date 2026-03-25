'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

interface ServiceCardProps {
  title: string;
  description: string;
  images: string[];
  icon: React.ReactNode;
  accentGradient: string;
}

export function ServiceCard({ title, description, images, icon, accentGradient }: ServiceCardProps) {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [isHovered, setIsHovered]   = useState(false);
  const [direction, setDirection]   = useState(1); // 1 = forward, -1 = backward
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Auto-cycle on hover ── */
  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {
        setDirection(1);
        setActiveIdx((prev) => (prev + 1) % images.length);
      }, 900);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const t = setTimeout(() => { setActiveIdx(0); setDirection(1); }, 350);
      return () => clearTimeout(t);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, images.length]);

  const variants = {
    enter:  (dir: number) => ({ x: dir * 40, opacity: 0, scale: 1.04 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (dir: number) => ({ x: dir * -40, opacity: 0, scale: 0.97 }),
  };

  return (
    <motion.article
      className="relative flex flex-col rounded-3xl overflow-hidden bg-gray-800/50 border border-gray-700/40 cursor-pointer group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, boxShadow: '0 40px 80px -20px rgba(139,92,246,0.30)' }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* ══════════ IMAGE AREA ══════════ */}
      <div className="relative h-56 sm:h-52 lg:h-48 xl:h-56 overflow-hidden flex-shrink-0">

        {/* Preload all images silently */}
        {images.map((src, i) => (
          <img key={i} src={`${BASE}${src}`} alt="" aria-hidden="true" style={{ display: 'none' }} />
        ))}

        {/* Gradient fallback background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${accentGradient} opacity-70`} />

        {/* Cycling image */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={`${BASE}${images[activeIdx]}`}
              alt={`${title} ${activeIdx + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom fade to card body */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900/90 to-transparent pointer-events-none z-10" />

        {/* Image counter — appears on hover */}
        <motion.div
          className="absolute top-3 end-3 z-20 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-sm text-white/90 text-xs font-semibold tabular-nums"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {activeIdx + 1} / {images.length}
        </motion.div>

        {/* Progress bars */}
        <div className="absolute bottom-3 inset-x-4 z-20 flex gap-1">
          {images.map((_, i) => (
            <motion.div
              key={i}
              className="h-[3px] rounded-full bg-white flex-1"
              animate={{ opacity: i === activeIdx ? 1 : 0.25 }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>
      </div>

      {/* ══════════ INFO AREA ══════════ */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br ${accentGradient} shadow-lg flex-shrink-0 self-start`}>
          <span className="text-white">{icon}</span>
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <h3 className="text-base font-bold text-white leading-snug">{title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
        </div>

        {/* "Hover" hint dots — disappears when hovered */}
        <motion.div
          className="flex items-center gap-1.5 self-start"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {images.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-600" />
          ))}
        </motion.div>
      </div>

      {/* Accent line at bottom */}
      <div
        className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r ${accentGradient} origin-start scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
      />

      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 group-hover:ring-violet-500/20 transition-all duration-300 pointer-events-none" />
    </motion.article>
  );
}

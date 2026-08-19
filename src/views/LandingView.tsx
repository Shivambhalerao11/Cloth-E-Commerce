import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { upgradeImageUrl } from '../components/OptimizedImage';
import { useShop } from '../context/ShopContext';

export const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const { setCursorText } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#1d1c14] text-[#fff9ed] overflow-hidden">

      {/* ── Minimal top bar ── */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 md:px-16 py-5">
        <span className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-[#7e766f]">
          EST. 1994
        </span>
        <button
          onClick={() => navigate('/login')}
          className="font-headline text-lg sm:text-xl font-bold uppercase tracking-[0.08em] text-white hover:opacity-80 transition-opacity"
        >
          AMAR MEN'S WEAR
        </button>
        <button
          onClick={() => navigate('/shop')}
          className="font-mono-custom text-[11px] uppercase tracking-widest text-[#a53c1b] hover:underline"
        >
          Shop →
        </button>
      </nav>

      {/* ── Fullscreen hero ── */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 text-center overflow-hidden">

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff9ed 1px, transparent 1px), linear-gradient(90deg, #fff9ed 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Hero image */}
        <div className="absolute inset-0">
          <img
            src={upgradeImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCmjdEued8eHgVbD2ORhDaf2-6vtVslOqR5Rj7PVTemNrYOwoMqrQQjvGQ9MHoKV8R4LzzOnNvUUzDxUDhhEPX2-tCvV22Mj2V07O_9Q4t3gPKO9ddq9oC05164bHKy_pxjH11Xdtt24TCS1xLQMg7Ys76PWbZ0bUJIcQY5rGTHFG0vHCM4J5hfUknABYiAGOOhkCjbJbwTTfE5gvcpub56f0FaGKFw9Gi2ExbPXsy-1yoSFlJt0Ayn', 'full')}
            alt="AMAR MEN'S WEAR Editorial"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1c14] via-[#1d1c14]/55 to-[#1d1c14]/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-4xl mx-auto py-20">

          {/* Eyebrow tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <span className="font-mono-custom text-[11px] uppercase tracking-[0.35em] text-[#a53c1b] border border-[#a53c1b]/50 px-4 py-1.5 inline-block">
              EST. 1994 · GANDHI CHOWK · VARANGAON
            </span>
          </motion.div>

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-1 text-center"
          >
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-[0.08em] text-white leading-tight">
              AMAR MEN'S
            </h1>
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold italic tracking-[0.04em] text-[#fe7e57] leading-tight">
              Wear.
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.42 }}
            className="font-body-custom text-base sm:text-lg text-[#cfc5bd] max-w-lg leading-relaxed"
          >
            Utilitarian streetwear &amp; heritage tailoring.
            Crafted in Varangaon from heavyweight Indian cottons since 1994.
          </motion.p>

          {/* ── CTA Buttons — use navigate() directly ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.58 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            {/* Enter Archive → /login */}
            <button
              onClick={() => navigate('/login')}
              onMouseEnter={() => setCursorText('ENTER')}
              onMouseLeave={() => setCursorText('')}
              className="bg-[#a53c1b] text-white font-body-custom text-sm uppercase tracking-widest px-10 py-5 font-bold hover:bg-[#fe7e57] hover:text-[#1d1c14] transition-all border-2 border-[#a53c1b] shadow-[4px_4px_0px_0px_rgba(254,126,87,0.35)] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">login</span>
              <span>Enter Archive</span>
            </button>

            {/* Browse Catalog → /shop */}
            <button
              onClick={() => navigate('/shop')}
              onMouseEnter={() => setCursorText('BROWSE')}
              onMouseLeave={() => setCursorText('')}
              className="bg-transparent text-[#fff9ed] font-body-custom text-sm uppercase tracking-widest px-10 py-5 font-bold hover:bg-white/10 transition-all border-2 border-white/30 hover:border-white/60 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">grid_view</span>
              <span>Browse Catalog</span>
            </button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 pt-2 font-mono-custom text-[11px] text-[#4c4640] uppercase tracking-widest"
          >
            <span>11 Garments</span>
            <span className="text-[#a53c1b]">·</span>
            <span>Free Pan-India Shipping</span>
            <span className="text-[#a53c1b]">·</span>
            <span>30 Years of Craft</span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-[#3a3830]">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-7 bg-gradient-to-b from-[#3a3830] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── 3-feature strip ── */}
      <section className="border-t border-white/[0.07] bg-[#100d0a]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 md:px-16 py-14 grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            { icon: 'straighten',     title: 'Bespoke Tailoring',       body: 'Every garment cut and finished at Gandhi Chowk Atelier, Varangaon.' },
            { icon: 'eco',            title: 'Organic Indian Cottons',   body: 'Heavyweight 100% organic cottons — built to outlast fast fashion.' },
            { icon: 'local_shipping', title: 'Free Pan-India Delivery',  body: 'Standard shipping across India free. Express 1–2 day option available.' },
          ].map(({ icon, title, body }) => (
            <div key={icon} className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-[#a53c1b] text-4xl">{icon}</span>
              <h3 className="font-headline text-base font-bold uppercase text-white tracking-tight">{title}</h3>
              <p className="font-body-custom text-sm text-[#7e766f] leading-relaxed max-w-[240px]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA bar ── */}
      <div className="bg-[#a53c1b] py-4 px-6 sm:px-16 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono-custom text-[11px] uppercase tracking-widest text-white">
          New Season Archive — Autumn / Winter 2026
        </p>
        <button
          onClick={() => navigate('/login')}
          className="font-mono-custom text-[11px] uppercase tracking-widest text-white/80 hover:text-white hover:underline flex items-center gap-1.5 transition-colors"
        >
          <span>Sign in to shop</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

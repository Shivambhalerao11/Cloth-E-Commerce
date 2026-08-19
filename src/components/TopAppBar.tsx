import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { TabType } from '../types';

// ── Scroll threshold at which compact mode activates ─────────────────────────
const SCROLL_THRESHOLD = 60;

export const TopAppBar: React.FC = () => {
  const { activeTab, setActiveTab, cartCount, setIsSearchOpen, setCursorText } = useShop();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ── Shrink-on-scroll state ────────────────────────────────────────────────
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };
    // Set initial state in case page loads already scrolled
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Read session from localStorage
  const sessionRaw = localStorage.getItem('amw_session');
  const session: { name: string; email: string } | null = sessionRaw ? JSON.parse(sessionRaw) : null;

  const handleLogout = () => {
    localStorage.removeItem('amw_session');
    navigate('/');
  };

  const navLinks: { id: TabType; label: string }[] = [
    { id: 'home',   label: 'Home'             },
    { id: 'shop',   label: 'Shop'             },
    { id: 'saved',  label: 'Saved'            },
    { id: 'about',  label: 'Story & Location' },
    { id: 'orders', label: 'My Orders'        },
    { id: 'admin',  label: 'Management'       },
  ];

  return (
    <>
      {/* ── Desktop Header ──────────────────────────────────────────────────── */}
      <header
        className={`
          hidden md:flex sticky top-0 justify-between items-center w-full z-50
          bg-[#fff9ed] border-b border-[#cfc5bd]
          transition-all duration-300 ease-in-out
          ${scrolled
            ? 'px-8 lg:px-16 py-2.5'   // compact: less vertical padding
            : 'px-8 lg:px-16 py-5'     // full: original padding
          }
        `}
      >
        {/* Nav links — reduce gap when compact */}
        <nav className={`flex items-center transition-all duration-300 ${scrolled ? 'gap-5' : 'gap-8'}`}>
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                onMouseEnter={() => setCursorText(link.label.toUpperCase())}
                onMouseLeave={() => setCursorText('')}
                className={`font-body-custom text-xs uppercase tracking-[0.12em] font-bold transition-all relative pb-1 ${
                  isActive ? 'text-[#a53c1b]' : 'text-[#4c4640] hover:text-[#1d1c14]'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#a53c1b]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Center Headline — shrink size and hide subtitle when compact */}
        <button
          onClick={() => setActiveTab('home')}
          onMouseEnter={() => setCursorText('AMW')}
          onMouseLeave={() => setCursorText('')}
          className="text-center group"
        >
          <h1
            className={`
              font-headline font-bold tracking-[0.08em] text-[#1d1c14] uppercase
              hover:opacity-85 transition-all duration-300
              ${scrolled ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl'}
            `}
          >
            AMAR MEN'S WEAR
          </h1>
          {/* Subtitle fades out smoothly when scrolled */}
          <span
            className={`
              font-mono-custom text-[9px] tracking-widest text-[#7e766f] uppercase block -mt-1
              transition-all duration-300 origin-top
              ${scrolled
                ? 'opacity-0 max-h-0 overflow-hidden -mt-0'
                : 'opacity-100 max-h-4'
              }
            `}
          >
            GANDHI CHOWK · VARANGAON
          </span>
        </button>

        {/* Right Actions */}
        <div className={`flex items-center transition-all duration-300 ${scrolled ? 'gap-4' : 'gap-6'}`}>
          <button
            onClick={() => setIsSearchOpen(true)}
            onMouseEnter={() => setCursorText('SEARCH')}
            onMouseLeave={() => setCursorText('')}
            className="text-[#1d1c14] hover:text-[#a53c1b] transition-colors flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="font-body-custom text-xs uppercase font-bold tracking-wider">Search</span>
            <kbd className="hidden lg:inline-block font-mono-custom text-[10px] bg-[#e8e2d6] px-1.5 py-0.5 border border-[#cfc5bd] text-[#4c4640]">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setActiveTab('cart')}
            onMouseEnter={() => setCursorText('BAG')}
            onMouseLeave={() => setCursorText('')}
            className="text-[#1d1c14] hover:text-[#a53c1b] transition-colors flex items-center gap-2 relative group"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            <span className="font-body-custom text-xs uppercase font-bold tracking-wider">
              Bag ({cartCount})
            </span>
            {cartCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#a53c1b] absolute -top-1 right-12 animate-pulse" />
            )}
          </button>

          {/* Login / User button */}
          {session ? (
            <div className="flex items-center gap-3">
              <span className="font-mono-custom text-[11px] text-[#4c4640] uppercase tracking-wide hidden lg:block">
                {session.name.split(' ')[0]}
              </span>
              <button
                onClick={handleLogout}
                onMouseEnter={() => setCursorText('LOGOUT')}
                onMouseLeave={() => setCursorText('')}
                className="font-body-custom text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 text-[#4c4640] hover:text-[#a53c1b] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              onMouseEnter={() => setCursorText('LOGIN')}
              onMouseLeave={() => setCursorText('')}
              className={`font-body-custom text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-colors ${
                activeTab === 'login' ? 'text-[#a53c1b]' : 'text-[#4c4640] hover:text-[#1d1c14]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span>Sign In</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Mobile Header ───────────────────────────────────────────────────── */}
      <header
        className={`
          md:hidden sticky top-0 flex justify-between items-center w-full z-50
          bg-[#fff9ed] border-b border-[#cfc5bd]
          transition-all duration-300 ease-in-out
          ${scrolled ? 'px-4 py-2' : 'px-4 py-3.5'}
        `}
      >
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-[#1d1c14] p-1.5 -ml-1.5 hover:opacity-80 active:scale-95 transition-transform"
          aria-label="Menu"
        >
          <span className={`material-symbols-outlined transition-all duration-300 ${scrolled ? 'text-[22px]' : 'text-[26px]'}`}>
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('home')}
          className="text-center"
        >
          <h1
            className={`
              font-headline font-bold tracking-[0.08em] text-[#1d1c14] uppercase
              transition-all duration-300
              ${scrolled ? 'text-base' : 'text-xl'}
            `}
          >
            AMAR MEN'S WEAR
          </h1>
        </button>

        <button
          onClick={() => setActiveTab('cart')}
          className="text-[#1d1c14] p-1.5 -mr-1.5 hover:opacity-80 active:scale-95 transition-transform relative"
          aria-label="Shopping Bag"
        >
          <span className={`material-symbols-outlined transition-all duration-300 ${scrolled ? 'text-[21px]' : 'text-[24px]'}`}>
            shopping_bag
          </span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#a53c1b] text-white font-mono-custom text-[9px] flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* ── Mobile Drawer Menu ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed top-[57px] inset-x-0 bottom-0 bg-[#fff9ed] z-40 p-6 flex flex-col justify-between border-b border-[#1d1c14] shadow-xl overflow-y-auto"
          >
            <div className="flex flex-col gap-6 pt-4">
              <span className="font-mono-custom text-xs uppercase tracking-widest text-[#7e766f]">
                // NAVIGATION ARCHIVE
              </span>
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      setActiveTab(link.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-headline text-2xl uppercase text-left tracking-tight flex items-center justify-between border-b border-[#e8e2d6] pb-3 ${
                      isActive ? 'text-[#a53c1b] font-bold' : 'text-[#1d1c14]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-2 flex items-center gap-3 bg-[#e8e2d6] border border-[#1d1c14] p-3 text-left font-mono-custom text-xs uppercase text-[#1d1c14]"
              >
                <span className="material-symbols-outlined text-sm">search</span>
                <span>Search archive or collection...</span>
              </button>

              {/* Sign In / Sign Out in mobile drawer */}
              {session ? (
                <button
                  onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                  className="font-headline text-2xl uppercase text-left tracking-tight flex items-center justify-between border-b border-[#e8e2d6] pb-3 text-[#1d1c14]"
                >
                  <span>Sign Out ({session.name.split(' ')[0]})</span>
                  <span className="material-symbols-outlined text-sm">logout</span>
                </button>
              ) : (
                <button
                  onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                  className={`font-headline text-2xl uppercase text-left tracking-tight flex items-center justify-between border-b border-[#e8e2d6] pb-3 ${
                    activeTab === 'login' ? 'text-[#a53c1b] font-bold' : 'text-[#1d1c14]'
                  }`}
                >
                  <span>Sign In</span>
                  <span className="material-symbols-outlined text-sm">person</span>
                </button>
              )}
            </div>

            <div className="pt-6 border-t border-[#cfc5bd] flex flex-col gap-2 font-mono-custom text-xs text-[#7e766f]">
              <p className="text-[#1d1c14] font-bold">FLAGSHIP STUDIO</p>
              <p>Gandhi Chowk, Varangaon, Maharashtra 425305</p>
              <p className="text-[10px] mt-2">EST. 1994 // UTILITY STREETWEAR</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

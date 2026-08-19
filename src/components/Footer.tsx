import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setActiveTab, showToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      showToast('Subscribed', 'You have been added to the Gandhi Chowk Archive dispatch.');
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#100d0a] text-[#fff9ed] border-t-2 border-[#1d1c14] pt-14 pb-24 md:pb-16 px-6 sm:px-10 md:px-16">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 pb-12 border-b border-white/20">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <h2 className="font-headline text-3xl sm:text-4xl font-bold uppercase tracking-[0.08em] text-white mb-2">
              AMAR MEN'S WEAR
            </h2>
            <p className="font-editorial italic text-lg text-[#fe7e57] mb-4">
              Utilitarian Streetwear & Heritage Tailoring.
            </p>
            <p className="font-body-custom text-xs text-[#cfc5bd] max-w-sm leading-relaxed">
              Crafted in Gandhi Chowk, Varangaon. Founded in 1994 on the principles of single-needle precision, heavyweight Indian organic cottons, and architectural silhouettes.
            </p>
          </div>

          <div className="mt-8 font-mono-custom text-xs text-[#7e766f]">
            <span>COORDINATES: 21.0167° N, 75.8333° E</span>
          </div>
        </div>

        {/* Links Column */}
        <div className="md:col-span-3 flex flex-col gap-3 font-mono-custom text-xs">
          <span className="text-[#fe7e57] uppercase tracking-widest font-bold mb-2">
            // ARCHIVE DIRECTORY
          </span>
          <button
            onClick={() => setActiveTab('home')}
            className="text-left text-[#cfc5bd] hover:text-white transition-colors"
          >
            Home / Latest Drop
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-left text-[#cfc5bd] hover:text-white transition-colors"
          >
            Full Garment Catalog
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className="text-left text-[#cfc5bd] hover:text-white transition-colors"
          >
            Gandhi Chowk Flagship
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-left text-[#cfc5bd] hover:text-white transition-colors"
          >
            Track Real-time Order
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className="text-left text-[#cfc5bd] hover:text-white transition-colors"
          >
            Studio Management
          </button>
        </div>

        {/* Newsletter Dispatch */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <span className="text-[#fe7e57] uppercase tracking-widest font-bold font-mono-custom text-xs block mb-2">
              // DISPATCH ARCHIVE
            </span>
            <p className="font-body-custom text-xs text-[#cfc5bd] mb-4">
              Receive limited release alerts and textile production logs before public drops.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#1e1b18] border border-white/30 p-3 text-xs font-mono-custom text-white placeholder-white/40 focus:outline-none focus:border-[#fe7e57]"
              />
              <button
                type="submit"
                className="bg-[#fe7e57] text-[#100d0a] font-body-custom text-xs uppercase tracking-widest font-bold py-3 hover:bg-white transition-colors"
              >
                Join Dispatch
              </button>
            </form>
          </div>

          <div className="mt-8 flex gap-4 text-xs font-mono-custom text-[#cfc5bd]">
            <a
              href="https://wa.me/919823044556"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#fe7e57]"
            >
              WhatsApp Studio
            </a>
            <span>·</span>
            <a href="tel:+919823044556" className="hover:text-[#fe7e57]">
              +91 98230 44556
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-8 flex flex-col sm:flex-row justify-between items-center font-mono-custom text-[11px] text-[#7e766f] gap-4">
        <span>© 1994 — 2026 AMAR MEN'S WEAR. ALL RIGHTS RESERVED.</span>
        <span>VARANGAON · MAHARASHTRA · INDIA</span>
      </div>
    </footer>
  );
};

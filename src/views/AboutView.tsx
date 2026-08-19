import React from 'react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';

export const AboutView: React.FC = () => {
  const { setActiveTab, setCursorText } = useShop();

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-14 pb-24">
      {/* Editorial Header */}
      <div className="border-b-2 border-[#1d1c14] pb-6 mb-10">
        <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b] block mb-2">
          // OUR HERITAGE & ORIGIN
        </span>
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1d1c14] leading-tight">
          From Gandhi Chowk <br />
          <span className="italic font-normal text-[#a53c1b]">to your wardrobe.</span>
        </h1>
      </div>

      {/* Main Story Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-16 items-start">
        {/* Editorial Photo */}
        <div className="lg:col-span-6 relative aspect-[4/5] bg-white border-2 border-[#1d1c14] shadow-[6px_6px_0px_0px_rgba(29,28,20,1)] overflow-hidden">
          <img
            src={upgradeImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuDdnvuQGwibA2mSsHHje9PtYUqYnyjfkIg3gbGG1mkz5rM1LcaTwhIRX4YZ06IPT28oxrgNvGPFYqvecLIg1Od1UXrymq9y-XpP1xBvGRg9a-1lRuzwxE3-wa_9FxopLKNs0xL-7p5H3DfC_i29d4flIKZ8srj9m3Cr2EMGEncK0l75T-qCCjCiBoARot7Q9xmV9nqbtd2bfK2omqGf47Glho3zZiYfWDaqSwIwWvOo0Iv_sDMZNfCN', 'hero')}
            alt="Master tailor cutting raw heavy cotton at Varangaon table"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-[#fff9ed] p-3 border border-[#1d1c14] font-mono-custom text-[11px] uppercase">
            <span>FIGURE 01: MASTER TAILORING // 1994 ARCHIVE</span>
          </div>
        </div>

        {/* Narrative Copy */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-[#1d1c14]">
          <h2 className="font-headline text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#1d1c14]">
            Three Decades of Structural Tailoring
          </h2>
          <div className="space-y-4 font-body-custom text-base text-[#4c4640] leading-relaxed">
            <p>
              Founded in 1994 at the bustling intersection of Gandhi Chowk in Varangaon, Maharashtra, <strong>Amar Men's Wear</strong> began as an artisanal custom tailoring house dedicated to precise drape, durable single-needle seams, and natural Indian textiles.
            </p>
            <p>
              Over the last thirty years, our studio has evolved from bespoke shirting to an editorial streetwear brand. We fuse the functional geometry of workwear chore jackets and heavyweight cottons with the unmistakable character of rural Maharashtra's textile belt.
            </p>
            <p>
              Every garment is designed, patterned, cut, and finished in-house with zero compromises on seam density and organic fabric weights.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#cfc5bd] font-mono-custom text-xs">
            <div className="p-4 bg-[#f3ede1] border border-[#1d1c14]">
              <span className="text-[#a53c1b] font-bold block text-lg mb-1">1994</span>
              <span className="text-[#4c4640]">Est. at Gandhi Chowk, Varangaon</span>
            </div>
            <div className="p-4 bg-[#f3ede1] border border-[#1d1c14]">
              <span className="text-[#a53c1b] font-bold block text-lg mb-1">100%</span>
              <span className="text-[#4c4640]">Heavyweight Indian Raw Cottons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Flagship Atelier Contact Card */}
      <div className="bg-[#fff9ed] border-2 border-[#1d1c14] shadow-[8px_8px_0px_0px_rgba(29,28,20,1)] p-6 sm:p-10 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b] block">
              // PHYSICAL FLAGSHIP ATELIER
            </span>
            <h3 className="font-headline text-3xl font-bold uppercase text-[#1d1c14]">
              Visit The Source
            </h3>
            <div className="font-mono-custom text-xs sm:text-sm text-[#4c4640] space-y-1.5">
              <p className="font-bold text-[#1d1c14]">AMAR MEN'S WEAR FLAGSHIP</p>
              <p>Gandhi Chowk, Station Road, Varangaon</p>
              <p>Jalgaon District, Maharashtra 425305, India</p>
              <p className="pt-2 text-[#7e766f]">COORDINATES: 21.0167° N, 75.8333° E</p>
              <p className="text-[#7e766f]">HOURS: Monday – Saturday · 10:00 AM – 9:00 PM IST</p>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-3">
            <a
              href="https://wa.me/919823044556?text=Hello%20Amar%20Mens%20Wear,%20I%20am%20interested%20in%20custom%20tailoring"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setCursorText('CHAT')}
              onMouseLeave={() => setCursorText('')}
              className="w-full bg-[#1d1c14] text-white py-4 px-6 font-body-custom text-xs uppercase tracking-widest font-bold hover:bg-[#a53c1b] transition-all flex items-center justify-center gap-2 text-center"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Chat On WhatsApp</span>
            </a>

            <a
              href="tel:+919823044556"
              className="w-full bg-[#fff9ed] text-[#1d1c14] py-4 px-6 border border-[#1d1c14] font-body-custom text-xs uppercase tracking-widest font-bold hover:bg-white transition-all flex items-center justify-center gap-2 text-center"
            >
              <span className="material-symbols-outlined text-base">call</span>
              <span>Call Master Tailor</span>
            </a>

            <button
              onClick={() => setActiveTab('shop')}
              className="font-mono-custom text-xs uppercase tracking-wider text-[#a53c1b] text-center pt-2 hover:underline"
            >
              Browse Catalog Online →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

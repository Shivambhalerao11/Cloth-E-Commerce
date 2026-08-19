import React from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { OptimizedImage, upgradeImageUrl } from '../components/OptimizedImage';
import { Product } from '../types';

export const HomeView: React.FC = () => {
  const { products, openProductDetail, setActiveTab, setCursorText, addToCart } = useShop();

  const newArrivals = products.slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-20 md:pb-24">
      {/* Editorial Hero Section */}
      <section className="relative w-full h-[620px] sm:h-[720px] md:h-[820px] bg-white overflow-hidden">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          src={upgradeImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuCmjdEued8eHgVbD2ORhDaf2-6vtVslOqR5Rj7PVTemNrYOwoMqrQQjvGQ9MHoKV8R4LzzOnNvUUzDxUDhhEPX2-tCvV22Mj2V07O_9Q4t3gPKO9ddq9oC05164bHKy_pxjH11Xdtt24TCS1xLQMg7Ys76PWbZ0bUJIcQY5rGTHFG0vHCM4J5hfUknABYiAGOOhkCjbJbwTTfE5gvcpub56f0FaGKFw9Gi2ExbPXsy-1yoSFlJt0Ayn', 'full')}
          alt="Amar Men's Wear Streetwear Editorial"
        />
        {/* Soft bottom gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1c14]/80 via-[#1d1c14]/30 to-transparent" />

        {/* Hero Copy Container */}
        <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col gap-6 max-w-4xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="font-mono-custom text-xs uppercase tracking-[0.25em] text-[#fe7e57] font-bold inline-block mb-3">
              AUTUMN / WINTER 2026 // VARANGAON
            </span>
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05] font-bold drop-shadow-md">
              Crafting the <br />
              <span className="italic font-normal text-[#fe7e57]">Gandhi Chowk</span>
              <span className="text-white"> Identity.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <button
              onClick={() => setActiveTab('shop')}
              onMouseEnter={() => setCursorText('SHOP')}
              onMouseLeave={() => setCursorText('')}
              className="bg-[#a53c1b] text-white font-body-custom text-xs uppercase px-8 py-4 tracking-widest border-2 border-[#a53c1b] hover:bg-[#fe7e57] hover:border-[#fe7e57] hover:text-[#1d1c14] transition-colors font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)]"
            >
              Explore Collection
            </button>
            <button
              onClick={() => setActiveTab('about')}
              onMouseEnter={() => setCursorText('STORY')}
              onMouseLeave={() => setCursorText('')}
              className="bg-white/10 backdrop-blur-sm text-white font-body-custom text-xs uppercase px-6 py-4 tracking-widest border-2 border-white/60 hover:bg-white hover:text-[#1d1c14] transition-colors font-bold"
            >
              Heritage Story
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <MarqueeTicker text="GANDHI CHOWK · VARANGAON · PREMIUM STREETWEAR · EST. 1994 · HANDCRAFTED COTTON" />

      {/* New Arrivals Rail */}
      <section className="py-12 md:py-20 px-4 sm:px-8 md:px-16 border-b border-[#cfc5bd]">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
              // LATEST DROPS
            </span>
            <h3 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#1d1c14] font-bold tracking-tight">
              New Arrivals
            </h3>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            onMouseEnter={() => setCursorText('VIEW ALL')}
            onMouseLeave={() => setCursorText('')}
            className="font-body-custom text-xs uppercase text-[#4c4640] hover:text-[#1d1c14] font-bold border-b border-[#1d1c14] pb-1 transition-colors tracking-wider"
          >
            View All ({products.length})
          </button>
        </div>

        {/* Horizontal Rail */}
        <div className="flex overflow-x-auto gap-4 md:gap-6 no-scrollbar snap-x snap-mandatory pb-4">
          {newArrivals.map((product) => (
            <div
              key={product.id}
              onClick={() => openProductDetail(product)}
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] snap-start flex flex-col gap-3 group cursor-pointer relative"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] bg-white overflow-hidden border border-transparent group-hover:border-[#1d1c14] transition-colors">
                <img
                  src={upgradeImageUrl(product.image, 'card')}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />

                {/* Badges */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#f6be2c] text-[#1d1c14] px-2.5 py-1 font-body-custom text-[11px] font-bold uppercase tracking-wider border border-[#1d1c14]">
                    {product.badge}
                  </div>
                )}

                {/* Quick Add overlay button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product, product.availableSizes[0] || 'M', product.colors[0]?.name || 'Standard');
                  }}
                  className="absolute bottom-3 right-3 bg-[#fff9ed] text-[#1d1c14] p-2 border border-[#1d1c14] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#a53c1b] hover:text-white"
                  title="Quick Add to Bag"
                >
                  <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
                </button>
              </div>

              {/* Meta */}
              <div className="flex justify-between items-start pt-2 border-t border-[#cfc5bd]">
                <div className="flex flex-col gap-0.5">
                  <span className="font-headline text-lg sm:text-xl font-semibold leading-tight text-[#1d1c14] group-hover:text-[#a53c1b] transition-colors">
                    {product.name}
                  </span>
                  <span className="font-mono-custom text-xs text-[#7e766f]">
                    {product.subtitle}
                  </span>
                </div>
                <span className="font-mono-custom text-sm sm:text-base font-bold text-[#a53c1b]">
                  ₹{product.price.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Asymmetric Category Grid ("The Essentials") */}
      <section className="py-12 md:py-24 px-4 sm:px-8 md:px-16 bg-[#fff9ed]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1d1c14] pb-6 mb-8 md:mb-12">
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
              // CORE WARDROBE
            </span>
            <h3 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#1d1c14] font-bold tracking-tight">
              The Essentials
            </h3>
          </div>
          <p className="font-body-custom text-sm sm:text-base text-[#4c4640] max-w-md md:text-right leading-relaxed">
            Foundation pieces tailored for the urban environment. Grounded in utilitarian design and premium heavy fabrics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Large Tile (Shirts) */}
          <div
            onClick={() => setActiveTab('shop')}
            onMouseEnter={() => setCursorText('SHIRTS')}
            onMouseLeave={() => setCursorText('')}
            className="md:col-span-8 relative aspect-square sm:aspect-[4/3] md:aspect-auto md:h-[580px] bg-white group overflow-hidden border border-[#cfc5bd] hover:border-[#1d1c14] transition-colors cursor-pointer"
          >
            <img
              src={upgradeImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuB11NkA-xGvDTGWtum_fzhdZIrDAM5H_C3QGtcH_S6CeAvWUTuLfVD9-GYjmx_ORrm5ZN4RIRZD_5wknKtfsaeTi1IzTYHqEuQ9MfL9-HmjWy4z90uZ0stZaWOMPjjXy2vSIicgHk2lzoEgZ6GnA1-bEQpOz1Gmk9UaVB5tf_9-lbEes8zq9nqj-rEIPsmaIcFG8Bbln0TVGZ-yYOQ_mLAlcwmTGRua3xcoQ1-CU-6v1fNRj8-Cc1O3', 'hero')}
              alt="Crisp Oversized Shirt Editorial"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-[#fff9ed] p-5 sm:p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
              <span className="font-headline text-2xl sm:text-3xl font-bold text-[#1d1c14] block leading-none mb-1">
                Shirts
              </span>
              <span className="font-body-custom text-xs text-[#4c4640] uppercase tracking-widest font-bold block">
                Explore Core Archive →
              </span>
            </div>
          </div>

          {/* Right Column Smaller Tiles */}
          <div className="md:col-span-4 flex flex-col gap-4 md:gap-6">
            {/* Denim Tile */}
            <div
              onClick={() => setActiveTab('shop')}
              onMouseEnter={() => setCursorText('DENIM')}
              onMouseLeave={() => setCursorText('')}
              className="relative aspect-square md:h-[calc(290px-12px)] bg-white group overflow-hidden border border-[#cfc5bd] hover:border-[#1d1c14] transition-colors cursor-pointer"
            >
              <img
                src={upgradeImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuBFGwQEokAImJvH8cmDvF7KUIQyCnjDMwPHzpJVZgtTVbtXd3gTbJZWj1acX0KKIdYFgmdNj6Bb5zAWZrXS96jiS_kRjXDX1EE2NOxW-cOuNRbXoVEBuaDBtduNJA8Dsex3W7s4orFnpXy9l4uNzkgviFNKliXV2z60Tj8Df7cgiUvTEvMZEYTNyO6hO7mD4LR1ApW-vUv8_rIc-7gND4zVHyiZb9M9fILoNwGB1txQtg5OWq_kl6aA', 'hero')}
                alt="Stacked Raw Denim"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-5 left-5 bg-[#fff9ed] px-4 py-2 border border-[#1d1c14] shadow-[2px_2px_0px_0px_rgba(29,28,20,1)]">
                <span className="font-headline text-xl font-bold text-[#1d1c14] block leading-none">
                  Denim
                </span>
              </div>
            </div>

            {/* Streetwear Editions Dark Contrast Tile */}
            <div
              onClick={() => setActiveTab('shop')}
              onMouseEnter={() => setCursorText('SPECIAL')}
              onMouseLeave={() => setCursorText('')}
              className="relative aspect-square md:h-[calc(290px-12px)] bg-[#100d0a] text-white group overflow-hidden border border-[#1d1c14] p-6 text-center flex flex-col items-center justify-center cursor-pointer shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] hover:bg-[#1e1b18] transition-colors"
            >
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none" />
              <span className="material-symbols-outlined text-4xl text-[#fe7e57] mb-2">
                local_fire_department
              </span>
              <span className="font-headline text-2xl sm:text-3xl font-bold text-white block leading-tight mb-2">
                Streetwear
                <br />
                Editions
              </span>
              <span className="font-body-custom text-xs text-[#e8e2d6] uppercase tracking-widest border-b border-[#e8e2d6] pb-1 font-bold group-hover:text-[#fe7e57] group-hover:border-[#fe7e57] transition-colors">
                Shop Now →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lookbook Campaign Banner ("Winter in Varangaon") */}
      <section className="relative w-full h-[460px] sm:h-[540px] md:h-[680px] bg-white border-y border-[#cfc5bd] overflow-hidden flex items-center justify-center">
        <img
          src={upgradeImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuDdnvuQGwibA2mSsHHje9PtYUqYnyjfkIg3gbGG1mkz5rM1LcaTwhIRX4YZ06IPT28oxrgNvGPFYqvecLIg1Od1UXrymq9y-XpP1xBvGRg9a-1lRuzwxE3-wa_9FxopLKNs0xL-7p5H3DfC_i29d4flIKZ8srj9m3Cr2EMGEncK0l75T-qCCjCiBoARot7Q9xmV9nqbtd2bfK2omqGf47Glho3zZiYfWDaqSwIwWvOo0Iv_sDMZNfCN', 'full')}
          alt="Varangaon winter street morning lookbook"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1d1c14]/45" />

        <div className="relative z-10 flex flex-col items-center text-center gap-5 p-6 sm:p-10 md:p-14 border border-white/40 backdrop-blur-sm max-w-2xl mx-4 bg-[#1d1c14]/30 text-white">
          <span className="font-mono-custom text-xs uppercase tracking-[0.25em] text-[#fff9ed]">
            LOOKBOOK CAMPAIGN
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-tight">
            Winter in
            <br />
            Varangaon
          </h2>
          <p className="font-body-custom text-sm text-[#e8e2d6] max-w-md">
            Misty morning architectures, raw concrete, heavy layered overshirts, and heritage cottons.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            onMouseEnter={() => setCursorText('EXPLORE')}
            onMouseLeave={() => setCursorText('')}
            className="mt-2 bg-[#fff9ed] text-[#1d1c14] font-body-custom text-xs uppercase px-8 py-4 tracking-widest font-bold hover:bg-[#a53c1b] hover:text-white hover:border-[#a53c1b] transition-all border border-[#fff9ed] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]"
          >
            View Campaign Archive
          </button>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { upgradeImageUrl } from '../components/OptimizedImage';

export const ShopView: React.FC = () => {
  const { products, openProductDetail, addToCart, toggleWishlist, isWishlisted, setCursorText } = useShop();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high'>('featured');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const categories = ['All', 'Shirts', 'Jackets', 'Denim', 'Knitwear', 'T-Shirts', 'Accessories'];
  const sizes = ['All', 'S', 'M', 'L', 'XL', 'XXL'];

  // Filtering
  const filteredProducts = products
    .filter((p) => {
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSize = selectedSize === 'All' || p.availableSizes.includes(selectedSize as any);
      const matchPrice = p.price <= maxPrice;
      const matchStock = !onlyInStock || p.stock > 0;
      return matchCat && matchSize && matchPrice && matchStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0; // default featured order
    });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="w-full pb-20 md:pb-24">
      {/* Marquee Banner */}
      <MarqueeTicker
        text="SUMMER COLLECTION DROPPING SOON · LIMITED STOCK · RAW COTTON & DENIM · GANDHI CHOWK"
        className="bg-[#f3ede1] text-[#1d1c14] border-b border-[#cfc5bd]"
      />

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 pt-8">
        {/* Header & Description */}
        <div className="mb-8 border-b border-[#1d1c14] pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
              // ALL RELEASES
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#1d1c14]">
              Archive Catalog
            </h2>
          </div>
          <p className="font-mono-custom text-xs text-[#7e766f]">
            SHOWING {displayedProducts.length} OF {filteredProducts.length} ARTICLES
          </p>
        </div>

        {/* Sticky Filter Bar */}
        <div className="sticky top-[57px] md:top-[80px] z-30 bg-[#fff9ed]/95 backdrop-blur-sm py-4 border-b border-[#cfc5bd] flex flex-wrap gap-3 items-center justify-between mb-8">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-[#fff9ed] border border-[#1d1c14] rounded-none px-4 py-2 pr-8 font-mono-custom text-xs uppercase text-[#1d1c14] focus:ring-1 focus:ring-[#1d1c14] focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-sm text-[#1d1c14]">
                expand_more
              </span>
            </div>

            {/* Size Select */}
            <div className="relative hidden sm:block">
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="appearance-none bg-[#fff9ed] border border-[#cfc5bd] rounded-none px-4 py-2 pr-8 font-mono-custom text-xs uppercase text-[#1d1c14] focus:ring-1 focus:ring-[#1d1c14] focus:outline-none cursor-pointer hover:border-[#1d1c14]"
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Sizes' : `Size ${s}`}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-sm text-[#1d1c14]">
                expand_more
              </span>
            </div>

            {/* Sort Select */}
            <div className="relative hidden md:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#fff9ed] border border-[#cfc5bd] rounded-none px-4 py-2 pr-8 font-mono-custom text-xs uppercase text-[#1d1c14] focus:ring-1 focus:ring-[#1d1c14] focus:outline-none cursor-pointer hover:border-[#1d1c14]"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-sm text-[#1d1c14]">
                expand_more
              </span>
            </div>
          </div>

          {/* Filter Drawer Toggle */}
          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            className="font-body-custom text-xs font-bold uppercase tracking-wider text-[#1d1c14] hover:text-[#a53c1b] flex items-center gap-2 border border-[#1d1c14] px-4 py-2 bg-[#f3ede1] shadow-[2px_2px_0px_0px_rgba(29,28,20,1)] hover:bg-[#fff9ed] transition-colors"
          >
            <span>Filter Archive</span>
            <span className="material-symbols-outlined text-sm">tune</span>
          </button>
        </div>

        {/* Product Grid (Asymmetric layout per screenshot) */}
        {displayedProducts.length === 0 ? (
          <div className="py-20 text-center border border-[#cfc5bd] bg-[#f9f3e7] p-8">
            <span className="material-symbols-outlined text-4xl text-[#7e766f] mb-3">
              filter_alt_off
            </span>
            <h3 className="font-headline text-2xl font-bold uppercase text-[#1d1c14]">
              No Matching Archive Items
            </h3>
            <p className="font-mono-custom text-xs text-[#7e766f] mt-1 mb-6">
              Try adjusting your category or size filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSize('All');
                setMaxPrice(5000);
                setOnlyInStock(false);
              }}
              className="bg-[#1d1c14] text-white px-6 py-3 font-body-custom text-xs uppercase tracking-widest font-bold hover:bg-[#a53c1b]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
            {displayedProducts.map((product, index) => {
              // First item or items with isHero get large banner style (8 cols on desktop)
              const isLargeHero = index === 0 && product.isHero;
              const wishlisted = isWishlisted(product.id);

              return (
                <article
                  key={product.id}
                  onClick={() => openProductDetail(product)}
                  onMouseEnter={() => setCursorText('INSPECT')}
                  onMouseLeave={() => setCursorText('')}
                  className={`group relative flex flex-col border border-[#cfc5bd] hover:border-[#1d1c14] bg-[#fff9ed] transition-all cursor-pointer ${
                    isLargeHero ? 'col-span-2 md:col-span-8' : 'col-span-1 md:col-span-4'
                  }`}
                >
                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-3 left-3 z-10 font-body-custom text-[10px] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 border border-[#1d1c14] shadow-xs ${
                        product.badge === 'NEW'
                          ? 'bg-[#f6be2c] text-[#1d1c14]'
                          : product.badge === 'LIMITED'
                          ? 'bg-[#100d0a] text-white'
                          : 'bg-[#cdc5c0] text-[#1d1c14]'
                      }`}
                    >
                      {product.badge === 'NEW' ? 'NEW ARRIVAL' : product.badge}
                    </div>
                  )}

                  {/* Wishlist button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 z-10 p-1.5 bg-[#fff9ed]/90 border border-[#1d1c14] transition-colors ${
                      wishlisted ? 'text-[#a53c1b]' : 'text-[#1d1c14] hover:text-[#a53c1b]'
                    }`}
                    title={wishlisted ? 'Remove from Saved' : 'Save to Wishlist'}
                  >
                    <span className={`material-symbols-outlined text-lg ${wishlisted ? 'fill-1' : ''}`}>
                      favorite
                    </span>
                  </button>

                  {/* Product Image */}
                  <div
                    className={`w-full overflow-hidden bg-white relative ${
                      isLargeHero
                        ? 'aspect-[4/5] md:aspect-[16/10]'
                        : 'aspect-[3/4]'
                    }`}
                  >
                    <img
                      src={upgradeImageUrl(product.image, 'card')}
                      alt={product.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500" style={{imageRendering:"auto",willChange:"transform"}}
                    />
                  </div>

                  {/* Product Details Bar */}
                  <div className="p-3 sm:p-4 bg-[#fff9ed] flex flex-col justify-between flex-grow border-t border-[#cfc5bd]">
                    <div>
                      <h2 className="font-headline text-lg sm:text-2xl font-semibold text-[#1d1c14] leading-tight group-hover:text-[#a53c1b] transition-colors">
                        {product.name}
                      </h2>
                      <p className="font-body-custom text-xs text-[#4c4640] mt-1 line-clamp-1">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#e8e2d6]">
                      <span className="font-mono-custom text-sm sm:text-base font-bold text-[#a53c1b]">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, product.availableSizes[0] || 'M', product.colors[0]?.name || 'Standard');
                        }}
                        className="bg-[#1d1c14] text-white font-body-custom text-[11px] px-3 py-1.5 uppercase font-bold tracking-wider hover:bg-[#a53c1b] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Load More Pagination */}
        {hasMore && (
          <div className="mt-14 sm:mt-20 flex justify-center border-t border-[#cfc5bd] pt-8">
            <button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              onMouseEnter={() => setCursorText('EXPAND')}
              onMouseLeave={() => setCursorText('')}
              className="border-2 border-[#1d1c14] bg-[#fff9ed] text-[#1d1c14] font-body-custom text-xs uppercase tracking-[0.2em] font-bold px-10 py-4 hover:bg-[#1d1c14] hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] disabled:opacity-50 flex items-center gap-3"
            >
              {isLoadingMore ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent animate-spin rounded-full" />
                  <span>RETRIEVING ARCHIVE...</span>
                </>
              ) : (
                <span>LOAD MORE ARCHIVE</span>
              )}
            </button>
          </div>
        )}
      </main>

      {/* Slide-in Filter Drawer */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <div className="fixed inset-0 z-[99999] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-[#1d1c14]/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-w-md bg-[#fff9ed] h-full shadow-2xl z-10 flex flex-col justify-between border-l-2 border-[#1d1c14] p-6 sm:p-8 overflow-y-auto"
            >
              <div>
                <div className="flex justify-between items-center border-b border-[#1d1c14] pb-4 mb-6">
                  <h3 className="font-headline text-2xl font-bold uppercase tracking-tight text-[#1d1c14]">
                    Filter Archive
                  </h3>
                  <button
                    onClick={() => setIsFilterDrawerOpen(false)}
                    className="p-1 hover:text-[#a53c1b]"
                  >
                    <span className="material-symbols-outlined text-2xl">close</span>
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b] block mb-3">
                    // CATEGORY
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`font-mono-custom text-xs uppercase px-3 py-1.5 border transition-colors ${
                          selectedCategory === cat
                            ? 'bg-[#1d1c14] text-white border-[#1d1c14]'
                            : 'bg-[#fff9ed] text-[#4c4640] border-[#cfc5bd] hover:border-[#1d1c14]'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b] block mb-3">
                    // SIZING
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 font-mono-custom text-xs uppercase flex items-center justify-center border transition-colors ${
                          selectedSize === s
                            ? 'bg-[#1d1c14] text-white border-[#1d1c14]'
                            : 'bg-[#fff9ed] text-[#4c4640] border-[#cfc5bd] hover:border-[#1d1c14]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
                      // MAX PRICE
                    </span>
                    <span className="font-mono-custom text-xs font-bold text-[#1d1c14]">
                      ₹{maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="999"
                    max="6000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#a53c1b] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono-custom text-[#7e766f] mt-1">
                    <span>₹999</span>
                    <span>₹6,000</span>
                  </div>
                </div>

                {/* In stock toggle */}
                <div className="flex items-center justify-between p-3 bg-[#f3ede1] border border-[#cfc5bd]">
                  <span className="font-body-custom text-xs uppercase font-bold text-[#1d1c14]">
                    Only In Stock Items
                  </span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 rounded-none accent-[#a53c1b]"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-[#cfc5bd] flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSize('All');
                    setMaxPrice(5000);
                    setOnlyInStock(false);
                  }}
                  className="flex-1 py-3 border border-[#1d1c14] font-body-custom text-xs uppercase font-bold tracking-wider hover:bg-white"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 py-3 bg-[#1d1c14] text-white font-body-custom text-xs uppercase font-bold tracking-wider hover:bg-[#a53c1b]"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

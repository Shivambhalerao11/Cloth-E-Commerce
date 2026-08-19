import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, openProductDetail } = useShop();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.sku.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = ['All', 'Shirts', 'Jackets', 'Denim', 'Knitwear', 'T-Shirts', 'Accessories'];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-[#1d1c14]/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#fff9ed] border-2 border-[#1d1c14] shadow-[8px_8px_0px_0px_rgba(29,28,20,1)] overflow-hidden z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 p-4 sm:p-5 border-b border-[#1d1c14] bg-[#f3ede1]">
              <span className="material-symbols-outlined text-[#1d1c14] text-2xl">search</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search archive, garments, fabrics, SKUs..."
                className="w-full bg-transparent border-0 font-body-custom text-lg sm:text-xl text-[#1d1c14] placeholder-[#7e766f] focus:ring-0 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs font-mono-custom text-[#7e766f] hover:text-[#1d1c14] uppercase px-2 py-1 bg-white border border-[#cfc5bd]"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-[#1d1c14] hover:text-[#a53c1b]"
                aria-label="Close"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Quick Category Chips */}
            <div className="flex gap-2 overflow-x-auto p-3 bg-[#f9f3e7] border-b border-[#cfc5bd] no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono-custom text-xs uppercase px-3 py-1 border transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#1d1c14] text-white border-[#1d1c14]'
                      : 'bg-[#fff9ed] text-[#4c4640] border-[#cfc5bd] hover:border-[#1d1c14]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#e8e2d6]">
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-[#7e766f]">
                  <p className="font-mono-custom text-sm uppercase">NO ARCHIVE RESULTS FOR "{query}"</p>
                  <p className="font-body-custom text-xs text-[#4c4640] mt-1">
                    Try searching for 'cotton', 'shirt', 'jacket', 'denim', or 'olive'
                  </p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      openProductDetail(product);
                      setIsSearchOpen(false);
                    }}
                    className="w-full py-3 px-2 flex items-center justify-between gap-4 text-left hover:bg-[#f3ede1] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-16 bg-white border border-[#cfc5bd] overflow-hidden flex-shrink-0">
                        <img
                          src={upgradeImageUrl(product.image, 'thumb')}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform"
                        />
                      </div>
                      <div>
                        <div className="font-headline text-lg text-[#1d1c14] font-bold leading-tight group-hover:text-[#a53c1b] transition-colors">
                          {product.name}
                        </div>
                        <div className="font-mono-custom text-xs text-[#7e766f] mt-0.5">
                          {product.category} · {product.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-mono-custom text-sm font-bold text-[#a53c1b]">
                        ₹{product.price.toLocaleString()}
                      </div>
                      <span className="font-body-custom text-[10px] uppercase tracking-wider text-[#4c4640] group-hover:underline">
                        View Product →
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 bg-white border-t border-[#1d1c14] flex justify-between items-center font-mono-custom text-[11px] text-[#4c4640]">
              <span>[ESC] TO CLOSE</span>
              <span>AMW EDITORIAL CATALOG</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

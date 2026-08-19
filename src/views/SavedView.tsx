import React, { useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';

export const SavedView: React.FC = React.memo(() => {
  const { wishlist, products, openProductDetail, toggleWishlist, addToCart, setActiveTab, setCursorText } = useShop();

  const savedProducts = useMemo(() => {
    return products.filter((p) => wishlist.includes(p.id));
  }, [products, wishlist]);

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-14 pb-24">
      <div className="border-b-2 border-[#1d1c14] pb-4 mb-8 flex justify-between items-end">
        <div>
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
            // CURATED PICKS
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#1d1c14]">
            Saved Garments ({savedProducts.length})
          </h1>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-[#cfc5bd] bg-[#f9f3e7] p-8">
          <span className="material-symbols-outlined text-5xl text-[#7e766f] mb-3">
            favorite_border
          </span>
          <h2 className="font-headline text-2xl font-bold uppercase text-[#1d1c14] mb-2">
            No Saved Articles
          </h2>
          <p className="font-body-custom text-sm text-[#4c4640] mb-6">
            Tap the heart icon on any garment across the catalog to save it to your personal shortlist.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="bg-[#1d1c14] text-white px-8 py-3.5 font-body-custom text-xs uppercase tracking-widest font-bold hover:bg-[#a53c1b]"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
          {savedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => openProductDetail(product)}
              onMouseEnter={() => setCursorText('VIEW')}
              onMouseLeave={() => setCursorText('')}
              className="col-span-1 md:col-span-4 bg-[#fff9ed] border border-[#cfc5bd] hover:border-[#1d1c14] flex flex-col justify-between group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-white overflow-hidden">
                <img
                  src={upgradeImageUrl(product.image, 'card')}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                  style={{ willChange: 'transform' }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 p-1.5 bg-[#fff9ed] border border-[#1d1c14] text-[#a53c1b]"
                >
                  <span className="material-symbols-outlined text-lg fill-1">favorite</span>
                </button>
              </div>

              <div className="p-4 border-t border-[#cfc5bd] flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-[#1d1c14]">
                    {product.name}
                  </h3>
                  <p className="font-mono-custom text-xs text-[#7e766f]">{product.subtitle}</p>
                </div>

                <div className="flex justify-between items-center mt-4 pt-3 border-t border-[#e8e2d6]">
                  <span className="font-mono-custom text-base font-bold text-[#a53c1b]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, product.availableSizes[0] || 'M', product.colors[0]?.name || 'Standard');
                    }}
                    className="bg-[#1d1c14] text-white px-3 py-1.5 font-body-custom text-xs uppercase font-bold hover:bg-[#a53c1b]"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
});

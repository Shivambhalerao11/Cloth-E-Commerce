import React from 'react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';

export const CartView: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, cartTotal, setActiveTab, setCursorText } = useShop();

  const formattedSubtotal = cartTotal.toLocaleString();

  return (
    <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-14 pb-24">
      {/* Page Title */}
      <div className="border-b-2 border-[#1d1c14] pb-4 mb-6 md:mb-10 flex justify-between items-end">
        <h1 className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter text-[#1d1c14]">
          Your Bag
        </h1>
        <span className="font-mono-custom text-xs uppercase text-[#7e766f]">
          {cart.length} {cart.length === 1 ? 'Garment' : 'Garments'}
        </span>
      </div>

      {cart.length === 0 ? (
        /* Empty Cart State */
        <div className="py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-[#cfc5bd] bg-[#f9f3e7] p-8">
          <span className="material-symbols-outlined text-[54px] text-[#7e766f] mb-4">
            shopping_bag
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl uppercase font-bold text-[#1d1c14] mb-2">
            Your bag is light.
          </h2>
          <p className="font-body-custom text-sm text-[#4c4640] mb-8 max-w-sm">
            Explore our latest streetwear drop crafted from raw cottons and heritage denim.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            onMouseEnter={() => setCursorText('CATALOG')}
            onMouseLeave={() => setCursorText('')}
            className="bg-[#1d1c14] text-white font-body-custom text-xs uppercase tracking-widest py-4 px-8 border border-[#1d1c14] hover:bg-[#a53c1b] transition-colors font-bold shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]"
          >
            Return to Shop
          </button>
        </div>
      ) : (
        /* Dual Column Cart Grid */
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Cart Items List */}
          <div className="col-span-1 md:col-span-7 lg:col-span-8 flex flex-col">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-5 sm:gap-6 border-b border-[#1d1c14] py-6 group relative"
              >
                {/* Thumbnail */}
                <div className="w-full sm:w-[150px] md:w-[180px] aspect-[3/4] bg-white border border-[#cfc5bd] flex-shrink-0 relative overflow-hidden">
                  <img
                    src={upgradeImageUrl(item.product.image, 'thumb')}
                    alt={item.product.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500" style={{imageRendering:"auto",willChange:"transform"}}
                  />
                </div>

                {/* Info & Quantity */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h2 className="font-headline text-xl sm:text-2xl leading-tight font-bold uppercase text-[#1d1c14] pr-4">
                        {item.product.name}
                      </h2>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#7e766f] hover:text-[#ba1a1a] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </div>
                    <p className="font-mono-custom text-xs text-[#4c4640] mt-1.5 uppercase tracking-wider">
                      COLOR: {item.color} // SIZE: {item.size}
                    </p>
                    <p className="font-mono-custom text-[11px] text-[#7e766f] mt-0.5">
                      SKU: {item.product.sku}
                    </p>
                  </div>

                  <div className="flex justify-between items-end mt-6 pt-4 border-t border-[#e8e2d6]">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#1d1c14] h-[38px] bg-[#fff9ed]">
                      <button
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="w-9 h-full flex items-center justify-center hover:bg-white transition-colors text-[#1d1c14]"
                        aria-label="Decrease quantity"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="w-10 h-full flex items-center justify-center font-mono-custom text-xs font-bold border-x border-[#1d1c14] text-[#1d1c14]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="w-9 h-full flex items-center justify-center hover:bg-white transition-colors text-[#1d1c14]"
                        aria-label="Increase quantity"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>

                    {/* Price */}
                    <span className="font-mono-custom text-base sm:text-lg font-bold text-[#a53c1b]">
                      ₹{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary & Checkout Action */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4">
            <div className="bg-[#fff9ed] p-6 sm:p-8 border-2 border-[#1d1c14] shadow-[6px_6px_0px_0px_rgba(29,28,20,1)] sticky top-[90px]">
              <h3 className="font-headline text-2xl font-bold uppercase mb-6 border-b border-[#1d1c14] pb-4 text-[#1d1c14]">
                Order Summary
              </h3>

              <div className="flex flex-col gap-3.5 font-mono-custom text-xs sm:text-sm">
                <div className="flex justify-between items-center text-[#4c4640]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1d1c14]">₹{formattedSubtotal}</span>
                </div>
                <div className="flex justify-between items-center text-[#4c4640]">
                  <span>Shipping</span>
                  <span className="text-right text-xs">Calculated at next step</span>
                </div>
                <div className="flex justify-between items-center text-[#4c4640]">
                  <span>Taxes</span>
                  <span className="text-right text-xs">Included in price</span>
                </div>

                <div className="flex justify-between items-center border-t-2 border-[#1d1c14] pt-4 pb-2 mt-2">
                  <span className="font-bold uppercase text-sm">TOTAL</span>
                  <span className="font-bold text-[#a53c1b] text-xl">₹{formattedSubtotal}</span>
                </div>
              </div>

              <p className="font-body-custom text-xs text-[#7e766f] my-5 text-center">
                Taxes and shipping calculated at checkout.
              </p>

              {/* Checkout CTA */}
              <button
                onClick={() => setActiveTab('checkout')}
                onMouseEnter={() => setCursorText('CHECKOUT')}
                onMouseLeave={() => setCursorText('')}
                className="w-full bg-[#a53c1b] text-white font-body-custom text-xs sm:text-sm uppercase tracking-widest py-5 font-bold hover:bg-[#1d1c14] active:scale-[0.98] transition-all border border-[#a53c1b] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              {/* Security & Badges */}
              <div className="mt-6 pt-4 border-t border-[#cfc5bd] flex justify-center gap-6 text-[#7e766f]">
                <div className="flex items-center gap-1 text-[11px] font-mono-custom" title="Secure Encrypted Payment">
                  <span className="material-symbols-outlined text-base">lock</span>
                  <span>SSL</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono-custom" title="Handcrafted Quality Guarantee">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span>100% Cotton</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono-custom" title="Domestic Shipping">
                  <span className="material-symbols-outlined text-base">local_shipping</span>
                  <span>Pan-India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

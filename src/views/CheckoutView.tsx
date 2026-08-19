import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';

export const CheckoutView: React.FC = () => {
  const { cart, cartTotal, createOrder, setActiveTab, setCursorText } = useShop();

  const [formData, setFormData] = useState({
    firstName: 'Devendra',
    lastName: 'Patil',
    email: 'devendra.patil@example.com',
    phone: '+91 98230 44556',
    address: 'Flat 402, Gandhi Nagar, Near Station Road',
    city: 'Varangaon',
    state: 'Maharashtra',
    pincode: '425305',
    paymentMethod: 'UPI' as 'UPI' | 'Card' | 'COD' | 'Netbanking',
    deliveryType: 'standard' as 'standard' | 'express'
  });

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);

  const shippingFee = formData.deliveryType === 'express' ? 150 : 0;
  const discount = promoApplied ? Math.round(cartTotal * 0.1) : 0;
  const finalTotal = cartTotal + shippingFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'GANDHICHOWK' || promoCode.trim().toUpperCase() === 'AMW10') {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacing(true);

    setTimeout(() => {
      createOrder({
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerPhone: formData.phone,
        address: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          street: formData.address,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pincode,
          phone: formData.phone
        },
        items: cart.map((item) => ({
          product: item.product,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.product.price
        })),
        subtotal: cartTotal,
        shipping: shippingFee,
        tax: 0,
        total: finalTotal,
        paymentMethod: formData.paymentMethod,
        trackingNumber: `TRK-AMW-${Math.floor(100000 + Math.random() * 900000)}`
      });
      setIsPlacing(false);
      setActiveTab('orders');
    }, 900);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="font-headline text-3xl font-bold uppercase text-[#1d1c14] mb-3">
          No Items to Checkout
        </h2>
        <p className="font-body-custom text-sm text-[#7e766f] mb-6">
          Your bag is empty. Please select garments from the catalog first.
        </p>
        <button
          onClick={() => setActiveTab('shop')}
          className="bg-[#1d1c14] text-white px-8 py-3.5 font-body-custom text-xs uppercase tracking-widest font-bold hover:bg-[#a53c1b]"
        >
          Explore Shop
        </button>
      </div>
    );
  }

  return (
    <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 py-8 md:py-12 pb-24">
      {/* Header */}
      <div className="border-b-2 border-[#1d1c14] pb-4 mb-8 flex justify-between items-end">
        <div>
          <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
            // FINAL ARCHIVE STEP
          </span>
          <h1 className="font-headline text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#1d1c14]">
            Checkout & Shipping
          </h1>
        </div>
        <button
          onClick={() => setActiveTab('cart')}
          className="font-mono-custom text-xs uppercase tracking-wider text-[#7e766f] hover:text-[#1d1c14] underline"
        >
          ← Return to Bag
        </button>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Form: Address & Payment Info */}
        <div className="col-span-1 md:col-span-7 space-y-8">
          {/* Section 1: Customer Info */}
          <div className="bg-[#fff9ed] p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
            <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-[#1d1c14] border-b border-[#1d1c14] pb-3 mb-4">
              1. Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono-custom text-xs">
              <div>
                <label className="block text-[#7e766f] uppercase mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Phone Number (India) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-[#fff9ed] p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
            <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-[#1d1c14] border-b border-[#1d1c14] pb-3 mb-4">
              2. Delivery Address
            </h3>
            <div className="space-y-4 font-mono-custom text-xs">
              <div>
                <label className="block text-[#7e766f] uppercase mb-1">Street Address / Landmark *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#7e766f] uppercase mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#7e766f] uppercase mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#7e766f] uppercase mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#f3ede1] border border-[#1d1c14] p-3 text-[#1d1c14] focus:ring-0 focus:outline-none"
                  />
                </div>
              </div>

              {/* Delivery Speed Options */}
              <div className="pt-3">
                <label className="block text-[#7e766f] uppercase mb-2">Shipping Speed</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    className={`flex items-center justify-between p-3.5 border cursor-pointer ${
                      formData.deliveryType === 'standard'
                        ? 'border-[#1d1c14] bg-[#f3ede1] font-bold'
                        : 'border-[#cfc5bd] bg-[#fff9ed]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryType === 'standard'}
                        onChange={() => setFormData({ ...formData, deliveryType: 'standard' })}
                        className="accent-[#a53c1b]"
                      />
                      <span>Standard Pan-India (3-5 days)</span>
                    </div>
                    <span className="text-[#a53c1b]">FREE</span>
                  </label>

                  <label
                    className={`flex items-center justify-between p-3.5 border cursor-pointer ${
                      formData.deliveryType === 'express'
                        ? 'border-[#1d1c14] bg-[#f3ede1] font-bold'
                        : 'border-[#cfc5bd] bg-[#fff9ed]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="delivery"
                        checked={formData.deliveryType === 'express'}
                        onChange={() => setFormData({ ...formData, deliveryType: 'express' })}
                        className="accent-[#a53c1b]"
                      />
                      <span>Express Courier (1-2 days)</span>
                    </div>
                    <span>₹150</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-[#fff9ed] p-6 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)]">
            <h3 className="font-headline text-xl font-bold uppercase tracking-tight text-[#1d1c14] border-b border-[#1d1c14] pb-3 mb-4">
              3. Payment Selection
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono-custom text-xs">
              {(['UPI', 'Card', 'COD', 'Netbanking'] as const).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setFormData({ ...formData, paymentMethod: method })}
                  className={`p-3.5 border text-center uppercase font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                    formData.paymentMethod === method
                      ? 'bg-[#1d1c14] text-white border-[#1d1c14] shadow-[2px_2px_0px_0px_rgba(165,60,27,1)]'
                      : 'bg-[#f9f3e7] text-[#4c4640] border-[#cfc5bd] hover:border-[#1d1c14]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">
                    {method === 'UPI'
                      ? 'qr_code_2'
                      : method === 'Card'
                      ? 'credit_card'
                      : method === 'COD'
                      ? 'payments'
                      : 'account_balance'}
                  </span>
                  <span>{method === 'COD' ? 'Cash On Del.' : method}</span>
                </button>
              ))}
            </div>

            {formData.paymentMethod === 'UPI' && (
              <div className="mt-4 p-4 bg-[#f3ede1] border border-[#cfc5bd] flex items-center justify-between">
                <div>
                  <p className="font-mono-custom text-xs font-bold text-[#1d1c14]">
                    INSTANT UPI / QR SCAN
                  </p>
                  <p className="font-body-custom text-xs text-[#7e766f]">
                    Google Pay, PhonePe, Paytm, or BHIM
                  </p>
                </div>
                <span className="material-symbols-outlined text-3xl text-[#a53c1b]">
                  qr_code_scanner
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Form: Order Review & Total */}
        <div className="col-span-1 md:col-span-5">
          <div className="bg-[#fff9ed] p-6 sm:p-8 border-2 border-[#1d1c14] shadow-[6px_6px_0px_0px_rgba(29,28,20,1)] sticky top-[90px]">
            <h3 className="font-headline text-2xl font-bold uppercase mb-4 border-b border-[#1d1c14] pb-3 text-[#1d1c14]">
              Items In Package ({cart.length})
            </h3>

            {/* Mini Items Scroll */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#e8e2d6] mb-6">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs font-mono-custom">
                  <div className="flex items-center gap-2">
                    <img
                      src={upgradeImageUrl(item.product.image, 'thumb')}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover border border-[#cfc5bd]"
                    />
                    <div>
                      <p className="font-bold text-[#1d1c14] truncate max-w-[140px]">
                        {item.product.name}
                      </p>
                      <p className="text-[#7e766f]">
                        {item.size} · {item.color} · Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#a53c1b]">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <div className="mb-6">
              <label className="block font-mono-custom text-xs uppercase text-[#7e766f] mb-1.5">
                Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. GANDHICHOWK"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#f3ede1] border border-[#1d1c14] px-3 py-2 text-xs font-mono-custom uppercase"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="bg-[#1d1c14] text-white px-4 py-2 font-mono-custom text-xs uppercase font-bold hover:bg-[#a53c1b]"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <span className="font-mono-custom text-[11px] text-green-700 block mt-1">
                  ✓ 10% Gandhi Chowk discount applied!
                </span>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-2.5 font-mono-custom text-xs border-t border-[#cfc5bd] pt-4 mb-6">
              <div className="flex justify-between text-[#4c4640]">
                <span>Items Subtotal</span>
                <span className="font-bold text-[#1d1c14]">₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4c4640]">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[#4c4640]">
                <span>Taxes</span>
                <span>Included (GST)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1d1c14] border-t-2 border-[#1d1c14] pt-3">
                <span className="uppercase">Total Amount</span>
                <span className="text-[#a53c1b] text-xl">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPlacing}
              onMouseEnter={() => setCursorText('CONFIRM')}
              onMouseLeave={() => setCursorText('')}
              className="w-full bg-[#a53c1b] text-white font-body-custom text-xs sm:text-sm uppercase tracking-widest py-5 font-bold hover:bg-[#1d1c14] transition-all border border-[#a53c1b] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isPlacing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                  <span>TRANSMITTING ORDER...</span>
                </>
              ) : (
                <>
                  <span>CONFIRM & PLACE ORDER</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

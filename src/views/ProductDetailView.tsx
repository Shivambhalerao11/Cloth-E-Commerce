import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';
import { upgradeImageUrl } from '../components/OptimizedImage';

export const ProductDetailView: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsSizeGuideOpen,
    setActiveTab,
    setCursorText,
    setCursorVariant
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'XXL'>('M');
  const [selectedColor, setSelectedColor] = useState<string>(
    selectedProduct.colors[0]?.name || 'Bone'
  );
  const [isAdding, setIsAdding] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);

  // Virtual Try-On State
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);
  const [customUserPhoto, setCustomUserPhoto] = useState<string | null>(null);
  const [isProcessingTryOn, setIsProcessingTryOn] = useState<boolean>(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const images = selectedProduct.detailImages || [
    selectedProduct.image,
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAZBeXz3M2JaOtBZzgwSSkNJPxUYMKE6FXcOXRVNnBbt6zvw-RXtghEWGYlRJCgqaUIpYUeR1CDueIiggNXZwFH86QZ6kp9EvYw406u-6MQWAfnIHays564P8R7GJ1YVKY3NqcsTP8vc6dvUNXD_1yZqEQx-nNTbd39TV04Ki3PPspA7jzbWnkG50pu4H2vcs00XsXBOV6LngJ9XvflJu2-yeGyE9ic57qkZ7yjg9QsESDCvmbJBIm8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBaUVRdFfHmKvDtTeo8sIq6J23eydfhCeWRC5kYwusYuLj7A7qt67iDW6D3iKls5i7er6hIWdev0N5-9fNw8tBPGt_gSiGoebkddaYtxSu1OYGncbdEcp8w5Uftd2riOFdVARlyr68vt2xxG45YNqxicVplAAccdtuGDfcbnALODv-BPMhjQ99E5jKMaEnrXsvDSKe9e1pFMotKmYtBw3jw13zCMflKZF1dGDEam0yq0yALskTo4GMO'
  ];

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(selectedProduct, selectedSize, selectedColor, 1);
      setIsAdding(false);
    }, 450);
  };

  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSlider) {
      handleSliderMove(e.clientX);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessingTryOn(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTimeout(() => {
          setCustomUserPhoto(event.target?.result as string);
          setIsProcessingTryOn(false);
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

  const wishlisted = isWishlisted(selectedProduct.id);

  return (
    <div className="w-full pb-20 md:pb-24">
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-[57px] z-30 flex justify-between items-center px-4 py-3 bg-[#fff9ed] border-b border-[#cfc5bd]">
        <button
          onClick={() => setActiveTab('shop')}
          className="p-1 -ml-1 text-[#1d1c14] hover:opacity-80 flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
          <span className="font-mono-custom text-xs uppercase font-bold">Catalog</span>
        </button>
        <span className="font-headline text-base font-bold truncate max-w-[200px] text-[#1d1c14]">
          {selectedProduct.name}
        </span>
        <button
          onClick={() => toggleWishlist(selectedProduct.id)}
          className={`p-1 -mr-1 ${wishlisted ? 'text-[#a53c1b]' : 'text-[#1d1c14]'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${wishlisted ? 'fill-1' : ''}`}>
            favorite
          </span>
        </button>
      </div>

      <main className="max-w-[1440px] mx-auto pt-4 md:pt-10 px-4 sm:px-8 md:px-16">
        {/* Desktop Breadcrumb */}
        <div className="hidden md:flex items-center gap-2 font-mono-custom text-xs uppercase text-[#7e766f] mb-8">
          <button onClick={() => setActiveTab('home')} className="hover:text-[#1d1c14]">
            Home
          </button>
          <span>/</span>
          <button onClick={() => setActiveTab('shop')} className="hover:text-[#1d1c14]">
            Shop
          </button>
          <span>/</span>
          <span className="text-[#a53c1b] font-bold">{selectedProduct.name}</span>
        </div>

        {/* Top Product Grid (Image Gallery & Controls) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12">
          {/* Gallery Column (Desktop 7 cols, Mobile full) */}
          <div className="col-span-1 md:col-span-7 flex flex-col gap-4">
            {/* Primary Main Image Frame */}
            <div className="w-full aspect-[3/4] md:aspect-auto md:h-[680px] relative bg-white border border-[#cfc5bd] overflow-hidden group">
              <motion.img
                key={images[mainImageIndex]}
                initial={{ opacity: 0.7, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={upgradeImageUrl(images[mainImageIndex], 'hero')}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.badge && (
                <div className="absolute top-4 left-4 bg-[#f6be2c] text-[#1d1c14] px-3 py-1 font-body-custom text-xs uppercase font-bold border border-[#1d1c14]">
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-3">
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImageIndex(idx)}
                  className={`aspect-[3/4] bg-white overflow-hidden border-2 transition-all ${
                    mainImageIndex === idx ? 'border-[#1d1c14]' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={upgradeImageUrl(imgUrl, 'card')}
                    alt={`${selectedProduct.name} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details & Purchase Column (Desktop 5 cols) */}
          <div className="col-span-1 md:col-span-5 flex flex-col pt-2 md:pt-0">
            <div className="mb-6">
              <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b] block mb-1">
                // {selectedProduct.category} · {selectedProduct.sku}
              </span>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1d1c14] tracking-tight leading-tight mb-3">
                {selectedProduct.name}
              </h1>
              <div className="flex items-baseline gap-4 font-mono-custom">
                <span className="text-[#a53c1b] text-2xl sm:text-3xl font-bold">
                  ₹{selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-[#7e766f] line-through text-lg">
                    ₹{selectedProduct.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Selectors */}
            <div className="space-y-6 mb-8 border-y border-[#cfc5bd] py-6">
              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-body-custom text-xs uppercase font-bold tracking-widest text-[#1d1c14]">
                    Size Selection
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="font-mono-custom text-xs uppercase tracking-wider text-[#a53c1b] underline hover:text-[#1d1c14]"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {(['S', 'M', 'L', 'XL', 'XXL'] as const).map((s) => {
                    const isAvailable = selectedProduct.availableSizes.includes(s);
                    const isSelected = selectedSize === s;
                    return (
                      <button
                        key={s}
                        disabled={!isAvailable}
                        onClick={() => setSelectedSize(s)}
                        className={`w-12 h-12 border font-mono-custom text-xs uppercase font-bold flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#1d1c14] text-white border-[#1d1c14] shadow-[2px_2px_0px_0px_rgba(165,60,27,1)]'
                            : isAvailable
                            ? 'bg-[#fff9ed] text-[#1d1c14] border-[#1d1c14] hover:bg-white'
                            : 'bg-white text-[#7e766f] border-[#cfc5bd] opacity-40 cursor-not-allowed line-through'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Swatches */}
              <div>
                <span className="block font-body-custom text-xs uppercase font-bold tracking-widest text-[#1d1c14] mb-2.5">
                  Color: <span className="text-[#a53c1b] font-normal">{selectedColor}</span>
                </span>
                <div className="flex gap-3">
                  {selectedProduct.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-9 h-9 border-2 transition-all p-0.5 ${
                          isSelected ? 'border-[#1d1c14] scale-110' : 'border-[#cfc5bd] hover:border-[#7e766f]'
                        }`}
                        title={c.name}
                      >
                        <div className="w-full h-full" style={{ backgroundColor: c.hex }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                onMouseEnter={() => setCursorText('ADD')}
                onMouseLeave={() => setCursorText('')}
                className="flex-1 bg-[#a53c1b] text-white font-body-custom text-xs sm:text-sm uppercase tracking-widest py-5 font-bold hover:bg-[#1d1c14] transition-all border border-[#a53c1b] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {isAdding ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                    <span>ADDING TO BAG...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">shopping_bag</span>
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className={`p-5 border border-[#1d1c14] transition-colors ${
                  wishlisted ? 'bg-[#1d1c14] text-white' : 'bg-[#fff9ed] text-[#1d1c14] hover:bg-white'
                }`}
                title={wishlisted ? 'Saved' : 'Save for later'}
              >
                <span className={`material-symbols-outlined text-xl ${wishlisted ? 'fill-1' : ''}`}>
                  favorite
                </span>
              </button>
            </div>

            {/* Description & Specifications */}
            <div className="border-t border-[#cfc5bd] pt-6 mb-8 space-y-4">
              <p className="font-body-custom text-sm text-[#4c4640] leading-relaxed">
                {selectedProduct.description}
              </p>
              <ul className="list-disc list-inside font-body-custom text-sm text-[#4c4640] space-y-1.5 pt-2">
                {selectedProduct.specs.map((spec, i) => (
                  <li key={i}>{spec}</li>
                ))}
              </ul>
            </div>

            {/* Studio Guarantee */}
            <div className="bg-[#f3ede1] border border-[#1d1c14] p-4 text-xs font-mono-custom text-[#4c4640] flex items-center gap-3">
              <span className="material-symbols-outlined text-[#a53c1b] text-xl">verified</span>
              <div>
                <p className="font-bold text-[#1d1c14]">AUTHENTIC VARANGAON WORKSHOP</p>
                <p>Free standard shipping across India · 7-day complimentary exchanges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Virtual Try-On Block ("See it on your frame") */}
        <div className="mt-16 md:mt-24 border-y border-[#cfc5bd] py-14 sm:py-20 px-4 sm:px-8 bg-[#f9f3e7]">
          <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
            {/* Copy & Upload Actions */}
            <div className="flex-1 text-center lg:text-left">
              <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
                // INTERACTIVE TAILORING PREVIEW
              </span>
              <h3 className="font-headline text-3xl sm:text-4xl font-bold uppercase text-[#1d1c14] tracking-tight mt-1 mb-4">
                See it on your frame
              </h3>
              <p className="font-body-custom text-sm sm:text-base text-[#4c4640] mb-6 leading-relaxed">
                Drag the interactive comparison divider or upload your photo to simulate how this {selectedProduct.name} drapes on your proportions.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessingTryOn}
                  className="border-2 border-[#1d1c14] bg-[#1d1c14] text-white px-6 py-3.5 font-body-custom text-xs uppercase tracking-widest font-bold hover:bg-[#a53c1b] hover:border-[#a53c1b] transition-all shadow-[3px_3px_0px_0px_rgba(29,28,20,1)] flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                  <span>{isProcessingTryOn ? 'TAILORING SIMULATION...' : 'UPLOAD YOUR PHOTO'}</span>
                </button>

                {customUserPhoto && (
                  <button
                    onClick={() => setCustomUserPhoto(null)}
                    className="border border-[#1d1c14] bg-[#fff9ed] text-[#1d1c14] px-4 py-3.5 font-mono-custom text-xs uppercase hover:bg-white"
                  >
                    Reset Photo
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Before/After Split Comparison Slider */}
            <div className="flex-1 w-full max-w-lg">
              <div
                ref={sliderContainerRef}
                onMouseDown={() => {
                  setIsDraggingSlider(true);
                  setCursorVariant('drag');
                  setCursorText('DRAG');
                }}
                onMouseUp={() => {
                  setIsDraggingSlider(false);
                  setCursorVariant('default');
                  setCursorText('');
                }}
                onMouseLeave={() => {
                  setIsDraggingSlider(false);
                  setCursorVariant('default');
                  setCursorText('');
                }}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative aspect-[4/3] bg-white overflow-hidden border-2 border-[#1d1c14] shadow-[6px_6px_0px_0px_rgba(29,28,20,1)] select-none cursor-ew-resize"
              >
                {/* Left Side: Before / User Image */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={
                      customUserPhoto ||
                      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPvj9x7mlXhGjekEXqy2cOhFQi9-YzQqd0uo7MzFleuNBdRss69CLfGgBfxVBdWLwjfyTb09YAXfTSBIPjRUKpdcKwwZzvmWsw9zs-Mk9S5q4wtZNarhTnDGfyDnayrLcPQBBAZk0M6KXy4h6C3KcTbialh9EDvvUp7UOGgQJrB-KHRv_02pUzXx4Xl_98driALn9m3BXm9WUEW7Ap3clw07TF4of7NjyF64MErMS59iBuAwbWE2DE'
                    }
                    alt="Original Frame"
                    className="w-[512px] max-w-none h-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#1d1c14] text-white font-mono-custom text-[10px] px-2 py-1 uppercase tracking-wider">
                    {customUserPhoto ? 'Your Frame' : 'Your Photo'}
                  </span>
                </div>

                {/* Right Side: After / Garment Simulation */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <img
                    src={upgradeImageUrl('https://lh3.googleusercontent.com/aida-public/AB6AXuBs9iZK4v2WZeF0StxZWohXU1st4fC2Z-s1dzUPBt6HeTJCRQ0klAZDnwNQv47Mnt0S_QskSL4hMsIbOsOeO9mSkKTLN2BGwVRWwTYvfe26Cc5USLaRIgpJAaAQZH4mHZM_VnzAsqRMNQ641bug-AL5kEqkKm0jPXIOX5uXkbH6we9MIumv-b2KsDGTShIujD9QJie0m1MvQIr3p1yXLH91JQPPSWENmZ6wRAdWYF7lxzqioMQPc9S3', 'hero')}
                    alt="Simulated Try On"
                    className="w-[512px] max-w-none h-full object-cover"
                    style={{ transform: `translateX(-${sliderPosition}%)` }}
                  />
                  <span className="absolute bottom-3 right-3 bg-[#a53c1b] text-white font-mono-custom text-[10px] px-2 py-1 uppercase tracking-wider">
                    Try On // Oversized M
                  </span>
                </div>

                {/* Split Drag Line Handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-[#1d1c14] z-20"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#1d1c14] text-white flex items-center justify-center shadow-md border-2 border-white">
                    <span className="material-symbols-outlined text-sm">code</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center font-mono-custom text-[10px] text-[#7e766f] mt-2 px-1">
                <span>◀ DRAG TO COMPARE</span>
                <span>AMW PROPORTION SIMULATOR</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

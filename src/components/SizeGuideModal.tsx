import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();

  return (
    <AnimatePresence>
      {isSizeGuideOpen && (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSizeGuideOpen(false)}
          className="fixed inset-0 bg-[#1d1c14]/75 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#fff9ed] border-2 border-[#1d1c14] shadow-[8px_8px_0px_0px_rgba(29,28,20,1)] p-6 sm:p-8 z-10 overflow-y-auto max-h-[90vh]"
        >
          <div className="flex justify-between items-start border-b border-[#1d1c14] pb-4 mb-6">
            <div>
              <span className="font-mono-custom text-xs uppercase tracking-widest text-[#a53c1b]">
                // SPECIFICATIONS
              </span>
              <h3 className="font-headline text-2xl sm:text-3xl font-bold uppercase text-[#1d1c14] tracking-tight">
                Size & Fit Guide
              </h3>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="p-1 hover:text-[#a53c1b] transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <div className="mb-6 font-body-custom text-sm text-[#4c4640] leading-relaxed">
            All AMAR MEN'S WEAR garments feature a modern utilitarian cut with intentional boxy volume. We recommend selecting your true size for our signature relaxed drape, or one size down for a structured classic fit.
          </div>

          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse font-mono-custom text-xs text-left">
              <thead>
                <tr className="bg-[#1d1c14] text-white uppercase">
                  <th className="p-3">Size</th>
                  <th className="p-3">Chest (in)</th>
                  <th className="p-3">Shoulder (in)</th>
                  <th className="p-3">Length (in)</th>
                  <th className="p-3">Sleeve (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cfc5bd] bg-[#f9f3e7]">
                <tr>
                  <td className="p-3 font-bold text-[#1d1c14]">S</td>
                  <td className="p-3">42"</td>
                  <td className="p-3">20.5"</td>
                  <td className="p-3">28.0"</td>
                  <td className="p-3">9.5"</td>
                </tr>
                <tr className="bg-[#fff9ed]">
                  <td className="p-3 font-bold text-[#1d1c14]">M</td>
                  <td className="p-3">44"</td>
                  <td className="p-3">21.5"</td>
                  <td className="p-3">29.0"</td>
                  <td className="p-3">10.0"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1d1c14]">L</td>
                  <td className="p-3">47"</td>
                  <td className="p-3">22.5"</td>
                  <td className="p-3">30.0"</td>
                  <td className="p-3">10.5"</td>
                </tr>
                <tr className="bg-[#fff9ed]">
                  <td className="p-3 font-bold text-[#1d1c14]">XL</td>
                  <td className="p-3">50"</td>
                  <td className="p-3">23.5"</td>
                  <td className="p-3">31.0"</td>
                  <td className="p-3">11.0"</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1d1c14]">XXL</td>
                  <td className="p-3">53"</td>
                  <td className="p-3">24.5"</td>
                  <td className="p-3">31.5"</td>
                  <td className="p-3">11.5"</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#f3ede1] border border-[#cfc5bd] p-4 text-xs font-mono-custom text-[#4c4640] mb-6">
            <p className="font-bold text-[#1d1c14] mb-1">PROPORTION NOTE:</p>
            <p>Model is 6'1" (185cm), 76kg and wears size Medium for an editorial boxy drape.</p>
          </div>

          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="w-full bg-[#1d1c14] text-white py-3.5 font-body-custom uppercase tracking-widest text-xs font-bold hover:bg-[#a53c1b] transition-colors"
          >
            Got It
          </button>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
};

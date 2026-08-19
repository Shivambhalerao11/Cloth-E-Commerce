import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-8 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className={`pointer-events-auto p-4 border-2 border-[#1d1c14] shadow-[4px_4px_0px_0px_rgba(29,28,20,1)] bg-[#fff9ed] flex items-start justify-between gap-3 ${
              toast.type === 'error'
                ? 'border-[#ba1a1a]'
                : toast.type === 'info'
                ? 'border-[#1d1c14]'
                : 'border-[#1d1c14]'
            }`}
          >
            <div className="flex gap-3">
              <div
                className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${
                  toast.type === 'error'
                    ? 'bg-[#ba1a1a]'
                    : toast.type === 'info'
                    ? 'bg-[#7e766f]'
                    : 'bg-[#a53c1b]'
                }`}
              />
              <div>
                <h4 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-[#1d1c14]">
                  {toast.title}
                </h4>
                <p className="font-body-custom text-xs text-[#4c4640] mt-0.5">{toast.message}</p>
              </div>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#7e766f] hover:text-[#1d1c14] -mt-1 -mr-1 p-1"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

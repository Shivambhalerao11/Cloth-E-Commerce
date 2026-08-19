import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, duration = 1400 }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          onComplete?.();
        }, 200);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#fff9ed] text-[#1d1c14] flex flex-col justify-between p-6 md:p-12 select-none"
        >
          {/* Top Row */}
          <div className="flex justify-between items-start font-mono-custom text-xs uppercase tracking-widest text-[#7e766f]">
            <span>GANDHI CHOWK · VARANGAON</span>
            <span>EST. 1994 // 2026 EDITION</span>
          </div>

          {/* Center Brand Title & Progress */}
          <div className="flex flex-col items-center justify-center my-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-headline text-4xl sm:text-6xl md:text-8xl font-bold tracking-[0.08em] text-[#1d1c14] uppercase leading-none mb-4"
            >
              AMAR MEN'S WEAR
            </motion.h1>
            <p className="font-editorial italic text-lg sm:text-2xl text-[#a53c1b] mb-8 max-w-md">
              Utilitarian Design. Heritage Tailoring.
            </p>

            {/* Brutalist Progress Bar */}
            <div className="w-64 sm:w-80 h-2 bg-[#e8e2d6] border border-[#1d1c14] relative overflow-hidden">
              <motion.div
                className="h-full bg-[#a53c1b]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <div className="mt-3 font-mono-custom text-sm text-[#1d1c14] tracking-widest">
              <span>LOADING ARCHIVE // </span>
              <span className="font-bold">{progress}%</span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex justify-between items-end font-mono-custom text-[11px] uppercase tracking-widest text-[#7e766f] border-t border-[#cfc5bd] pt-4">
            <span>21.0167° N, 75.8333° E</span>
            <span>MAHARASHTRA, INDIA</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

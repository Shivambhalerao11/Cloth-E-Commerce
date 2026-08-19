import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useShop } from '../context/ShopContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useShop();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop/mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.dataset.cursor;

        setIsPointer(Boolean(isClickable));
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const hasCustomText = Boolean(cursorText);

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center font-mono-custom text-[10px] font-bold uppercase tracking-wider overflow-hidden"
        animate={{
          x: mousePosition.x - (hasCustomText ? 36 : isPointer ? 22 : 16),
          y: mousePosition.y - (hasCustomText ? 36 : isPointer ? 22 : 16),
          width: hasCustomText ? 72 : isPointer ? 44 : 32,
          height: hasCustomText ? 72 : isPointer ? 44 : 32,
          backgroundColor: hasCustomText ? 'rgba(165, 60, 27, 0.95)' : isPointer ? 'rgba(29, 28, 20, 0.12)' : 'transparent',
          borderColor: hasCustomText ? '#a53c1b' : '#1d1c14',
          borderWidth: hasCustomText ? 0 : 1,
          color: hasCustomText ? '#ffffff' : '#1d1c14',
          scale: cursorVariant === 'drag' ? 1.2 : 1
        }}
        transition={{
          type: 'spring',
          damping: 28,
          stiffness: 300,
          mass: 0.5
        }}
      >
        {hasCustomText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-center px-1 text-white leading-none font-bold"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Central Precision Dot */}
      {!hasCustomText && (
        <motion.div
          className="fixed pointer-events-none z-[10000] w-2 h-2 rounded-full bg-[#a53c1b]"
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            scale: isPointer ? 0 : 1,
            opacity: isPointer ? 0 : 1
          }}
          transition={{
            type: 'spring',
            damping: 35,
            stiffness: 450,
            mass: 0.2
          }}
        />
      )}
    </>
  );
};

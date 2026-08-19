import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { subscribeCursor, getCursorState } from '../context/ShopContext';

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState(getCursorState());
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const isPointerRef = useRef(false);
  const isVisibleRef = useRef(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  const dotSpringConfig = { damping: 35, stiffness: 450, mass: 0.2 };
  const dotX = useSpring(rawX, dotSpringConfig);
  const dotY = useSpring(rawY, dotSpringConfig);

  useEffect(() => {
    // Subscribe to pub/sub cursor changes without re-rendering parent context
    const unsubscribe = subscribeCursor((newState) => {
      setCursorState(newState);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // Only show custom cursor on fine pointer devices (desktop/mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.dataset.cursor
        );

        if (isPointerRef.current !== isClickable) {
          isPointerRef.current = isClickable;
          setIsPointer(isClickable);
        }
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [rawX, rawY]);

  if (!isVisible) return null;

  const { text: cursorText, variant: cursorVariant } = cursorState;
  const hasCustomText = Boolean(cursorText);
  const offset = hasCustomText ? 36 : isPointer ? 22 : 16;

  return (
    <>
      {/* Outer Follower Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full flex items-center justify-center font-mono-custom text-[10px] font-bold uppercase tracking-wider overflow-hidden top-0 left-0"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: -offset,
          translateY: -offset,
          willChange: 'transform',
        }}
        animate={{
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
          className="fixed pointer-events-none z-[10000] w-2 h-2 rounded-full bg-[#a53c1b] top-0 left-0"
          style={{
            x: dotX,
            y: dotY,
            translateX: -4,
            translateY: -4,
            willChange: 'transform',
          }}
          animate={{
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

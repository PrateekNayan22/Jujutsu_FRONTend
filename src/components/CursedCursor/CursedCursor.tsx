import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export const CursedCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [clickPulses, setClickPulses] = useState<number[]>([]);

  // Smooth GPU spring physics for mouse trailing
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 26, stiffness: 420, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    // Disable on touch / mobile screens
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Force ALL elements (buttons, links, inputs) to hide native OS cursor
    const styleEl = document.createElement('style');
    styleEl.id = 'hide-native-os-cursor';
    styleEl.innerHTML = '* { cursor: none !important; }';
    document.head.appendChild(styleEl);

    // Respect user reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMediaChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleMouseDown = () => {
      setIsClicking(true);
      setClickPulses((prev) => [...prev.slice(-2), Date.now()]);
    };
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, .interactive, [tabindex]';

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    const attachListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    attachListeners();

    const observer = new MutationObserver(() => attachListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      mediaQuery.removeEventListener('change', handleMediaChange);
      observer.disconnect();
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });

      // Cleanup injected style on unmount
      const injectedStyle = document.getElementById('hide-native-os-cursor');
      if (injectedStyle) injectedStyle.remove();
    };
  }, [handleMouseMove]);

  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Primary Cursed Tattoo Mark */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.35 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      >
        <motion.div
          animate={
            reducedMotion
              ? {}
              : isHovering
              ? {
                  scale: [1, 1.08, 0.96, 1.04, 1],
                  filter: [
                    'drop-shadow(0 0 6px #ef233c) drop-shadow(0 0 12px #8b0000)',
                    'drop-shadow(0 0 10px #ff1744) drop-shadow(0 0 18px #d50000)',
                    'drop-shadow(0 0 6px #ef233c) drop-shadow(0 0 12px #8b0000)',
                  ],
                }
              : {
                  scale: [0.97, 1.03, 0.97],
                  opacity: [0.9, 1, 0.9],
                }
          }
          transition={
            isHovering
              ? { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
              : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }
          }
          className="relative w-6 h-7 flex items-center justify-center"
          style={{
            filter: isHovering
              ? 'drop-shadow(0 0 8px #ff1744) drop-shadow(0 0 16px #8b0000)'
              : 'drop-shadow(0 0 4px #ef233c) drop-shadow(0 0 8px rgba(139, 0, 0, 0.7))',
          }}
        >
          <svg
            viewBox="0 0 32 36"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="sukunaMarkGrad"
                x1="16"
                y1="1"
                x2="16"
                y2="35"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#ff4d4d" />
                <stop offset="45%" stopColor="#ef233c" />
                <stop offset="100%" stopColor="#7a0000" />
              </linearGradient>
            </defs>

            {/* Dark stroke underlayer for maximum readability on bright backgrounds */}
            <g
              stroke="#080204"
              strokeWidth="1.6"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              {/* Top Central Teardrop Dot */}
              <path d="M 16 3 C 17.6 6, 17.3 9.2, 16 11.5 C 14.7 9.2, 14.4 6, 16 3 Z" />
              
              {/* Left Tribal Wing / Claw */}
              <path d="M 11 2 C 6 6, 4 12, 5 16 L 9 14 C 8 20, 9 28, 11 34 C 12 28, 12.5 20, 13.5 11 L 10.5 15 C 10 10, 10.5 5, 11 2 Z" />
              
              {/* Right Tribal Wing / Claw (Mirrored) */}
              <path d="M 21 2 C 26 6, 28 12, 27 16 L 23 14 C 24 20, 23 28, 21 34 C 20 28, 19.5 20, 18.5 11 L 21.5 15 C 22 10, 21.5 5, 21 2 Z" />
            </g>

            {/* Filled Crimson Curse Mark */}
            <path
              d="M 16 3 C 17.6 6, 17.3 9.2, 16 11.5 C 14.7 9.2, 14.4 6, 16 3 Z"
              fill="url(#sukunaMarkGrad)"
            />
            <path
              d="M 11 2 C 6 6, 4 12, 5 16 L 9 14 C 8 20, 9 28, 11 34 C 12 28, 12.5 20, 13.5 11 L 10.5 15 C 10 10, 10.5 5, 11 2 Z"
              fill="url(#sukunaMarkGrad)"
            />
            <path
              d="M 21 2 C 26 6, 28 12, 27 16 L 23 14 C 24 20, 23 28, 21 34 C 20 28, 19.5 20, 18.5 11 L 21.5 15 C 22 10, 21.5 5, 21 2 Z"
              fill="url(#sukunaMarkGrad)"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Click Pulse Ripple */}
      <AnimatePresence>
        {!reducedMotion &&
          clickPulses.map((timestamp) => (
            <motion.div
              key={timestamp}
              className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
              style={{
                x: smoothX,
                y: smoothY,
                translateX: '-50%',
                translateY: '-50%',
              }}
              initial={{ scale: 0.4, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="w-8 h-8 rounded-full border border-cursed-red"
                style={{
                  boxShadow: '0 0 10px #ef233c, inset 0 0 10px #ef233c',
                }}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  );
};

export default CursedCursor;
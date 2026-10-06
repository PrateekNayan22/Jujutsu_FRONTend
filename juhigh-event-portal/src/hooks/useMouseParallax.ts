import { useEffect } from 'react';
import { useMotionValue, useSpring, MotionValue } from 'framer-motion';

export const useMouseParallax = (sensitivity: number = 10) => {
  // Use MotionValues instead of React State to prevent lag
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add smooth physics
  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate offset and update MotionValues directly
      x.set(((e.clientX - centerX) / centerX) * sensitivity);
      y.set(((e.clientY - centerY) / centerY) * sensitivity);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity, x, y]);

  return { x: springX, y: springY };
};
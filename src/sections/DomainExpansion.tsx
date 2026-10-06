import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DomainExpansion: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5], [0, 3]);
  const innerScale = useTransform(scrollYProgress, [0.25, 0.55], [0, 5]);
  const circleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 0.5, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.3], [60, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.75], [0, 1, 1, 0]);
  const kanjiOpacity = useTransform(scrollYProgress, [0.15, 0.35, 0.55], [0, 0.45, 0]);
  const captionOpacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6], [0, 1, 0]);

  return (
    <div ref={ref} className="relative h-[110vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Dark overlay */}
        <motion.div
          className="absolute inset-0 bg-cursed-dark"
          style={{ opacity }}
        />

        {/* Expanding circle - glowing aura */}
        <motion.div
          className="absolute w-64 h-64 rounded-full"
          style={{
            scale,
            opacity: circleOpacity,
            background:
              'radial-gradient(circle, rgba(56,132,255,0.55) 0%, rgba(56,132,255,0.15) 45%, transparent 70%)',
            border: '2px solid rgba(56,132,255,0.6)',
          }}
          animate={{
            boxShadow: [
              '0 0 60px 30px rgba(56,132,255,0.25)',
              '0 0 100px 50px rgba(56,132,255,0.45)',
              '0 0 60px 30px rgba(56,132,255,0.25)',
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner circle - denser core */}
        <motion.div
          className="absolute w-32 h-32 rounded-full"
          style={{
            scale: innerScale,
            opacity: circleOpacity,
            background:
              'radial-gradient(circle, rgba(94,158,255,0.7) 0%, rgba(94,158,255,0.2) 50%, transparent 75%)',
            border: '1px solid rgba(94,158,255,0.7)',
          }}
          animate={{
            boxShadow: [
              '0 0 40px 20px rgba(94,158,255,0.3)',
              '0 0 70px 35px rgba(94,158,255,0.55)',
              '0 0 40px 20px rgba(94,158,255,0.3)',
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />

        {/* Text */}
        <motion.div
          className="relative z-10 text-center space-y-4"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <motion.p
            className="text-6xl md:text-8xl lg:text-9xl font-bold text-cursed-blue/30 select-none"
            style={{ opacity: kanjiOpacity }}
          >
            領域展開
          </motion.p>
          <motion.p
            className="text-lg md:text-xl font-mono tracking-[0.5em] text-cursed-blue/80"
            style={{ opacity: captionOpacity }}
          >
            DOMAIN EXPANSION
          </motion.p>
        </motion.div>

        {/* Corner brackets */}
        <motion.div
          className="absolute top-16 left-16 w-8 h-8 border-l-2 border-t-2 border-cursed-blue/20"
          style={{ opacity: textOpacity }}
        />
        <motion.div
          className="absolute top-16 right-16 w-8 h-8 border-r-2 border-t-2 border-cursed-blue/20"
          style={{ opacity: textOpacity }}
        />
        <motion.div
          className="absolute bottom-16 left-16 w-8 h-8 border-l-2 border-b-2 border-cursed-blue/20"
          style={{ opacity: textOpacity }}
        />
        <motion.div
          className="absolute bottom-16 right-16 w-8 h-8 border-r-2 border-b-2 border-cursed-blue/20"
          style={{ opacity: textOpacity }}
        />
      </div>
    </div>
  );
};

export default DomainExpansion;
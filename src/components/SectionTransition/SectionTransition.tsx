import React from 'react';
import { motion } from 'framer-motion';

interface SectionTransitionProps {
  japaneseText: string;
  englishText: string;
  subtitle?: string;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  japaneseText,
  englishText,
  subtitle,
}) => {
  return (
    <motion.div
      className="relative py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Background line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cursed-blue/30 to-transparent"
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1, transition: { duration: 1.2, ease: 'easeOut' } },
        }}
      />

      {/* Japanese text */}
      <motion.p
        className="text-cursed-blue/20 text-5xl md:text-7xl font-bold tracking-widest select-none"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, delay: 0.2 },
          },
        }}
      >
        {japaneseText}
      </motion.p>

      {/* English text */}
      <motion.p
        className="mt-4 text-xs md:text-sm tracking-[0.3em] text-cursed-muted font-mono uppercase"
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.5 },
          },
        }}
      >
        {englishText}
      </motion.p>

      {subtitle && (
        <motion.p
          className="mt-2 text-xs tracking-widest text-cursed-muted/50 font-mono"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5, delay: 0.8 } },
          }}
        >
          // {subtitle}
        </motion.p>
      )}

      {/* Corner marks */}
      <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 w-4 h-4 border-l border-t border-cursed-blue/20" />
      <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 w-4 h-4 border-r border-b border-cursed-blue/20" />
    </motion.div>
  );
};

export default SectionTransition;
import React from 'react';
import { motion } from 'framer-motion';
import { Radar, ChevronDown } from 'lucide-react';
import CursedParticles from '../components/Particles/CursedParticles';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      id="hero"
    >
      <CursedParticles count={15} />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(67,97,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(67,97,238,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Shifted Left Content with Guaranteed Gap */}
      <div
        className="relative z-10 w-full pt-28 md:pt-0"
        style={{
          maxWidth: '1400px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'clamp(2.5rem, 7vw, 7rem)',
          paddingRight: 'clamp(2.5rem, 7vw, 7rem)',
        }}
      >
        <div className="max-w-2xl md:max-w-3xl">
          {/* Label */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="text-xs font-mono tracking-widest text-cursed-blue">
              呪術高専
            </span>
            <span className="w-8 h-px bg-cursed-blue/30" />
            <span className="text-xs font-mono tracking-widest text-cursed-muted">
              // CURSED EVENT NETWORK
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-1 mb-8">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]"
              style={{
                textShadow:
                  '0 0 40px rgba(255,255,255,0.08), 0 2px 0 rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              DISCOVER
            </motion.h1>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.9]"
              style={{
                textShadow:
                  '0 0 40px rgba(255,255,255,0.08), 0 2px 0 rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              YOUR NEXT
            </motion.h1>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              {/* CURSED RED → CURSED BLUE gradient */}
              <span
                className="text-transparent bg-clip-text relative inline-block"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #ef233c 0%, #c9184a 25%, #7209b7 50%, #4361ee 75%, #4cc9f0 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'cursedGradient 4s ease infinite',
                  filter:
                    'drop-shadow(0 0 20px rgba(239,35,60,0.45)) drop-shadow(0 0 40px rgba(67,97,238,0.35))',
                }}
              >
                MISSION.
              </span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base text-cursed-muted max-w-lg leading-relaxed mb-10 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            "Every event is a signal. Every gathering is an opportunity.
            <br />
            Every mission begins with discovery."
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <a
              href="#detection"
              className="flex items-center gap-2 px-6 py-3 bg-cursed-blue text-white font-mono text-xs tracking-wider hover:bg-cursed-blue/80 transition-all hover:shadow-lg hover:shadow-cursed-blue/20 interactive"
            >
              <Radar size={14} />
              DETECT MISSIONS
            </a>
            <a
              href="#timeline"
              className="flex items-center gap-2 px-6 py-3 border border-white/10 text-white/70 font-mono text-xs tracking-wider hover:border-cursed-blue/30 hover:text-white transition-all interactive"
            >
              VIEW MISSION TIMELINE
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[9px] font-mono tracking-widest text-cursed-muted">
          SCROLL
        </span>
        <ChevronDown size={14} className="text-cursed-muted" />
      </motion.div>

      {/* Coordinates shifted in */}
      <div
        className="absolute bottom-8 space-y-1 hidden md:block pointer-events-none"
        style={{ left: 'clamp(2.5rem, 7vw, 7rem)' }}
      >
        <p className="text-[8px] font-mono text-cursed-muted/30 tracking-wider">
          LAT: 12.9716°N
        </p>
        <p className="text-[8px] font-mono text-cursed-muted/30 tracking-wider">
          LON: 77.5946°E
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
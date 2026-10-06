import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { events } from '../data/events';
import { Event } from '../types/event';
import MissionGrade from '../components/MissionGrade/MissionGrade';
import { fadeUp } from '../animations/variants';

interface TrendingSectionProps {
  onSelectEvent: (event: Event) => void;
}

const TrendingSection: React.FC<TrendingSectionProps> = ({ onSelectEvent }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trendingEvents = events.filter((e) => e.trending);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="trending">
      <div className="page-shell mb-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="jjk-label text-cursed-red text-[10px]">呪力</span>
              <span className="w-8 h-px bg-cursed-red/30" />
              <span className="jjk-label text-cursed-muted text-[10px]">
                // ABNORMAL ACTIVITY
              </span>
            </div>
            <h2 className="jjk-heading text-3xl md:text-5xl text-white mb-2">
              HIGH-PRIORITY MISSIONS
            </h2>
            <p className="jjk-body text-sm text-cursed-muted">
              "Abnormal cursed-energy activity detected."
            </p>
          </div>

          {/* Scroll controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-cursed-muted hover:text-white hover:border-cursed-blue/30 transition-all interactive"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-cursed-muted hover:text-white hover:border-cursed-blue/30 transition-all interactive"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-6 px-4 md:px-8 max-w-7xl mx-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {trendingEvents.map((event, i) => (
          <motion.div
            key={event.id}
            className="flex-shrink-0 w-80 md:w-96 glass overflow-hidden cursor-pointer group interactive"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -6 }}
            onClick={() => onSelectEvent(event)}
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cursed-charcoal via-cursed-dark/30 to-transparent" />

              {/* Trending badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-cursed-red/20 border border-cursed-red/40">
                <Zap size={10} className="text-cursed-red" />
                <span className="text-[9px] font-mono tracking-wider text-cursed-red">
                  HIGH ACTIVITY
                </span>
              </div>

              {/* Grade */}
              <div className="absolute top-3 right-3">
                <MissionGrade rank={event.rank} />
              </div>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <h3 className="jjk-heading text-lg text-white group-hover:text-cursed-blue transition-colors truncate">
                {event.title}
              </h3>

              {/* Cursed energy bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-cursed-muted tracking-wider">
                    CURSED ENERGY LEVEL
                  </span>
                  <span className="text-sm font-mono text-cursed-red font-bold">
                    {event.cursedEnergyLevel}%
                  </span>
                </div>
                <div className="h-1.5 bg-cursed-grey/30 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cursed-purple to-cursed-red"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${event.cursedEnergyLevel}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Live interest */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-green-400">
                    +{event.liveInterest}% LIVE INTEREST
                  </span>
                </div>
                <ArrowRight
                  size={14}
                  className="text-cursed-muted group-hover:text-cursed-blue transition-colors"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
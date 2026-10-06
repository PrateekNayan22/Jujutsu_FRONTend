import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { events } from '../data/events';
import { Event } from '../types/event';
import MissionGrade from '../components/MissionGrade/MissionGrade';
import { fadeUp, fadeLeft, fadeRight } from '../animations/variants';

interface SpecialGradeSectionProps {
  onSelectEvent: (event: Event) => void;
}

const SpecialGradeSection: React.FC<SpecialGradeSectionProps> = ({
  onSelectEvent,
}) => {
  const featured = events.find((e) => e.featured);
  if (!featured) return null;

  const fillPercent = Math.round(
    (featured.registered / featured.capacity) * 100
  );

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-[10px] font-mono tracking-widest text-cursed-red">
              特級
            </span>
            <span className="w-8 h-px bg-cursed-red/30" />
            <span className="text-[10px] font-mono tracking-widest text-cursed-muted">
              // HIGH-PRIORITY CAMPUS MISSION
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            SPECIAL GRADE
          </h2>
        </motion.div>

        {/* Featured event card */}
        <motion.div
          className="relative glass overflow-hidden cursor-pointer interactive"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onClick={() => onSelectEvent(featured)}
          whileHover={{ scale: 1.005 }}
        >
          {/* HUD corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cursed-red/30 z-20" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-cursed-red/30 z-20" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-cursed-red/30 z-20" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cursed-red/30 z-20" />

          <div className="grid md:grid-cols-2">
            {/* Image */}
            <motion.div
              className="relative h-64 md:h-96 overflow-hidden"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cursed-charcoal/90 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-cursed-charcoal via-transparent to-transparent md:hidden" />

              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-px bg-cursed-red/30"
                animate={{ top: ['0%', '100%'] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>

            {/* Content */}
            <motion.div
              className="p-8 md:p-12 flex flex-col justify-center"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <MissionGrade rank={featured.rank} size="md" />
                <span className="flex items-center gap-1 text-xs font-mono text-cursed-red">
                  <Zap size={12} />
                  HIGH ACTIVITY
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                {featured.title}
              </h3>

              <p className="text-sm text-cursed-muted mb-6 line-clamp-3">
                {featured.description}
              </p>

              {/* Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-cursed-muted tracking-wider">
                    DATE
                  </span>
                  <p className="text-sm text-white flex items-center gap-1.5">
                    <Clock size={12} className="text-cursed-blue" />
                    {new Date(featured.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    • {featured.time}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-cursed-muted tracking-wider">
                    VENUE
                  </span>
                  <p className="text-sm text-white flex items-center gap-1.5">
                    <MapPin size={12} className="text-cursed-blue" />
                    {featured.venue}
                  </p>
                </div>
              </div>

              {/* Cursed energy meter */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-cursed-muted tracking-wider">
                    CURSED ENERGY
                  </span>
                  <span className="text-sm font-mono text-cursed-red font-bold">
                    {featured.cursedEnergyLevel}%
                  </span>
                </div>
                <div className="h-2 bg-cursed-grey/30 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cursed-red/80 to-cursed-red"
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${featured.cursedEnergyLevel}%`,
                    }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                </div>
              </div>

              {/* Live interest & capacity */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Zap size={14} className="text-green-400" />
                  <span className="text-sm font-mono text-green-400">
                    +{featured.liveInterest}%
                  </span>
                  <span className="text-[10px] font-mono text-cursed-muted">
                    LIVE INTEREST
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-cursed-blue" />
                  <span className="text-sm font-mono text-white">
                    {featured.registered}/{featured.capacity}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button className="flex items-center gap-2 px-6 py-3 bg-cursed-red text-white font-mono text-xs tracking-wider hover:bg-cursed-red/80 transition-all w-fit interactive">
                VIEW MISSION INTELLIGENCE
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialGradeSection;
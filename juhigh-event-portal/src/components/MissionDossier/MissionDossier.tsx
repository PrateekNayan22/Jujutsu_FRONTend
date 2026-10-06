import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Clock,
  Users,
  Calendar,
  DollarSign,
  Share2,
  ArrowRight,
  Zap,
  Shield,
} from 'lucide-react';
import { Event } from '../../types/event';
import { getRankLabel, getRankColor, getCategoryIcon } from '../../data/events';
import MissionGrade from '../MissionGrade/MissionGrade';

interface MissionDossierProps {
  event: Event | null;
  onClose: () => void;
}

const MissionDossier: React.FC<MissionDossierProps> = ({ event, onClose }) => {
  if (!event) return null;

  const fillPercent = Math.round(
    (event.registered / event.capacity) * 100
  );
  const rankColor = getRankColor(event.rank);

  const handleInscription = () => {
    // PAIR B HANDOFF POINT
    console.log(`[PAIR B HANDOFF] Navigate to /inscription/${event.id}`);
    alert(
      `PAIR B // INSCRIPTION PORTAL\n\nMISSION HANDOFF INITIALIZED\n\nEvent: ${event.title}\nID: ${event.id}\n\nRoute: /inscription/${event.id}`
    );
  };

  return (
    <AnimatePresence>
      {event && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dossier content */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-strong z-10"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-modal="true"
            aria-label={`Mission dossier: ${event.title}`}
          >
            {/* HUD corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-cursed-blue/40 z-20" />
            <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-cursed-blue/40 z-20" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cursed-blue/40 z-20" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-cursed-blue/40 z-20" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/10 hover:border-cursed-red/50 bg-cursed-dark/80"
              aria-label="Close dossier"
            >
              <X size={18} />
            </button>

            {/* Header image */}
            <div className="relative h-56 md:h-72 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cursed-charcoal via-cursed-dark/60 to-transparent" />

              {/* Scan line */}
              <motion.div
                className="absolute left-0 right-0 h-0.5 bg-cursed-blue/30"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />

              {/* Mission header overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs tracking-widest text-cursed-muted">
                    MISSION #{String(event.missionNumber).padStart(3, '0')}
                  </span>
                  <MissionGrade rank={event.rank} size="md" />
                  {event.trending && (
                    <span className="flex items-center gap-1 text-xs font-mono text-cursed-red">
                      <Zap size={12} />
                      HIGH ACTIVITY
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {event.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Category & tags row */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs tracking-wider px-3 py-1 border border-cursed-blue/30 text-cursed-blue">
                  {getCategoryIcon(event.category)} {event.category}
                </span>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] tracking-wider px-2 py-0.5 border border-white/10 text-cursed-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-mono text-xs tracking-widest text-cursed-muted uppercase">
                  // MISSION BRIEFING
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoBlock
                  icon={<Calendar size={14} />}
                  label="DATE"
                  value={new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                />
                <InfoBlock
                  icon={<Clock size={14} />}
                  label="TIME"
                  value={event.time}
                />
                <InfoBlock
                  icon={<MapPin size={14} />}
                  label="VENUE"
                  value={event.venue}
                />
                <InfoBlock
                  icon={<Shield size={14} />}
                  label="HOST"
                  value={event.host}
                />
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                <div className="glass p-4 text-center">
                  <DollarSign size={14} className="text-cursed-blue mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">
                    {event.entryFee === 0 ? 'FREE' : `₹${event.entryFee}`}
                  </p>
                  <p className="text-[10px] font-mono text-cursed-muted tracking-wider">
                    ENTRY FEE
                  </p>
                </div>
                <div className="glass p-4 text-center">
                  <Users size={14} className="text-cursed-blue mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">
                    {event.registered} / {event.capacity}
                  </p>
                  <p className="text-[10px] font-mono text-cursed-muted tracking-wider">
                    PARTICIPANTS
                  </p>
                </div>
                <div className="glass p-4 text-center">
                  <Zap size={14} className="text-cursed-blue mx-auto mb-1" />
                  <p className="text-lg font-bold text-white">
                    {event.popularity}%
                  </p>
                  <p className="text-[10px] font-mono text-cursed-muted tracking-wider">
                    POPULARITY
                  </p>
                </div>
              </div>

              {/* Capacity bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cursed-muted tracking-wider">
                    CAPACITY UTILIZATION
                  </span>
                  <span className="font-mono text-xs text-white">{fillPercent}%</span>
                </div>
                <div className="h-2 bg-cursed-grey/30 overflow-hidden">
                  <motion.div
                    className="h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${fillPercent}%` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ backgroundColor: rankColor }}
                  />
                </div>
              </div>

              {/* Cursed energy level */}
              {event.cursedEnergyLevel && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-cursed-muted tracking-wider">
                      CURSED ENERGY INTENSITY
                    </span>
                    <span className="font-mono text-xs text-cursed-red">
                      {event.cursedEnergyLevel}%
                    </span>
                  </div>
                  <div className="h-2 bg-cursed-grey/30 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cursed-purple to-cursed-red"
                      initial={{ width: 0 }}
                      animate={{ width: `${event.cursedEnergyLevel}%` }}
                      transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col md:flex-row gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={handleInscription}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-cursed-blue text-white font-mono text-sm tracking-wider hover:bg-cursed-blue/80 transition-all hover:shadow-lg hover:shadow-cursed-blue/20 interactive"
                >
                  PROCEED TO INSCRIPTION
                  <ArrowRight size={16} />
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 text-white/60 font-mono text-sm tracking-wider hover:border-cursed-blue/50 hover:text-white transition-all interactive">
                  <Calendar size={14} />
                  ADD TO TIMELINE
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 text-white/60 font-mono text-sm tracking-wider hover:border-cursed-blue/50 hover:text-white transition-all interactive">
                  <Share2 size={14} />
                  SHARE
                </button>
              </div>

              {/* Pair B handoff notice */}
                            <div className="mt-2 p-3 border border-dashed border-white/10 text-center">
                <p className="font-mono text-[10px] text-cursed-muted tracking-wider">
                  INSCRIPTION PORTAL
                </p>
                <p className="font-mono text-[10px] text-cursed-muted/50 mt-1">
                  Continue to secure your seat for this mission
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InfoBlock: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="glass p-3 space-y-1">
    <div className="flex items-center gap-1.5 text-cursed-blue">
      {icon}
      <span className="font-mono text-[10px] tracking-widest text-cursed-muted">
        {label}
      </span>
    </div>
    <p className="text-sm text-white font-medium">{value}</p>
  </div>
);

export default MissionDossier;
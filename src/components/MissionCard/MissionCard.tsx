import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Zap, Eye, Target } from 'lucide-react';
import { Event } from '../../types/event';
import { getCategoryIcon } from '../../data/events';
import MissionGrade from '../MissionGrade/MissionGrade';
import { staggerItem } from '../../animations/variants';

interface MissionCardProps {
  event: Event;
  onSelect: (event: Event) => void;
  index: number;
  isSearchMatch?: boolean; // NEW: Highlight flag for search query
}

const MissionCard: React.FC<MissionCardProps> = ({
  event,
  onSelect,
  index,
  isSearchMatch = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const fillPercent = Math.round((event.registered / event.capacity) * 100);

  return (
    <motion.article
      className="relative group cursor-pointer"
      variants={staggerItem}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={index}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(event)}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${event.title}`}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(event)}
    >
      {/* SEARCH HIGHLIGHT GLOW OUTER RING */}
      {isSearchMatch && (
        <div className="absolute -inset-[2px] bg-gradient-to-r from-cursed-blue via-cursed-purple to-cursed-red rounded-none opacity-80 blur-[3px] animate-pulse pointer-events-none z-0" />
      )}

      {/* Card container */}
      <div
        className={`relative glass overflow-hidden transition-all duration-300 z-10 ${
          isSearchMatch
            ? 'bg-[#0e0e1a] border-cursed-blue shadow-[0_0_30px_rgba(67,97,238,0.35)]'
            : isHovered
            ? 'border-cursed-blue/40 shadow-[0_0_30px_rgba(67,97,238,0.15)]'
            : 'border-white/10'
        }`}
      >
        {/* MATCHED SIGNAL BADGE OVERLAY */}
        {isSearchMatch && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 px-3 py-0.5 bg-cursed-blue text-white font-mono text-[9px] font-bold tracking-widest flex items-center gap-1 shadow-md shadow-cursed-blue/50">
            <Target size={10} className="animate-spin" />
            MATCHED SIGNAL
          </div>
        )}

        {/* HUD corners (Always visible on search match or hover) */}
        {(isHovered || isSearchMatch) && (
          <>
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cursed-blue z-20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cursed-blue z-20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cursed-blue z-20" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cursed-blue z-20" />
          </>
        )}

        {/* Image area */}
        <div className="relative h-44 overflow-hidden">
          <motion.img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered || isSearchMatch ? 1.08 : 1 }}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-cursed-dark via-cursed-dark/40 to-transparent" />

          {/* Scan line on hover or search match */}
          {(isHovered || isSearchMatch) && (
            <motion.div
              className="absolute left-0 right-0 h-0.5 bg-cursed-blue/70 shadow-[0_0_8px_#4361ee]"
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Top bar */}
          <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between z-10 pt-4">
            <span className="font-mono text-[10px] tracking-wider text-cursed-muted">
              MISSION #{String(event.missionNumber).padStart(3, '0')}
            </span>
            <MissionGrade rank={event.rank} />
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="font-mono text-[10px] tracking-wider text-white/80 flex items-center gap-1.5">
              <span className="text-cursed-blue">
                {getCategoryIcon(event.category)}
              </span>
              {event.category}
            </span>
          </div>

          {/* Trending badge */}
          {event.trending && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="flex items-center gap-1 text-[10px] font-mono text-cursed-red tracking-wider">
                <Zap size={10} />
                TRENDING
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <h3
            className={`text-base font-semibold leading-tight transition-colors line-clamp-2 ${
              isSearchMatch || isHovered ? 'text-cursed-blue' : 'text-white'
            }`}
          >
            {event.title}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-cursed-muted font-mono">
              <MapPin size={11} className="text-cursed-blue/70 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-cursed-muted font-mono">
              <Clock size={11} className="text-cursed-blue/70 shrink-0" />
              <span>
                {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}{' '}
                • {event.time}
              </span>
            </div>
          </div>

          {/* Participation bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-cursed-muted">
                <Users size={10} />
                {event.registered} / {event.capacity}
              </div>
              <span className="text-[10px] font-mono text-cursed-muted">
                {event.entryFee === 0 ? 'FREE' : `₹${event.entryFee}`}
              </span>
            </div>
            <div className="h-1 bg-cursed-grey/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${fillPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                style={{
                  backgroundColor:
                    fillPercent > 80
                      ? '#ef233c'
                      : fillPercent > 50
                      ? '#4361ee'
                      : '#06d6a0',
                }}
              />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono text-cursed-muted truncate max-w-[60%]">
              HOST: {event.host}
            </span>
            <motion.span
              className="flex items-center gap-1 text-[10px] font-mono text-cursed-blue tracking-wider font-semibold"
              animate={{ opacity: isHovered || isSearchMatch ? 1 : 0.6 }}
            >
              <Eye size={10} />
              {isSearchMatch ? 'MATCHED' : isHovered ? 'DETECTED' : 'VIEW'}
            </motion.span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default MissionCard;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { timelineEvents } from '../data/events';
import { TimelineEvent } from '../types/event';
import { getCategoryIcon } from '../data/events';

type DayFilter = 'TODAY' | 'TOMORROW' | 'THIS_WEEK' | 'NEXT_WEEK';

const dayLabels: { label: string; value: DayFilter }[] = [
  { label: 'TODAY', value: 'TODAY' },
  { label: 'TOMORROW', value: 'TOMORROW' },
  { label: 'THIS WEEK', value: 'THIS_WEEK' },
  { label: 'NEXT WEEK', value: 'NEXT_WEEK' },
];

const TimelineSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<DayFilter>('TODAY');
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  const filtered = timelineEvents.filter((e) => e.day === activeDay);

  return (
    <section className="relative py-20 md:py-28" id="timeline">
      <div className="page-shell max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="jjk-label text-cursed-blue text-[10px]">任務</span>
            <span className="w-8 h-px bg-cursed-blue/30" />
            <span className="jjk-label text-cursed-muted text-[10px]">
              // MISSION ROUTING
            </span>
          </div>
          <h2 className="jjk-heading text-3xl md:text-5xl text-white mb-3">
            MISSION TIMELINE
          </h2>
          <p className="jjk-body text-sm text-cursed-muted">
            "Upcoming campus events, chronologically mapped."
          </p>
        </div>

        {/* Day filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {dayLabels.map((d) => (
            <button
              key={d.value}
              onClick={() => setActiveDay(d.value)}
              className={`px-4 py-2 jjk-label text-[10px] border transition-all interactive ${
                activeDay === d.value
                  ? 'border-cursed-blue/60 text-cursed-blue bg-cursed-blue/10'
                  : 'border-white/5 text-cursed-muted hover:border-white/15'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Center Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2">
              <motion.div
                className="absolute left-0 top-0 w-full bg-cursed-blue"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeOut' }}
              />
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="jjk-body text-cursed-muted text-sm">
                  NO MISSIONS SCHEDULED
                </p>
              </div>
            )}

            <div className="space-y-8">
              {filtered.map((event, i) => (
                <TimelineNode
                  key={event.id}
                  event={event}
                  index={i}
                  isLeft={i % 2 === 0}
                  isHovered={hoveredEvent === event.id}
                  onHover={() => setHoveredEvent(event.id)}
                  onLeave={() => setHoveredEvent(null)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

interface TimelineNodeProps {
  event: TimelineEvent;
  index: number;
  isLeft: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({
  event,
  index,
  isLeft,
  isHovered,
  onHover,
  onLeave,
}) => {
  return (
    <motion.div
      className="relative flex items-center w-full"
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex w-full items-center">
        {/* Left Side */}
        <div className={`w-[45%] ${isLeft ? 'text-right pr-8' : 'text-right pr-8'}`}>
          {isLeft ? (
            <span className="font-mono text-3xl text-cursed-blue font-bold drop-shadow-md">
              {event.time}
            </span>
          ) : (
            <TimelineCard event={event} isHovered={isHovered} onHover={onHover} onLeave={onLeave} />
          )}
        </div>

        {/* Center Dot */}
        <div className="w-[10%] flex justify-center relative z-10">
          <motion.div
            className="w-4 h-4 rounded-full bg-cursed-blue border-4 border-cursed-dark"
            animate={{
              scale: isHovered ? 1.5 : 1,
              boxShadow: isHovered ? '0 0 20px rgba(67,97,238,0.6)' : '0 0 0px transparent',
            }}
          />
        </div>

        {/* Right Side */}
        <div className={`w-[45%] ${!isLeft ? 'text-left pl-8' : 'text-left pl-8'}`}>
          {!isLeft ? (
            <span className="font-mono text-3xl text-cursed-blue font-bold drop-shadow-md">
              {event.time}
            </span>
          ) : (
            <TimelineCard event={event} isHovered={isHovered} onHover={onHover} onLeave={onLeave} />
          )}
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="flex md:hidden w-full items-center relative pl-12">
        <div className="absolute left-4 w-3 h-3 rounded-full bg-cursed-blue border-2 border-cursed-dark -translate-x-1/2 z-10" />
        <div className="w-full">
          <span className="font-mono text-lg text-cursed-blue font-bold mb-2 block">
            {event.time}
          </span>
          <TimelineCard event={event} isHovered={isHovered} onHover={onHover} onLeave={onLeave} />
        </div>
      </div>
    </motion.div>
  );
};

const TimelineCard: React.FC<{ event: TimelineEvent; isHovered: boolean; onHover: () => void; onLeave: () => void; }> = ({ event, isHovered, onHover, onLeave }) => (
  <motion.div
    className="glass p-5 border border-white/5 text-left interactive"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    whileHover={{ scale: 1.02 }}
    style={{ borderColor: isHovered ? '#4361ee44' : undefined }}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-cursed-blue text-sm">{getCategoryIcon(event.category)}</span>
      <span className="jjk-label text-[9px] text-cursed-muted">{event.category}</span>
    </div>
    <h4 className="jjk-body font-bold text-white mb-2 text-lg leading-tight">
      {event.title}
    </h4>
    <div className="flex items-center gap-1.5 text-xs font-mono text-cursed-muted">
      <MapPin size={12} className="text-cursed-blue/70" />
      {event.venue}
    </div>
  </motion.div>
);

export default TimelineSection;
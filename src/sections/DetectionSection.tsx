import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { events } from '../data/events';
import { Event, EventCategory } from '../types/event';
import MissionFilter from '../components/MissionFilter/MissionFilter';
import MissionCard from '../components/MissionCard/MissionCard';
import { fadeUp, staggerContainer } from '../animations/variants';

type FilterCategory = 'ALL' | EventCategory;

interface DetectionSectionProps {
  onSelectEvent: (event: Event) => void;
}

const DetectionSection: React.FC<DetectionSectionProps> = ({ onSelectEvent }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEvents = useMemo(() => {
    let result = events;

    if (activeFilter !== 'ALL') {
      result = result.filter((e) => e.category === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.host.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  const handleFilterChange = useCallback((filter: FilterCategory) => {
    setActiveFilter(filter);
  }, []);

  const hasSearchActive = searchQuery.trim().length > 0;

  return (
    <section className="relative py-20 md:py-28" id="detection">
      <div className="page-shell max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="jjk-label text-cursed-blue text-[10px]">探索</span>
            <span className="w-8 h-px bg-cursed-blue/30" />
            <span className="jjk-label text-cursed-muted text-[10px]">
              // DETECTION SYSTEM
            </span>
          </div>
          <h2 className="jjk-heading text-3xl md:text-5xl text-white mb-3">
            MISSION DETECTION
          </h2>
          <p className="jjk-body text-sm text-cursed-muted max-w-lg">
            "All campus signals. One unified network."
          </p>
        </motion.div>

        {/* Filters + Search */}
        <motion.div
          className="mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <MissionFilter
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </motion.div>

        {/* Signal count & query indicator */}
        <div className="mb-6 flex items-center gap-3 flex-wrap">
          <span className="jjk-label text-[10px] text-cursed-muted tracking-wider">
            SIGNALS DETECTED:
          </span>
          <span className="font-mono text-sm text-white font-semibold">
            {filteredEvents.length}
          </span>
          {hasSearchActive && (
            <span className="font-mono text-[10px] text-cursed-blue font-bold tracking-wider px-2 py-0.5 border border-cursed-blue/40 bg-cursed-blue/10 animate-pulse">
              SEARCH HIGHLIGHT ACTIVE: "{searchQuery}"
            </span>
          )}
        </div>

        {/* Event grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter + searchQuery}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredEvents.map((event, i) => (
              <MissionCard
                key={event.id}
                event={event}
                onSelect={onSelectEvent}
                index={i}
                isSearchMatch={hasSearchActive}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredEvents.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="jjk-label text-sm text-cursed-muted tracking-wider mb-2">
              NO SIGNAL FOUND
            </p>
            <p className="jjk-body text-xs text-cursed-muted/60">
              Adjust filters or search terms
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default DetectionSection;
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Clock } from 'lucide-react';
import { events } from '../../data/events';
import { Event } from '../../types/event';
import MissionGrade from '../MissionGrade/MissionGrade';
import { getCategoryIcon } from '../../data/events';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: Event) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
    if (!isOpen) setQuery('');
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.host.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9500] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Dark Blur Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#0a0a0f]/95 backdrop-blur-xl"
            onClick={onClose}
          />

          <div className="relative z-10 flex flex-col items-center pt-24 md:pt-32 px-4 max-h-full overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-cursed-muted hover:text-white transition-colors interactive"
              aria-label="Close search"
            >
              <X size={20} />
            </button>

            {/* Heading */}
            <motion.h2
              className="jjk-heading text-xl md:text-2xl text-white mb-8 text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              WHAT MISSION ARE YOU LOOKING FOR?
            </motion.h2>

            {/* Search Input Box */}
            <motion.div
              className="w-full max-w-2xl relative"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="relative flex items-center h-14 bg-cursed-charcoal/90 border border-white/10 focus-within:border-cursed-blue/60 transition-colors">
                <div className="w-12 flex items-center justify-center shrink-0 text-cursed-muted">
                  <Search size={18} />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search campus missions..."
                  className="w-full h-full bg-transparent pr-4 text-white font-mono text-sm tracking-wider placeholder:text-cursed-muted/50 focus:outline-none"
                  aria-label="Search missions"
                />
                {query.length > 0 && (
                  <button
                    onClick={() => setQuery('')}
                    className="mr-3 text-cursed-muted hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Results List */}
            <div className="w-full max-w-2xl mt-6 space-y-2 pb-16">
              {query.trim() && results.length === 0 && (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="jjk-label text-cursed-muted text-sm tracking-wider">
                    NO SIGNAL FOUND
                  </p>
                  <p className="jjk-body text-cursed-muted/50 text-xs mt-2">
                    Try searching for keywords like "combat", "domain", "recon", or "theory"
                  </p>
                </motion.div>
              )}

              {results.map((event, i) => (
                <motion.button
                  key={event.id}
                  className="w-full text-left glass p-4 flex items-center gap-4 hover:border-cursed-blue/40 transition-all interactive group"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => {
                    onSelectEvent(event);
                    onClose();
                  }}
                >
                  <div className="w-16 h-16 overflow-hidden shrink-0 border border-white/5">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-cursed-blue">
                        {getCategoryIcon(event.category)} {event.category}
                      </span>
                      <MissionGrade rank={event.rank} />
                    </div>
                    <h3 className="jjk-body text-sm font-semibold text-white group-hover:text-cursed-blue transition-colors truncate">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-[10px] font-mono text-cursed-muted flex items-center gap-1 truncate">
                        <MapPin size={10} />
                        {event.venue}
                      </span>
                      <span className="text-[10px] font-mono text-cursed-muted flex items-center gap-1 shrink-0">
                        <Clock size={10} />
                        {event.time}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
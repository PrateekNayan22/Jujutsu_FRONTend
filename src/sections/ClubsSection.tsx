import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Calendar, X, ChevronRight } from 'lucide-react';
import { clubs } from '../data/events';
import { Club } from '../types/event';
import { fadeUp, staggerContainer, staggerItem } from '../animations/variants';

const ClubsSection: React.FC = () => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8" id="clubs">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[10px] font-mono tracking-widest text-cursed-purple">
              組織
            </span>
            <span className="w-8 h-px bg-cursed-purple/30" />
            <span className="text-[10px] font-mono tracking-widest text-cursed-muted">
              // SORCERER NETWORK
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            SORCERER ORGANIZATIONS
          </h2>
          <p className="text-sm text-cursed-muted">
            "Discover the groups shaping campus."
          </p>
        </motion.div>

        {/* Club grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {clubs.map((club) => (
            <motion.div
              key={club.id}
              className="glass p-5 cursor-pointer group relative overflow-hidden interactive"
              variants={staggerItem}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedClub(club)}
            >
              {/* Seal border on hover */}
              <motion.div
                className="absolute inset-0 border-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ borderColor: `${club.color}22` }}
              />

              {/* Logo */}
              <div
                className="text-3xl mb-3"
                role="img"
                aria-label={club.name}
              >
                {club.logo}
              </div>

              <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-cursed-blue transition-colors">
                {club.name}
              </h3>

              <p className="text-[10px] font-mono tracking-wider text-cursed-muted mb-3">
                {club.specialization}
              </p>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-[10px] font-mono text-cursed-muted">
                  <Users size={10} />
                  {club.memberCount}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-cursed-muted">
                  <Calendar size={10} />
                  {club.upcomingEvents} UPCOMING
                </span>
              </div>

              {/* Bottom indicator */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: club.color }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Club intelligence panel */}
      <AnimatePresence>
        {selectedClub && (
          <motion.div
            className="fixed inset-0 z-[8500] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedClub(null)}
            />
            <motion.div
              className="relative glass-strong max-w-lg w-full p-8 z-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              role="dialog"
              aria-modal="true"
              aria-label={`Club: ${selectedClub.name}`}
            >
              <button
                onClick={() => setSelectedClub(null)}
                className="absolute top-4 right-4 text-cursed-muted hover:text-white interactive"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="text-4xl mb-4">{selectedClub.logo}</div>
              <h3 className="text-xl font-bold text-white mb-1">
                {selectedClub.name}
              </h3>
              <p className="text-xs font-mono tracking-wider text-cursed-muted mb-4">
                {selectedClub.specialization}
              </p>
              <p className="text-sm text-white/70 mb-6">
                {selectedClub.description}
              </p>

              <div className="flex items-center gap-6 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {selectedClub.memberCount}
                  </p>
                  <p className="text-[9px] font-mono text-cursed-muted tracking-wider">
                    MEMBERS
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-cursed-blue">
                    {selectedClub.upcomingEvents}
                  </p>
                  <p className="text-[9px] font-mono text-cursed-muted tracking-wider">
                    UPCOMING
                  </p>
                </div>
              </div>

              <button
                className="flex items-center gap-2 text-xs font-mono tracking-wider text-cursed-blue hover:text-white transition-colors interactive"
                onClick={() => setSelectedClub(null)}
              >
                VIEW MISSIONS
                <ChevronRight size={14} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClubsSection;
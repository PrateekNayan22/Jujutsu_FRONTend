import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { events, userInterests as defaultInterests } from '../data/events';
import { Event, UserInterest } from '../types/event';
import MissionCard from '../components/MissionCard/MissionCard';
import { fadeUp, staggerContainer } from '../animations/variants';

interface PersonalizedSectionProps {
  onSelectEvent: (event: Event) => void;
}

const PersonalizedSection: React.FC<PersonalizedSectionProps> = ({
  onSelectEvent,
}) => {
  const [interests, setInterests] = useState<UserInterest[]>(defaultInterests);

  const selectedTags = interests
    .filter((i) => i.selected)
    .map((i) => i.tag.toLowerCase());

  const recommendations = useMemo(() => {
    if (selectedTags.length === 0) return [];

    return events
      .map((event) => {
        const matchingTags = event.tags.filter((t) =>
          selectedTags.includes(t.toLowerCase())
        );
        const matchScore = matchingTags.length / selectedTags.length;
        return { event, matchScore, matchingTags };
      })
      .filter((r) => r.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);
  }, [selectedTags]);

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  };

  return (
    <section className="relative py-20 md:py-32 px-4 md:px-8" id="personalized">
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
              呪力分析
            </span>
            <span className="w-8 h-px bg-cursed-purple/30" />
            <span className="text-[10px] font-mono tracking-widest text-cursed-muted">
              // ENERGY ANALYSIS
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
            YOUR CURSED ENERGY MATCH
          </h2>
          <p className="text-sm text-cursed-muted">
            "Mission suggestions based on your interests."
          </p>
        </motion.div>

        {/* Interest selection */}
        <motion.div
          className="mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs font-mono tracking-wider text-cursed-muted mb-4">
            SELECT YOUR INTERESTS:
          </p>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <motion.button
                key={interest.id}
                className={`px-5 py-2.5 font-mono text-xs tracking-wider border transition-all interactive ${
                  interest.selected
                    ? 'border-cursed-purple/60 text-cursed-purple bg-cursed-purple/10'
                    : 'border-white/10 text-cursed-muted hover:border-white/20'
                }`}
                onClick={() => toggleInterest(interest.id)}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: interest.selected
                    ? '0 0 15px rgba(114,9,183,0.15)'
                    : undefined,
                }}
              >
                {interest.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Recommendations */}
        <AnimatePresence mode="wait">
          {recommendations.length > 0 ? (
            <motion.div
              key="results"
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-cursed-purple" />
                <span className="text-xs font-mono tracking-wider text-cursed-muted">
                  {recommendations.length} MISSIONS MATCHED
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map(({ event, matchScore, matchingTags }, i) => (
                  <div key={event.id} className="relative">
                    {/* Match score badge */}
                    <div className="absolute -top-2 -right-2 z-10 px-2 py-1 bg-cursed-purple text-white font-mono text-[10px] tracking-wider">
                      {Math.round(matchScore * 100)}% MATCH
                    </div>
                    <MissionCard
                      event={event}
                      onSelect={onSelectEvent}
                      index={i}
                    />
                    {/* Matching tags */}
                    <div className="mt-2 flex flex-wrap gap-1">
                      <span className="text-[9px] font-mono text-cursed-muted tracking-wider">
                        MATCHED:
                      </span>
                      {matchingTags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono text-cursed-purple tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : selectedTags.length > 0 ? (
            <motion.div
              key="no-results"
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-cursed-muted font-mono text-sm">
                NO MATCHING SIGNALS DETECTED
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-cursed-muted font-mono text-sm">
                SELECT YOUR INTERESTS TO DETECT MATCHING MISSIONS
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PersonalizedSection;
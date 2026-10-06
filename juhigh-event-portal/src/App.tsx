import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Event } from './types/event';
import jjkBg from './assets/textures/jjk-bg.jpeg';

// Components
import BootSequence from './components/BootSequence/BootSequence';
import Navbar from './components/Navbar/Navbar';
import CursedCursor from './components/CursedCursor/CursedCursor';
import GrainOverlay from './components/GrainOverlay/GrainOverlay';
import SearchOverlay from './components/SearchOverlay/SearchOverlay';
import MissionDossier from './components/MissionDossier/MissionDossier';

// Sections
import HeroSection from './sections/HeroSection';
import DomainExpansion from './sections/DomainExpansion';
import DetectionSection from './sections/DetectionSection';
import SpecialGradeSection from './sections/SpecialGradeSection';
import TrendingSection from './sections/TrendingSection';
import ClubsSection from './sections/ClubsSection';
import PersonalizedSection from './sections/PersonalizedSection';
import TimelineSection from './sections/TimelineSection';
import EvidenceSection from './sections/EvidenceSection';
import HandoffSection from './sections/HandoffSection';
import Footer from './components/Footer/Footer';
import SectionTransition from './components/SectionTransition/SectionTransition';

const App: React.FC = () => {
  const [bootComplete, setBootComplete] = useState<boolean>(() => {
    return sessionStorage.getItem('cursed-event-boot') === 'complete';
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleBootComplete = useCallback(() => {
    setBootComplete(true);
    sessionStorage.setItem('cursed-event-boot', 'complete');
  }, []);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseEvent = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-cursed-dark text-white overflow-x-hidden">

      {/* CINEMATIC JJK BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src={jjkBg}
          alt="Jujutsu High Atmosphere"
          className="w-full h-full object-cover opacity-40 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/80 via-transparent to-[#0a0a0f]/90" />
      </div>

      {/* Boot sequence */}
      <AnimatePresence>
        {!bootComplete && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      {/* Main content */}
      {bootComplete && (
        <div className="relative z-10">
          <GrainOverlay />
          <CursedCursor />

          <Navbar onSearchOpen={() => setSearchOpen(true)} />

          <SearchOverlay
            isOpen={searchOpen}
            onClose={() => setSearchOpen(false)}
            onSelectEvent={handleSelectEvent}
          />

          <MissionDossier
            event={selectedEvent}
            onClose={handleCloseEvent}
          />

          <main>
            <HeroSection />

            <DomainExpansion />

            <DetectionSection onSelectEvent={handleSelectEvent} />

            <SectionTransition
              japaneseText="特級"
              englishText="SPECIAL GRADE ALERT"
              subtitle="HIGH-PRIORITY SIGNAL"
            />

            <SpecialGradeSection onSelectEvent={handleSelectEvent} />

            <SectionTransition
              japaneseText="呪力"
              englishText="CURSED SIGNAL SPIKE"
              subtitle="ABNORMAL ACTIVITY DETECTED"
            />

            <TrendingSection onSelectEvent={handleSelectEvent} />

            <SectionTransition
              japaneseText="組織"
              englishText="SORCERER NETWORK"
              subtitle="CAMPUS ORGANIZATIONS"
            />

            <ClubsSection />

            <SectionTransition
              japaneseText="分析"
              englishText="CURSED ENERGY ANALYSIS"
              subtitle="PERSONALIZED MATCHING"
            />

            <PersonalizedSection onSelectEvent={handleSelectEvent} />

            <SectionTransition
              japaneseText="任務"
              englishText="MISSION ROUTING"
              subtitle="CHRONOLOGICAL MAP"
            />

            <TimelineSection />

            <SectionTransition
              japaneseText="情報"
              englishText="FIELD INTELLIGENCE"
              subtitle="CAMPUS EVIDENCE FILES"
            />

            <EvidenceSection onSelectEvent={handleSelectEvent} />

            <SectionTransition
              japaneseText="登録"
              englishText="MISSION HANDOFF"
              subtitle="PAIR A → PAIR B"
            />

            <HandoffSection />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
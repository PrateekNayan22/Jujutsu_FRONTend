import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

type BootPhase =
  | 'logo'
  | 'initializing'
  | 'scanning'
  | 'signals'
  | 'online'
  | 'nexasoul'
  | 'complete';

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<BootPhase>('logo');
  const [scanProgress, setScanProgress] = useState(0);

  const skipBoot = useCallback(() => {
    setPhase('complete');
    setTimeout(onComplete, 400);
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    timers.push(setTimeout(() => setPhase('initializing'), 1500));
    timers.push(setTimeout(() => setPhase('scanning'), 3000));
    timers.push(setTimeout(() => setPhase('signals'), 5000));
    timers.push(setTimeout(() => setPhase('online'), 7000));
    timers.push(setTimeout(() => setPhase('nexasoul'), 8500));

    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (phase === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [phase]);

  const handleEnter = () => {
    setPhase('complete');
    setTimeout(onComplete, 600);
  };

  return (
    <AnimatePresence>
      {phase !== 'complete' && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-cursed-dark flex flex-col items-center justify-center overflow-hidden"
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px) brightness(2)',
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px bg-cursed-blue/30"
            animate={{
              top: ['0%', '100%'],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Skip button */}
          <button
            onClick={skipBoot}
            className="absolute top-6 right-6 text-[10px] font-mono tracking-widest text-cursed-muted hover:text-white transition-colors z-50 interactive"
          >
            SKIP →
          </button>

          {/* Content area */}
          <div className="text-center space-y-6 relative">
            {/* Phase: Logo */}
            <AnimatePresence mode="wait">
              {phase === 'logo' && (
                <motion.div
                  key="logo"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <motion.p
                    className="text-5xl md:text-7xl font-bold text-white/10"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    呪術高専
                  </motion.p>
                  <p className="text-sm font-mono tracking-[0.4em] text-cursed-muted">
                    JUJUTSU HIGH
                  </p>
                </motion.div>
              )}

              {/* Phase: Initializing */}
              {phase === 'initializing' && (
                <motion.div
                  key="init"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-mono tracking-widest text-cursed-blue">
                    INITIALIZING CURSED EVENT NETWORK...
                  </p>
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono tracking-wider text-cursed-muted">
                      SYSTEM STATUS:
                    </p>
                    <motion.p
                      className="text-xs font-mono tracking-widest text-cursed-red"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      OFFLINE
                    </motion.p>
                  </div>
                </motion.div>
              )}

              {/* Phase: Scanning */}
              {phase === 'scanning' && (
                <motion.div
                  key="scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-mono tracking-widest text-cursed-blue">
                    SCANNING CAMPUS NETWORK...
                  </p>
                  <div className="w-64 h-1 bg-cursed-grey/30 mx-auto overflow-hidden">
                    <motion.div
                      className="h-full bg-cursed-blue"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                  <p className="text-[10px] font-mono tracking-wider text-cursed-muted">
                    {scanProgress}%
                  </p>
                </motion.div>
              )}

              {/* Phase: Signals */}
              {phase === 'signals' && (
                <motion.div
                  key="signals"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <p className="text-xs font-mono tracking-widest text-green-400">
                    CAMPUS SIGNALS DETECTED
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: 'EVENT SIGNALS', value: '47' },
                      { label: 'CLUB SIGNALS', value: '18' },
                      { label: 'ACTIVE MISSIONS', value: '24' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        className="flex items-center justify-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                      >
                        <span className="text-[10px] font-mono tracking-wider text-cursed-muted w-32 text-right">
                          {item.label}:
                        </span>
                        <span className="text-sm font-mono font-bold text-white w-12 text-left">
                          {item.value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Phase: Online */}
              {phase === 'online' && (
                <motion.div
                  key="online"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  <p className="text-xs font-mono tracking-widest text-cursed-muted">
                    CURSED EVENT NETWORK
                  </p>
                  <motion.p
                    className="text-2xl font-bold tracking-widest text-green-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ONLINE
                  </motion.p>
                </motion.div>
              )}

              {/* Phase: NexaSoul */}
              {phase === 'nexasoul' && (
                <motion.div
                  key="nexasoul"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <motion.h1
  className="text-4xl md:text-6xl font-bold tracking-wider text-white"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
>
  CURSED EVENT
</motion.h1>
<motion.p
  className="text-xs font-mono tracking-[0.4em] text-cursed-muted"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
>
  NETWORK
</motion.p>
                  </div>

                  <motion.button
                    className="px-8 py-3 border border-cursed-blue text-sm font-mono tracking-widest text-cursed-blue hover:bg-cursed-blue hover:text-white transition-all interactive"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    onClick={handleEnter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    [ ENTER JUJUTSU HIGH ]
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom status */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
            <span className="text-[9px] font-mono tracking-wider text-cursed-muted/30">
  呪術高専 // JUJUTSU HIGH
</span>
            <span className="text-[9px] font-mono tracking-wider text-cursed-muted/30">
              CURSED EVENT NETWORK v1.0
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
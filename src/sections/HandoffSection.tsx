import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Radar, ShieldCheck, Ticket } from 'lucide-react';

interface HandoffSectionProps {
  onProceed: () => void;
}

const HandoffSection: React.FC<HandoffSectionProps> = ({ onProceed }) => {

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" id="inscription">
      <div className="page-shell relative z-10 text-center max-w-4xl mx-auto">

        {/* Background seal */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <motion.div
            className="w-[380px] h-[380px] md:w-[480px] md:h-[480px] rounded-full border border-cursed-blue/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute text-[7rem] md:text-[11rem] jjk-jp text-white/[0.03] select-none">
            登録
          </div>
        </div>

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="jjk-label text-cursed-blue text-[10px]">登録</span>
            <span className="w-8 h-px bg-cursed-blue/30" />
            <span className="jjk-label text-cursed-muted text-[10px]">
              // INSCRIPTION PORTAL
            </span>
          </div>
          <h2 className="jjk-heading text-3xl md:text-5xl text-white mb-3">
            READY TO ACCEPT?
          </h2>
          <p className="jjk-body text-sm text-cursed-muted max-w-lg mx-auto">
            You've detected your mission. Proceed to inscription to lock your seat,
            generate your pass, and join the operation.
          </p>
        </motion.div>

        {/* Clean flow */}
        <div className="flex flex-col items-center gap-3 mb-12">
          {[
            { label: 'DISCOVER', icon: <Radar size={12} /> },
            { label: 'INVESTIGATE', icon: <ShieldCheck size={12} /> },
            { label: 'ACCEPT', icon: <Ticket size={12} /> },
            { label: 'PARTICIPATE', icon: null },
          ].map((step, i) => (
            <React.Fragment key={step.label}>
              <motion.div
                className={`flex items-center gap-2 px-5 py-2.5 jjk-label text-[10px] tracking-widest border ${
                  i < 3
                    ? 'border-cursed-blue/40 text-cursed-blue bg-cursed-blue/5'
                    : 'border-white/15 text-white bg-white/5'
                }`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                {step.icon}
                {step.label}
              </motion.div>
              {i < 3 && (
                <ArrowDown size={14} className="text-cursed-muted/35" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Brand line */}
        <div className="mb-8">
          <h3 className="jjk-heading text-3xl md:text-5xl text-white mb-2">
            CURSED EVENT
          </h3>
          <p className="jjk-label text-cursed-muted text-xs tracking-[0.3em] mb-3">
            NETWORK
          </p>
          <p className="jjk-label text-cursed-blue text-[10px] tracking-[0.22em]">
            DISCOVER → ACCEPT → PARTICIPATE
          </p>
        </div>

        {/* CTA */}
        <motion.button
          onClick={onProceed}
          className="inline-flex items-center gap-2 px-8 py-4 bg-cursed-blue text-white font-mono text-sm tracking-wider hover:bg-cursed-blue/85 transition-all interactive shadow-lg shadow-cursed-blue/25"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          PROCEED TO INSCRIPTION
          <ArrowRight size={16} />
        </motion.button>

        <p className="mt-5 jjk-body text-[11px] text-cursed-muted/60 font-mono tracking-wider">
          Secure your seat · Generate pass · Join the mission
        </p>
      </div>
    </section>
  );
};

export default HandoffSection;
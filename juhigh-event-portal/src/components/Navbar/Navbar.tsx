import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, User } from 'lucide-react';

interface NavbarProps {
  onSearchOpen: () => void;
}

const navLinks = [
  { label: 'MISSION BOARD', href: '#detection' },
  { label: 'CLUBS', href: '#clubs' },
  { label: 'TRENDING', href: '#trending' },
  { label: 'TIMELINE', href: '#timeline' },
  { label: 'ARCHIVE', href: '#evidence' },
  { label: 'EVENT PORTAL ↗', href: '/event-portal.html' },
];

const Navbar: React.FC<NavbarProps> = ({ onSearchOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[8000] transition-all duration-500 ${
          scrolled
            ? 'glass-strong border-b border-cursed-blue/10 shadow-lg shadow-black/50'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Outer Container with Shifted Margins */}
        <div
          style={{
            maxWidth: '1400px',
            marginLeft: 'auto',
            marginRight: 'auto',
            paddingLeft: 'clamp(2rem, 6vw, 6rem)',
            paddingRight: 'clamp(2rem, 6vw, 6rem)',
          }}
        >
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 interactive">
              <div className="flex flex-col">
                <span className="jjk-heading text-base md:text-lg text-white tracking-wider">
                  呪術高専
                </span>
                <span className="jjk-label text-[9px] text-cursed-muted tracking-[0.25em]">
                  MISSION NETWORK
                </span>
              </div>
            </a>

            {/* Nav links — INCREASED GAP & PADDING FOR CLEAN SPACING */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 jjk-label text-[11px] text-cursed-muted hover:text-white transition-colors relative group interactive brush-underline tracking-[0.18em]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Status */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1.5 mr-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="font-mono text-[9px] tracking-wider text-cursed-muted">
                  ONLINE
                </span>
              </div>

              <button
                onClick={onSearchOpen}
                className="w-9 h-9 flex items-center justify-center text-cursed-muted hover:text-white transition-colors interactive"
                aria-label="Open search"
              >
                <Search size={16} />
              </button>

              <button
                className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-white/10 jjk-label text-[10px] text-cursed-muted hover:text-white hover:border-cursed-blue/30 transition-all interactive"
                aria-label="Sorcerer profile"
              >
                <User size={12} />
                SORCERER
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-9 h-9 flex items-center justify-center text-cursed-muted hover:text-white transition-colors interactive"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[7999] bg-cursed-dark/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="jjk-heading text-xl text-white/70 hover:text-white transition-colors interactive"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
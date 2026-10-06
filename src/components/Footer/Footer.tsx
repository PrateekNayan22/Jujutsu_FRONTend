import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-white/10 py-16 bg-[#050505]">
      <div className="page-shell max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <h3 className="jjk-heading text-2xl text-white">呪術高専</h3>
              <p className="jjk-label text-[10px] text-cursed-muted mt-1">
                CURSED EVENT NETWORK
              </p>
            </div>
            <p className="jjk-body text-sm text-cursed-muted max-w-sm leading-relaxed">
              Discover campus missions, investigate event intelligence, and
              participate through a unified cursed-energy network.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-wider text-green-400">
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <p className="jjk-label text-[10px] text-cursed-muted">NAVIGATION</p>
            <div className="flex flex-col gap-2.5">
              {[
                { label: 'MISSION BOARD', href: '#detection' },
                { label: 'CLUBS', href: '#clubs' },
                { label: 'TRENDING', href: '#trending' },
                { label: 'TIMELINE', href: '#timeline' },
                { label: 'ARCHIVE', href: '#evidence' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="jjk-label text-xs text-white/70 hover:text-white transition-colors interactive w-fit brush-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact / Meta */}
          <div className="space-y-4">
            <p className="jjk-label text-[10px] text-cursed-muted">NETWORK</p>
            <div className="space-y-3 font-mono text-xs text-cursed-muted">
              <p>Campus Mission Intelligence</p>
              <p>Event Discovery · Clubs · Timeline</p>
              <p className="text-cursed-blue">Inscription Portal Ready</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] text-cursed-muted/50">
          <p>呪術高専 // JUJUTSU HIGH — CURSED EVENT NETWORK</p>
          <p>© 2026 CURSED EVENT NETWORK</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
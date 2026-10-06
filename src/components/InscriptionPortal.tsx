import React from 'react';
import { motion } from 'framer-motion';
import { X, Ticket, Users, Calendar, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';
import { Event } from '../types/event';

interface Props { event: Event | null; onClose: () => void; }

const InscriptionPortal: React.FC<Props> = ({ event, onClose }) => {
  const [mode, setMode] = React.useState<'solo'|'squad'>('solo');
  const [submitted, setSubmitted] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  if (!event) return null;
  const seats = Math.max(event.capacity - event.registered, 0);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = { id: event.id, title: event.title, name, email, mode, createdAt: new Date().toISOString() };
    const old = JSON.parse(localStorage.getItem('cursed-registrations') || '[]');
    localStorage.setItem('cursed-registrations', JSON.stringify([entry, ...old]));
    setSubmitted(true);
  };

  return <div className="fixed inset-0 z-[10000] overflow-y-auto bg-[#080910]/95 backdrop-blur-xl">
    <div className="min-h-screen relative px-4 py-8 md:px-10">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_15%_20%,rgba(0,149,255,.35),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(255,45,75,.28),transparent_30%)]" />
      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div><p className="font-mono text-[10px] tracking-[.35em] text-cursed-blue">PAIR B // INSCRIPTION PORTAL</p><h2 className="text-3xl md:text-5xl font-bold text-white mt-2">ACCEPT THE MISSION</h2></div>
          <button onClick={onClose} className="w-11 h-11 border border-white/15 text-white/70 hover:text-white hover:border-cursed-red/60 flex items-center justify-center"><X size={20}/></button>
        </div>
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">
          <div className="glass-strong p-6 md:p-8 border border-cursed-blue/20">
            <div className="flex flex-wrap gap-2 mb-5"><span className="font-mono text-[10px] px-3 py-1 border border-cursed-blue/30 text-cursed-blue">MISSION #{String(event.missionNumber).padStart(3,'0')}</span><span className="font-mono text-[10px] px-3 py-1 border border-white/10 text-white/60">{event.category}</span></div>
            <h3 className="text-2xl md:text-4xl font-bold text-white">{event.title}</h3>
            <p className="text-white/55 mt-3 leading-relaxed">{event.description}</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-7">
              <div className="glass p-4"><Users size={15} className="text-cursed-blue mb-2"/><b className="text-white">{event.registered}/{event.capacity}</b><p className="text-[10px] text-white/45 font-mono mt-1">PARTICIPANTS</p></div>
              <div className="glass p-4"><Ticket size={15} className="text-cursed-red mb-2"/><b className="text-white">{seats}</b><p className="text-[10px] text-white/45 font-mono mt-1">SEATS LEFT</p></div>
              <div className="glass p-4"><Calendar size={15} className="text-cursed-blue mb-2"/><b className="text-white">{event.date}</b><p className="text-[10px] text-white/45 font-mono mt-1">MISSION DATE</p></div>
            </div>
          </div>
          <div className="glass-strong p-6 md:p-8 border border-cursed-red/20">
            {!submitted ? <form onSubmit={submit}>
              <div className="flex p-1 bg-black/30 border border-white/10 mb-6"><button type="button" onClick={()=>setMode('solo')} className={`flex-1 py-3 font-mono text-xs ${mode==='solo'?'bg-cursed-blue text-white':'text-white/50'}`}>SOLO</button><button type="button" onClick={()=>setMode('squad')} className={`flex-1 py-3 font-mono text-xs ${mode==='squad'?'bg-cursed-red text-white':'text-white/50'}`}>SQUAD</button></div>
              <label className="block font-mono text-[10px] text-white/45 tracking-widest mb-2">SORCERER NAME</label><input required value={name} onChange={e=>setName(e.target.value)} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-cursed-blue mb-5" placeholder="Enter your name"/>
              <label className="block font-mono text-[10px] text-white/45 tracking-widest mb-2">CONTACT EMAIL</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white outline-none focus:border-cursed-blue mb-6" placeholder="you@jujutsu.academy"/>
              <button className="w-full py-4 bg-cursed-blue hover:bg-cursed-blue/80 text-white font-mono text-sm tracking-widest flex items-center justify-center gap-2">GENERATE CURSED SEAL <ArrowRight size={16}/></button>
              <p className="text-[10px] text-white/35 font-mono text-center mt-4">Registration is stored locally for this hackathon demo.</p>
            </form> : <div className="text-center py-8">
              <div className="mx-auto w-20 h-20 border border-cursed-blue/40 flex items-center justify-center mb-5"><QrCode size={42} className="text-cursed-blue"/></div>
              <ShieldCheck className="mx-auto text-cursed-blue mb-3" size={24}/><h3 className="text-2xl font-bold text-white">MISSION ACCEPTED</h3><p className="text-white/50 mt-2">Your Cursed Seal pass has been generated.</p><div className="mt-6 p-4 border border-white/10 text-left font-mono text-xs"><div className="text-cursed-blue">PASS ID</div><div className="text-white mt-1">{event.id.toUpperCase()}-{Math.random().toString(36).slice(2,8).toUpperCase()}</div></div><button onClick={onClose} className="mt-6 px-6 py-3 border border-white/15 text-white font-mono text-xs">RETURN TO MISSION BOARD</button>
            </div>}
          </div>
        </div>
      </div>
    </div>
  </div>;
};
export default InscriptionPortal;

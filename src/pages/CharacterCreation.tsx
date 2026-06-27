import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';

const HAIR_OPTIONS = [
  'Purple Shadow',
  'Neon Blue',
  'Cyber Crimson',
  'Emerald Wave',
  'Golden Saiyan'
];

const COMPANION_OPTIONS = [
  'Robo Owl',
  'Neko-Bot',
  'Orbit Drone',
  'Pixel Spirit',
  'AI Fox'
];

const OUTFIT_OPTIONS = [
  'Hacker',
  'Shinobi',
  'Mecha',
  'Cyber',
  'Astral'
];

// Map hair style selections to our generated high-quality vertical illustrations
const PROTAGONIST_ART: Record<string, string> = {
  'Purple Shadow': '/assets/char_purple_shadow.png',
  'Neon Blue': '/assets/char_neon_blue.png',
  'Cyber Crimson': '/assets/char_cyber_crimson.png',
  'Emerald Wave': '/assets/char_emerald_wave.png',
  'Golden Saiyan': '/assets/char_golden_saiyan.png'
};

export const CharacterCreation: React.FC = () => {
  const { saveCharacter } = useGame();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [hair, setHair] = useState(HAIR_OPTIONS[0]);
  const [outfit, setOutfit] = useState(OUTFIT_OPTIONS[0]);
  const [companion, setCompanion] = useState(COMPANION_OPTIONS[0]);

  // Terminal logs state
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isTypingLogs, setIsTypingLogs] = useState(false);
  const logTimerRef = useRef<any[]>([]);

  // Full-screen scanner transition states
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncPhase, setSyncPhase] = useState(0);

  // Trigger terminal logs typing in synchronization with name input
  useEffect(() => {
    logTimerRef.current.forEach(t => clearTimeout(t));
    logTimerRef.current = [];

    if (!name.trim()) {
      setTerminalLogs([]);
      setIsTypingLogs(false);
      return;
    }

    setIsTypingLogs(true);
    setTerminalLogs(['> Scanning Neural Signature...']);
    sound.playTypewriterBeep();

    const t1 = setTimeout(() => {
      setTerminalLogs(prev => [...prev, '> Searching Ancient Archives...']);
      sound.playTypewriterBeep();
    }, 400);

    const t2 = setTimeout(() => {
      setTerminalLogs(prev => [...prev, '> Identity Registered...']);
      sound.playTypewriterBeep();
    }, 800);

    const t3 = setTimeout(() => {
      setTerminalLogs(prev => [...prev, '> Synchronizing Neural Link...']);
      sound.playTypewriterBeep();
    }, 1200);

    const t4 = setTimeout(() => {
      setTerminalLogs(prev => [...prev, `> Welcome, ${name}`]);
      sound.playSuccess();
      setIsTypingLogs(false);
    }, 1600);

    logTimerRef.current = [t1, t2, t3, t4];

    return () => {
      logTimerRef.current.forEach(t => clearTimeout(t));
    };
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSyncing) return;

    sound.playQuestStart();
    setIsSyncing(true);
    setSyncPhase(1); // "Synchronizing Identity..."

    setTimeout(() => {
      setSyncPhase(2); // "Neural Link Established"
      sound.playClick();
    }, 1200);

    setTimeout(() => {
      setSyncPhase(3); // "Welcome, Commander"
      sound.playLevelUp();
    }, 2400);

    setTimeout(() => {
      saveCharacter({
        name: name.trim(),
        hair,
        outfit,
        companion
      });
      navigate('/world');
    }, 3800);
  };

  // Companion SVG Mini Icons
  const renderCompanionIcon = (compName: string, isMini: boolean) => {
    const floatClass = !isMini ? 'animate-[bounce_3s_ease-in-out_infinite]' : '';
    switch (compName) {
      case 'Robo Owl':
        return (
          <svg className={`${isMini ? 'w-8 h-8' : 'w-24 h-24'} filter drop-shadow-[0_0_8px_#8b5cf6]`} viewBox="0 0 100 100">
            <g className={floatClass}>
              <polygon points="50,15 74,32 70,68 50,85 30,68 26,32" fill="#090714" stroke="#8b5cf6" strokeWidth="2.5" />
              <rect x="36" y="38" width="28" height="8" rx="2" fill="#000" stroke="#8b5cf6" strokeWidth="1" />
              <circle cx="44" cy="42" r="2.5" fill="#a78bfa" className="animate-pulse" />
              <circle cx="56" cy="42" r="2.5" fill="#a78bfa" className="animate-pulse" />
              <polygon points="50,48 46,55 54,55" fill="#8b5cf6" />
              <circle cx="24" cy="48" r="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" className="animate-spin" />
              <circle cx="76" cy="48" r="4" fill="none" stroke="#8b5cf6" strokeWidth="1.5" className="animate-spin" />
            </g>
          </svg>
        );
      case 'Neko-Bot':
        return (
          <svg className={`${isMini ? 'w-8 h-8' : 'w-24 h-24'} filter drop-shadow-[0_0_8px_#ec4899]`} viewBox="0 0 100 100">
            <g className={floatClass}>
              <polygon points="34,36 30,22 42,32" fill="#db2777" />
              <polygon points="66,36 70,22 58,32" fill="#db2777" />
              <circle cx="50" cy="50" r="20" fill="#090714" stroke="#ec4899" strokeWidth="2" />
              <rect x="40" y="44" width="20" height="6" rx="2" fill="#ec4899" />
              <line x1="25" y1="50" x2="15" y2="48" stroke="#ec4899" strokeWidth="1.5" />
              <line x1="75" y1="50" x2="85" y2="48" stroke="#ec4899" strokeWidth="1.5" />
            </g>
          </svg>
        );
      case 'Orbit Drone':
        return (
          <svg className={`${isMini ? 'w-8 h-8' : 'w-24 h-24'} filter drop-shadow-[0_0_8px_#3b82f6]`} viewBox="0 0 100 100">
            <g className={floatClass}>
              <circle cx="50" cy="50" r="22" fill="#090714" stroke="#3b82f6" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="#00f2fe" strokeWidth="1" strokeDasharray="8 4" className="animate-spin" />
              <circle cx="50" cy="50" r="6" fill="#00f2fe" className="animate-pulse" />
              <line x1="20" y1="50" x2="10" y2="50" stroke="#3b82f6" strokeWidth="2" />
              <line x1="80" y1="50" x2="90" y2="50" stroke="#3b82f6" strokeWidth="2" />
            </g>
          </svg>
        );
      case 'Pixel Spirit':
        return (
          <svg className={`${isMini ? 'w-8 h-8' : 'w-24 h-24'} filter drop-shadow-[0_0_8px_#22c55e]`} viewBox="0 0 100 100">
            <g className={floatClass}>
              {/* Ghost pixel shape */}
              <rect x="32" y="28" width="36" height="36" rx="4" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="2.5" />
              <rect x="40" y="38" width="4" height="4" fill="#22c55e" />
              <rect x="56" y="38" width="4" height="4" fill="#22c55e" />
              <path d="M 36,64 L 42,72 L 50,64 L 58,72 L 64,64" fill="none" stroke="#22c55e" strokeWidth="2" />
            </g>
          </svg>
        );
      case 'AI Fox':
      default:
        return (
          <svg className={`${isMini ? 'w-8 h-8' : 'w-24 h-24'} filter drop-shadow-[0_0_8px_#06b6d4]`} viewBox="0 0 100 100">
            <g className={floatClass}>
              <polygon points="50,20 68,48 50,75 32,48" fill="#090714" stroke="#06b6d4" strokeWidth="2.5" />
              <polygon points="28,34 18,22 34,28" fill="#06b6d4" />
              <polygon points="72,34 82,22 66,28" fill="#06b6d4" />
              <circle cx="44" cy="45" r="2" fill="#00f2fe" />
              <circle cx="56" cy="45" r="2" fill="#00f2fe" />
            </g>
          </svg>
        );
    }
  };

  // Outfit Mini Icons
  const renderOutfitIcon = (outfitName: string) => {
    switch (outfitName) {
      case 'Hacker':
        return (
          <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'Shinobi':
        return (
          <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'Mecha':
        return (
          <svg className="w-8 h-8 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
      case 'Cyber':
        return (
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'Astral':
      default:
        return (
          <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.386-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-mono select-none">
      
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Neural Link Overlay Sweep */}
      <AnimatePresence>
        {isSyncing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#030014]/95 flex flex-col items-center justify-center font-mono text-white select-none px-6"
          >
            {/* Holographic scanner laser line */}
            <div className="absolute inset-x-0 h-1 bg-purple-500 shadow-[0_0_25px_#8b5cf6] top-0 animate-[bounce_3.8s_infinite]" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full border border-purple-500/35 bg-purple-950/10 p-8 rounded-2xl text-center space-y-6 shadow-[0_0_55px_rgba(168,85,247,0.15)] relative"
            >
              <div className="text-[10px] text-cyan-400 border border-cyan-400/30 px-2 py-0.5 rounded uppercase tracking-widest font-bold inline-block mb-3 animate-pulse">
                INITIALIZING HANDSHAKE
              </div>

              <div className="space-y-2 h-14 flex flex-col justify-center">
                {syncPhase === 1 && (
                  <motion.div 
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-base font-extrabold uppercase text-purple-300 tracking-wider"
                  >
                    Synchronizing Identity...
                  </motion.div>
                )}
                {syncPhase === 2 && (
                  <motion.div 
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-base font-extrabold uppercase text-cyan-400 tracking-wider"
                  >
                    Neural Link Established
                  </motion.div>
                )}
                {syncPhase === 3 && (
                  <motion.div 
                    initial={{ y: 5, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-lg font-black uppercase text-green-400 tracking-widest glow-text-cyan animate-pulse"
                  >
                    Welcome, Commander
                  </motion.div>
                )}
              </div>

              <div className="text-[9px] text-slate-500 leading-normal max-h-20 overflow-hidden font-mono border-t border-purple-950/40 pt-4 text-left space-y-1">
                <div>&gt; mapping hair::archetype:: {hair.toUpperCase()}</div>
                <div>&gt; mapping outfit::armor:: {outfit.toUpperCase()}</div>
                <div>&gt; synchronizing companion::link:: {companion.toUpperCase()}</div>
                {syncPhase >= 2 && <div className="text-cyan-400">&gt; protocol::handshake::established - SUCCESS</div>}
                {syncPhase >= 3 && <div className="text-green-400">&gt; routing::load_map_world::redirect - GRANTED</div>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl bg-slate-950/70 border border-purple-500/25 rounded-3xl backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.15)] z-10 grid grid-cols-1 lg:grid-cols-12 overflow-hidden min-h-[620px]"
      >
        
        {/* LEFT COLUMN: Large High-Quality Character Splash-Art + Widgets */}
        <div className="lg:col-span-6 relative border-r border-purple-500/15 bg-slate-950/40 flex flex-col justify-between overflow-hidden min-h-[450px]">
          
          {/* Dynamic Character Graphic Backdrop */}
          <div className="absolute inset-0 z-10 flex items-end justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={hair}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 0.9, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-cover bg-bottom"
                style={{ backgroundImage: `url(${PROTAGONIST_ART[hair]})` }}
              />
            </AnimatePresence>
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </div>

          {/* Floating Companion overlaid on character */}
          <div className="absolute right-6 top-24 z-20 pointer-events-none animate-[float_4s_ease-in-out_infinite]">
            {renderCompanionIcon(companion, false)}
          </div>

          {/* Glowing Platform Base teleporter at bottom */}
          <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-64 h-16 bg-purple-500/10 rounded-full border border-purple-500/50 shadow-[0_0_35px_rgba(168,85,247,0.6)] z-20 pointer-events-none [transform:rotateX(75deg)] flex items-center justify-center">
            <div className="w-52 h-12 rounded-full border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse" />
          </div>

          {/* Far-Left Absolute HUD Widgets */}
          <div className="relative z-20 p-6 flex flex-col justify-between h-full pointer-events-none max-w-xs space-y-6">
            
            {/* Widget 1: CORE STATS */}
            <div className="bg-slate-950/85 border border-purple-500/25 px-4 py-3.5 rounded-xl text-left w-52 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              <span className="text-[10px] font-black text-cyan-400 block uppercase tracking-widest border-b border-purple-500/20 pb-1.5 mb-2">
                Core Stats
              </span>
              <div className="space-y-2 text-[9px] font-mono">
                {[
                  { name: "Core Power", val: 82, color: "bg-purple-500" },
                  { name: "Memory Sync", val: 76, color: "bg-fuchsia-500" },
                  { name: "Adaptability", val: 88, color: "bg-cyan-500" },
                  { name: "Neural Link", val: 93, color: "bg-blue-500" }
                ].map((s, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-slate-300 font-bold uppercase">
                      <span>{s.name}</span>
                      <span className="text-white">{s.val}</span>
                    </div>
                    <div className="h-1 w-full bg-slate-900 rounded p-[0.5px]">
                      <div className={`h-full ${s.color} rounded`} style={{ width: `${s.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: SYSTEM STATUS */}
            <div className="bg-slate-950/85 border border-purple-500/25 px-4 py-2.5 rounded-xl text-left w-52 shadow-[0_0_15px_rgba(168,85,247,0.1)] space-y-1">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">System Status</span>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-green-400 animate-pulse tracking-widest">ONLINE</span>
                {/* Simulated Heartbeat SVG */}
                <svg className="w-16 h-6 text-green-400/60" viewBox="0 0 60 20">
                  <path d="M0 10 h15 l3 -6 l3 12 l3 -16 l3 14 l3 -4 h15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Widget 3: ACTIVE PROTOCOL */}
            <div className="bg-slate-950/85 border border-purple-500/25 px-4 py-2.5 rounded-xl text-left w-52 shadow-[0_0_15px_rgba(168,85,247,0.1)] flex justify-between items-center">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">Active Protocol</span>
              <span className="text-[9px] font-extrabold text-green-400 uppercase tracking-widest border border-green-500/35 px-1.5 py-0.5 rounded">
                STABLE
              </span>
            </div>

            {/* Widget 4: CODE MATRIX */}
            <div className="bg-slate-950/85 border border-purple-500/25 px-4 py-3 rounded-xl text-left w-52 shadow-[0_0_15px_rgba(168,85,247,0.15)] font-mono text-[9px] text-cyan-400/80 space-y-1">
              <div>&gt;&gt;&gt; import hero</div>
              <div>&gt;&gt;&gt; status = ready</div>
              <div>&gt;&gt;&gt; persona = undefined</div>
              <div className="flex items-center gap-1">
                <span>&gt;&gt;&gt; initializing...</span>
                <span className="w-1.5 h-3.5 bg-cyan-400 inline-block animate-pulse" />
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Selection Options Deck */}
        <div className="lg:col-span-6 p-6 md:p-10 flex flex-col justify-between space-y-6 bg-[#040118]/80 relative">
          
          {/* Top Actions: Sound toggle */}
          <div className="absolute top-4 right-6 pointer-events-auto">
            <button 
              onClick={() => sound.playClick()}
              className="p-1 border border-purple-500/20 bg-slate-950 text-slate-400 hover:text-white rounded cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.5 9H4.5A1.5 1.5 0 003 10.5v3a1.5 1.5 0 001.5 1.5h3L12 18.75z" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            
            {/* Header Title */}
            <div className="space-y-1 text-left">
              <h1 className="text-xl md:text-2xl font-black uppercase tracking-widest text-white">
                CHOOSE YOUR IDENTITY
              </h1>
              <p className="text-[10px] text-slate-400 tracking-wider">
                Every legend begins with a name. <br />
                The <span className="text-purple-400 font-bold">AI Core</span> is preparing your journey.
              </p>
            </div>

            {/* Input name & Terminal logs */}
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                <span>🔑</span> YOUR NAME
              </div>
              <input
                type="text"
                placeholder="ENTER KEYNAME ENCRYPTION..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-purple-500/35 focus:border-cyan-400/60 px-4 py-3.5 rounded-xl text-xs text-white uppercase placeholder-slate-700 outline-none tracking-widest transition-all font-mono"
                maxLength={12}
                required
              />

              {/* Console log display box */}
              <div className="bg-slate-950/80 border border-purple-500/15 p-3 rounded-lg min-h-[90px] font-mono text-[9px] space-y-1 text-left">
                {terminalLogs.length === 0 ? (
                  <div className="text-slate-600 italic">SYSTEM IDLE // AWAITING KEYNAME ENCODING.</div>
                ) : (
                  <>
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="text-green-400 font-bold">
                        {log}
                      </div>
                    ))}
                    {isTypingLogs && (
                      <span className="w-1.5 h-3 bg-green-500 inline-block animate-pulse" />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* HAIR STYLE Selector */}
            <div className="space-y-2 text-left">
              <div className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                &gt; HAIR STYLE (ARCHETYPE)
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {HAIR_OPTIONS.map((option) => {
                  const active = hair === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => { sound.playClick(); setHair(option); }}
                      className={`relative aspect-[3/4] rounded-lg overflow-hidden border cursor-pointer transition-all flex flex-col justify-end ${
                        active 
                          ? 'border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.35)] scale-102' 
                          : 'border-purple-500/10 hover:border-purple-500/35 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Character image crop thumbnail */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${PROTAGONIST_ART[option]})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      
                      {/* Selection Checkmark */}
                      {active && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full flex items-center justify-center text-[8px] text-slate-950 font-bold">
                          ✓
                        </div>
                      )}

                      {/* Small text label */}
                      <span className="relative z-10 text-[7px] font-black text-center text-white py-1 block w-full bg-slate-950/70 truncate uppercase">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI COMPANION Selector */}
            <div className="space-y-2 text-left">
              <div className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                &gt; AI COMPANION
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {COMPANION_OPTIONS.map((option) => {
                  const active = companion === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => { sound.playClick(); setCompanion(option); }}
                      className={`relative aspect-square rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center p-1 bg-slate-950/50 ${
                        active 
                          ? 'border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-102' 
                          : 'border-purple-500/10 hover:border-purple-500/25 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Selection Badge */}
                      {active && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full flex items-center justify-center text-[8px] text-slate-950 font-bold">
                          ✓
                        </div>
                      )}

                      {/* Mini SVG Drawing in button face */}
                      <div className="scale-65 h-10 w-10 flex items-center justify-center">
                        {renderCompanionIcon(option, true)}
                      </div>

                      <span className="text-[7px] font-black text-slate-300 uppercase truncate mt-1">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TACTICAL OUTFIT Selector */}
            <div className="space-y-2 text-left">
              <div className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">
                &gt; TACTICAL OUTFIT
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {OUTFIT_OPTIONS.map((option) => {
                  const active = outfit === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => { sound.playClick(); setOutfit(option); }}
                      className={`relative aspect-square rounded-lg border cursor-pointer transition-all flex flex-col items-center justify-center p-1 bg-slate-950/50 ${
                        active 
                          ? 'border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)] scale-102' 
                          : 'border-purple-500/10 hover:border-purple-500/25 opacity-70 hover:opacity-100'
                      }`}
                    >
                      {/* Selection Badge */}
                      {active && (
                        <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-cyan-400 rounded-full flex items-center justify-center text-[8px] text-slate-950 font-bold">
                          ✓
                        </div>
                      )}

                      {/* Mini Outfit Vector Icon */}
                      <div className="h-8 w-8 flex items-center justify-center">
                        {renderOutfitIcon(option)}
                      </div>

                      <span className="text-[7px] font-black text-slate-300 uppercase truncate mt-1">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Action Trigger */}
          <div className="space-y-3 pt-4">
            <button
              onClick={handleSubmit}
              disabled={!name.trim() || isSyncing}
              className="w-full py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 disabled:opacity-40 text-slate-950 font-extrabold uppercase text-xs tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.35)] hover:shadow-[0_0_20px_#00f2fe] border border-white/10 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🔮</span> COMPLETE SUMMONING
            </button>
            
            <div className="text-center font-mono text-[8px] text-slate-500 uppercase tracking-widest">
              Link your identity to the AI Core
            </div>

            <div className="text-center font-mono text-[9px] text-slate-400 uppercase tracking-wider pt-2">
              Your journey will be remembered across <span className="text-cyan-400 font-bold">all worlds.</span>
            </div>
          </div>

        </div>

      </motion.div>
    </div>
  );
};

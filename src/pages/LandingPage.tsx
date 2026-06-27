import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { sound } from '../utils/audio';
import { useGame } from '../context/GameContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGame();
  const [showDemo, setShowDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [soundOn, setSoundOn] = useState(sound.isSoundEnabled());

  const startButtonRoute = state.character ? "/world" : "/login";

  const toggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundOn(nextState);
    sound.playClick();
  };

  const demoScreens = [
    {
      title: "1. The Call to Adventure",
      text: "Meet your AI Companion. The village has forgotten how to store names, and weapons are unlabeled. You must recover the variables magic.",
      preview: (
        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-4 font-mono text-xs text-purple-300">
          <div className="text-cyan-400 font-bold mb-1">[SYSTEM]: Handshake initialized...</div>
          <div className="text-yellow-400 mb-2">Elder Byte:</div>
          <p className="italic text-slate-300">"Wanderer, the memory storm has wiped our records. Open your compiler and declare a variable named weapon set to 'Sword' to restore our forge!"</p>
        </div>
      )
    },
    {
      title: "2. The Monaco Arcane Workspace",
      text: "Write production-ready Python code directly in your browser. No installs needed. Our local compiler compiles it instantly.",
      preview: (
        <div className="bg-slate-950 border border-cyan-400/40 rounded-xl p-3 font-mono text-xs">
          <div className="flex justify-between items-center bg-slate-900 border-b border-cyan-900 px-3 py-1.5 rounded-t-lg -mx-3 -mt-3 text-[10px] text-slate-400">
            <span>forge_core.py</span>
            <span className="text-cyan-400">● Pyodide v0.26</span>
          </div>
          <div className="py-2 text-slate-300">
            <div><span className="text-pink-400"># Restore the forge's variable registers</span></div>
            <div><span className="text-yellow-300">weapon</span> = <span className="text-green-300">"Sword"</span></div>
            <div><span className="text-yellow-300">player</span> = <span className="text-green-300">"Kai"</span></div>
            <div><span className="text-yellow-300">score</span> = <span className="text-purple-300">100</span></div>
            <div className="animate-pulse w-1.5 h-4 bg-cyan-400 inline-block mt-1" />
          </div>
        </div>
      )
    },
    {
      title: "3. Claim XP & Unlocks",
      text: "Compile and execute. If your logic is correct, claim gold and experience. Level up to unlock future spell-crafting worlds.",
      preview: (
        <div className="bg-slate-900 border border-green-500/30 rounded-xl p-4 font-mono text-center">
          <div className="text-xl font-bold text-green-400 mb-1">QUEST SUCCESSFUL!</div>
          <div className="text-xs text-slate-400 mb-3">Memory blocks re-aligned inside Python Forest</div>
          <div className="flex justify-center gap-4 text-sm font-bold">
            <span className="text-purple-400 animate-bounce">+100 XP</span>
            <span className="text-yellow-400 animate-bounce delay-100">+25 COINS</span>
          </div>
        </div>
      )
    }
  ];

  const handleDemoNext = () => {
    sound.playClick();
    if (demoStep < demoScreens.length - 1) {
      setDemoStep(demoStep + 1);
    } else {
      setShowDemo(false);
      setDemoStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-slate-100 relative overflow-x-hidden flex flex-col justify-between font-sans">
      
      {/* Header Navigation Bar */}
      <header className="fixed top-0 inset-x-0 h-16 z-50 bg-[#030014]/75 backdrop-blur-md border-b border-purple-500/10">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          
          {/* Logo Left */}
          <Link to="/" className="flex items-center gap-2" onClick={() => sound.playClick()}>
            <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-slate-950 flex items-center justify-center rounded text-sm font-black text-cyan-400">
                A
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white tracking-widest uppercase">AnimeAI</span>
              <span className="text-[8px] text-purple-400 font-mono tracking-widest font-semibold uppercase leading-none">
                CODE. QUEST. CONQUER.
              </span>
            </div>
          </Link>

          {/* Nav Links Center */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-mono font-bold tracking-widest uppercase text-slate-400">
            <Link to="/" className="text-purple-400 hover:text-white transition-colors">Home</Link>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#worlds" className="hover:text-white transition-colors">Worlds</a>
            <a href="#how" className="hover:text-white transition-colors">How it Works</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSound}
              className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
              title="Toggle Audio"
            >
              {soundOn ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.5 9H4.5A1.5 1.5 0 003 10.5v3a1.5 1.5 0 001.5 1.5h3L12 18.75z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .9-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            <Link
              to={startButtonRoute}
              onClick={() => sound.playQuestStart()}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded text-[10px] font-extrabold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:scale-102 transition-all"
            >
              ⚔️ Start Adventure
            </Link>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-12 z-10 w-full flex-grow flex flex-col gap-8">
        
        {/* HERO SECTION WITH BACKDROP IMAGE */}
        <section className="relative w-full rounded-2xl border border-purple-500/15 overflow-hidden min-h-[460px] md:min-h-[500px] shadow-2xl flex items-center">
          
          {/* Backdrop Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none opacity-85"
            style={{ backgroundImage: 'url("/assets/landing_hero.png")' }}
          />

          {/* Left Gradient Cover */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030014] via-[#030014]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10 pointer-events-none" />

          {/* Left Content Overlay */}
          <div className="relative z-20 pl-6 md:pl-12 py-12 max-w-lg md:max-w-xl space-y-5 text-left">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-4xl font-extrabold tracking-widest uppercase text-white leading-tight font-mono">
                LEARNING <br />
                PROGRAMMING
              </h1>
              
              <div className="flex items-center gap-2 text-xs md:text-sm font-mono font-bold tracking-widest text-purple-400 uppercase">
                <span>✦</span>
                <span>SHOULD FEEL LIKE</span>
                <span>✦</span>
              </div>

              {/* Painted Massive Cursive PLAYING */}
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight uppercase leading-none font-sans italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                PLAYING
              </h1>

              <h1 className="text-xl md:text-3xl font-extrabold tracking-widest uppercase text-white leading-tight font-mono">
                AN ADVENTURE.
              </h1>
            </div>

            <p className="text-[11px] md:text-xs text-slate-300 font-mono leading-relaxed max-w-sm">
              Step into AnimeAI, where code is magic, bugs are monsters, and you are the hero who restores a broken world.
            </p>

            <div className="flex gap-3 pt-2">
              <Link
                to={startButtonRoute}
                onClick={() => sound.playQuestStart()}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-extrabold uppercase text-[10px] tracking-widest rounded transition-all hover:scale-102 flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                ⚔️ Start Adventure
              </Link>
              <button
                onClick={() => { sound.playClick(); setShowDemo(true); }}
                className="px-5 py-2.5 bg-slate-950/80 border border-purple-500/20 text-slate-300 hover:text-white font-extrabold uppercase text-[10px] tracking-widest rounded transition-all hover:scale-102 flex items-center gap-1.5"
              >
                ▶ Watch Demo
              </button>
            </div>
          </div>

          {/* RIGHT FLOATING WORLD NODES OVER METROPOLIS */}
          <div className="hidden lg:block absolute inset-y-0 right-0 left-1/2 z-20 pointer-events-auto">
            
            {/* Python Forest Node (Unlocked) */}
            <div 
              style={{ left: '10%', top: '48%' }} 
              onClick={() => { sound.playQuestStart(); navigate('/world/python'); }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group bg-slate-950/90 border border-green-500/60 p-2.5 rounded-lg text-center min-w-[100px] shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:scale-105 transition-all"
            >
              <div className="text-[9px] font-bold text-white tracking-widest uppercase">Python Forest</div>
              <div className="text-[8px] font-bold text-green-400 tracking-wider uppercase mt-1">Unlocked</div>
            </div>

            {/* Locked Nodes */}
            {[
              { name: "DSA Valley", x: '60%', y: '16%' },
              { name: "ML Volcano", x: '42%', y: '30%' },
              { name: "Deep Learning Academy", x: '60%', y: '42%' },
              { name: "LLM Galaxy", x: '25%', y: '65%' },
              { name: "RAG Library", x: '50%', y: '72%' },
              { name: "CL Agent Empire", x: '82%', y: '68%' }
            ].map((node, i) => (
              <div
                key={i}
                style={{ left: node.x, top: node.y }}
                onClick={() => sound.playQuestFail()}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-75 group bg-slate-950/80 border border-purple-500/20 p-2 rounded-lg text-center min-w-[90px] hover:border-purple-500/40 hover:opacity-100 transition-all"
              >
                <div className="text-[8px] font-bold text-slate-400 tracking-wider uppercase flex items-center justify-center gap-1">
                  <span>🔒</span> {node.name}
                </div>
              </div>
            ))}

          </div>

        </section>

        {/* FEATURES ROW */}
        <section id="features" className="w-full grid grid-cols-2 md:grid-cols-5 gap-3.5 bg-slate-950/40 border border-purple-500/10 p-4 rounded-xl backdrop-blur-sm">
          {[
            { title: "Story Driven Learning", desc: "Quests, NPCs & Epic Journeys", icon: "⭐" },
            { title: "Interactive Coding", desc: "Write Code. See Magic Happen Instantly.", icon: "</>" },
            { title: "XP & Rewards System", desc: "Level Up, Earn Loot, Unlock Powers", icon: "⚡" },
            { title: "Epic Worlds to Explore", desc: "From Forests to Galaxies, Your Adventure Awaits", icon: "⚔️" },
            { title: "AI Companion Guides You", desc: "Your Personal Mentor Through Every Step", icon: "🤖" }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-start gap-2.5 p-3 rounded-lg border border-purple-500/5 bg-slate-950/30 text-left font-mono"
            >
              <span className="text-purple-400 font-bold text-base">{item.icon}</span>
              <div className="space-y-0.5">
                <div className="text-[9px] font-black text-white uppercase tracking-wider leading-tight">{item.title}</div>
                <div className="text-[8px] text-slate-500 leading-normal">{item.desc}</div>
              </div>
            </div>
          ))}
        </section>

        {/* BOTTOM GRID: COMPARISON & ACTION PANEL */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          
          {/* Column 1: Comparative Platforms */}
          <div className="bg-slate-950/40 border border-purple-500/10 p-6 rounded-2xl flex flex-col justify-between">
            <div className="space-y-1 mb-4">
              <h2 className="text-sm font-black uppercase text-white tracking-widest font-mono flex items-center gap-1.5">
                Why Traditional Platforms Fail 💀
              </h2>
              <p className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">
                Passive learning leads to boredom. AnimeAI wraps curriculum inside RPG adventures.
              </p>
            </div>

            <div className="grid grid-cols-11 border border-purple-500/15 rounded-xl overflow-hidden bg-slate-950/50">
              
              {/* Traditional */}
              <div className="col-span-5 p-3.5 space-y-2 text-left font-mono text-[9px]">
                <div className="font-extrabold text-red-500 border-b border-purple-500/10 pb-1.5 uppercase tracking-wider text-center">
                  Traditional Platforms
                </div>
                {[
                  "Long videos & chapters",
                  "Dry quizzes & static pages",
                  "Certificates, not skills",
                  "No motivation to continue",
                  "Feels like a chore"
                ].map((txt, idx) => (
                  <div key={idx} className="text-red-400/80 flex items-center gap-1">
                    <span>❌</span> {txt}
                  </div>
                ))}
              </div>

              {/* VS separator */}
              <div className="col-span-1 flex items-center justify-center border-l border-r border-purple-500/10 bg-slate-900/15">
                <span className="text-[8px] font-black text-purple-400">VS</span>
              </div>

              {/* AnimeAI */}
              <div className="col-span-5 p-3.5 space-y-2 text-left font-mono text-[9px]">
                <div className="font-extrabold text-cyan-400 border-b border-purple-500/10 pb-1.5 uppercase tracking-wider text-center">
                  AnimeAI
                </div>
                {[
                  "Story driven quests",
                  "Interactive coding challenges",
                  "XP system & real progression",
                  "Addictive RPG gameplay",
                  "Feels like an adventure"
                ].map((txt, idx) => (
                  <div key={idx} className="text-green-400 flex items-center gap-1 font-bold">
                    <span>✔</span> {txt}
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Column 2: Action Panel */}
          <div className="bg-slate-950/40 border border-purple-500/10 p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none opacity-60"
              style={{ backgroundImage: 'url("/assets/landing_crystal.png")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent z-10 pointer-events-none" />

            <div className="relative z-20 space-y-4 max-w-[280px] text-left font-mono">
              <div className="space-y-1">
                <h3 className="text-sm font-black uppercase text-white tracking-widest leading-none">
                  A Broken World Needs <span className="text-purple-400">You</span>
                </h3>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest">
                  Memory cells are collapsing
                </p>
              </div>

              <p className="text-[10px] text-slate-300 leading-relaxed">
                The Code Fragments were stolen. Kingdoms are falling. Only a true programmer can restore the world.
              </p>

              <button
                onClick={() => { sound.playClick(); setShowDemo(true); }}
                className="px-4 py-2 bg-slate-950/80 border border-purple-500/25 hover:border-cyan-400 text-slate-300 hover:text-white font-extrabold uppercase text-[8px] tracking-widest rounded transition-all cursor-pointer flex items-center gap-1"
              >
                ▶ Watch Origin Trailer
              </button>
            </div>
          </div>

        </section>

      </main>

      {/* Cyber Footer */}
      <footer className="border-t border-purple-500/10 bg-slate-950/80 backdrop-blur py-8 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-mono text-purple-300/40 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold text-xs tracking-wider">ANIMEAI</span>
            <span>|</span>
            <span>Restoring coding memory.</span>
          </div>
          <div>
            <span>© 2026. SECURE SYSTEM CONSOLE. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>

      {/* Simulated Game Demo Modal */}
      <AnimatePresence>
        {showDemo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg border border-cyan-400/40 bg-slate-900 p-6 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.25)] relative font-mono text-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => { sound.playClick(); setShowDemo(false); setDemoStep(0); }}
                className="absolute top-4 right-4 text-slate-500 hover:text-cyan-400 transition-colors cursor-pointer text-sm font-bold"
              >
                [X]
              </button>

              <div className="border-b border-cyan-500/25 pb-3 mb-4 flex justify-between items-center text-xs text-cyan-400 font-bold">
                <span>SIMULATED TRAINING DECK</span>
                <span>STEP {demoStep + 1} / 3</span>
              </div>

              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">
                {demoScreens[demoStep].title}
              </h3>

              <p className="text-[10px] text-slate-400 leading-relaxed mb-6">
                {demoScreens[demoStep].text}
              </p>

              {/* Render dynamic code preview */}
              <div className="mb-8">
                {demoScreens[demoStep].preview}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleDemoNext}
                  className="px-5 py-2.5 bg-cyan-500 text-slate-950 rounded font-bold text-xs uppercase hover:bg-cyan-400 hover:shadow-[0_0_15px_#00f2fe] transition-all cursor-pointer"
                >
                  {demoStep === demoScreens.length - 1 ? "Finish Demo" : "Continue"} →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

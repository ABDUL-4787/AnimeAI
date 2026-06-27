import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { AvatarPreview, SVGDefs } from '../utils/avatars';
import { sound } from '../utils/audio';

const HAIR_OPTIONS = [
  'Purple Shadow',
  'Neon Blue Spikes',
  'Cyber Crimson',
  'Emerald Wave',
  'Golden Saiyan'
];

const OUTFIT_OPTIONS = [
  'Hackers Hoodie',
  'Shinobi Techwear',
  'Cyber Samurai',
  'Mecha Pilot Suit',
  'Astral Robes'
];

const COMPANION_OPTIONS = [
  'Robo-Owl',
  'Spark Dragon',
  'Cyber Cat',
  'Neko-Bot',
  'Byte-Sized Slime'
];

export const CharacterCreation: React.FC = () => {
  const { saveCharacter } = useGame();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [hair, setHair] = useState(HAIR_OPTIONS[0]);
  const [outfit, setOutfit] = useState(OUTFIT_OPTIONS[0]);
  const [companion, setCompanion] = useState(COMPANION_OPTIONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    sound.playLevelUp();
    saveCharacter({
      name: name.trim(),
      hair,
      outfit,
      companion
    });
    navigate('/world');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono">
      <SVGDefs />
      
      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-35 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-slate-950/70 border border-purple-500/25 p-6 md:p-10 rounded-3xl backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.15)] z-10 grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        
        {/* Left column: SVG Avatar Preview */}
        <div className="flex flex-col items-center justify-center space-y-6 bg-purple-950/10 border border-purple-500/10 p-6 rounded-2xl">
          <h2 className="text-sm font-bold tracking-widest text-cyan-400 uppercase">
            Constructing Shell
          </h2>
          
          <div className="w-52 h-52 bg-slate-950/40 border border-cyan-400/20 p-2 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.05)]">
            <AvatarPreview hair={hair} outfit={outfit} companion={companion} size={190} animated={true} />
          </div>

          <div className="text-center space-y-1">
            <div className="text-xs text-purple-300 font-bold uppercase">
              Companion: <span className="text-cyan-400">{companion}</span>
            </div>
            <div className="text-[10px] text-slate-500 max-w-xs uppercase leading-normal">
              Procedural vector frame rendering online...
            </div>
          </div>
        </div>

        {/* Right column: Customizer Settings Form */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wider text-white">
                Avatar Customizer
              </h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Select your parameters to complete compile
              </p>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                Assign Name
              </label>
              <input
                type="text"
                placeholder="INPUT AVATAR USERNAME"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-900 border border-purple-500/20 focus:border-cyan-400/60 px-4 py-2.5 rounded-xl text-xs text-white uppercase placeholder-slate-600 outline-none tracking-widest transition-all font-mono"
                maxLength={12}
                required
              />
            </div>

            {/* Hair Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                Cybernetic Hair
              </label>
              <div className="grid grid-cols-2 gap-2">
                {HAIR_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { sound.playClick(); setHair(option); }}
                    className={`py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
                      hair === option
                        ? 'bg-purple-900/60 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-900 border-purple-500/10 text-slate-400 hover:text-white hover:border-purple-500/30'
                    }`}
                  >
                    {option.split(' ')[0]} {/* display first word for fit */}
                  </button>
                ))}
              </div>
            </div>

            {/* Outfit Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                Tactical Outfit
              </label>
              <div className="grid grid-cols-2 gap-2">
                {OUTFIT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { sound.playClick(); setOutfit(option); }}
                    className={`py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
                      outfit === option
                        ? 'bg-purple-900/60 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-900 border-purple-500/10 text-slate-400 hover:text-white hover:border-purple-500/30'
                    }`}
                  >
                    {option.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Companion Selector */}
            <div className="space-y-1.5">
              <label className="block text-[10px] text-purple-400 uppercase tracking-widest font-bold">
                AI Companion
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COMPANION_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => { sound.playClick(); setCompanion(option); }}
                    className={`py-2 rounded-xl text-[10px] uppercase font-bold tracking-widest border transition-all cursor-pointer ${
                      companion === option
                        ? 'bg-purple-900/60 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)]'
                        : 'bg-slate-900 border-purple-500/10 text-slate-400 hover:text-white hover:border-purple-500/30'
                    }`}
                  >
                    {option.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 disabled:opacity-40 text-slate-950 font-extrabold uppercase text-xs tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] border border-white/10 cursor-pointer text-center"
          >
            🛡️ Complete Summoning
          </button>
        </form>

      </motion.div>
    </div>
  );
};

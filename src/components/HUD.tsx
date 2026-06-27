import React from 'react';
import { useGame } from '../context/GameContext';
import { AvatarPreview } from '../utils/avatars';
import { Link, useNavigate } from 'react-router-dom';
import { sound } from '../utils/audio';

export const HUD: React.FC = () => {
  const { state, resetGame } = useGame();
  const navigate = useNavigate();
  const [soundOn, setSoundOn] = React.useState(sound.isSoundEnabled());

  if (!state.character) return null;

  const xpPercent = Math.min(100, (state.xp / state.xpNeeded) * 100);

  const toggleSound = () => {
    const nextState = sound.toggleSound();
    setSoundOn(nextState);
    sound.playClick();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? Your character and level will be deleted.")) {
      resetGame();
      navigate('/');
    }
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto bg-slate-950/40 backdrop-blur-xl border border-purple-500/25 px-4 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all">
        
        {/* Profile / Avatar (Clicking leads to Profile) */}
        <Link to="/profile" className="flex items-center gap-3 group" onClick={() => sound.playClick()}>
          <div className="relative w-11 h-11 rounded-xl bg-purple-950/50 border border-purple-500/40 p-0.5 overflow-hidden shadow-[0_0_10px_rgba(168,85,247,0.3)] transition-transform group-hover:scale-105 duration-300">
            <AvatarPreview 
              hair={state.character.hair} 
              outfit={state.character.outfit} 
              companion={state.character.companion} 
              size={38} 
              animated={false} 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-mono text-sm font-semibold tracking-wider group-hover:text-cyan-400 transition-colors">
              {state.character.name}
            </span>
            <span className="text-[10px] text-cyan-400/90 font-mono tracking-widest uppercase">
              Rank: Recruit
            </span>
          </div>
        </Link>

        {/* Level and XP Progress */}
        <div className="hidden md:flex flex-col w-64 px-4 border-l border-r border-purple-500/20">
          <div className="flex items-center justify-between text-[11px] font-mono text-purple-300 mb-1">
            <span>LVL {state.level}</span>
            <span className="text-cyan-400">{state.xp} / {state.xpNeeded} XP</span>
          </div>
          <div className="h-2 w-full bg-slate-900/80 rounded-full overflow-hidden border border-purple-500/10 p-[1px]">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,242,254,0.5)] transition-all duration-500 ease-out"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Quest Info */}
        <div className="flex items-center gap-2 border-r md:border-l-0 border-purple-500/20 pr-4 md:px-4">
          <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest">Active Quest:</span>
          <Link 
            to="/world/python" 
            className="text-xs font-semibold text-white hover:text-cyan-300 transition-colors font-mono max-w-[140px] truncate"
            onClick={() => sound.playClick()}
          >
            {state.currentQuestId.toUpperCase()}
          </Link>
        </div>

        {/* Resources & Streaks */}
        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/10 border border-orange-500/30 rounded-lg text-orange-400 font-mono text-xs shadow-[0_0_8px_rgba(249,115,22,0.1)]">
            <span className="animate-pulse">🔥</span>
            <span className="font-bold">{state.streak}D STREAK</span>
          </div>

          {/* Coins */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 font-mono text-xs shadow-[0_0_8px_rgba(234,179,8,0.1)]">
            <span className="animate-spin-slow">🪙</span>
            <span className="font-bold">{state.coins} GOLD</span>
          </div>

          {/* Sound & Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-lg border border-purple-500/30 bg-purple-950/20 text-purple-300 hover:bg-purple-950/40 hover:text-white transition-all cursor-pointer pointer-events-auto shadow-[0_0_5px_rgba(168,85,247,0.1)]"
              title={soundOn ? "Mute SFX" : "Unmute SFX"}
            >
              {soundOn ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.5 9H4.5A1.5 1.5 0 003 10.5v3a1.5 1.5 0 001.5 1.5h3L12 18.75z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .9-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              )}
            </button>
            
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-all cursor-pointer pointer-events-auto shadow-[0_0_5px_rgba(239,68,68,0.1)]"
              title="Reset Database"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

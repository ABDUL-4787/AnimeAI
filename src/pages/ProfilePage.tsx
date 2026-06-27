import React from 'react';
import { useGame } from '../context/GameContext';
import { AvatarPreview } from '../utils/avatars';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/audio';

interface Achievement {
  id: string;
  name: string;
  desc: string;
  icon: string;
  unlocked: boolean;
}

export const ProfilePage: React.FC = () => {
  const { state, resetGame } = useGame();
  const navigate = useNavigate();

  if (!state.character) return null;

  const achievements: Achievement[] = [
    {
      id: 'first_var',
      name: 'Label Master',
      desc: 'Declare variables inside the blacksmith forge.',
      icon: '🛡️',
      unlocked: state.completedQuests.includes('variables'),
    },
    {
      id: 'loop_master',
      name: 'Loop Runner',
      desc: 'Automate berry harvesting using loop routines.',
      icon: '🔄',
      unlocked: state.completedQuests.includes('loops'),
    },
    {
      id: 'oop_master',
      name: 'Code Summoner',
      desc: 'Summon mecha-drones using blueprints (OOP).',
      icon: '🤖',
      unlocked: state.completedQuests.includes('oop'),
    },
    {
      id: 'completionist',
      name: 'Oracle Initiate',
      desc: 'Complete all 12 quest files inside Python Forest.',
      icon: '🏆',
      unlocked: state.completedQuests.length === 12,
    }
  ];

  const handleReset = () => {
    sound.playClick();
    if (confirm("Reset database? This wipes your character progress!")) {
      resetGame();
      navigate('/');
    }
  };

  const xpPercent = Math.min(100, (state.xp / state.xpNeeded) * 100);

  return (
    <div className="min-h-screen bg-[#030014] text-white font-mono select-none pt-20 relative overflow-hidden flex flex-col items-center justify-center p-6">
      
      {/* Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-25 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl bg-slate-950/70 border border-purple-500/25 p-6 md:p-10 rounded-3xl backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.15)] z-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left column: Avatar preview and controls */}
        <div className="md:col-span-4 flex flex-col items-center justify-center space-y-6 bg-purple-950/15 border border-purple-500/10 p-6 rounded-2xl">
          <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
            Recruit Status
          </h2>
          
          <div className="w-44 h-44 bg-slate-950/40 border border-cyan-400/20 p-2 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.05)]">
            <AvatarPreview 
              hair={state.character.hair} 
              outfit={state.character.outfit} 
              companion={state.character.companion} 
              size={160} 
              animated={true} 
            />
          </div>

          <div className="text-center space-y-1 w-full">
            <div className="text-sm font-bold text-white uppercase tracking-wider">
              {state.character.name}
            </div>
            <div className="text-[10px] text-purple-400 uppercase tracking-widest font-semibold">
              Companion: {state.character.companion}
            </div>
          </div>

          <div className="w-full space-y-2.5 pt-4 border-t border-purple-500/10">
            <button
              onClick={() => { sound.playClick(); navigate('/world/python'); }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-slate-950 font-bold uppercase text-[10px] tracking-widest rounded-xl hover:shadow-[0_0_12px_#00f2fe] transition-all cursor-pointer text-center"
            >
              Resume Quests
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-red-950/30 border border-red-500/30 text-red-400 font-bold uppercase text-[10px] tracking-widest rounded-xl hover:bg-red-950/50 transition-all cursor-pointer text-center"
            >
              Format Memory (Reset)
            </button>
          </div>
        </div>

        {/* Right column: Stats and Achievements */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Progression Stats */}
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-bold uppercase tracking-wider text-white">
                Dossier Statistics
              </h1>
              <p className="text-[9px] text-slate-400 uppercase tracking-wider">
                Compile statistics of your active session
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-900/40 border border-purple-500/20 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Rank Level</div>
                <div className="text-xl font-bold text-white">LVL {state.level}</div>
              </div>
              <div className="bg-slate-900/40 border border-purple-500/20 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Mana Gold</div>
                <div className="text-xl font-bold text-yellow-400">🪙 {state.coins}</div>
              </div>
              <div className="bg-slate-900/40 border border-purple-500/20 p-3 rounded-xl text-center">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Streak</div>
                <div className="text-xl font-bold text-orange-400">🔥 {state.streak}D</div>
              </div>
            </div>

            {/* XP bar */}
            <div className="space-y-1 bg-slate-900/20 border border-purple-500/10 p-3 rounded-xl">
              <div className="flex justify-between text-[10px] text-purple-300 font-bold">
                <span>XP PROGRESS</span>
                <span>{state.xp} / {state.xpNeeded} XP</span>
              </div>
              <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-purple-500/20 p-[1px]">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 rounded-full shadow-[0_0_8px_#00f2fe]"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Achievements badges */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Memory Badges (Achievements)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div 
                  key={ach.id}
                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    ach.unlocked 
                      ? 'bg-purple-950/20 border-purple-500/40 text-white shadow-[0_0_10px_rgba(168,85,247,0.1)]' 
                      : 'bg-slate-900/20 border-slate-900 text-slate-600'
                  }`}
                >
                  <span className="text-2xl">{ach.unlocked ? ach.icon : '🔒'}</span>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider">{ach.name}</div>
                    <div className="text-[9px] text-slate-500 leading-tight">{ach.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unlocked / Completed Quests count */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-purple-500/20 pb-2">
              Completed Forest Quests ({state.completedQuests.length} / 12)
            </h3>
            <div className="text-[9px] text-slate-400 uppercase leading-relaxed max-h-24 overflow-y-auto bg-slate-900/25 border border-purple-500/10 p-3 rounded-xl space-y-1 font-mono">
              {state.completedQuests.length === 0 ? (
                <div className="text-purple-300/40 italic">No quests solved. Start your adventure in Python Forest!</div>
              ) : (
                state.completedQuests.map((qId, idx) => (
                  <div key={qId} className="text-green-400 font-bold flex items-center gap-1.5">
                    <span>🛡️</span> QUEST COMPLETE: {qId.toUpperCase()}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { quests } from '../data/lessonsData';
import { sound } from '../utils/audio';
import { CinematicTransition } from '../components/CinematicTransition';
import { AvatarPreview } from '../utils/avatars';

export const PythonWorld: React.FC = () => {
  const { state } = useGame();
  const navigate = useNavigate();

  const [transitioning, setTransitioning] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState('');
  const [activeTab, setActiveTab] = useState<'quests' | 'lore'>('quests');

  // Verify if a quest is unlocked
  const isQuestUnlocked = (questId: string): boolean => {
    if (questId === 'variables') return true; // first quest is always unlocked
    
    // Find index of quest
    const questsList = quests.map(q => q.id);
    const currentIdx = questsList.indexOf(questId);
    if (currentIdx === -1) return false;

    // Check if the previous quest is in completed list
    const prevQuestId = questsList[currentIdx - 1];
    return state.completedQuests.includes(prevQuestId);
  };

  const handleQuestClick = (questId: string) => {
    if (isQuestUnlocked(questId)) {
      sound.playQuestStart();
      setSelectedQuestId(questId);
      setTransitioning(true);
    } else {
      sound.playQuestFail();
    }
  };

  const handleTransitionComplete = () => {
    setTransitioning(false);
    navigate(`/quest/${selectedQuestId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-mono select-none pt-20 relative overflow-hidden flex flex-col justify-between">
      
      {/* Forest background matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(34,197,94,0.1),transparent)] pointer-events-none z-0" />
      <div className="absolute inset-0 cyber-grid opacity-15 z-0" />

      {/* Cinematic Transition */}
      <CinematicTransition 
        isActive={transitioning} 
        title={`COMMENCING QUEST PROTOCOL...`} 
        subtitle="STABILIZING PYODIDE COMPILING REGISTERS..."
        onComplete={handleTransitionComplete}
      />

      <div className="max-w-7xl mx-auto px-6 py-6 w-full flex-grow flex flex-col justify-between gap-6 relative z-10">
        
        {/* World Header Info */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-slate-900/40 border border-green-500/20 px-6 py-3 rounded-2xl backdrop-blur-sm gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌲</span>
            <div>
              <h1 className="text-base font-bold text-green-400 uppercase tracking-widest leading-none">
                Python Forest Zone
              </h1>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                Nodes: {state.completedQuests.length} / {quests.length} Completed
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => { sound.playClick(); navigate('/world'); }}
              className="px-4 py-2 border border-purple-500/35 hover:border-cyan-400 bg-purple-950/20 text-purple-300 hover:text-white rounded-lg text-xs font-bold uppercase transition-all cursor-pointer shadow-[0_0_8px_rgba(168,85,247,0.1)]"
            >
              🌌 System Map
            </button>
          </div>
        </div>

        {/* NPC Dialogue Box (AAA immersive storyline presentation) */}
        <div className="bg-slate-950/80 border border-green-500/25 p-5 rounded-2xl backdrop-blur-md shadow-[0_0_15px_rgba(34,197,94,0.05)] grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* NPC Avatar preview */}
          {state.character && (
            <div className="md:col-span-2 flex flex-col items-center gap-1.5 border-b md:border-b-0 md:border-r border-green-500/10 pb-3 md:pb-0 md:pr-4">
              <div className="relative w-16 h-16 rounded-xl bg-green-950/20 border border-green-500/30 overflow-hidden p-0.5 shadow-[0_0_8px_rgba(34,197,94,0.15)]">
                <AvatarPreview 
                  hair={state.character.hair} 
                  outfit={state.character.outfit} 
                  companion={state.character.companion} 
                  size={58} 
                  animated={true} 
                />
              </div>
              <span className="text-[9px] text-green-400 uppercase tracking-widest font-bold font-mono">
                {state.character.companion.split(' ')[0]}
              </span>
            </div>
          )}

          {/* Dialogue text */}
          <div className="md:col-span-10 space-y-1.5 pl-2">
            <div className="text-[10px] text-green-400 uppercase font-bold tracking-widest">
              &gt;&gt; TRANSMISSION INTERCEPTED
            </div>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic font-mono">
              "The memory corruption has reached the forest blacksmith, Kai. The villagers cannot store information in their registers. Recover the 'Variables' core to prevent their memories from decaying entirely!"
            </p>
          </div>
        </div>

        {/* Quests select grid */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Main Quest nodes Board */}
          <div className="md:col-span-3 bg-slate-950/60 border border-purple-500/20 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex justify-between items-center border-b border-purple-500/20 pb-2 mb-4">
              <span className="text-xs font-bold text-white uppercase tracking-widest">Active Quest Logs</span>
              <span className="text-[10px] text-purple-400">SELECT CHECKPOINT</span>
            </div>

            {/* Horizontal flow line of quest nodes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3.5">
              {quests.map((q, idx) => {
                const unlocked = isQuestUnlocked(q.id);
                const completed = state.completedQuests.includes(q.id);
                const current = state.currentQuestId === q.id;

                let borderTheme = 'border-purple-500/10 bg-slate-900/20 text-slate-600';
                if (unlocked) {
                  borderTheme = completed 
                    ? 'border-green-500/40 bg-green-950/10 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.15)] hover:border-green-400' 
                    : 'border-cyan-500/40 bg-cyan-950/10 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:border-cyan-400 animate-pulse';
                }
                if (current && !completed) {
                  borderTheme = 'border-yellow-500/50 bg-yellow-950/10 text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:border-yellow-400 animate-pulse';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleQuestClick(q.id)}
                    className={`p-4 rounded-xl border flex flex-col justify-between items-start gap-3 transition-all duration-300 relative group cursor-pointer ${borderTheme}`}
                  >
                    {/* Level marker */}
                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      Q-{idx + 1}
                    </div>

                    {/* Quest Title */}
                    <div className="text-[10px] font-bold text-white uppercase tracking-wider text-left leading-normal h-8 flex items-center">
                      {q.title.replace(/Quest \d+: /, '').replace(/ \(.+\)/, '')}
                    </div>

                    {/* Checkpoint Status Indicator badge */}
                    <div className="flex justify-between items-center w-full mt-2 text-[9px] font-bold">
                      {completed ? (
                        <span className="text-green-400">🛡️ SOLVED</span>
                      ) : unlocked ? (
                        <span className="text-cyan-400 animate-pulse">⚡ ACTIVE</span>
                      ) : (
                        <span className="text-slate-600">🔒 LOCKED</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

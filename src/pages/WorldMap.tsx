import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/audio';
import { CinematicTransition } from '../components/CinematicTransition';

interface WorldNode {
  id: string;
  name: string;
  x: number; // percentage coordinate
  y: number;
  unlocked: boolean;
  color: string; // cyan, green, purple
  details: string;
  prereq?: string;
}

export const WorldMap: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredNode, setHoveredNode] = useState<WorldNode | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [loadingTitle, setLoadingTitle] = useState('');

  const worlds: WorldNode[] = [
    {
      id: 'python',
      name: 'Python Forest',
      x: 18,
      y: 45,
      unlocked: true,
      color: '#22c55e', // Neon Green
      details: 'Master variables, structures, lists, and summon constructs. Realign the foundation of programming.',
    },
    {
      id: 'dsa',
      name: 'DSA Valley',
      x: 42,
      y: 30,
      unlocked: false,
      color: '#8b5cf6', // Purple
      details: 'Conquer algorithms, binary trees, sorting networks, and complex queues.',
      prereq: 'Python Forest'
    },
    {
      id: 'ml',
      name: 'ML Volcano',
      x: 38,
      y: 65,
      unlocked: false,
      color: '#ff5722', // Orange/Red
      details: 'Learn linear regressions, clustering magics, and predict future sensor readouts.',
      prereq: 'Python Forest'
    },
    {
      id: 'deeplearning',
      name: 'DL Academy',
      x: 62,
      y: 42,
      unlocked: false,
      color: '#ec4899', // Pink
      details: 'Construct deep neural grids, convolutional matrices, and recurrent synapses.',
      prereq: 'DSA Valley'
    },
    {
      id: 'cloud',
      name: 'Cloud Empire',
      x: 58,
      y: 75,
      unlocked: false,
      color: '#3b82f6', // Blue
      details: 'Scale databases, containerize micro-drones, and deploy cluster grids across the ether.',
      prereq: 'ML Volcano'
    },
    {
      id: 'rag',
      name: 'RAG Library',
      x: 78,
      y: 28,
      unlocked: false,
      color: '#eab308', // Yellow
      details: 'Build vector databases, embed spell scrolls, and inject custom contextual records.',
      prereq: 'DL Academy'
    },
    {
      id: 'agent',
      name: 'AI Agent City',
      x: 76,
      y: 60,
      unlocked: false,
      color: '#06b6d4', // Cyan
      details: 'Synthesize autonomous agents with planning cores, memory caches, and tool executors.',
      prereq: 'DL Academy'
    },
    {
      id: 'llm',
      name: 'LLM Galaxy',
      x: 92,
      y: 45,
      unlocked: false,
      color: '#f43f5e', // Rose
      details: 'Explore tokenized horizons, attention heads, and fine-tune massive foundational intelligences.',
      prereq: 'AI Agent City'
    }
  ];

  const handleNodeClick = (node: WorldNode) => {
    if (node.unlocked) {
      sound.playQuestStart();
      setLoadingTitle(`Entering ${node.name}...`);
      setTransitioning(true);
    } else {
      sound.playQuestFail();
    }
  };

  const handleTransitionComplete = () => {
    setTransitioning(false);
    navigate('/world/python');
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white select-none relative overflow-hidden font-mono pt-20">
      
      {/* Background Matrix/Grid & Star cluster */}
      <div className="absolute inset-0 cyber-grid opacity-25 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(88,28,135,0.08),transparent)] pointer-events-none" />

      {/* Cinematic Transition */}
      <CinematicTransition 
        isActive={transitioning} 
        title={loadingTitle} 
        subtitle="ESTABLISHING COGNITIVE INTERFACE..."
        onComplete={handleTransitionComplete}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10 flex flex-col h-[calc(100vh-80px)] justify-between">
        
        {/* Header Title */}
        <div className="text-center space-y-1">
          <h1 className="text-xl md:text-3xl font-extrabold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            SYSTEM CONSTELLATION MAP
          </h1>
          <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest">
            Select an unlocked node to synchronize memory registers
          </p>
        </div>

        {/* Map Constellation Interface */}
        <div className="relative flex-grow flex items-center justify-center min-h-[400px]">
          
          {/* Constellation SVG Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minHeight: '400px' }}>
            <defs>
              <linearGradient id="unlocked-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="locked-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Connection Vectors */}
            {/* Python Forest -> DSA Valley */}
            <line x1="18%" y1="45%" x2="42%" y2="30%" stroke="url(#locked-line)" strokeWidth="1.5" strokeDasharray="6 4" />
            {/* Python Forest -> ML Volcano */}
            <line x1="18%" y1="45%" x2="38%" y2="65%" stroke="url(#locked-line)" strokeWidth="1.5" strokeDasharray="6 4" />
            {/* DSA Valley -> DL Academy */}
            <line x1="42%" y1="30%" x2="62%" y2="42%" stroke="url(#locked-line)" strokeWidth="1.5" />
            {/* ML Volcano -> Cloud Empire */}
            <line x1="38%" y1="65%" x2="58%" y2="75%" stroke="url(#locked-line)" strokeWidth="1.5" />
            {/* DL Academy -> RAG Library */}
            <line x1="62%" y1="42%" x2="78%" y2="28%" stroke="url(#locked-line)" strokeWidth="1.5" />
            {/* DL Academy -> AI Agent City */}
            <line x1="62%" y1="42%" x2="76%" y2="60%" stroke="url(#locked-line)" strokeWidth="1.5" />
            {/* AI Agent City -> LLM Galaxy */}
            <line x1="76%" y1="60%" x2="92%" y2="45%" stroke="url(#locked-line)" strokeWidth="1.5" />
          </svg>

          {/* Interactive World Nodes */}
          {worlds.map((w) => {
            const isHovered = hoveredNode?.id === w.id;
            
            return (
              <div
                key={w.id}
                style={{ left: `${w.x}%`, top: `${w.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <div
                  onMouseEnter={() => { sound.playClick(); setHoveredNode(w); }}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => handleNodeClick(w)}
                  className="relative group cursor-pointer"
                >
                  {/* Glowing core */}
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300 relative ${
                      w.unlocked
                        ? 'bg-green-950/40 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] animate-pulse'
                        : 'bg-purple-950/20 border-purple-500/20 hover:border-purple-500/40 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                    }`}
                  >
                    {w.unlocked ? (
                      <span className="text-xl">🌳</span>
                    ) : (
                      <span className="text-slate-500 text-xs">🔒</span>
                    )}

                    {/* Outer radar ping ring */}
                    {w.unlocked && (
                      <span className="absolute -inset-2.5 rounded-full border border-green-500/35 animate-ping opacity-75 pointer-events-none" />
                    )}
                  </div>

                  {/* Node label */}
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-950/80 px-2 py-0.5 rounded border border-purple-500/20 text-[10px] font-bold text-center tracking-wider text-slate-300 uppercase">
                    {w.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info panel / tooltip preview */}
        <div className="h-28 border border-purple-500/25 bg-slate-950/60 backdrop-blur rounded-2xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(168,85,247,0.05)]">
          {hoveredNode ? (
            <div className="flex justify-between w-full items-center gap-4">
              <div className="space-y-1 max-w-2xl">
                <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                  {hoveredNode.name} {hoveredNode.unlocked ? '(UNLOCKED)' : '(LOCKED)'}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                  {hoveredNode.details}
                </p>
              </div>
              {!hoveredNode.unlocked && hoveredNode.prereq && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 font-bold px-3 py-1.5 rounded text-[10px] tracking-wider uppercase">
                  Locked: Requires {hoveredNode.prereq}
                </div>
              )}
              {hoveredNode.unlocked && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 font-bold px-3 py-1.5 rounded text-[10px] tracking-wider uppercase animate-pulse">
                  Click to enter world
                </div>
              )}
            </div>
          ) : (
            <div className="text-center w-full text-xs text-purple-300/40 uppercase tracking-widest font-mono">
              Hover over world nodes to project terminal coordinates...
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

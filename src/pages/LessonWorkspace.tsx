import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { useGame } from '../context/GameContext';
import { quests, type Quest } from '../data/lessonsData';
import { runPythonCode } from '../utils/pyodideRunner';
import { sound } from '../utils/audio';
import { AvatarPreview } from '../utils/avatars';

export const LessonWorkspace: React.FC = () => {
  const { questId } = useParams<{ questId: string }>();
  const navigate = useNavigate();
  const { state, completeQuest } = useGame();

  const [quest, setQuest] = useState<Quest | null>(null);
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState<'story' | 'theory' | 'practice'>('story');
  
  // Execution states
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [compilerStatus, setCompilerStatus] = useState<'idle' | 'loading' | 'executing'>('idle');

  useEffect(() => {
    const activeQuest = quests.find(q => q.id === questId);
    if (activeQuest) {
      setQuest(activeQuest);
      setCode(activeQuest.initialCode);
      setIsSuccess(false);
      setErrorMessage(null);
      setConsoleLogs([]);
    } else {
      navigate('/world/python');
    }
  }, [questId, navigate]);

  if (!quest) return null;

  const handleRunCode = async () => {
    sound.playClick();
    setIsRunning(true);
    setCompilerStatus('executing');
    setConsoleLogs(["> Initializing compilation compiler...", "> running Pyodide sandboxed core..."]);
    setErrorMessage(null);

    // Give a short delay to feel like a high-tech compile sweep
    setTimeout(async () => {
      try {
        const result = await runPythonCode(code, quest.expectedVars);

        const logs: string[] = [];
        if (result.stdout) {
          logs.push(...result.stdout.split('\n').filter(l => l.trim() !== ''));
        }

        if (result.success) {
          setConsoleLogs(prev => [...prev, ...logs, "> Execution completed successfully."]);
          
          // Verify conditions
          const validation = quest.validate(result.variables, result.stdout);
          if (validation.success) {
            setIsSuccess(true);
            setConsoleLogs(prev => [...prev, "> Validation PASSED. Quest completed!"]);
            completeQuest(quest.id, quest.rewards.xp, quest.rewards.coins);
          } else {
            setIsSuccess(false);
            setErrorMessage(validation.error || "Quest criteria not satisfied.");
            sound.playQuestFail();
          }
        } else {
          setConsoleLogs(prev => [...prev, ...logs]);
          setErrorMessage(result.stderr || "Runtime exception occurred.");
          sound.playQuestFail();
        }
      } catch (err: any) {
        setErrorMessage(err.message || String(err));
        sound.playQuestFail();
      } finally {
        setIsRunning(false);
        setCompilerStatus('idle');
      }
    }, 600);
  };

  const handleNextQuest = () => {
    sound.playClick();
    // Return to Python Forest to select the next quest
    navigate('/world/python');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-mono select-none pt-18 flex flex-col md:flex-row relative overflow-hidden">
      
      {/* Background Matrix */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.05),transparent)] pointer-events-none z-0" />
      <div className="absolute inset-0 cyber-grid opacity-10 z-0" />

      {/* LEFT PANEL: Lore & Instructions (Tab structure) */}
      <div className="w-full md:w-[45%] border-r border-purple-500/25 flex flex-col justify-between bg-slate-950/40 backdrop-blur z-10">
        
        {/* Workspace Title & Navigation */}
        <div className="border-b border-purple-500/25 px-5 py-3 flex justify-between items-center bg-purple-950/10">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest truncate max-w-[200px]">
            {quest.title}
          </span>
          <button 
            onClick={() => { sound.playClick(); navigate('/world/python'); }}
            className="text-[10px] text-slate-400 hover:text-cyan-300 uppercase transition-colors cursor-pointer"
          >
            [Exit to Forest]
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-purple-500/20 bg-slate-900/10 text-[10px] font-bold tracking-wider">
          <button
            onClick={() => { sound.playClick(); setActiveTab('story'); }}
            className={`flex-1 py-3 text-center border-b-2 uppercase transition-all cursor-pointer ${
              activeTab === 'story' ? 'border-cyan-400 text-cyan-400 bg-cyan-950/5' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            📖 Lore
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('theory'); }}
            className={`flex-1 py-3 text-center border-b-2 uppercase transition-all cursor-pointer ${
              activeTab === 'theory' ? 'border-cyan-400 text-cyan-400 bg-cyan-950/5' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            🧬 Theory
          </button>
          <button
            onClick={() => { sound.playClick(); setActiveTab('practice'); }}
            className={`flex-1 py-3 text-center border-b-2 uppercase transition-all cursor-pointer ${
              activeTab === 'practice' ? 'border-cyan-400 text-cyan-400 bg-cyan-950/5' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            🎯 Quests
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="flex-grow p-6 overflow-y-auto max-h-[55vh] md:max-h-[65vh] space-y-4">
          
          {activeTab === 'story' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">NPC Dialogue:</h3>
              <div className="bg-slate-950 border border-purple-500/25 p-4 rounded-xl flex items-start gap-4">
                {state.character && (
                  <div className="flex-shrink-0 w-11 h-11 border border-purple-500/30 rounded-lg overflow-hidden p-0.5">
                    <AvatarPreview 
                      hair={state.character.hair} 
                      outfit={state.character.outfit} 
                      companion={state.character.companion} 
                      size={40} 
                      animated={false} 
                    />
                  </div>
                )}
                <div>
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">{state.character?.companion.split(' ')[0]}</span>
                  <p className="text-[11px] text-slate-300 italic leading-relaxed mt-1">
                    "{quest.npcDialogue}"
                  </p>
                </div>
              </div>

              <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-6">Lore Narrative:</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {quest.story}
              </p>
            </div>
          )}

          {activeTab === 'theory' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Arcane Formula:</h3>
              <div className="whitespace-pre-line border border-purple-500/10 p-2.5 rounded-xl bg-purple-950/5">
                {quest.theory}
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-4">Example Spell:</h3>
              <pre className="bg-slate-950 p-3 rounded-lg border border-purple-950 text-[11px] overflow-x-auto text-cyan-300">
                <code>{quest.example}</code>
              </pre>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Objective Targets:</h3>
              <div className="whitespace-pre-line border border-cyan-400/20 bg-cyan-950/5 p-4 rounded-xl text-slate-300 leading-relaxed">
                {quest.practiceDescription}
              </div>
              
              <div className="bg-slate-950 p-4 border border-purple-950 rounded-xl space-y-2">
                <span className="text-[10px] text-purple-400 uppercase font-bold tracking-widest">Reward Clears:</span>
                <div className="flex gap-4 font-mono font-bold text-xs">
                  <span className="text-purple-400">⚡ {quest.rewards.xp} XP</span>
                  <span className="text-yellow-400">🪙 {quest.rewards.coins} COINS</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action instruction alert */}
        <div className="p-4 border-t border-purple-500/20 bg-purple-950/5 text-[10px] text-slate-500 uppercase tracking-widest text-center">
          Write Python code in Monaco Editor and execute locally.
        </div>

      </div>

      {/* RIGHT PANEL: Monaco IDE & Compiler Output */}
      <div className="w-full md:w-[55%] flex flex-col justify-between bg-slate-950/30 z-10 relative">
        
        {/* Monaco IDE Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-slate-900 border-b border-purple-500/25">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            ⚛️ python_compiler.py
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="px-4 py-1.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold uppercase text-[10px] tracking-wider rounded transition-all cursor-pointer hover:shadow-[0_0_15px_#00f2fe]"
            >
              {isRunning ? '🛠️ COMPILING...' : '⚡ RUN CORE'}
            </button>
          </div>
        </div>

        {/* Monaco Editor Container */}
        <div className="flex-grow border-b border-purple-500/25 relative min-h-[300px]">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              fontSize: 13,
              minimap: { enabled: false },
              lineNumbers: 'on',
              scrollbar: { vertical: 'visible' },
              automaticLayout: true,
              fontFamily: 'JetBrains Mono'
            }}
          />
        </div>

        {/* Console / Output Terminal */}
        <div className="h-44 bg-slate-950/90 flex flex-col justify-between border-t border-purple-500/10">
          <div className="flex justify-between items-center bg-slate-900 px-4 py-1 border-b border-purple-500/10 text-[9px] text-slate-500 font-bold uppercase">
            <span>Terminal Registers</span>
            {compilerStatus !== 'idle' && (
              <span className="text-cyan-400 animate-pulse">Running compilation...</span>
            )}
          </div>
          
          <div className="flex-grow p-4 font-mono text-[10px] overflow-y-auto space-y-1.5 scrollbar-thin">
            {consoleLogs.length === 0 && !errorMessage ? (
              <div className="text-purple-300/40 uppercase tracking-widest">
                Compiler idle. Click "RUN CORE" to execute code.
              </div>
            ) : (
              <>
                {consoleLogs.map((log, i) => (
                  <div key={i} className="text-cyan-400/90 leading-tight select-text">
                    {log}
                  </div>
                ))}
                {errorMessage && (
                  <div className="text-red-400 leading-tight font-semibold select-text">
                    &gt; EXCEPTION: {errorMessage}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>

      {/* Quest Reward Modal overlay */}
      <AnimatePresence>
        {isSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="w-full max-w-md border border-green-500 bg-slate-900 p-8 rounded-2xl shadow-[0_0_50px_rgba(34,197,94,0.3)] relative text-center text-slate-100 font-mono"
            >
              <div className="text-[10px] text-green-400 border border-green-400/35 px-2 py-0.5 rounded uppercase tracking-widest font-bold inline-block mb-3 animate-pulse">
                Handshake Stable
              </div>
              
              <h2 className="text-2xl font-extrabold text-white uppercase tracking-wider mb-2">
                Quest Complete!
              </h2>
              
              <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider">
                The villagers thank you. Coding registers restored.
              </p>

              {/* Reward values with floating bounce effect */}
              <div className="flex justify-center gap-6 py-6 border-t border-b border-green-500/20 mb-8">
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl animate-bounce">⚡</span>
                  <span className="text-sm font-bold text-purple-400">+{quest.rewards.xp} XP</span>
                </motion.div>
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-2xl animate-bounce">🪙</span>
                  <span className="text-sm font-bold text-yellow-400">+{quest.rewards.coins} GOLD</span>
                </motion.div>
              </div>

              <button
                onClick={handleNextQuest}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-cyan-500 text-slate-950 font-extrabold uppercase text-xs tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_20px_#00ff87] border border-white/20 hover:scale-102 cursor-pointer"
              >
                Continue Quest Line
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

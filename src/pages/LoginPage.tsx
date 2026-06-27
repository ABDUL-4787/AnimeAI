import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/audio';
import { useGame } from '../context/GameContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGame();
  const [username, setUsername] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [terminalLog, setTerminalLog] = useState<string[]>([]);

  const runLoginLog = (finalName: string) => {
    setIsConnecting(true);
    sound.playQuestStart();
    const logs = [
      "> initiating connection to core database...",
      "> authenticating credentials via secure hash...",
      "> parsing memory logs...",
      "> permission granted. mounting shell...",
      `> Welcome back, User [${finalName}]`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setTerminalLog(prev => [...prev, log]);
        sound.playClick();
        if (index === logs.length - 1) {
          setTimeout(() => {
            if (state.character) {
              navigate('/world');
            } else {
              navigate('/intro');
            }
          }, 800);
        }
      }, (index + 1) * 350);
    });
  };

  const handleOAuthLogin = (provider: string) => {
    sound.playClick();
    const mockName = provider === 'Google' ? 'G-Agent' : 'Hub-Master';
    setUsername(mockName);
    runLoginLog(mockName);
  };

  const handleGuestLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    const name = username.trim() || 'Wanderer';
    runLoginLog(name);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden font-mono px-6">
      
      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-35 z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-slate-950/80 border border-purple-500/35 p-6 md:p-8 rounded-2xl backdrop-blur-md shadow-[0_0_35px_rgba(168,85,247,0.2)] z-10"
      >
        <div className="text-center space-y-2 mb-6">
          <div className="inline-block text-[10px] text-cyan-400 border border-cyan-400/30 px-2 py-0.5 rounded uppercase tracking-widest font-bold">
            RESTRICTED ACCESS
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white select-none">
            AnimeAI Console
          </h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest select-none">
            Establish connection to the Python World
          </p>
        </div>

        {isConnecting ? (
          /* Terminal log loading state */
          <div className="bg-slate-900/50 border border-purple-950 p-4 rounded-xl h-60 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-2">
              {terminalLog.map((log, i) => (
                <div key={i} className="text-xs text-cyan-400 font-bold leading-normal">
                  {log}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-purple-400 animate-pulse font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              CONNECTING...
            </div>
          </div>
        ) : (
          /* Standard Login Options */
          <div className="space-y-6">
            
            {/* Dummy OAuth Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuthLogin('Google')}
                className="flex items-center justify-center gap-2 py-3 bg-slate-900/60 border border-purple-500/20 hover:border-cyan-400/50 hover:bg-slate-900 text-xs text-slate-300 font-bold uppercase rounded-xl transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>🌐</span> Google Link
              </button>
              <button
                onClick={() => handleOAuthLogin('GitHub')}
                className="flex items-center justify-center gap-2 py-3 bg-slate-900/60 border border-purple-500/20 hover:border-cyan-400/50 hover:bg-slate-900 text-xs text-slate-300 font-bold uppercase rounded-xl transition-all cursor-pointer hover:scale-[1.02]"
              >
                <span>🐙</span> GitHub Link
              </button>
            </div>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-purple-500/10"></div>
              <span className="flex-shrink mx-4 text-[10px] text-slate-600 uppercase tracking-widest">OR GUEST BYPASS</span>
              <div className="flex-grow border-t border-purple-500/10"></div>
            </div>

            {/* Guest form */}
            <form onSubmit={handleGuestLogin} className="space-y-4">
              <div>
                <label className="block text-[10px] text-purple-400 uppercase tracking-widest mb-1.5 font-bold">
                  Identify Yourself
                </label>
                <input
                  type="text"
                  placeholder="ENTER ENCRYPTION KEYNAME"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-purple-500/20 focus:border-cyan-400/60 px-4 py-3 rounded-xl text-xs text-white uppercase placeholder-slate-600 outline-none tracking-widest transition-all font-mono"
                  maxLength={15}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-xs text-slate-950 font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] border border-white/10 cursor-pointer text-center"
              >
                🔑 Bypass Security
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

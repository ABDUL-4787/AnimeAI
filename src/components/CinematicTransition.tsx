import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CinematicTransitionProps {
  isActive: boolean;
  title: string;
  subtitle?: string;
  onComplete?: () => void;
}

export const CinematicTransition: React.FC<CinematicTransitionProps> = ({
  isActive,
  title,
  subtitle = "SYNCHRONIZING CORE MEMORIES...",
  onComplete,
}) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setPercent(0);
      return;
    }

    setPercent(0);
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 300); // short delay to admire 100%
          }
          return 100;
        }
        const step = Math.floor(Math.random() * 15) + 5;
        return Math.min(100, prev + step);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 text-white font-mono select-none px-6"
        >
          {/* Cyberpunk grid background in transition */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.15),transparent)] pointer-events-none" />
          
          {/* Scanning line animation */}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-cyan-400/50 shadow-[0_0_10px_#00f2fe] animate-[bounce_3s_infinite]" />

          {/* Loading UI Box */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
            className="w-full max-w-lg border border-purple-500/35 bg-purple-950/10 p-8 rounded-2xl backdrop-blur-md shadow-[0_0_55px_rgba(168,85,247,0.1)] relative"
          >
            {/* Top right chip badge decoration */}
            <div className="absolute top-4 right-4 text-[9px] text-cyan-400 border border-cyan-400/30 px-1.5 py-0.5 rounded uppercase tracking-widest font-bold">
              SYS LOAD
            </div>

            {/* Title with glow */}
            <h2 className="text-xl md:text-2xl font-bold tracking-wider text-cyan-400 text-center mb-2 shadow-cyan-500/20 drop-shadow-[0_0_8px_#00f2fe] uppercase">
              {title}
            </h2>

            {/* Subtitle typing hint */}
            <p className="text-xs text-purple-300/80 text-center tracking-widest mb-8 uppercase animate-pulse">
              {subtitle}
            </p>

            {/* Progress indicators */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-cyan-300/90 font-bold font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  INITIALIZING RUNTIME
                </span>
                <span>{percent}%</span>
              </div>

              {/* Glowing Outer Bar */}
              <div className="h-3.5 w-full bg-slate-900 border border-purple-500/20 rounded-lg p-[2px] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-cyan-400 rounded shadow-[0_0_10px_#00f2fe]"
                  style={{ width: `${percent}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>

            {/* Console Log Subtext */}
            <div className="mt-6 text-[10px] text-slate-500 leading-normal max-h-20 overflow-hidden font-mono border-t border-purple-950/40 pt-4">
              <div>&gt; pyodide::instantiate_wasm - OK</div>
              {percent > 25 && <div>&gt; compiler::python_v3_11::init - SUCCESS</div>}
              {percent > 55 && <div>&gt; runtime::load_quest_data::import - COMPLETE</div>}
              {percent > 85 && <div>&gt; interface::render_hud::hud_mount - SUCCESS</div>}
              {percent === 100 && <div className="text-cyan-400 font-bold">&gt; system::handshake::start_adventure - GRANTED</div>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

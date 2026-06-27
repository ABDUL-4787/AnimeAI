import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { sound } from '../utils/audio';

interface IntroSlide {
  image: string;
  narrative: string;
  hlWord?: string; // word to highlight in yellow
}

export const IntroSequence: React.FC = () => {
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef<any>(null);

  const slides: IntroSlide[] = [
    {
      image: '/assets/intro_city.png',
      narrative: 'Long ago... The world was powered by Code.',
      hlWord: 'Code.'
    },
    {
      image: '/assets/intro_crystals.png',
      narrative: 'One day... The core Code Fragments were stolen.',
      hlWord: 'Fragments'
    },
    {
      image: '/assets/intro_collapse.png',
      narrative: 'Kingdoms began to collapse into fragmentation errors.',
      hlWord: 'collapse'
    },
    {
      image: '/assets/intro_hero.png',
      narrative: 'Only a true programmer can restore them. The adventure begins...',
      hlWord: 'programmer'
    }
  ];

  const currentSlide = slides[slideIndex];

  // Typewriter effect for the narrative
  useEffect(() => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
    }

    setTypedText('');
    setIsTyping(true);
    let charIndex = 0;
    const textToType = currentSlide.narrative;

    typingTimerRef.current = setInterval(() => {
      if (charIndex < textToType.length) {
        setTypedText(prev => prev + textToType.charAt(charIndex));
        // Play typewriter clicking tone
        sound.playTypewriterBeep();
        charIndex++;
      } else {
        setIsTyping(false);
        if (typingTimerRef.current) {
          clearInterval(typingTimerRef.current);
        }
      }
    }, 45); // typing speed

    return () => {
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [slideIndex]);

  const handleContinue = () => {
    sound.playClick();
    if (slideIndex < slides.length - 1) {
      setSlideIndex(prev => prev + 1);
    } else {
      sound.playLevelUp();
      navigate('/create-character');
    }
  };

  // Helper to highlight a specific word in narrative text
  const renderNarrativeText = () => {
    if (!currentSlide.hlWord) return <span>{typedText}</span>;

    const parts = typedText.split(currentSlide.hlWord);
    if (parts.length === 1) return <span>{typedText}</span>;

    return (
      <span>
        {parts[0]}
        <span className="text-yellow-400 font-extrabold glow-text-cyan">{currentSlide.hlWord}</span>
        {parts.slice(1).join(currentSlide.hlWord)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between items-center relative overflow-hidden font-mono select-none">
      
      {/* Full-bleed background slideshow image with transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentSlide.image})` }}
          />
        </AnimatePresence>
        
        {/* Soft dark vignette gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/50 pointer-events-none" />
      </div>

      {/* Top logo overlay */}
      <div className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center z-10">
        <span className="text-xs font-bold text-cyan-400 tracking-widest border border-cyan-400/30 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm">
          CONSOLE::RESTORATION_LOG
        </span>
        <button 
          onClick={() => navigate('/create-character')}
          className="text-[10px] text-slate-400 hover:text-white uppercase tracking-widest bg-slate-950/80 px-2.5 py-1 rounded border border-purple-500/20 transition-all cursor-pointer"
        >
          Skip Intro
        </button>
      </div>

      {/* Bottom Dialog Box & Typewriter text */}
      <div className="w-full max-w-4xl mx-auto px-6 pb-12 z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full glass-panel border border-cyan-400/35 p-6 rounded-2xl shadow-[0_0_35px_rgba(6,182,212,0.15)] flex flex-col justify-between min-h-[140px] relative"
        >
          {/* Channel tag decors */}
          <div className="absolute -top-3 left-6 text-[9px] font-bold text-cyan-400 bg-slate-950 px-2.5 py-0.5 border border-cyan-400/30 rounded uppercase tracking-widest">
            Oracle Transmission
          </div>

          <div className="text-sm md:text-base leading-relaxed tracking-wider text-slate-200 py-2">
            &gt; {renderNarrativeText()}
          </div>

          <div className="flex justify-end mt-4">
            {!isTyping && (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleContinue}
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-slate-950 font-black uppercase text-xs tracking-wider rounded border border-white/20 hover:shadow-[0_0_15px_#00f2fe] transition-all cursor-pointer flex items-center gap-1.5"
              >
                {slideIndex === slides.length - 1 ? 'Start Adventure' : 'Continue'} ⚔️
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

    </div>
  );
};

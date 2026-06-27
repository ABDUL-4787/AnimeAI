import React from 'react';

// Gradients definitions to be included in SVGs
export const SVGDefs = () => (
  <svg style={{ width: 0, height: 0, position: 'absolute' }}>
    <defs>
      {/* Neon Hair Gradients */}
      <linearGradient id="hair-neon-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f2fe" />
        <stop offset="100%" stopColor="#4facfe" />
      </linearGradient>
      <linearGradient id="hair-cyber-crimson" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff0844" />
        <stop offset="100%" stopColor="#ffb199" />
      </linearGradient>
      <linearGradient id="hair-emerald-wave" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00b09b" />
        <stop offset="100%" stopColor="#96c93d" />
      </linearGradient>
      <linearGradient id="hair-golden-saiyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f6d365" />
        <stop offset="100%" stopColor="#fda085" />
      </linearGradient>
      <linearGradient id="hair-purple-shadow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#b372f6" />
        <stop offset="100%" stopColor="#3813c2" />
      </linearGradient>

      {/* Cyber Glow Filter */}
      <filter id="cyber-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      
      {/* HUD Circle Radial */}
      <radialGradient id="hud-radial" cx="50%" cy="50%" r="50%">
        <stop offset="70%" stopColor="#0d0b21" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#3b0066" stopOpacity="1" />
      </radialGradient>

      {/* Companion Gradients */}
      <linearGradient id="comp-dragon" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4e50" />
        <stop offset="100%" stopColor="#f9d423" />
      </linearGradient>
      <linearGradient id="comp-cat" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f107a3" />
        <stop offset="100%" stopColor="#7b2ff7" />
      </linearGradient>
      <linearGradient id="comp-bot" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f2fe" />
        <stop offset="100%" stopColor="#0072ff" />
      </linearGradient>
      <linearGradient id="comp-slime" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ff87" />
        <stop offset="100%" stopColor="#60efff" />
      </linearGradient>
      <linearGradient id="comp-owl" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffb300" />
        <stop offset="100%" stopColor="#ff5722" />
      </linearGradient>
    </defs>
  </svg>
);

interface AvatarProps {
  hair: string;
  outfit: string;
  companion: string;
  size?: number;
  animated?: boolean;
}

export const AvatarPreview: React.FC<AvatarProps> = ({
  hair,
  outfit,
  companion,
  size = 200,
  animated = true,
}) => {
  // Styles for animations
  const companionAnimClass = animated ? 'animate-bounce' : '';
  const eyePulseClass = animated ? 'animate-pulse' : '';

  // Render Hair SVG Layer
  const renderHair = () => {
    switch (hair) {
      case 'Neon Blue Spikes':
        return (
          <path
            d="M 50,22 L 65,5 L 70,25 L 85,10 L 82,30 L 98,22 L 88,45 L 80,48 L 20,48 L 12,45 L 2,22 L 18,30 L 15,10 L 30,25 L 35,5 Z"
            fill="url(#hair-neon-blue)"
            filter="url(#cyber-glow)"
          />
        );
      case 'Cyber Crimson':
        return (
          <path
            d="M 12,48 C 10,25 22,12 50,12 C 78,12 90,25 88,48 C 96,25 94,5 72,16 C 65,10 35,10 28,16 C 6,5 4,25 12,48 Z"
            fill="url(#hair-cyber-crimson)"
          />
        );
      case 'Emerald Wave':
        return (
          <path
            d="M 15,48 C 10,38 10,20 30,12 C 50,4 70,25 85,25 C 92,25 95,35 85,48 C 92,30 92,15 75,10 C 55,5 35,18 25,12 C 15,20 12,35 15,48 Z"
            fill="url(#hair-emerald-wave)"
          />
        );
      case 'Golden Saiyan':
        return (
          <path
            d="M 50,20 L 62,0 L 68,22 L 82,2 L 80,26 L 96,12 L 85,38 L 92,44 L 8,44 L 15,38 L 4,12 L 20,26 L 18,2 L 32,22 L 38,0 Z"
            fill="url(#hair-golden-saiyan)"
            filter="url(#cyber-glow)"
          />
        );
      case 'Purple Shadow':
      default:
        return (
          <path
            d="M 12,48 L 16,30 Q 18,15 35,15 Q 50,25 65,15 Q 82,15 84,30 L 88,48 C 88,42 94,36 82,26 Q 78,10 50,10 Q 22,10 18,26 C 6,36 12,42 12,48 Z"
            fill="url(#hair-purple-shadow)"
          />
        );
    }
  };

  // Render Outfit SVG Layer
  const renderOutfit = () => {
    switch (outfit) {
      case 'Shinobi Techwear':
        return (
          <g>
            {/* Cyber ninja collar and tech straps */}
            <path d="M 22,78 L 78,78 L 85,100 L 15,100 Z" fill="#121020" stroke="#00f2fe" strokeWidth="1.5" />
            <path d="M 38,78 L 50,92 L 62,78" fill="none" stroke="#00f2fe" strokeWidth="2" />
            <rect x="25" y="85" width="50" height="4" rx="2" fill="#1e1b4b" />
            <circle cx="35" cy="87" r="2" fill="#00f2fe" />
            <circle cx="65" cy="87" r="2" fill="#00f2fe" />
          </g>
        );
      case 'Cyber Samurai':
        return (
          <g>
            {/* Crimson plates and golden crest */}
            <path d="M 20,78 L 80,78 L 88,100 L 12,100 Z" fill="#7f1d1d" stroke="#f59e0b" strokeWidth="2" />
            <path d="M 35,78 L 50,88 L 65,78" fill="#1e293b" />
            <path d="M 28,82 L 40,100 M 72,82 L 60,100" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="50" cy="94" r="3" fill="#f59e0b" filter="url(#cyber-glow)" />
          </g>
        );
      case 'Mecha Pilot Suit':
        return (
          <g>
            {/* High-tech armor suit */}
            <path d="M 22,78 L 78,78 L 86,100 L 14,100 Z" fill="#1e293b" stroke="#e2e8f0" strokeWidth="2" />
            <rect x="32" y="82" width="36" height="15" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="50" y1="82" x2="50" y2="97" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="42" cy="90" r="1.5" fill="#38bdf8" className={eyePulseClass} />
            <circle cx="58" cy="90" r="1.5" fill="#38bdf8" className={eyePulseClass} />
          </g>
        );
      case 'Astral Robes':
        return (
          <g>
            {/* Flowing cosmic robes */}
            <path d="M 22,78 L 78,78 L 88,100 L 12,100 Z" fill="#2e1065" stroke="#ec4899" strokeWidth="1.5" />
            <path d="M 30,78 C 30,78 45,95 50,95 C 55,95 70,78 70,78" fill="none" stroke="#ec4899" strokeWidth="2" />
            <circle cx="50" cy="86" r="4" fill="#db2777" />
            <circle cx="50" cy="86" r="2" fill="#ffffff" />
          </g>
        );
      case 'Hackers Hoodie':
      default:
        return (
          <g>
            {/* Heavy hood neck and green coding glyph */}
            <path d="M 22,76 L 78,76 L 85,100 L 15,100 Z" fill="#0f172a" />
            <path d="M 22,76 C 22,76 30,68 50,68 C 70,68 78,76 78,76 L 82,90 C 82,90 70,82 50,82 C 30,82 18,90 18,90 Z" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
            <text x="50" y="93" fill="#22c55e" fontSize="7" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
              &lt;/&gt;
            </text>
          </g>
        );
    }
  };

  // Render Floating Companion next to the character
  const renderCompanion = () => {
    switch (companion) {
      case 'Spark Dragon':
        return (
          <g className={companionAnimClass} style={{ transform: 'translate(75px, 20px)' }}>
            <circle cx="15" cy="15" r="12" fill="url(#comp-dragon)" filter="url(#cyber-glow)" />
            {/* Dragon Wings */}
            <path d="M 12,8 L 3,1 L 9,12 Z" fill="#ff4e50" />
            <path d="M 18,8 L 27,1 L 21,12 Z" fill="#ff4e50" />
            {/* Eyes */}
            <circle cx="11" cy="13" r="1.5" fill="#ffffff" />
            <circle cx="19" cy="13" r="1.5" fill="#ffffff" />
            {/* Spark horns */}
            <path d="M 10,5 L 7,-2 Z" stroke="#f9d423" strokeWidth="2" />
            <path d="M 20,5 L 23,-2 Z" stroke="#f9d423" strokeWidth="2" />
          </g>
        );
      case 'Cyber Cat':
        return (
          <g className={companionAnimClass} style={{ transform: 'translate(75px, 22px)' }}>
            <circle cx="15" cy="15" r="12" fill="url(#comp-cat)" />
            {/* Cat Ears */}
            <path d="M 6,6 L 3,-2 L 10,4 Z" fill="#f107a3" />
            <path d="M 24,6 L 27,-2 L 20,4 Z" fill="#f107a3" />
            {/* Eyes */}
            <circle cx="11" cy="13" r="1.5" fill="#00ffff" className={eyePulseClass} />
            <circle cx="19" cy="13" r="1.5" fill="#00ffff" className={eyePulseClass} />
            {/* Whiskers */}
            <line x1="4" y1="16" x2="0" y2="15" stroke="#7b2ff7" strokeWidth="1" />
            <line x1="4" y1="18" x2="-1" y2="19" stroke="#7b2ff7" strokeWidth="1" />
            <line x1="26" y1="16" x2="30" y2="15" stroke="#7b2ff7" strokeWidth="1" />
            <line x1="26" y1="18" x2="31" y2="19" stroke="#7b2ff7" strokeWidth="1" />
          </g>
        );
      case 'Neko-Bot':
        return (
          <g className={companionAnimClass} style={{ transform: 'translate(75px, 20px)' }}>
            {/* Floating mechanical sphere */}
            <rect x="5" y="5" width="20" height="20" rx="6" fill="#1e293b" stroke="url(#comp-bot)" strokeWidth="2" filter="url(#cyber-glow)" />
            {/* Tech ears */}
            <path d="M 8,5 L 5,-1 L 11,5 Z" fill="#0072ff" />
            <path d="M 22,5 L 25,-1 L 19,5 Z" fill="#0072ff" />
            {/* Visor */}
            <rect x="8" y="10" width="14" height="6" rx="2" fill="#000000" />
            <circle cx="12" cy="13" r="1" fill="#00f2fe" className={eyePulseClass} />
            <circle cx="18" cy="13" r="1" fill="#00f2fe" className={eyePulseClass} />
          </g>
        );
      case 'Byte-Sized Slime':
        return (
          <g className={companionAnimClass} style={{ transform: 'translate(75px, 25px)' }}>
            {/* Goo drop shape */}
            <path d="M 15,3 C 6,3 3,12 3,17 C 3,22 8,25 15,25 C 22,25 27,22 27,17 C 27,12 24,3 15,3 Z" fill="url(#comp-slime)" opacity="0.95" />
            {/* Tiny blush & face */}
            <circle cx="11" cy="15" r="1" fill="#ffffff" />
            <circle cx="19" cy="15" r="1" fill="#ffffff" />
            <path d="M 13,18 Q 15,20 17,18" fill="none" stroke="#003311" strokeWidth="1" />
          </g>
        );
      case 'Robo-Owl':
      default:
        return (
          <g className={companionAnimClass} style={{ transform: 'translate(75px, 18px)' }}>
            <circle cx="15" cy="15" r="12" fill="url(#comp-owl)" />
            {/* Horn feathers */}
            <path d="M 8,5 L 5,0 L 10,4 Z" fill="#ff5722" />
            <path d="M 22,5 L 25,0 L 20,4 Z" fill="#ff5722" />
            {/* Big brass gear eyes */}
            <circle cx="10" cy="12" r="3.5" fill="#f59e0b" />
            <circle cx="10" cy="12" r="1.5" fill="#000000" />
            <circle cx="20" cy="12" r="3.5" fill="#f59e0b" />
            <circle cx="20" cy="12" r="1.5" fill="#000000" />
            {/* Beak */}
            <polygon points="15,14 13,17 17,17" fill="#ff5722" />
          </g>
        );
    }
  };

  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      {/* Background HUD Rings */}
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Outer glowing target circle */}
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="url(#hud-radial)"
          stroke="#581c87"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="animate-[spin_40s_linear_infinite]"
        />
        
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="#00f2fe"
          strokeWidth="1"
          strokeDasharray="20 10 5 10"
          className="animate-[spin_20s_linear_infinite]"
          opacity="0.6"
        />

        {/* Character Base Face & Head */}
        <g>
          {/* Neck */}
          <rect x="52" y="70" width="16" height="15" fill="#fcd34d" />
          <rect x="52" y="74" width="16" height="4" fill="#f59e0b" opacity="0.3" />
          
          {/* Face */}
          <rect x="35" y="44" width="50" height="32" rx="10" fill="#fde047" />
          
          {/* Cyber Headset/Earpiece */}
          <rect x="31" y="52" width="6" height="12" rx="2" fill="#1e1b4b" stroke="#00f2fe" strokeWidth="1" />
          <rect x="83" y="52" width="6" height="12" rx="2" fill="#1e1b4b" stroke="#00f2fe" strokeWidth="1" />
          <line x1="37" y1="52" x2="83" y2="52" stroke="#00f2fe" strokeWidth="0.5" opacity="0.7" />

          {/* Glowing Cyber Eyes */}
          <rect x="44" y="54" width="10" height="5" rx="1" fill="#000000" />
          <circle cx="49" cy="56.5" r="1.5" fill="#00f2fe" className={eyePulseClass} />
          
          <rect x="66" y="54" width="10" height="5" rx="1" fill="#000000" />
          <circle cx="71" cy="56.5" r="1.5" fill="#00f2fe" className={eyePulseClass} />

          {/* HUD Target crosshairs on eyes */}
          <path d="M 49,52 L 49,61 M 44,56.5 L 54,56.5" stroke="#00f2fe" strokeWidth="0.5" opacity="0.4" />
          <path d="M 71,52 L 71,61 M 66,56.5 L 76,56.5" stroke="#00f2fe" strokeWidth="0.5" opacity="0.4" />

          {/* Mouth */}
          <path d="M 55,68 Q 60,71 65,68" fill="none" stroke="#b45309" strokeWidth="1.5" />
          
          {/* Face tech tattoo */}
          <path d="M 39,64 L 43,68 L 47,68" fill="none" stroke="#ec4899" strokeWidth="1.5" opacity="0.8" />
        </g>

        {/* Outfit Layer */}
        {renderOutfit()}

        {/* Hair Layer */}
        {renderHair()}

        {/* Floating Companion Layer */}
        {renderCompanion()}
      </svg>
    </div>
  );
};

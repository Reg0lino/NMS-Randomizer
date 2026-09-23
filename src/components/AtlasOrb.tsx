import React from 'react';

interface AtlasOrbProps {
  onClick?: () => void;
  isPulsing?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AtlasOrb: React.FC<AtlasOrbProps> = ({ 
  onClick, 
  isPulsing = false, 
  size = 'md' 
}) => {
  const dimensions = size === 'sm' ? 'w-20 h-20' : size === 'lg' ? 'w-44 h-44' : 'w-32 h-32';

  return (
    <div 
      onClick={onClick}
      className={`relative ${dimensions} flex items-center justify-center cursor-pointer group select-none transition-transform active:scale-95`}
      title="Atlas Telemetry Core - Tap to Transmit"
    >
      {/* Outer ambient glow */}
      <div 
        className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#FF2A4D]/25 via-red-600/15 to-[#00F0FF]/15 blur-xl transition-all duration-700 ${
          isPulsing ? 'scale-125 opacity-100' : 'group-hover:scale-110 opacity-70'
        }`}
      />

      {/* Rotating outer orbital ring */}
      <div 
        className={`absolute inset-1 border border-[#FF2A4D]/40 rounded-full border-dashed transition-all duration-1000 ${
          isPulsing ? 'animate-spin' : 'group-hover:rotate-45'
        }`}
        style={{ animationDuration: '14s' }}
      />

      {/* Counter-rotating segmented telemetry ring */}
      <div 
        className={`absolute inset-3 border-t-2 border-b-2 border-r border-[#00F0FF]/30 rounded-full transition-all duration-1000 ${
          isPulsing ? 'animate-spin' : ''
        }`}
        style={{ animationDuration: '8s', animationDirection: 'reverse' }}
      />

      {/* Geometric Atlas Monolith Diamond */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Diamond Outer Shell */}
        <div 
          className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#1B2631] via-[#0E141B] to-[#050709] border border-[#FF2A4D]/60 rotate-45 flex items-center justify-center shadow-[0_0_20px_rgba(255,42,77,0.4)] transition-all duration-500 ${
            isPulsing ? 'scale-110 border-[#FF2A4D] shadow-[0_0_35px_rgba(255,42,77,0.8)]' : 'group-hover:border-[#FF2A4D]'
          }`}
        >
          {/* Internal Crimson Atlas Core */}
          <div 
            className={`w-7 h-7 md:w-9 md:h-9 bg-[#FF2A4D] rounded-full shadow-[0_0_15px_#FF2A4D] transition-transform duration-300 ${
              isPulsing ? 'animate-ping' : 'scale-90 group-hover:scale-100'
            }`}
          />
          {/* Inner pupil reflection */}
          <div className="absolute w-2 h-2 bg-white rounded-full -top-0.5 -left-0.5 opacity-80" />
        </div>
      </div>

      {/* Telemetry coordinate marks */}
      <div className="absolute -bottom-2 font-mono text-[9px] text-[#7D8B99] tracking-widest uppercase">
        // 16 // 16 //
      </div>
    </div>
  );
};

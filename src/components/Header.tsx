import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#050709] border-b border-[#1B2631] px-4 py-3 select-none shrink-0 pointer-events-none">
      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto">
        {/* Title & Atlas Status (Non-clickable, safe for broken top digitizers) */}
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-[#FF2A4D] animate-pulse shadow-[0_0_10px_#FF2A4D]" />
          <div>
            <div className="flex items-center gap-2 font-bold tracking-wider text-sm md:text-base text-[#E6EDF3] uppercase">
              <span>ATLAS TERMINAL</span>
              <span className="text-[#00F0FF] text-[10px] px-1.5 py-0.5 bg-[#00F0FF]/10 rounded border border-[#00F0FF]/30 font-mono">
                v5.0
              </span>
            </div>
            <div className="text-[10px] font-mono text-[#7D8B99] flex items-center gap-2">
              <span>DIRECTIVE ENGINE</span>
              <span className="text-[#FF2A4D] font-bold">16 // 16 // 16</span>
            </div>
          </div>
        </div>

        {/* Telemetry Indicator */}
        <div className="text-right font-mono text-[10px]">
          <span className="text-[#00F0FF] block font-bold tracking-wider">ONLINE</span>
          <span className="text-[#7D8B99] block text-[9px]">FREQ: 16.16.16</span>
        </div>
      </div>
    </header>
  );
};

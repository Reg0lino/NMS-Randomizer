import React from 'react';
import { Activity, Radio, Cpu, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#050709] border-b-2 border-[#1B2631] px-4 pt-10 sm:pt-12 pb-5 sm:pb-6 select-none shrink-0 pointer-events-none min-h-[160px] sm:min-h-[175px] flex flex-col justify-center">
      <div className="flex flex-col gap-2.5 max-w-4xl mx-auto w-full">
        {/* Upper Informative Telemetry Ribbon (Safely covers the broken top 20% zone) */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#7D8B99] border-b border-[#1B2631]/60 pb-1.5">
          <div className="flex items-center gap-2">
            <Radio className="w-3 h-3 text-[#00E5A3] animate-pulse" />
            <span className="text-[#00E5A3] font-bold tracking-wider">EUCLID SECTOR // ANOMALY LINK</span>
            <span className="text-[#1B2631]">|</span>
            <span className="hidden sm:inline">16.16.16 // FREQUENCY LOCKED</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-3 h-3 text-[#00F0FF]" />
            <span className="text-[#00F0FF] font-bold">DIGITIZER BUFFER SAFE</span>
          </div>
        </div>

        {/* Informative Diagnostic Callout Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono bg-[#0E141B] px-2.5 py-1 rounded border border-[#1B2631]/70 text-[#7D8B99]">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-[#00E5A3]" />
            <span className="text-[#00E5A3] font-bold">TOP 20% NON-TOUCH SAFE ZONE</span>
          </div>
          <span className="text-[#7D8B99] hidden xs:inline">ALL INTERACTIVE CONTROLS POSITIONED BELOW DEAD ZONE</span>
        </div>

        {/* Main Branding & Status Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[#FF2A4D] animate-pulse shadow-[0_0_12px_#FF2A4D] shrink-0" />
            <div>
              <div className="flex items-center gap-2 font-black tracking-wider text-base sm:text-lg md:text-xl text-[#E6EDF3] uppercase font-mono">
                <span>ATLAS TERMINAL</span>
                <span className="text-[#00F0FF] text-[10px] sm:text-xs px-2 py-0.5 bg-[#00F0FF]/15 rounded border border-[#00F0FF]/40 font-mono font-bold">
                  v6.3
                </span>
                <span className="text-[#FFB300] text-[10px] px-1.5 py-0.5 bg-[#FFB300]/10 rounded border border-[#FFB300]/30 font-mono hidden sm:inline">
                  OFFLINE READY
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#7D8B99] flex items-center gap-2 mt-0.5">
                <span>DIRECTIVE ENGINE</span>
                <span className="text-[#FF2A4D] font-bold tracking-widest">16 // 16 // 16</span>
                <span className="text-[#1B2631]">·</span>
                <span className="text-[#00E5A3]">ALL SUBSYSTEMS NOMINAL</span>
              </div>
            </div>
          </div>

          {/* Right Status Badge */}
          <div className="text-right font-mono text-[11px] hidden xs:block">
            <div className="flex items-center gap-1.5 justify-end text-[#00F0FF] font-bold">
              <Activity className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>TERMINAL SYNCED</span>
            </div>
            <span className="text-[#7D8B99] text-[10px]">SUB-SURFACE DIGITIZER SAFE</span>
          </div>
        </div>
      </div>
    </header>
  );
};


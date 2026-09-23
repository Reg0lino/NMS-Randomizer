import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Monitor, 
  Smartphone, 
  Cpu, 
  Sparkles, 
  Settings, 
  Radio 
} from 'lucide-react';
import { playTerminalClick, isDroneActive, startAtlasDrone, stopAtlasDrone } from '../utils/audio';

interface ControlBarProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
  useAi: boolean;
  onToggleAi: () => void;
  s10Frame: boolean;
  onToggleS10Frame: () => void;
  onOpenSettings: () => void;
}

export const ControlBar: React.FC<ControlBarProps> = ({
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCrt,
  useAi,
  onToggleAi,
  s10Frame,
  onToggleS10Frame,
  onOpenSettings,
}) => {
  const [droneOn, setDroneOn] = React.useState(isDroneActive());

  const handleToggleDrone = () => {
    playTerminalClick();
    if (droneOn) {
      stopAtlasDrone();
      setDroneOn(false);
    } else {
      startAtlasDrone();
      setDroneOn(true);
    }
  };

  return (
    <div className="w-full bg-[#0E141B] border border-[#1B2631] rounded-lg p-2.5 mb-3 shadow-lg select-none">
      <div className="flex items-center justify-between text-[10px] font-mono text-[#7D8B99] mb-2 px-1">
        <span className="uppercase tracking-wider font-bold text-[#E6EDF3] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
          TERMINAL CONTROL MATRIX
        </span>
        <span className="text-[#00F0FF]">TOUCH-SAFE ZONE</span>
      </div>

      {/* Row of thumb-friendly interactive buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {/* AI Neural vs Offline Procedural */}
        <button
          onClick={() => {
            playTerminalClick();
            onToggleAi();
          }}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-1.5 rounded border text-xs font-mono font-bold transition-all active:scale-95 ${
            useAi
              ? 'bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#FF2A4D] shadow-[0_0_10px_rgba(255,42,77,0.3)]'
              : 'bg-[#050709] border-[#00F0FF]/40 text-[#00F0FF]'
          }`}
          title={useAi ? 'AI Neural Link Active' : '0-Token Procedural Mode'}
        >
          {useAi ? <Sparkles className="w-3.5 h-3.5 text-[#FF2A4D]" /> : <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />}
          <span>{useAi ? 'NEURAL (AI)' : '0-TOKENS'}</span>
        </button>

        {/* Sound FX Toggle */}
        <button
          onClick={() => {
            playTerminalClick();
            onToggleSound();
          }}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-1.5 rounded border text-xs font-mono font-bold transition-all active:scale-95 ${
            soundEnabled
              ? 'bg-[#FFB300]/15 border-[#FFB300] text-[#FFB300]'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99]'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{soundEnabled ? 'AUDIO ON' : 'MUTED'}</span>
        </button>

        {/* Ambient Atlas Drone */}
        <button
          onClick={handleToggleDrone}
          className={`flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-1.5 rounded border text-xs font-mono font-bold transition-all active:scale-95 ${
            droneOn
              ? 'bg-[#FF2A4D]/20 border-[#FF2A4D] text-[#FF2A4D] shadow-[0_0_10px_rgba(255,42,77,0.4)]'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99]'
          }`}
          title="Toggle 55Hz Atlas Sub-Bass Ambient Drone"
        >
          <Radio className="w-3.5 h-3.5" />
          <span>{droneOn ? 'DRONE ON' : 'DRONE OFF'}</span>
        </button>

        {/* Settings Modal Button */}
        <button
          onClick={() => {
            playTerminalClick();
            onOpenSettings();
          }}
          className="flex items-center justify-center gap-1.5 min-h-[44px] px-2 py-1.5 rounded border bg-[#050709] border-[#1B2631] hover:border-[#FF2A4D] text-[#E6EDF3] text-xs font-mono font-bold transition-all active:scale-95"
          title="Open API Key Settings & GitHub Pages Config"
        >
          <Settings className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span>CONFIG / KEY</span>
        </button>
      </div>

      {/* Sub-row for CRT & Viewport toggles */}
      <div className="flex items-center justify-between gap-1.5 mt-2 pt-2 border-t border-[#1B2631]/60 text-[11px] font-mono">
        <button
          onClick={() => {
            playTerminalClick();
            onToggleCrt();
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
            crtEnabled
              ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF]'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99]'
          }`}
        >
          <Monitor className="w-3 h-3" />
          <span>CRT SCANLINES: {crtEnabled ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={() => {
            playTerminalClick();
            onToggleS10Frame();
          }}
          className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
            s10Frame
              ? 'bg-[#FF2A4D]/20 border-[#FF2A4D] text-[#FF2A4D]'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99]'
          }`}
        >
          <Smartphone className="w-3 h-3" />
          <span>S10 FRAME: {s10Frame ? 'ACTIVE' : 'FLUID'}</span>
        </button>
      </div>
    </div>
  );
};

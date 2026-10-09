import React, { useState, useEffect, useRef } from 'react';
import { CasualMission, MissionPath, MissionStep } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Circle,
  X,
  Maximize2,
  Minimize2,
  MapPin,
  Sparkles,
  ScrollText,
  Star,
  UtensilsCrossed,
  Zap,
  ChevronRight,
  ChevronLeft,
  Flame,
  Award,
  Check,
  Compass,
  ArrowRight,
  CornerDownRight,
  Eye,
  Crosshair,
  Timer as TimerIcon
} from 'lucide-react';
import {
  playAtlasPulse,
  playMilestoneComplete,
  playTerminalClick
} from '../utils/audio';

interface ActiveMissionOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  mission: CasualMission;
  activePathId: string;
  onChangePathId?: (pathId: string) => void;
  stepChecklist: Record<string, boolean>;
  onToggleStep: (pathKey: string, stepNumber: number) => void;
  decorChecklist?: Record<string, boolean>;
  onToggleDecor?: (key: string) => void;
}

export type TextScaleMode = 'standard' | 'giant' | 'maximum';

export const ActiveMissionOverlay: React.FC<ActiveMissionOverlayProps> = ({
  isOpen,
  onClose,
  mission,
  activePathId,
  onChangePathId,
  stepChecklist,
  onToggleStep,
  decorChecklist,
  onToggleDecor,
}) => {
  // Timer state
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const timerIntervalRef = useRef<number | null>(null);

  // Text scaling (standard large, giant, maximum for couch/second-monitor gaming)
  const [textScale, setTextScale] = useState<TextScaleMode>('giant');

  // Minimized floating HUD state
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Active focused step (1-indexed based on step_number)
  const [focusedStepNumber, setFocusedStepNumber] = useState<number>(1);

  // The active path
  const currentPath: MissionPath | undefined =
    mission.paths?.find((p) => p.path_id === activePathId) || mission.paths?.[0];
  const stepsToDisplay: MissionStep[] = currentPath ? currentPath.steps : mission.steps || [];
  const pathStorageKey = currentPath ? currentPath.path_id : 'main';

  // Completion calculation
  const completedCount = stepsToDisplay.filter(
    (s) => stepChecklist[`${pathStorageKey}_${s.step_number}`]
  ).length;
  const totalCount = stepsToDisplay.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAllComplete = totalCount > 0 && completedCount === totalCount;

  // When overlay opens, set focus to first incomplete step
  useEffect(() => {
    if (isOpen) {
      const firstIncomplete = stepsToDisplay.find(
        (s) => !stepChecklist[`${pathStorageKey}_${s.step_number}`]
      );
      if (firstIncomplete) {
        setFocusedStepNumber(firstIncomplete.step_number);
      } else if (stepsToDisplay.length > 0) {
        setFocusedStepNumber(stepsToDisplay[0].step_number);
      }
    }
  }, [isOpen, pathStorageKey]);

  // Stopwatch timer interval
  useEffect(() => {
    if (isOpen && isTimerRunning) {
      timerIntervalRef.current = window.setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    } else if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isOpen, isTimerRunning]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || isMinimized) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedStepNumber((prev) => {
          const next = prev < stepsToDisplay.length ? prev + 1 : 1;
          playTerminalClick();
          return next;
        });
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedStepNumber((prev) => {
          const prevStep = prev > 1 ? prev - 1 : stepsToDisplay.length;
          playTerminalClick();
          return prevStep;
        });
      } else if (e.key === ' ' || e.key === 'Enter') {
        // Toggle current focused step
        if (focusedStepNumber > 0) {
          e.preventDefault();
          onToggleStep(pathStorageKey, focusedStepNumber);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMinimized, stepsToDisplay.length, focusedStepNumber, pathStorageKey, onToggleStep, onClose]);

  if (!isOpen) return null;

  // Format timer as MM:SS or HH:MM:SS
  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggleTimer = () => {
    playTerminalClick();
    setIsTimerRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    playTerminalClick();
    setSecondsElapsed(0);
  };

  const currentFocusedStep =
    stepsToDisplay.find((s) => s.step_number === focusedStepNumber) || stepsToDisplay[0];
  const isCurrentFocusedDone = currentFocusedStep
    ? !!stepChecklist[`${pathStorageKey}_${currentFocusedStep.step_number}`]
    : false;

  // Typography scale classes based on textScale mode
  const typography = {
    title:
      textScale === 'maximum'
        ? 'text-3xl sm:text-4xl md:text-5xl'
        : textScale === 'giant'
        ? 'text-2xl sm:text-3xl md:text-4xl'
        : 'text-xl sm:text-2xl md:text-3xl',
    location:
      textScale === 'maximum'
        ? 'text-lg sm:text-xl'
        : textScale === 'giant'
        ? 'text-base sm:text-lg'
        : 'text-sm sm:text-base',
    objectiveTileTitle:
      textScale === 'maximum'
        ? 'text-xl sm:text-2xl'
        : textScale === 'giant'
        ? 'text-lg sm:text-xl'
        : 'text-base sm:text-lg',
    objectiveTileDesc:
      textScale === 'maximum'
        ? 'text-base sm:text-lg'
        : textScale === 'giant'
        ? 'text-sm sm:text-base'
        : 'text-xs sm:text-sm',
    focusedTitle:
      textScale === 'maximum'
        ? 'text-2xl sm:text-3xl md:text-4xl'
        : textScale === 'giant'
        ? 'text-xl sm:text-2xl md:text-3xl'
        : 'text-lg sm:text-xl md:text-2xl',
    focusedDesc:
      textScale === 'maximum'
        ? 'text-lg sm:text-xl leading-relaxed'
        : textScale === 'giant'
        ? 'text-base sm:text-lg leading-relaxed'
        : 'text-sm sm:text-base leading-relaxed',
  };

  // Minimized Floating HUD Dock
  if (isMinimized) {
    return (
      <aside
        aria-label="Active Mission HUD Dock"
        className="fixed bottom-16 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-[#0E141B]/95 backdrop-blur-md border-2 border-[#00F0FF] rounded-xl p-3 shadow-[0_0_30px_rgba(0,240,255,0.3)] animate-in slide-in-from-bottom duration-200"
      >
        <div className="flex items-center justify-between gap-2 border-b border-[#1B2631] pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E5A3] animate-pulse" />
            <span className="text-[11px] font-mono font-bold text-[#00F0FF] tracking-wider uppercase">
              ACTIVE MISSION HUD
            </span>
          </div>

          <div className="flex items-center gap-1 font-mono text-xs text-[#E6EDF3] bg-[#050709] px-2 py-0.5 rounded border border-[#1B2631]">
            <TimerIcon className="w-3 h-3 text-[#00E5A3]" />
            <span>{formatTimer(secondsElapsed)}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                playTerminalClick();
                setIsMinimized(false);
              }}
              className="p-1 text-[#00F0FF] hover:bg-[#00F0FF]/20 rounded transition-colors"
              title="Expand HUD overlay"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                playTerminalClick();
                onClose();
              }}
              className="p-1 text-[#7D8B99] hover:text-[#FF2A4D] hover:bg-[#FF2A4D]/10 rounded transition-colors"
              title="Close mission overlay"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-xs font-bold text-[#E6EDF3] truncate">
            {mission.title}
          </h4>
          <p className="text-[11px] font-mono text-[#00E5A3] truncate">
            Target: {mission.targetLocation}
          </p>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#7D8B99] pt-1">
            <span>
              Step {focusedStepNumber}/{totalCount}: {currentFocusedStep?.title}
            </span>
            <span className="text-[#00F0FF] font-bold">{progressPercent}%</span>
          </div>
        </div>

        <button
          onClick={() => {
            playTerminalClick();
            setIsMinimized(false);
          }}
          className="mt-2 w-full py-1.5 px-3 bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border border-[#00F0FF]/40 rounded-lg text-xs font-mono font-bold text-[#00F0FF] flex items-center justify-center gap-1.5 transition-colors"
        >
          <Maximize2 className="w-3 h-3" />
          EXPAND FULLSCREEN HUD
        </button>
      </aside>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Active Mission HUD Overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#050709]/95 backdrop-blur-md flex flex-col justify-between select-none"
    >
      {/* Sci-Fi Decorative Grid / Corner Telemetry Lines */}
      <div className="pointer-events-none fixed inset-0 opacity-15 bg-[radial-gradient(#00F0FF_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="pointer-events-none fixed top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#00F0FF]/40" />
      <div className="pointer-events-none fixed top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#00F0FF]/40" />
      <div className="pointer-events-none fixed bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#00F0FF]/40" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#00F0FF]/40" />

      {/* Top Informative Header (Non-interactive buffer zone for broken top screens - safe margin 165px+) */}
      <header className="relative z-10 border-b-2 border-[#1B2631] bg-[#050709] px-4 sm:px-6 pt-10 sm:pt-12 pb-5 select-none shrink-0 pointer-events-none min-h-[165px] sm:min-h-[185px] flex flex-col justify-center">
        <div className="max-w-6xl w-full mx-auto flex flex-col gap-2">
          {/* Top diagnostic line */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#7D8B99] border-b border-[#1B2631]/60 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00E5A3] shadow-[0_0_8px_#00E5A3] animate-pulse" />
              <span className="text-[#00E5A3] font-bold tracking-widest uppercase">
                ATLAS HUD // DIRECTIVE MATRIX
              </span>
              <span className="text-[#1B2631]">|</span>
              <span className="hidden sm:inline">16.16.16 // TELEMETRY LOCK ESTABLISHED</span>
            </div>
            <div className="text-[10px] font-mono text-[#00F0FF] font-bold">
              DIGITIZER BUFFER: SAFE FOR TOUCH BELOW
            </div>
          </div>

          {/* Informative Diagnostic Callout Bar */}
          <div className="flex items-center justify-between text-[10px] font-mono bg-[#0E141B] px-3 py-1 rounded border border-[#1B2631]/70 text-[#7D8B99]">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              <span className="text-[#00F0FF] font-bold uppercase">TOP 20% SAFE DISPLAY BUFFER</span>
              <span className="text-[#7D8B99] hidden sm:inline">— TIMER & CONTROLS LOWERED FOR ACCESSIBLE TAP</span>
            </div>
            <span className="text-[#00E5A3] font-bold">CHRONO & CONTROLS ACTIVE BELOW</span>
          </div>

          {/* Mission identification ribbon */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 font-mono">
              <span className="text-xs sm:text-sm font-black text-[#00F0FF] tracking-wider uppercase flex items-center gap-1.5">
                <Crosshair className="w-4 h-4 text-[#00F0FF]" />
                {mission.protocol_id}
              </span>
              <span className="text-xs text-[#7D8B99]">·</span>
              <span className="text-xs sm:text-sm font-bold text-[#E6EDF3] truncate max-w-xs sm:max-w-md">
                {mission.title}
              </span>
            </div>

            <div className="text-[11px] font-mono text-[#00E5A3] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[200px] sm:max-w-none">{mission.targetLocation}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main HUD Body */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 flex flex-col gap-6">
        {/* LOWERED TACTICAL CONTROLS & CHRONOMETER BAR (Safe below broken top zone) */}
        <section
          aria-label="Tactical Controls and Timer"
          className="bg-[#0E141B] border-2 border-[#00F0FF]/40 rounded-2xl p-3.5 sm:p-4.5 shadow-xl flex items-center justify-between gap-3 flex-wrap"
        >
          {/* Mission Chronometer Bar (Lowered and enlarged for easy tapping) */}
          <div className="flex items-center gap-3 bg-[#050709] border border-[#00E5A3]/50 rounded-xl px-3.5 py-2 shadow-[0_0_15px_rgba(0,229,163,0.15)] flex-wrap">
            <div className="flex items-center gap-2">
              <TimerIcon className="w-4 h-4 text-[#00E5A3] animate-spin" style={{ animationDuration: '4s' }} />
              <div className="flex flex-col">
                <span className="text-[9px] font-mono text-[#7D8B99] uppercase leading-none">MISSION CHRONO</span>
                <span className="text-sm sm:text-base font-mono text-[#00E5A3] font-black tracking-wider leading-tight">
                  {formatTimer(secondsElapsed)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 pl-2 border-l border-[#1B2631]">
              <button
                onClick={handleToggleTimer}
                className="p-1.5 rounded-lg bg-[#0E141B] border border-[#1B2631] text-[#7D8B99] hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={handleResetTimer}
                className="p-1.5 rounded-lg bg-[#0E141B] border border-[#1B2631] text-[#7D8B99] hover:text-[#FF2A4D] hover:border-[#FF2A4D] transition-colors"
                title="Reset timer to 00:00"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Text Size Accessibility Scaling */}
          <div className="flex items-center gap-1 bg-[#050709] border border-[#1B2631] rounded-xl p-1 text-xs font-mono">
            <span className="text-[10px] text-[#7D8B99] px-2 hidden sm:inline">TEXT SIZE:</span>
            <button
              onClick={() => {
                playTerminalClick();
                setTextScale('standard');
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold ${
                textScale === 'standard'
                  ? 'bg-[#00F0FF] text-black shadow-sm'
                  : 'text-[#7D8B99] hover:text-[#E6EDF3]'
              }`}
              title="Standard large text"
            >
              STD
            </button>
            <button
              onClick={() => {
                playTerminalClick();
                setTextScale('giant');
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold ${
                textScale === 'giant'
                  ? 'bg-[#00F0FF] text-black shadow-sm'
                  : 'text-[#7D8B99] hover:text-[#E6EDF3]'
              }`}
              title="Giant text for second screen"
            >
              GIANT
            </button>
            <button
              onClick={() => {
                playTerminalClick();
                setTextScale('maximum');
              }}
              className={`px-2.5 py-1.5 rounded-lg transition-colors text-xs font-bold ${
                textScale === 'maximum'
                  ? 'bg-[#00F0FF] text-black shadow-sm'
                  : 'text-[#7D8B99] hover:text-[#E6EDF3]'
              }`}
              title="Maximum massive text for TV / couch play"
            >
              MAX
            </button>
          </div>

          {/* Window Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playTerminalClick();
                setIsMinimized(true);
              }}
              className="py-1.5 px-3 rounded-xl border border-[#1B2631] bg-[#050709] text-xs font-mono text-[#7D8B99] hover:text-[#00F0FF] hover:border-[#00F0FF] flex items-center gap-1.5 transition-colors"
              title="Minimize to floating HUD"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">MINIMIZE</span>
            </button>

            <button
              onClick={() => {
                playTerminalClick();
                onClose();
              }}
              className="py-1.5 px-3.5 rounded-xl border border-[#FF2A4D]/50 bg-[#FF2A4D]/15 text-xs font-mono font-bold text-[#FF2A4D] hover:bg-[#FF2A4D]/25 flex items-center gap-1.5 transition-colors"
              title="Disengage HUD"
            >
              <X className="w-3.5 h-3.5" />
              <span>EXIT HUD</span>
            </button>
          </div>
        </section>

        {/* 1. Broad Mission Details Banner (Extra Large Headline & Key Telemetry) */}
        <section aria-label="Broad Mission Details" className="bg-[#0E141B]/90 border-2 border-[#1B2631] rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col gap-3">
            {/* Metadata Tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] uppercase tracking-wide">
                {mission.categoryName}
              </span>
              {mission.categories && mission.categories.length > 1 && (
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#FFB300]/15 border border-[#FFB300]/40 text-[#FFB300] flex items-center gap-1">
                  <Zap className="w-3 h-3 text-[#FFB300]" />
                  {mission.categories.length} STYLES FUSED
                </span>
              )}
              {currentPath && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#00E5A3]/15 border border-[#00E5A3]/40 text-[#00E5A3] font-bold">
                  {currentPath.themeTitle}
                </span>
              )}
            </div>

            {/* Mission Title - HUGE Typography */}
            <h1 className={`${typography.title} font-black text-[#E6EDF3] tracking-wide leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]`}>
              {mission.title}
            </h1>

            {/* Target Location - Ultra Clear */}
            <div className={`flex items-center gap-2 ${typography.location} text-[#00E5A3] font-mono font-bold`}>
              <MapPin className="w-5 h-5 shrink-0 text-[#00E5A3] animate-bounce" />
              <span>Target: {mission.targetLocation}</span>
            </div>

            {/* Mission Flavor / Brief Quote */}
            {mission.flavor_quote && (
              <p className="mt-1 font-mono text-xs sm:text-sm text-[#7D8B99] italic border-l-2 border-[#00F0FF] pl-3 leading-relaxed">
                "{mission.flavor_quote}"
              </p>
            )}

            {/* Overall Mission Progress Bar */}
            <div className="mt-2 pt-3 border-t border-[#1B2631] flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-mono font-bold">
                <span className="text-[#7D8B99]">MISSION DIRECTIVE PROGRESS</span>
                <span className={isAllComplete ? 'text-[#00E5A3]' : 'text-[#00F0FF]'}>
                  {completedCount} of {totalCount} Key Objectives Complete ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-3 bg-[#050709] rounded-full overflow-hidden border border-[#1B2631]">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    isAllComplete
                      ? 'bg-gradient-to-r from-[#00E5A3] to-[#00F0FF] shadow-[0_0_15px_#00E5A3]'
                      : 'bg-gradient-to-r from-[#00F0FF] to-[#00E5A3]'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Path Switcher (If multiple thematic paths exist) */}
        {mission.paths && mission.paths.length > 1 && onChangePathId && (
          <section aria-label="Thematic Path Selection" className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-xl flex flex-col gap-2">
            <span className="text-xs font-mono font-bold text-[#7D8B99] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#00F0FF]" />
              SELECT STRATEGIC PATH FOR HUD:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {mission.paths.map((p) => {
                const isSelected = p.path_id === activePathId;
                return (
                  <button
                    key={p.path_id}
                    onClick={() => {
                      playTerminalClick();
                      onChangePathId(p.path_id);
                      setFocusedStepNumber(1);
                    }}
                    className={`p-3 rounded-lg border text-left font-mono transition-all ${
                      isSelected
                        ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#E6EDF3] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:border-[#00F0FF]/40 hover:text-[#E6EDF3]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className={isSelected ? 'text-[#00F0FF]' : 'text-[#7D8B99]'}>
                        {p.themeTitle}
                      </span>
                      {isSelected && <span className="text-[10px] text-[#00E5A3]">ACTIVE</span>}
                    </div>
                    <p className="text-[11px] line-clamp-2 leading-snug text-[#7D8B99]">
                      {p.approach}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* 3. Main Objective Section: Clickable Large Tiles + Active Inspection Focus */}
        <section aria-label="Key Objectives" className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm sm:text-base font-mono font-black text-[#E6EDF3] tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F0FF]" />
              KEY MISSION OBJECTIVES // SELECT TILE TO FOCUS
            </h2>
            <span className="text-xs font-mono text-[#7D8B99]">
              Click tile to focus text & inspect
            </span>
          </div>

          {/* Clickable Large Objective Tiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {stepsToDisplay.map((step) => {
              const stepKey = `${pathStorageKey}_${step.step_number}`;
              const isDone = !!stepChecklist[stepKey];
              const isFocused = focusedStepNumber === step.step_number;

              return (
                <div
                  key={step.step_number}
                  onClick={() => {
                    playTerminalClick();
                    setFocusedStepNumber(step.step_number);
                  }}
                  className={`cursor-pointer rounded-2xl border-2 p-4 sm:p-5 flex flex-col justify-between transition-all select-none relative group ${
                    isFocused
                      ? 'bg-[#0E141B] border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.3)] ring-2 ring-[#00F0FF]/50 scale-[1.02]'
                      : isDone
                      ? 'bg-[#050709]/80 border-[#00E5A3]/40 hover:border-[#00E5A3]'
                      : 'bg-[#0E141B]/80 border-[#1B2631] hover:border-[#00F0FF]/60 hover:bg-[#0E141B]'
                  }`}
                >
                  {/* Active Indicator Top Tag */}
                  {isFocused && (
                    <div className="absolute -top-3 left-4 px-2.5 py-0.5 rounded-full bg-[#00F0FF] text-black text-[10px] font-mono font-black tracking-widest uppercase shadow-[0_0_10px_#00F0FF]">
                      FOCUSED NOW
                    </div>
                  )}

                  {/* Tile Header: Step # & Complete Icon */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#050709] text-[#00F0FF] border border-[#1B2631]">
                      STEP {step.step_number}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStep(pathStorageKey, step.step_number);
                      }}
                      className="p-1 rounded-full hover:bg-white/10 transition-transform active:scale-90"
                      title={isDone ? 'Mark uncompleted' : 'Mark finished'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-[#00E5A3]" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#7D8B99] group-hover:text-[#00F0FF]" />
                      )}
                    </button>
                  </div>

                  {/* Step Title in Large Clear Typography */}
                  <div className="flex-1 mb-3">
                    <h3
                      className={`${typography.objectiveTileTitle} font-bold leading-snug mb-1.5 transition-colors ${
                        isDone
                          ? 'line-through text-[#7D8B99]'
                          : isFocused
                          ? 'text-[#00F0FF]'
                          : 'text-[#E6EDF3]'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`${typography.objectiveTileDesc} leading-relaxed text-[#7D8B99] line-clamp-3`}
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Tile Footer Action Button */}
                  <div className="pt-2 border-t border-[#1B2631] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7D8B99] flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {isFocused ? 'Inspecting' : 'Click to Focus'}
                    </span>
                    <span
                      className={`font-bold ${
                        isDone ? 'text-[#00E5A3]' : 'text-[#7D8B99]'
                      }`}
                    >
                      {isDone ? 'COMPLETE [✓]' : 'PENDING'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. Active Objective Deep Focus Panel (Giant Text & Direct Finish Button) */}
          {currentFocusedStep && (
            <div className="mt-2 bg-gradient-to-b from-[#0E141B] to-[#050709] border-2 border-[#00F0FF] rounded-2xl p-6 sm:p-8 shadow-[0_0_35px_rgba(0,240,255,0.2)] flex flex-col gap-4 relative">
              <div className="flex items-center justify-between gap-3 border-b border-[#1B2631] pb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm font-black px-3 py-1 rounded bg-[#00F0FF] text-black">
                    OBJECTIVE {currentFocusedStep.step_number} OF {totalCount}
                  </span>
                  <span className="text-xs font-mono text-[#00E5A3] font-bold">
                    // FOCUSED OPERATIONAL TARGET
                  </span>
                </div>

                {/* Step navigation buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playTerminalClick();
                      setFocusedStepNumber((prev) =>
                        prev > 1 ? prev - 1 : stepsToDisplay.length
                      );
                    }}
                    className="p-2 rounded-lg bg-[#050709] border border-[#1B2631] text-[#7D8B99] hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                    title="Previous objective"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="font-mono text-xs text-[#7D8B99]">
                    {currentFocusedStep.step_number} / {totalCount}
                  </span>
                  <button
                    onClick={() => {
                      playTerminalClick();
                      setFocusedStepNumber((prev) =>
                        prev < stepsToDisplay.length ? prev + 1 : 1
                      );
                    }}
                    className="p-2 rounded-lg bg-[#050709] border border-[#1B2631] text-[#7D8B99] hover:text-[#00F0FF] hover:border-[#00F0FF] transition-colors"
                    title="Next objective"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Huge Focused Title */}
              <h3 className={`${typography.focusedTitle} font-black text-[#E6EDF3] leading-tight`}>
                {currentFocusedStep.title}
              </h3>

              {/* Huge Focused Description */}
              <div className="bg-[#050709]/80 border border-[#1B2631] rounded-xl p-4 sm:p-5">
                <p className={`${typography.focusedDesc} text-[#E6EDF3] font-medium`}>
                  {currentFocusedStep.description}
                </p>
              </div>

              {/* Big Action Bar: Mark Finished Button */}
              <div className="pt-2 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs font-mono text-[#7D8B99]">
                  <CornerDownRight className="w-4 h-4 text-[#00F0FF]" />
                  <span>Press Space / Enter or tap button to toggle</span>
                </div>

                <button
                  onClick={() => {
                    onToggleStep(pathStorageKey, currentFocusedStep.step_number);
                  }}
                  className={`py-3.5 px-6 sm:px-8 rounded-xl font-mono text-sm sm:text-base font-black tracking-wider uppercase transition-all shadow-lg flex items-center gap-3 ${
                    isCurrentFocusedDone
                      ? 'bg-[#00E5A3]/20 border-2 border-[#00E5A3] text-[#00E5A3] hover:bg-[#00E5A3]/30'
                      : 'bg-gradient-to-r from-[#00F0FF] to-[#00E5A3] text-black hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95'
                  }`}
                >
                  {isCurrentFocusedDone ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-[#00E5A3]" />
                      OBJECTIVE FINISHED [COMPLETED]
                    </>
                  ) : (
                    <>
                      <Check className="w-6 h-6 text-black stroke-[3]" />
                      MARK OBJECTIVE FINISHED [✓]
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* 5. All Objectives Complete Celebration Card */}
        {isAllComplete && (
          <div className="bg-gradient-to-r from-[#00E5A3]/20 via-[#0E141B] to-[#00F0FF]/20 border-2 border-[#00E5A3] rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-3 shadow-[0_0_40px_rgba(0,229,163,0.3)] animate-in fade-in duration-300">
            <Award className="w-12 h-12 text-[#00E5A3] animate-bounce" />
            <h3 className="text-xl sm:text-2xl font-black text-[#E6EDF3] tracking-wider uppercase font-mono">
              // MISSION PROTOCOL COMPLETE //
            </h3>
            <p className="text-sm sm:text-base text-[#B0BAC5] max-w-lg">
              All operational objectives have been accomplished. Your telemetry has been
              registered within the Atlas terminal.
            </p>
            <div className="flex items-center gap-3 mt-2 flex-wrap justify-center">
              <button
                onClick={() => {
                  playTerminalClick();
                  onClose();
                }}
                className="py-2.5 px-6 rounded-xl bg-[#00E5A3] text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                RETURN TO LOGBOOK
              </button>
            </div>
          </div>
        )}

        {/* 6. Optional Bonus Objective Card (If present in mission) */}
        {mission.bonusGoal && (
          <div className="bg-[#0E141B] border border-[#FFB300]/40 rounded-xl p-4 sm:p-5 flex items-start gap-3">
            <Star className="w-5 h-5 text-[#FFB300] shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="text-xs font-mono font-bold text-[#FFB300] block mb-1">
                OPTIONAL BONUS GOAL // FIELD OPPORTUNITY
              </span>
              <p className="text-xs sm:text-sm text-[#E6EDF3] leading-relaxed">
                {mission.bonusGoal}
              </p>
            </div>
          </div>
        )}

        {/* 7. Restaurant / Outpost Spec Blueprint (If present) */}
        {mission.restaurantSpec && (
          <div className="bg-[#0E141B] border border-[#00F0FF]/30 rounded-xl p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#1B2631] pb-2">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-4 h-4 text-[#00F0FF]" />
                <span className="text-xs font-mono font-bold text-[#E6EDF3] uppercase tracking-wider">
                  VENUE SPECIFICATION // {mission.restaurantSpec.venueType}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#7D8B99]">
              <strong className="text-[#E6EDF3]">Aesthetic Theme:</strong>{' '}
              {mission.restaurantSpec.aestheticTheme}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {mission.restaurantSpec.signatureDishes.map((dish, i) => (
                <div key={i} className="p-3 rounded-lg bg-[#050709] border border-[#1B2631]">
                  <h4 className="text-xs font-bold text-[#00F0FF] mb-1">{dish.name}</h4>
                  <p className="text-[11px] text-[#7D8B99] mb-1">
                    Ingredients: {dish.ingredients.join(', ')}
                  </p>
                  <p className="text-[11px] text-[#E6EDF3] italic">{dish.processorSteps}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Sticky Action Bar */}
      <footer className="relative z-10 border-t border-[#1B2631] bg-[#0E141B]/95 backdrop-blur-sm px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs font-mono text-[#7D8B99]">
          <span className="hidden sm:inline">Shortcuts:</span>
          <kbd className="px-1.5 py-0.5 rounded bg-[#050709] border border-[#1B2631] text-[10px]">
            Arrow Keys
          </kbd>{' '}
          Select Step ·{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-[#050709] border border-[#1B2631] text-[10px]">
            Space
          </kbd>{' '}
          Toggle Done ·{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-[#050709] border border-[#1B2631] text-[10px]">
            Esc
          </kbd>{' '}
          Exit HUD
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playTerminalClick();
              setIsMinimized(true);
            }}
            className="py-2 px-4 rounded-lg bg-[#050709] border border-[#1B2631] text-xs font-mono text-[#7D8B99] hover:text-[#E6EDF3] transition-colors"
          >
            MINIMIZE HUD
          </button>
          <button
            onClick={() => {
              playTerminalClick();
              onClose();
            }}
            className="py-2 px-5 rounded-lg bg-[#FF2A4D]/15 border border-[#FF2A4D]/40 text-xs font-mono font-bold text-[#FF2A4D] hover:bg-[#FF2A4D]/25 transition-colors"
          >
            DISENGAGE MISSION HUD
          </button>
        </div>
      </footer>
    </div>
  );
};

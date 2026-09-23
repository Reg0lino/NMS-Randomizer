import React, { useState } from 'react';
import { Expedition, ExpeditionPhase, ExpeditionMilestone } from '../types';
import { PRESET_EXPEDITIONS } from '../data/challengeData';
import { 
  Compass, 
  Sparkles, 
  Dices, 
  CheckCircle2, 
  Circle, 
  Trophy, 
  Gift, 
  RotateCcw, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check 
} from 'lucide-react';
import { playAtlasPulse, playMilestoneComplete, playTerminalClick } from '../utils/audio';

interface ExpeditionViewProps {
  currentExpedition: Expedition | null;
  onGenerate: (theme: string) => Promise<void>;
  isLoading: boolean;
  onToggleMilestone: (phaseIndex: number, milestoneId: string) => void;
  onSaveExpedition: (expedition: Expedition) => void;
  isSaved: boolean;
  onResetProgress: () => void;
}

const THEME_PRESETS = [
  'Deep Sea & Oceanic Leviathans (Aquarius)',
  'Orbital Starship Fabrication & Salvage',
  'Autophage & World of Glass (Echoes)',
  'Sentinel Capital Fleet Purge',
  'Solar System Hermit & Foraging',
  'Black Hole Void Roulette',
];

export const ExpeditionView: React.FC<ExpeditionViewProps> = ({
  currentExpedition,
  onGenerate,
  isLoading,
  onToggleMilestone,
  onSaveExpedition,
  isSaved,
  onResetProgress,
}) => {
  const [themeInput, setThemeInput] = useState('');
  const [activePhaseTab, setActivePhaseTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRandomTheme = () => {
    playTerminalClick();
    const random = THEME_PRESETS[Math.floor(Math.random() * THEME_PRESETS.length)];
    setThemeInput(random);
  };

  const handleInitialize = () => {
    playAtlasPulse();
    const theme = themeInput.trim() || THEME_PRESETS[0];
    onGenerate(theme);
  };

  // Calculate overall milestone progress
  const totalMilestones = currentExpedition
    ? currentExpedition.phases.reduce((acc, p) => acc + p.milestones.length, 0)
    : 0;

  const completedMilestones = currentExpedition
    ? currentExpedition.phases.reduce(
        (acc, p) => acc + p.milestones.filter((m) => m.completed).length,
        0
      )
    : 0;

  const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  const handleCopy = () => {
    if (!currentExpedition) return;
    playTerminalClick();

    const text = `**NO MAN'S SKY EXPEDITION // ${currentExpedition.expedition_title}**
*${currentExpedition.tagline}*
Progress: ${completedMilestones}/${totalMilestones} Milestones (${progressPercent}%)

${currentExpedition.phases
  .map(
    (phase) => `**PHASE ${phase.phase_number}: ${phase.phase_name}**\n` +
      phase.milestones
        .map((m) => `${m.completed ? '[X]' : '[ ]'} ${m.task} (Reward: ${m.reward_flavor})`)
        .join('\n')
  )
  .join('\n\n')}

*Generated via No Man's Sky: Atlas Terminal*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Intro Header */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex items-center justify-between">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-mono text-[#FF2A4D] font-bold">
            <Compass className="w-3.5 h-3.5" />
            EXPEDITION CREATOR // SEASONAL CAMPAIGN
          </span>
          <p className="text-[11px] text-[#7D8B99] mt-0.5">
            Procedural 4-phase milestone campaigns simulating seasonal No Man's Sky expeditions.
          </p>
        </div>
      </div>

      {/* Theme Keyword Generator */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex flex-col gap-2">
        <label className="text-xs font-mono text-[#7D8B99] uppercase font-bold flex items-center justify-between">
          <span>EXPEDITION THEME VECTOR</span>
          <button
            onClick={handleRandomTheme}
            className="text-[10px] text-[#00F0FF] hover:underline flex items-center gap-1"
          >
            <Dices className="w-3 h-3" />
            <span>Random Theme</span>
          </button>
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            placeholder="e.g. Aquarius Deep Sea, Orbital Scrapper, Void Horror..."
            className="flex-1 bg-[#050709] border border-[#1B2631] text-xs text-[#E6EDF3] px-3 py-2 rounded focus:border-[#FF2A4D] focus:outline-none font-mono"
          />

          <button
            onClick={handleInitialize}
            disabled={isLoading}
            className={`px-4 py-2 rounded font-bold font-mono text-xs uppercase flex items-center gap-1.5 border active:scale-95 transition-all ${
              isLoading
                ? 'bg-[#FF2A4D]/20 border-[#FF2A4D]/40 text-[#FF2A4D]'
                : 'bg-[#FF2A4D] hover:bg-[#ff4362] text-white border-[#FF2A4D]'
            }`}
          >
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            <span>INITIATE</span>
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1 mt-1">
          {THEME_PRESETS.slice(0, 3).map((preset) => (
            <button
              key={preset}
              onClick={() => {
                playTerminalClick();
                setThemeInput(preset);
              }}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#050709] border border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] hover:border-[#00F0FF]/40"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Active Expedition Display */}
      {currentExpedition ? (
        <div className="bg-[#0E141B] border border-[#FF2A4D]/40 rounded-lg p-4 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] nms-bracket">
          {/* Title bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1B2631] pb-3 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#FF2A4D]">
                  COMMUNITY EXPEDITION
                </span>
                {progressPercent === 100 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400 text-emerald-400 font-bold uppercase flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    COMPLETED
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#E6EDF3] tracking-wide mt-0.5">
                {currentExpedition.expedition_title}
              </h3>
              <p className="text-xs text-[#7D8B99] italic mt-0.5">
                "{currentExpedition.tagline}"
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  playTerminalClick();
                  onSaveExpedition(currentExpedition);
                }}
                className={`p-2 rounded border transition-colors ${
                  isSaved
                    ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                }`}
                title={isSaved ? 'Saved in Archive' : 'Save Expedition'}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={handleCopy}
                className="p-2 rounded border bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] transition-colors"
                title="Copy formatted markdown"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  playTerminalClick();
                  if (confirm('Reset all milestone checkboxes for this expedition?')) {
                    onResetProgress();
                  }
                }}
                className="p-2 rounded border bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-red-400 transition-colors"
                title="Reset progress"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="mb-4 bg-[#050709] p-3 rounded border border-[#1B2631]">
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className="text-[#7D8B99] font-bold">TOTAL MILESTONES</span>
              <span className="text-[#FF2A4D] font-bold">
                {completedMilestones} / {totalMilestones} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#0E141B] rounded-full overflow-hidden border border-[#1B2631]">
              <div
                className="h-full bg-gradient-to-r from-[#FF2A4D] to-[#00F0FF] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Phase Tabs Selector */}
          <div className="grid grid-cols-4 gap-1 mb-3">
            {currentExpedition.phases.map((phase, idx) => {
              const phaseCompleted = phase.milestones.every((m) => m.completed);
              const isActive = activePhaseTab === idx;

              return (
                <button
                  key={phase.phase_number}
                  onClick={() => {
                    playTerminalClick();
                    setActivePhaseTab(idx);
                  }}
                  className={`py-2 px-1 text-center rounded border text-xs font-mono transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#E6EDF3] font-bold shadow-[0_0_8px_rgba(255,42,77,0.3)]'
                      : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>PHASE {phase.phase_number}</span>
                    {phaseCompleted && (
                      <CheckCircle2 className="w-3 h-3 text-[#00F0FF]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Phase Milestones List */}
          {currentExpedition.phases[activePhaseTab] && (
            <div className="bg-[#050709] border border-[#1B2631] p-3 rounded-lg flex flex-col gap-2.5">
              <div className="flex items-center justify-between border-b border-[#1B2631] pb-2">
                <span className="font-bold text-xs font-mono text-[#00F0FF] uppercase">
                  PHASE {currentExpedition.phases[activePhaseTab].phase_number}:{' '}
                  {currentExpedition.phases[activePhaseTab].phase_name}
                </span>
                <span className="text-[10px] font-mono text-[#7D8B99]">
                  {currentExpedition.phases[activePhaseTab].milestones.filter((m) => m.completed).length} /{' '}
                  {currentExpedition.phases[activePhaseTab].milestones.length} Done
                </span>
              </div>

              <div className="flex flex-col gap-2">
                {currentExpedition.phases[activePhaseTab].milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      onToggleMilestone(activePhaseTab, m.id);
                    }}
                    className={`cursor-pointer p-2.5 rounded border text-xs flex items-start justify-between gap-3 transition-all select-none ${
                      m.completed
                        ? 'bg-[#00F0FF]/10 border-[#00F0FF]/40 text-[#E6EDF3] opacity-85'
                        : 'bg-[#0E141B] border-[#1B2631] text-[#E6EDF3] hover:border-[#00F0FF]/40'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 flex-1">
                      <div className="mt-0.5 text-[#00F0FF]">
                        {m.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#7D8B99]" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className={`leading-snug ${m.completed ? 'line-through text-[#7D8B99]' : 'font-medium'}`}>
                          {m.task}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] font-mono text-[#FFB300]">
                          <Gift className="w-3 h-3" />
                          <span>Reward: {m.reward_flavor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#0E141B]/60 border border-dashed border-[#1B2631] rounded-lg p-8 text-center text-[#7D8B99]">
          <p className="text-xs font-mono uppercase tracking-wider mb-1">
            // NO ACTIVE EXPEDITION LOADED //
          </p>
          <p className="text-xs text-[#7D8B99]">
            Select a theme above or hit "INITIATE" to deploy a seasonal campaign.
          </p>
        </div>
      )}
    </div>
  );
};

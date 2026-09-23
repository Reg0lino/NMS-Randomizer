import React, { useState } from 'react';
import { Directive, IntensityLevel } from '../types';
import { AtlasOrb } from './AtlasOrb';
import { 
  ShieldAlert, 
  Send, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  CheckCircle2, 
  Circle, 
  Check, 
  Flame, 
  Sparkles, 
  Radio,
  Sliders,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { playAtlasPulse, playMilestoneComplete, playTerminalClick } from '../utils/audio';

interface TransceiverViewProps {
  currentDirective: Directive | null;
  onGenerate: (intensity: IntensityLevel, customNotes?: string) => Promise<void>;
  isLoading: boolean;
  onSaveDirective: (directive: Directive) => void;
  isSaved: boolean;
}

export const TransceiverView: React.FC<TransceiverViewProps> = ({
  currentDirective,
  onGenerate,
  isLoading,
  onSaveDirective,
  isSaved,
}) => {
  const [intensity, setIntensity] = useState<IntensityLevel>('Interloper');
  const [customFilterOpen, setCustomFilterOpen] = useState(false);
  const [customNotes, setCustomNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  const handleTransmit = () => {
    playAtlasPulse();
    setCompletedTasks({});
    onGenerate(intensity, customNotes.trim() ? customNotes : undefined);
  };

  const toggleTask = (index: number) => {
    playTerminalClick();
    const next = !completedTasks[index];
    if (next) {
      playMilestoneComplete();
    }
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: next,
    }));
  };

  const handleCopyMarkdown = () => {
    if (!currentDirective) return;
    playTerminalClick();

    const text = `**ATLAS DIRECTIVE // ${currentDirective.protocol_id}**
**Codename:** ${currentDirective.codename}
**Classification:** ${currentDirective.classification} [${currentDirective.intensity}]
*"${currentDirective.flavor_quote}"*

**Vocation:** ${currentDirective.core_vocation}
${currentDirective.biome_target ? `**Target Biome:** ${currentDirective.biome_target}\n` : ''}
**RULES OF ENGAGEMENT:**
${currentDirective.rules_of_engagement.map((r) => `• ${r}`).join('\n')}

**PRIMARY DIRECTIVES:**
${currentDirective.primary_directives.map((d, i) => `${completedTasks[i] ? '[X]' : '[ ]'} ${d}`).join('\n')}

**VICTORY CONDITION:**
${currentDirective.victory_condition}

*Generated via No Man's Sky: Atlas Terminal*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const intensityConfigs: Record<
    IntensityLevel,
    { label: string; desc: string; color: string; border: string; bg: string; icon: string }
  > = {
    Cadet: {
      label: 'CADET',
      desc: 'Relaxed exploration, culinary arts, architecture, scanning & photography.',
      color: 'text-[#00F0FF]',
      border: 'border-[#00F0FF]/40',
      bg: 'bg-[#00F0FF]/10',
      icon: 'Sprout',
    },
    Interloper: {
      label: 'INTERLOPER',
      desc: 'Moderate mechanical constraints (No Hyperdrives, Foraging Only, Scrapper).',
      color: 'text-[#FFB300]',
      border: 'border-[#FFB300]/40',
      bg: 'bg-[#FFB300]/10',
      icon: 'Shield',
    },
    'Atlas Protocol': {
      label: 'ATLAS PROTOCOL',
      desc: 'High-risk extreme survival (Permadeath, Zero Economy, No HUD, Dreadnoughts).',
      color: 'text-[#FF2A4D]',
      border: 'border-[#FF2A4D]/50',
      bg: 'bg-[#FF2A4D]/15',
      icon: 'Skull',
    },
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Top Banner / Telemetry readout */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg relative overflow-hidden">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#7D8B99] mb-1">
          <span className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse" />
            ANOMALY TRANSCEIVER // FREQUENCY: 16.16.16
          </span>
          <span className="text-[#FF2A4D] font-bold">READY</span>
        </div>
        <p className="text-xs text-[#E6EDF3]/80 leading-relaxed">
          Establish neural contact with the Atlas Core. Select your desired intensity threshold and transmit for an immediate, rule-bounded mission briefing.
        </p>
      </div>

      {/* Intensity Dial Selector */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-wider text-[#7D8B99] uppercase font-bold flex items-center gap-1">
            <Sliders className="w-3 h-3 text-[#FFB300]" />
            INTENSITY THRESHOLD
          </span>
          <span className={`text-xs font-mono font-bold ${intensityConfigs[intensity].color}`}>
            [{intensityConfigs[intensity].label}]
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {(['Cadet', 'Interloper', 'Atlas Protocol'] as IntensityLevel[]).map((level) => {
            const isSelected = intensity === level;
            const cfg = intensityConfigs[level];

            return (
              <button
                key={level}
                onClick={() => {
                  playTerminalClick();
                  setIntensity(level);
                }}
                className={`py-2 px-1 text-center rounded border transition-all text-xs font-bold font-mono active:scale-95 ${
                  isSelected
                    ? `${cfg.bg} ${cfg.border} ${cfg.color} shadow-[0_0_12px_rgba(0,0,0,0.5)]`
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] hover:border-[#1B2631]'
                }`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] font-mono text-[#7D8B99] mt-0.5">
          {intensityConfigs[intensity].desc}
        </p>

        {/* Optional Custom Notes / Flavor Filter */}
        <div className="mt-1">
          <button
            onClick={() => setCustomFilterOpen(!customFilterOpen)}
            className="flex items-center gap-1 text-[11px] font-mono text-[#7D8B99] hover:text-[#E6EDF3] transition-colors"
          >
            {customFilterOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            <span>Custom Telemetry Keyword (Optional)</span>
          </button>

          {customFilterOpen && (
            <div className="mt-2">
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Aquarius fishing, Dreadnought hunting, Outlaw pirate..."
                className="w-full bg-[#050709] border border-[#1B2631] text-xs text-[#E6EDF3] px-3 py-1.5 rounded focus:border-[#FF2A4D] focus:outline-none font-mono"
              />
            </div>
          )}
        </div>
      </div>

      {/* Central Pulsing Atlas Orb & Transmit Trigger */}
      <div className="flex flex-col items-center justify-center my-2 gap-3">
        <AtlasOrb onClick={handleTransmit} isPulsing={isLoading} size="lg" />

        <button
          onClick={handleTransmit}
          disabled={isLoading}
          className={`w-full max-w-sm py-3 px-6 rounded-lg font-bold tracking-wider text-sm uppercase flex items-center justify-center gap-2 border transition-all duration-300 active:scale-95 shadow-lg ${
            isLoading
              ? 'bg-[#FF2A4D]/20 border-[#FF2A4D]/40 text-[#FF2A4D] cursor-wait'
              : 'bg-gradient-to-r from-[#FF2A4D] to-[#99001D] hover:from-[#ff4362] hover:to-[#ba0024] text-white border-[#FF2A4D] shadow-[0_0_20px_rgba(255,42,77,0.4)]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>SYNCHRONIZING ATLAS CORE...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>TRANSMIT DIRECTIVE</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Dispatch Card */}
      {currentDirective ? (
        <div className="bg-[#0E141B] border border-[#FF2A4D]/40 rounded-lg p-4 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] nms-bracket">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1B2631] pb-2.5 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#FF2A4D]">
                  {currentDirective.protocol_id}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
                    currentDirective.intensity === 'Atlas Protocol'
                      ? 'bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#FF2A4D]'
                      : currentDirective.intensity === 'Interloper'
                      ? 'bg-[#FFB300]/15 border-[#FFB300] text-[#FFB300]'
                      : 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF]'
                  }`}
                >
                  {currentDirective.intensity}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#E6EDF3] tracking-wide mt-0.5">
                {currentDirective.codename}
              </h3>
            </div>

            {/* Save & Share actions */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  playTerminalClick();
                  onSaveDirective(currentDirective);
                }}
                className={`p-2 rounded border transition-colors ${
                  isSaved
                    ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                }`}
                title={isSaved ? 'Saved in Atlas Archive' : 'Save to Atlas Archive'}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={handleCopyMarkdown}
                className="p-2 rounded border bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] transition-colors relative"
                title="Copy formatted markdown to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Flavor Quote */}
          <div className="bg-[#050709] border-l-2 border-[#FF2A4D] p-2.5 rounded-r my-2 font-mono text-xs text-[#E6EDF3]/90 italic leading-relaxed">
            "{currentDirective.flavor_quote}"
          </div>

          {/* Vocation & Biome tags */}
          <div className="flex flex-wrap gap-2 my-3 text-[11px] font-mono">
            <div className="bg-[#050709] border border-[#1B2631] px-2.5 py-1 rounded flex items-center gap-1 text-[#00F0FF]">
              <Sparkles className="w-3 h-3" />
              <span>VOCATION: {currentDirective.core_vocation}</span>
            </div>
            {currentDirective.biome_target && (
              <div className="bg-[#050709] border border-[#1B2631] px-2.5 py-1 rounded flex items-center gap-1 text-[#FFB300]">
                <span>BIOME: {currentDirective.biome_target}</span>
              </div>
            )}
          </div>

          {/* Rules of Engagement */}
          <div className="my-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#FF2A4D] uppercase flex items-center gap-1.5 mb-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              RULES OF ENGAGEMENT
            </h4>
            <div className="flex flex-col gap-1.5">
              {currentDirective.rules_of_engagement.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-[#050709]/80 border border-[#1B2631] px-2.5 py-1.5 rounded text-xs text-[#E6EDF3]/90 flex items-start gap-2"
                >
                  <span className="text-[#FF2A4D] font-mono text-[10px] mt-0.5">•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Directives (Checklist) */}
          <div className="my-3">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#00F0FF] uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                PRIMARY DIRECTIVES
              </h4>
              <span className="text-[10px] font-mono text-[#7D8B99]">
                Tap to check off
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              {currentDirective.primary_directives.map((dir, idx) => {
                const done = !!completedTasks[idx];

                return (
                  <div
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className={`cursor-pointer px-2.5 py-2 rounded text-xs flex items-start gap-2.5 transition-all select-none border ${
                      done
                        ? 'bg-[#00F0FF]/10 border-[#00F0FF]/40 text-[#E6EDF3] line-through opacity-80'
                        : 'bg-[#050709] border-[#1B2631] text-[#E6EDF3] hover:border-[#00F0FF]/40'
                    }`}
                  >
                    <div className="mt-0.5 text-[#00F0FF]">
                      {done ? <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /> : <Circle className="w-4 h-4 text-[#7D8B99]" />}
                    </div>
                    <span className="leading-snug flex-1">{dir}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Victory Condition */}
          <div className="mt-4 bg-gradient-to-r from-[#FF2A4D]/15 via-[#0E141B] to-[#FF2A4D]/5 border border-[#FF2A4D]/50 rounded-lg p-3">
            <h4 className="text-xs font-mono font-bold text-[#FF2A4D] uppercase flex items-center gap-1.5 mb-1">
              <Flame className="w-3.5 h-3.5" />
              VICTORY CONDITION
            </h4>
            <p className="text-xs text-[#E6EDF3] font-semibold leading-relaxed">
              {currentDirective.victory_condition}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[#0E141B]/60 border border-dashed border-[#1B2631] rounded-lg p-8 text-center text-[#7D8B99]">
          <p className="text-xs font-mono uppercase tracking-wider mb-1">
            // TELEMETRY RECEPTACLE EMPTY //
          </p>
          <p className="text-xs text-[#7D8B99]">
            Tap the central Atlas Orb above to initiate a procedural directive.
          </p>
        </div>
      )}
    </div>
  );
};

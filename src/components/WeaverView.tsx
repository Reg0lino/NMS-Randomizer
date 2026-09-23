import React, { useState } from 'react';
import { WeaverManifesto } from '../types';
import { 
  AXIS_VOCATIONS, 
  AXIS_ECONOMY, 
  AXIS_MOBILITY, 
  AXIS_BIOMES 
} from '../data/challengeData';
import { 
  GitFork, 
  Dices, 
  Sparkles, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  Compass, 
  ShieldAlert, 
  CheckCircle2, 
  SlidersHorizontal 
} from 'lucide-react';
import { playAtlasPulse, playTerminalClick } from '../utils/audio';

interface WeaverViewProps {
  currentManifesto: WeaverManifesto | null;
  onCompile: (
    vocationId: string,
    economyId: string,
    mobilityId: string,
    biomeId: string,
    vocationName: string,
    economyName: string,
    mobilityName: string,
    biomeName: string
  ) => Promise<void>;
  isLoading: boolean;
  onSaveManifesto: (manifesto: WeaverManifesto) => void;
  isSaved: boolean;
}

export const WeaverView: React.FC<WeaverViewProps> = ({
  currentManifesto,
  onCompile,
  isLoading,
  onSaveManifesto,
  isSaved,
}) => {
  const [selectedVocation, setSelectedVocation] = useState(AXIS_VOCATIONS[0].id);
  const [selectedEconomy, setSelectedEconomy] = useState(AXIS_ECONOMY[0].id);
  const [selectedMobility, setSelectedMobility] = useState(AXIS_MOBILITY[0].id);
  const [selectedBiome, setSelectedBiome] = useState(AXIS_BIOMES[0].id);
  const [copied, setCopied] = useState(false);

  const randomizeMatrix = () => {
    playTerminalClick();
    setSelectedVocation(AXIS_VOCATIONS[Math.floor(Math.random() * AXIS_VOCATIONS.length)].id);
    setSelectedEconomy(AXIS_ECONOMY[Math.floor(Math.random() * AXIS_ECONOMY.length)].id);
    setSelectedMobility(AXIS_MOBILITY[Math.floor(Math.random() * AXIS_MOBILITY.length)].id);
    setSelectedBiome(AXIS_BIOMES[Math.floor(Math.random() * AXIS_BIOMES.length)].id);
  };

  const handleCompile = () => {
    playAtlasPulse();
    const voc = AXIS_VOCATIONS.find((v) => v.id === selectedVocation) || AXIS_VOCATIONS[0];
    const econ = AXIS_ECONOMY.find((e) => e.id === selectedEconomy) || AXIS_ECONOMY[0];
    const mob = AXIS_MOBILITY.find((m) => m.id === selectedMobility) || AXIS_MOBILITY[0];
    const bio = AXIS_BIOMES.find((b) => b.id === selectedBiome) || AXIS_BIOMES[0];

    onCompile(
      voc.id,
      econ.id,
      mob.id,
      bio.id,
      voc.name,
      econ.name,
      mob.name,
      bio.name
    );
  };

  const handleCopy = () => {
    if (!currentManifesto) return;
    playTerminalClick();

    const text = `**ATLAS SURVIVAL MANIFESTO // ${currentManifesto.protocol_id}**
**Codename:** ${currentManifesto.codename}

**Vocation:** ${currentManifesto.vocation}
**Economy:** ${currentManifesto.economy}
**Mobility:** ${currentManifesto.mobility}
**Target Biome:** ${currentManifesto.biome}

**LORE RATIONALE:**
${currentManifesto.lore_manifesto}

**RECOMMENDED SETUP:**
• Game Mode: ${currentManifesto.recommended_setup.game_mode}
• Preset: ${currentManifesto.recommended_setup.difficulty_preset}
• HUD: ${currentManifesto.recommended_setup.hud_mode}

**RULES OF ENGAGEMENT:**
${currentManifesto.rules_of_engagement.map((r) => `• ${r}`).join('\n')}

**PROGRESSION MILESTONES:**
${currentManifesto.milestone_phases
  .map((p) => `*${p.phase}*\n  Objective: ${p.objective}\n  Verification: ${p.validation}`)
  .join('\n\n')}

**VICTORY CONDITION:**
${currentManifesto.victory_condition}

*Synthesized via No Man's Sky: Atlas Terminal*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Intro Header */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex items-center justify-between">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-mono text-[#00F0FF] font-bold">
            <GitFork className="w-3.5 h-3.5" />
            THE JOURNEY WEAVER // MATRIX COMPILER
          </span>
          <p className="text-[11px] text-[#7D8B99] mt-0.5">
            Select 4 distinct challenge axes. The engine synthesizes a cohesive lore manifesto and balanced playstyle.
          </p>
        </div>

        <button
          onClick={randomizeMatrix}
          className="p-2 rounded border bg-[#050709] border-[#1B2631] text-[#FFB300] hover:border-[#FFB300] transition-colors flex items-center gap-1 text-xs font-mono font-bold active:scale-95"
          title="Randomize Matrix Axes"
        >
          <Dices className="w-4 h-4" />
          <span className="hidden xs:inline">RANDOM</span>
        </button>
      </div>

      {/* Axis 1: Vocations */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#E6EDF3] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#FF2A4D] rounded-full" />
            AXIS 1: INTERLOPER VOCATION
          </span>
          <span className="text-[#FF2A4D] font-bold text-[11px]">
            {AXIS_VOCATIONS.find((v) => v.id === selectedVocation)?.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
          {AXIS_VOCATIONS.map((voc) => {
            const isSel = selectedVocation === voc.id;
            return (
              <button
                key={voc.id}
                onClick={() => {
                  playTerminalClick();
                  setSelectedVocation(voc.id);
                }}
                className={`text-left p-2 rounded border text-xs transition-all active:scale-95 flex flex-col justify-between ${
                  isSel
                    ? 'bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#E6EDF3] shadow-[0_0_10px_rgba(255,42,77,0.3)]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] hover:border-[#7D8B99]/40'
                }`}
              >
                <span className="font-bold font-mono">{voc.name}</span>
                <span className="text-[10px] text-[#7D8B99] mt-1 line-clamp-2">{voc.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Axis 2: Economic Constraints */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#E6EDF3] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#FFB300] rounded-full" />
            AXIS 2: ECONOMIC & INVENTORY CONSTRAINT
          </span>
          <span className="text-[#FFB300] font-bold text-[11px]">
            {AXIS_ECONOMY.find((e) => e.id === selectedEconomy)?.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {AXIS_ECONOMY.map((econ) => {
            const isSel = selectedEconomy === econ.id;
            return (
              <button
                key={econ.id}
                onClick={() => {
                  playTerminalClick();
                  setSelectedEconomy(econ.id);
                }}
                className={`text-left p-2 rounded border text-xs transition-all active:scale-95 flex flex-col justify-between ${
                  isSel
                    ? 'bg-[#FFB300]/15 border-[#FFB300] text-[#E6EDF3]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                }`}
              >
                <span className="font-bold font-mono">{econ.name}</span>
                <span className="text-[10px] text-[#7D8B99] mt-0.5">{econ.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Axis 3: Mobility Modifiers */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#E6EDF3] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#00F0FF] rounded-full" />
            AXIS 3: MOBILITY & NAVIGATION MODIFIER
          </span>
          <span className="text-[#00F0FF] font-bold text-[11px]">
            {AXIS_MOBILITY.find((m) => m.id === selectedMobility)?.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {AXIS_MOBILITY.map((mob) => {
            const isSel = selectedMobility === mob.id;
            return (
              <button
                key={mob.id}
                onClick={() => {
                  playTerminalClick();
                  setSelectedMobility(mob.id);
                }}
                className={`text-left p-2 rounded border text-xs transition-all active:scale-95 flex flex-col justify-between ${
                  isSel
                    ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#E6EDF3]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                }`}
              >
                <span className="font-bold font-mono">{mob.name}</span>
                <span className="text-[10px] text-[#7D8B99] mt-0.5">{mob.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Axis 4: Biome */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#E6EDF3] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full" />
            AXIS 4: PLANETARY / SYSTEM BIOME
          </span>
          <span className="text-emerald-400 font-bold text-[11px]">
            {AXIS_BIOMES.find((b) => b.id === selectedBiome)?.name}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {AXIS_BIOMES.map((bio) => {
            const isSel = selectedBiome === bio.id;
            return (
              <button
                key={bio.id}
                onClick={() => {
                  playTerminalClick();
                  setSelectedBiome(bio.id);
                }}
                className={`text-left p-2 rounded border text-xs transition-all active:scale-95 flex flex-col justify-between ${
                  isSel
                    ? 'bg-emerald-500/15 border-emerald-400 text-[#E6EDF3]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                }`}
              >
                <span className="font-bold font-mono">{bio.name}</span>
                <span className="text-[10px] text-[#7D8B99] mt-0.5 line-clamp-2">{bio.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <div className="my-1">
        <button
          onClick={handleCompile}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-lg font-bold tracking-wider text-sm uppercase flex items-center justify-center gap-2 border transition-all duration-300 active:scale-95 shadow-lg ${
            isLoading
              ? 'bg-[#FF2A4D]/20 border-[#FF2A4D]/40 text-[#FF2A4D] cursor-wait'
              : 'bg-gradient-to-r from-[#FF2A4D] to-[#99001D] hover:from-[#ff4362] hover:to-[#ba0024] text-white border-[#FF2A4D] shadow-[0_0_20px_rgba(255,42,77,0.4)]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>COMPILING SURVIVAL MANIFESTO...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>COMPILE PLAYSTYLE</span>
            </>
          )}
        </button>
      </div>

      {/* Compiled Manifesto Display */}
      {currentManifesto && (
        <div className="bg-[#0E141B] border border-[#00F0FF]/40 rounded-lg p-4 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] nms-bracket-cyan">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1B2631] pb-2.5 mb-3">
            <div>
              <span className="font-mono text-xs font-bold text-[#00F0FF]">
                {currentManifesto.protocol_id}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#E6EDF3] tracking-wide mt-0.5">
                {currentManifesto.codename}
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  playTerminalClick();
                  onSaveManifesto(currentManifesto);
                }}
                className={`p-2 rounded border transition-colors ${
                  isSaved
                    ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                }`}
                title={isSaved ? 'Saved in Archive' : 'Save Manifesto'}
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
            </div>
          </div>

          {/* Lore Manifesto */}
          <div className="bg-[#050709] border-l-2 border-[#00F0FF] p-3 rounded-r my-2 font-mono text-xs text-[#E6EDF3]/90 italic leading-relaxed">
            "{currentManifesto.lore_manifesto}"
          </div>

          {/* Recommended Starting Setup */}
          <div className="my-3 bg-[#050709] border border-[#1B2631] p-3 rounded-lg">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#FFB300] uppercase flex items-center gap-1.5 mb-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              RECOMMENDED GAME CONFIGURATION
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="bg-[#0E141B] p-2 rounded border border-[#1B2631]">
                <span className="text-[#7D8B99] block text-[10px]">GAME MODE</span>
                <span className="font-bold text-[#E6EDF3]">
                  {currentManifesto.recommended_setup.game_mode}
                </span>
              </div>
              <div className="bg-[#0E141B] p-2 rounded border border-[#1B2631]">
                <span className="text-[#7D8B99] block text-[10px]">PRESET</span>
                <span className="font-bold text-[#E6EDF3]">
                  {currentManifesto.recommended_setup.difficulty_preset}
                </span>
              </div>
              <div className="bg-[#0E141B] p-2 rounded border border-[#1B2631]">
                <span className="text-[#7D8B99] block text-[10px]">INTERFACE</span>
                <span className="font-bold text-[#E6EDF3]">
                  {currentManifesto.recommended_setup.hud_mode}
                </span>
              </div>
            </div>
          </div>

          {/* Rules of Engagement */}
          <div className="my-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#FF2A4D] uppercase flex items-center gap-1.5 mb-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              SYNTHESIZED RESTRICTIONS
            </h4>
            <div className="flex flex-col gap-1.5">
              {currentManifesto.rules_of_engagement.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-[#050709] border border-[#1B2631] px-2.5 py-1.5 rounded text-xs text-[#E6EDF3]/90 flex items-start gap-2"
                >
                  <span className="text-[#FF2A4D] font-mono text-[10px] mt-0.5">•</span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Progressive Milestones */}
          <div className="my-3">
            <h4 className="text-xs font-mono font-bold tracking-wider text-[#00F0FF] uppercase flex items-center gap-1.5 mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              PROGRESSIVE MILESTONES
            </h4>
            <div className="flex flex-col gap-2">
              {currentManifesto.milestone_phases.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-[#050709] border border-[#1B2631] p-2.5 rounded-lg text-xs"
                >
                  <div className="font-bold font-mono text-[#00F0FF] mb-1">
                    {phase.phase}
                  </div>
                  <p className="text-[#E6EDF3] leading-relaxed mb-1">{phase.objective}</p>
                  <div className="text-[10px] font-mono text-[#7D8B99] flex items-center gap-1">
                    <span className="text-[#FFB300]">VALIDATION:</span>
                    <span>{phase.validation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Victory Condition */}
          <div className="mt-3 bg-gradient-to-r from-[#00F0FF]/15 via-[#0E141B] to-[#00F0FF]/5 border border-[#00F0FF]/40 rounded-lg p-3">
            <h4 className="text-xs font-mono font-bold text-[#00F0FF] uppercase flex items-center gap-1.5 mb-1">
              <Compass className="w-3.5 h-3.5" />
              ULTIMATE VICTORY CONDITION
            </h4>
            <p className="text-xs text-[#E6EDF3] font-semibold leading-relaxed">
              {currentManifesto.victory_condition}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

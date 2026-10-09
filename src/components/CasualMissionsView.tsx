import React, { useState, useEffect } from 'react';
import { CasualMission, MissionCategory, MissionPath } from '../types';
import { MISSION_CATEGORIES } from '../data/casualMissionData';
import { 
  Heart, 
  Skull, 
  Globe, 
  Wrench, 
  Rocket, 
  Anchor, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  RotateCcw, 
  Dices,
  ChevronDown,
  ChevronUp,
  MapPin,
  Star,
  UtensilsCrossed,
  Fish,
  ChefHat,
  Flame,
  Info,
  GitBranch,
  Zap,
  Layers,
  BookOpen,
  ScrollText,
  ShieldCheck,
  CheckSquare,
  Square,
  Play,
  Maximize2,
  Crosshair,
  Timer as TimerIcon,
  History,
  RotateCw,
  FolderArchive
} from 'lucide-react';
import { playAtlasPulse, playMilestoneComplete, playTerminalClick } from '../utils/audio';
import { ActiveMissionOverlay } from './ActiveMissionOverlay';

interface CasualMissionsViewProps {
  currentMission: CasualMission | null;
  onGenerate: (categoryOrCategories?: MissionCategory[] | MissionCategory, targetBiome?: string, customNotes?: string) => Promise<void>;
  isLoading: boolean;
  onSaveMission: (mission: CasualMission) => void;
  isSaved: boolean;
  onStartMission?: (mission: CasualMission) => void;
  savedCasualMissions?: CasualMission[];
  onSelectCasualMission?: (mission: CasualMission) => void;
}

const CATEGORY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  UtensilsCrossed,
  Heart,
  Skull,
  Globe,
  Wrench,
  Rocket,
  Anchor,
  Compass,
};

const BIOME_SUGGESTIONS = [
  'Any Biome',
  'Volcanic Ridge (Stone Bar)',
  'Deep Subterranean Cavern (Cave Diner)',
  'Deep Ocean Coral Trench (Glass Sushi Bistro)',
  'High-Altitude Sky Peak (Star-Gazer Patio)',
  'Capital Freighter Interior (Fleet Mess Hall)',
  'Bioluminescent Paradise',
  'Corrupted Dissonant World',
  'Exotic Glitch / Anomaly Planet',
  'Uncharted Red Star Moon',
];

const HYBRID_PRESETS: { name: string; categories: MissionCategory[]; label: string }[] = [
  {
    name: 'Ghost Galley',
    categories: ['culinary_restaurant', 'derelict_freighter'],
    label: 'Ghost Ship Galley & Void Cooking',
  },
  {
    name: 'Abyssal Chef',
    categories: ['culinary_restaurant', 'aquarius_fishing'],
    label: 'Deep Sea Skiff & Coral Trench Bistro',
  },
  {
    name: 'Scrap Titan',
    categories: ['planet_salvage', 'derelict_freighter'],
    label: 'Planetary Wrecks & Derelict Carrier',
  },
  {
    name: 'Beast & Machine',
    categories: ['xeno_companion', 'planet_salvage'],
    label: 'Megafauna Steeds & Crashed Starships',
  },
  {
    name: 'Frontier Rest-Stop',
    categories: ['culinary_restaurant', 'planet_expedition'],
    label: 'Paradise Peaks & Outdoor Lounge',
  },
];

export const CasualMissionsView: React.FC<CasualMissionsViewProps> = ({
  currentMission,
  onGenerate,
  isLoading,
  onSaveMission,
  isSaved,
  onStartMission,
  savedCasualMissions = [],
  onSelectCasualMission,
}) => {
  const [isHudOpen, setIsHudOpen] = useState(false);
  const [offlineLoggedToast, setOfflineLoggedToast] = useState(false);
  const [showPreviousLog, setShowPreviousLog] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<MissionCategory[]>(() => {
    if (currentMission?.categories && currentMission.categories.length > 0) {
      return currentMission.categories;
    }
    return [currentMission?.category || 'culinary_restaurant'];
  });

  const handleStartMissionHud = () => {
    playAtlasPulse();
    setIsHudOpen(true);
    if (currentMission && onStartMission) {
      onStartMission(currentMission);
      setOfflineLoggedToast(true);
      setTimeout(() => setOfflineLoggedToast(false), 3500);
    }
  };

  const [isCombineMode, setIsCombineMode] = useState<boolean>(() => {
    return (currentMission?.categories && currentMission.categories.length > 1) || false;
  });

  const [activePathId, setActivePathId] = useState<string>('alpha');
  const [selectedBiome, setSelectedBiome] = useState<string>('Any Biome');
  const [customFilterOpen, setCustomFilterOpen] = useState(false);
  const [cookingGuideOpen, setCookingGuideOpen] = useState(false);
  const [loreOpen, setLoreOpen] = useState(true);
  const [customNotes, setCustomNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [stepChecklist, setStepChecklist] = useState<Record<string, boolean>>({});
  const [decorChecklist, setDecorChecklist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (currentMission?.activePathId) {
      setActivePathId(currentMission.activePathId);
    } else if (currentMission?.paths && currentMission.paths.length > 0) {
      setActivePathId(currentMission.paths[0].path_id);
    }
  }, [currentMission?.id]);

  const toggleCategorySelection = (catId: MissionCategory) => {
    playTerminalClick();
    if (!isCombineMode) {
      setSelectedCategories([catId]);
      return;
    }
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const handleApplyPreset = (cats: MissionCategory[]) => {
    playTerminalClick();
    setIsCombineMode(true);
    setSelectedCategories(cats);
  };

  const handleToggleCombineMode = () => {
    playTerminalClick();
    const next = !isCombineMode;
    setIsCombineMode(next);
    if (!next && selectedCategories.length > 1) {
      setSelectedCategories([selectedCategories[0]]);
    }
  };

  const handleGenerate = (cats?: MissionCategory[]) => {
    playAtlasPulse();
    setStepChecklist({});
    setDecorChecklist({});
    const targetCats = cats || (selectedCategories.length > 0 ? selectedCategories : ['culinary_restaurant']);
    const biome = selectedBiome === 'Any Biome' ? undefined : selectedBiome;
    onGenerate(targetCats, biome, customNotes.trim() ? customNotes : undefined);
  };

  const handleRandomSurprise = () => {
    playTerminalClick();
    if (isCombineMode) {
      // Pick 2 or 3 random distinct categories
      const shuffled = [...MISSION_CATEGORIES].sort(() => 0.5 - Math.random());
      const count = Math.random() > 0.5 ? 2 : 3;
      const picked = shuffled.slice(0, count).map((c) => c.id);
      setSelectedCategories(picked);
      handleGenerate(picked);
    } else {
      const randomCat = MISSION_CATEGORIES[Math.floor(Math.random() * MISSION_CATEGORIES.length)].id;
      setSelectedCategories([randomCat]);
      handleGenerate([randomCat]);
    }
  };

  const toggleStep = (pathKey: string, stepNumber: number) => {
    playTerminalClick();
    const key = `${pathKey}_${stepNumber}`;
    const next = !stepChecklist[key];
    if (next) {
      playMilestoneComplete();
    }
    setStepChecklist((prev) => ({
      ...prev,
      [key]: next,
    }));
  };

  const toggleDecorItem = (key: string) => {
    playTerminalClick();
    const next = !decorChecklist[key];
    if (next) {
      playMilestoneComplete();
    }
    setDecorChecklist((prev) => ({
      ...prev,
      [key]: next,
    }));
  };

  const RANDOM_MISSION_NOTES = [
    'Volcanic stone bar serving roasted marrow and flame pastries',
    'Deep abyssal cavern with glowing flora and underwater skiff angling',
    'High-altitude glass star-gazer patio facing binary stars',
    'Derelict freighter salvage with tainted metal extraction',
    'Corrupted dissonant world hunting inverted mirrors and harmonic scrap',
    'Ancient titan bone excavation and colossal fossil cataloguing',
    'Fauna sanctuary outpost with robotic creature taming and milk extraction',
    'Oceanic sushi bistro on floating coral atoll during tempest storms',
    'Sentinel pillar pacification and multi-tool technology overclocking',
    'Interstellar trade hub with luxury cargo distribution',
  ];

  const handleRandomizeCategories = () => {
    playTerminalClick();
    const count = Math.random() > 0.4 ? 2 : 1;
    const shuffled = [...MISSION_CATEGORIES].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, count).map((c) => c.id);
    setSelectedCategories(picked);
  };

  const handleRandomizeDetails = () => {
    playTerminalClick();
    const randomBiome = BIOME_SUGGESTIONS[Math.floor(Math.random() * BIOME_SUGGESTIONS.length)];
    setSelectedBiome(randomBiome);
    const randomNote = RANDOM_MISSION_NOTES[Math.floor(Math.random() * RANDOM_MISSION_NOTES.length)];
    setCustomNotes(randomNote);
    setCustomFilterOpen(true);
  };

  const handleSurpriseMeAndGenerate = async () => {
    playAtlasPulse();
    const count = Math.random() > 0.4 ? 2 : 1;
    const shuffled = [...MISSION_CATEGORIES].sort(() => 0.5 - Math.random());
    const pickedCats = shuffled.slice(0, count).map((c) => c.id);
    setSelectedCategories(pickedCats);

    const randomBiome = BIOME_SUGGESTIONS[Math.floor(Math.random() * BIOME_SUGGESTIONS.length)];
    setSelectedBiome(randomBiome);

    const randomNote = RANDOM_MISSION_NOTES[Math.floor(Math.random() * RANDOM_MISSION_NOTES.length)];
    setCustomNotes(randomNote);

    await onGenerate(
      pickedCats,
      randomBiome === 'Any Biome' ? undefined : randomBiome,
      randomNote
    );
  };

  // Determine current active path
  const currentPath: MissionPath | undefined =
    currentMission?.paths?.find((p) => p.path_id === activePathId) ||
    currentMission?.paths?.[0];

  const stepsToDisplay = currentPath ? currentPath.steps : (currentMission?.steps || []);
  const pathStorageKey = currentPath ? currentPath.path_id : 'main';

  const completedStepsCount = stepsToDisplay.filter(
    (s) => stepChecklist[`${pathStorageKey}_${s.step_number}`]
  ).length;
  const totalStepsCount = stepsToDisplay.length;
  const progressPercent = totalStepsCount > 0 ? Math.round((completedStepsCount / totalStepsCount) * 100) : 0;

  const handleCopyMarkdown = () => {
    if (!currentMission) return;
    playTerminalClick();

    let text = `**NO MAN'S SKY MISSION // ${currentMission.title}**\n`;
    text += `*Category: ${currentMission.categoryName}*\n`;
    if (currentMission.categories && currentMission.categories.length > 1) {
      text += `*Combined Styles:* ${currentMission.categories.join(' + ')}\n`;
    }
    text += `Location: ${currentMission.targetLocation}\n`;
    text += `"${currentMission.flavor_quote}"\n\n`;

    if (currentMission.lore) {
      text += `📜 **IN-GAME LORE: ${currentMission.lore.headline}**\n`;
      text += `*Origin:* ${currentMission.lore.origin} | *Entity:* ${currentMission.lore.canonEntity || 'Unknown'}\n`;
      text += `${currentMission.lore.narrative}\n\n`;
    }

    if (currentMission.paths && currentMission.paths.length > 0) {
      text += `🧭 **THE THREE THEMATIC PATHS:**\n`;
      currentMission.paths.forEach((p) => {
        text += `\n### [${p.themeTitle}]\n`;
        text += `*Approach:* ${p.approach}\n`;
        text += `*Advantage:* ${p.tacticalAdvantage}\n`;
        text += `*Steps:*\n`;
        p.steps.forEach((s) => {
          const checked = stepChecklist[`${p.path_id}_${s.step_number}`] ? '[X]' : '[ ]';
          text += `${checked} Step ${s.step_number}: ${s.title} - ${s.description}\n`;
        });
      });
    } else {
      text += `**MISSION STEPS:**\n`;
      currentMission.steps.forEach((s) => {
        const checked = stepChecklist[`main_${s.step_number}`] ? '[X]' : '[ ]';
        text += `${checked} Step ${s.step_number}: ${s.title}\n   ${s.description}\n`;
      });
    }

    if (currentMission.restaurantSpec) {
      const spec = currentMission.restaurantSpec;
      text += `\n**VENUE BLUEPRINT: ${spec.venueType}**\n`;
      text += `*Aesthetic Theme:* ${spec.aestheticTheme}\n`;
      if (spec.fishingCatch) {
        text += `*Fresh Catch Requirement:* ${spec.fishingCatch}\n`;
      }
      text += `*Signature Dishes & Recipes:*\n`;
      spec.signatureDishes.forEach((d) => {
        text += `- **${d.name}** [${d.ingredients.join(', ')}]: ${d.processorSteps}\n`;
      });
    }

    if (currentMission.bonusGoal) {
      text += `\n⭐ Bonus Goal: ${currentMission.bonusGoal}\n`;
    }
    text += `\n*Generated via No Man's Sky: Atlas Terminal*`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const isMultiSelected = selectedCategories.length > 1;

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Top Banner - Clean and Friendly */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3.5 rounded-xl shadow-lg relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] animate-pulse" />
            <h2 className="text-xs sm:text-sm font-bold font-mono tracking-wider text-[#E6EDF3] uppercase">
              PROCEDURAL MISSION MATRIX // ADVENTURES
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleToggleCombineMode}
              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1 border transition-all ${
                isCombineMode
                  ? 'bg-[#FFB300]/20 border-[#FFB300] text-[#FFB300] shadow-[0_0_10px_rgba(255,179,0,0.3)]'
                  : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
              }`}
              title="Toggle multi-style combination mode"
            >
              <Zap className="w-3 h-3" />
              <span>{isCombineMode ? 'HYBRID FUSION: ON' : 'COMBINE STYLES'}</span>
            </button>
          </div>
        </div>
        <p className="text-xs text-[#7D8B99] leading-relaxed">
          Select one or combine <strong>multiple mission styles</strong>. Generating creates an authentic procedural mission featuring <strong>in-game lore</strong> and <strong>three distinct thematic paths</strong> to undertake!
        </p>

        {/* Fusion Active Banner */}
        {isCombineMode && (
          <div className="mt-2.5 pt-2.5 border-t border-[#1B2631] flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-[#FFB300] text-[11px] font-bold">
              <Zap className="w-3.5 h-3.5 text-[#FFB300]" />
              <span>
                {selectedCategories.length} STYLE{selectedCategories.length > 1 ? 'S' : ''} SELECTED:
              </span>
              <span className="text-[#E6EDF3]">
                {selectedCategories.map((c) => {
                  const m = MISSION_CATEGORIES.find((cat) => cat.id === c);
                  return m?.name.split(' ')[0];
                }).join(' + ')}
              </span>
            </div>

            <div className="flex items-center gap-1 text-[10px] font-mono">
              <button
                onClick={() => setSelectedCategories(MISSION_CATEGORIES.map((c) => c.id))}
                className="px-2 py-0.5 rounded bg-[#050709] border border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]"
              >
                All
              </button>
              <button
                onClick={() => setSelectedCategories(['culinary_restaurant'])}
                className="px-2 py-0.5 rounded bg-[#050709] border border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preset Combos in Fusion Mode */}
      {isCombineMode && (
        <div className="bg-[#050709] border border-[#1B2631] p-2.5 rounded-xl flex flex-col gap-1.5">
          <span className="text-[10px] font-mono uppercase text-[#7D8B99] font-bold flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#00F0FF]" />
            QUICK HYBRID COMBOS:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {HYBRID_PRESETS.map((preset) => {
              const isMatch =
                preset.categories.length === selectedCategories.length &&
                preset.categories.every((c) => selectedCategories.includes(c));
              return (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset.categories)}
                  className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                    isMatch
                      ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-bold shadow-[0_0_8px_rgba(0,240,255,0.3)]'
                      : 'bg-[#0E141B] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                  }`}
                >
                  ⚡ {preset.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Activity Selector Cards */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono px-1">
          <span className="text-[#E6EDF3] font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
            {isCombineMode ? 'SELECT 2 OR MORE STYLES TO COMBINE' : 'CHOOSE AN ACTIVITY'}
          </span>
          <button
            onClick={handleRandomSurprise}
            className="text-[11px] text-[#FFB300] hover:underline flex items-center gap-1 font-bold"
          >
            <Dices className="w-3.5 h-3.5" />
            {isCombineMode ? 'Random Combo' : 'Surprise Me'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MISSION_CATEGORIES.map((cat) => {
            const isSelected = selectedCategories.includes(cat.id);
            const IconComponent = CATEGORY_ICONS[cat.icon] || Globe;

            return (
              <button
                key={cat.id}
                onClick={() => toggleCategorySelection(cat.id)}
                className={`text-left p-3 rounded-xl border transition-all duration-200 active:scale-95 flex items-start gap-3 relative ${
                  isSelected
                    ? isCombineMode
                      ? 'bg-[#0E141B] border-[#FFB300] shadow-[0_0_12px_rgba(255,179,0,0.25)] ring-1 ring-[#FFB300]/50'
                      : 'bg-[#0E141B] border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.25)] ring-1 ring-[#00F0FF]/50'
                    : 'bg-[#0E141B]/60 border-[#1B2631] text-[#7D8B99] hover:border-[#1B2631] hover:text-[#E6EDF3] hover:bg-[#0E141B]'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isSelected
                      ? isCombineMode
                        ? 'bg-[#FFB300]/20 text-[#FFB300]'
                        : 'bg-[#00F0FF]/20 text-[#00F0FF]'
                      : 'bg-[#050709] text-[#7D8B99]'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-bold font-mono tracking-wide ${
                        isSelected ? 'text-[#E6EDF3]' : 'text-[#7D8B99]'
                      }`}
                    >
                      {cat.name}
                    </span>
                    {isSelected && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCombineMode ? 'bg-[#FFB300]' : 'bg-[#00F0FF]'
                        } shrink-0`}
                      />
                    )}
                  </div>
                  <p className="text-[11px] text-[#7D8B99] mt-0.5 line-clamp-1 leading-snug">
                    {cat.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Biome Filter & Optional Custom Request */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-xl flex flex-col gap-2.5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-mono text-[#7D8B99] uppercase font-bold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00E5A3]" />
            TARGET PLANET / SETTING
          </label>
          <select
            value={selectedBiome}
            onChange={(e) => setSelectedBiome(e.target.value)}
            className="bg-[#050709] border border-[#1B2631] text-xs text-[#E6EDF3] px-2.5 py-1.5 rounded-lg font-mono focus:border-[#00F0FF] focus:outline-none"
          >
            {BIOME_SUGGESTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Optional Custom Notes */}
        <div>
          <button
            onClick={() => setCustomFilterOpen(!customFilterOpen)}
            className="flex items-center gap-1 text-[11px] font-mono text-[#7D8B99] hover:text-[#E6EDF3] transition-colors"
          >
            {customFilterOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            <span>Custom Keyword or Note (Optional)</span>
          </button>

          {customFilterOpen && (
            <div className="mt-2">
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Volcanic stone bar, Deep cave stellar custard, Aquarium sushi..."
                className="w-full bg-[#050709] border border-[#1B2631] text-xs text-[#E6EDF3] px-3 py-2 rounded-lg focus:border-[#00F0FF] focus:outline-none font-mono"
              />
            </div>
          )}
        </div>

        {/* Surprise Me & Quick Randomizers (Near mission creation area, not on top) */}
        <div className="bg-[#050709] border border-[#1B2631] rounded-xl p-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-[#7D8B99]">
            <span className="flex items-center gap-1.5 text-[#00F0FF]">
              <Dices className="w-4 h-4 text-[#00F0FF]" />
              MISSION CREATION RANDOMIZERS
            </span>
            <span className="text-[10px] text-[#7D8B99]">1-Tap Discovery</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleRandomizeCategories}
              className="py-2 px-3 rounded-lg border border-[#1B2631] bg-[#0E141B] hover:border-[#00F0FF]/50 text-xs font-mono text-[#E6EDF3] flex items-center justify-center gap-1.5 transition-colors"
              title="Pick random activity styles"
            >
              <Dices className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>Randomize Category</span>
            </button>

            <button
              type="button"
              onClick={handleRandomizeDetails}
              className="py-2 px-3 rounded-lg border border-[#1B2631] bg-[#0E141B] hover:border-[#00E5A3]/50 text-xs font-mono text-[#E6EDF3] flex items-center justify-center gap-1.5 transition-colors"
              title="Pick random planet biome and tactical focus"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00E5A3]" />
              <span>Randomize Mission Details</span>
            </button>
          </div>

          {/* Full Surprise Me Generate Action */}
          <button
            type="button"
            onClick={handleSurpriseMeAndGenerate}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-[#00F0FF]/20 via-[#FFB300]/20 to-[#00E5A3]/20 hover:from-[#00F0FF]/30 hover:to-[#00E5A3]/30 border border-[#00F0FF]/50 text-xs font-mono font-bold text-[#E6EDF3] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
            title="Randomize categories, planet and details, then generate immediately"
          >
            <Dices className="w-4 h-4 text-[#FFB300]" />
            <span>🎲 SURPRISE ME // RANDOMIZE EVERYTHING & GENERATE</span>
          </button>
        </div>

        {/* Big Generate Button */}
        <button
          onClick={() => handleGenerate()}
          disabled={isLoading}
          className={`w-full py-3 px-6 rounded-xl font-bold tracking-wider text-xs sm:text-sm uppercase flex items-center justify-center gap-2 border transition-all duration-300 active:scale-95 shadow-lg ${
            isLoading
              ? 'bg-[#00F0FF]/20 border-[#00F0FF]/40 text-[#00F0FF] cursor-wait'
              : isMultiSelected || isCombineMode
              ? 'bg-gradient-to-r from-[#FFB300] via-[#FF7A00] to-[#FF2A4D] hover:from-[#ffc42e] hover:to-[#ff4766] text-[#050709] font-extrabold border-[#FFB300] shadow-[0_0_20px_rgba(255,179,0,0.4)]'
              : 'bg-gradient-to-r from-[#00F0FF] to-[#0088FF] hover:from-[#33f3ff] hover:to-[#1a94ff] text-[#050709] font-extrabold border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)]'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-[#050709] border-t-transparent rounded-full animate-spin" />
              <span>SYNCHRONIZING PROCEDURAL TELEMETRY...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-[#050709]" />
              <span>
                {selectedCategories.length > 1
                  ? `GENERATE HYBRID MISSION (${selectedCategories.length} STYLES + 3 PATHS + LORE)`
                  : 'GENERATE MISSION (3 PATHS + LORE)'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Toast Notification when Mission is Logged on Start */}
      {offlineLoggedToast && (
        <div className="bg-[#00E5A3]/15 border-2 border-[#00E5A3] text-[#00E5A3] p-3 rounded-xl flex items-center justify-between text-xs font-mono font-bold animate-in slide-in-from-top duration-300 shadow-[0_0_20px_rgba(0,229,163,0.2)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00E5A3]" />
            <span>MISSION PROTOCOL LOGGED TO OFFLINE CACHE // READY FOR OFFLINE RELOAD</span>
          </div>
          <span className="text-[10px] text-[#E6EDF3] bg-[#050709] px-2 py-0.5 rounded border border-[#00E5A3]/40">
            SAVED TO LOG
          </span>
        </div>
      )}

      {/* Previous Missions Log (Offline Cache & 1-Click Reload) */}
      {savedCasualMissions && savedCasualMissions.length > 0 && (
        <div className="bg-[#0E141B] border border-[#00F0FF]/30 rounded-xl overflow-hidden shadow-md">
          <button
            onClick={() => {
              playTerminalClick();
              setShowPreviousLog(!showPreviousLog);
            }}
            className="w-full p-3 flex items-center justify-between text-left hover:bg-[#1B2631]/40 transition-colors"
          >
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-[#00F0FF]" />
              <span className="text-xs font-mono font-bold text-[#E6EDF3] tracking-wide uppercase">
                PREVIOUS MISSIONS LOG ({savedCasualMissions.length} OFFLINE CACHED)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#00E5A3]/15 text-[#00E5A3] border border-[#00E5A3]/30 font-bold hidden sm:inline">
                OFFLINE READY
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF]">
              <span className="text-[11px]">{showPreviousLog ? 'HIDE LOG' : 'VIEW PREVIOUS'}</span>
              {showPreviousLog ? <ChevronUp className="w-4 h-4 text-[#7D8B99]" /> : <ChevronDown className="w-4 h-4 text-[#7D8B99]" />}
            </div>
          </button>

          {showPreviousLog && (
            <div className="p-3 border-t border-[#1B2631] flex flex-col gap-2 bg-[#050709]">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#7D8B99] pb-1 border-b border-[#1B2631]/60">
                <span>Any started mission is archived here for quick offline reloading:</span>
                <span className="text-[#00E5A3] font-bold">100% OFFLINE FUNCTIONAL</span>
              </div>

              <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-1">
                {savedCasualMissions.map((m) => {
                  const isCurrent = currentMission?.id === m.id || currentMission?.protocol_id === m.protocol_id;
                  return (
                    <div
                      key={m.id}
                      className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 text-xs font-mono transition-colors ${
                        isCurrent
                          ? 'bg-[#00F0FF]/10 border-[#00F0FF] shadow-sm'
                          : 'bg-[#0E141B] border-[#1B2631] hover:border-[#00F0FF]/40'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                          <span className="font-bold text-[#00F0FF]">{m.protocol_id}</span>
                          <span className="text-[10px] text-[#7D8B99]">·</span>
                          <span className="text-xs font-bold text-[#E6EDF3] truncate max-w-[200px] sm:max-w-xs">{m.title}</span>
                          {isCurrent && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#00E5A3]/20 text-[#00E5A3] font-bold">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-[#7D8B99] flex items-center gap-2">
                          <span className="text-[#FFB300]">{m.categoryName}</span>
                          <span>•</span>
                          <span className="text-[#00E5A3] truncate max-w-[150px]">{m.targetLocation}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          playTerminalClick();
                          if (onSelectCasualMission) {
                            onSelectCasualMission(m);
                          }
                        }}
                        disabled={isCurrent}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-colors flex items-center gap-1 ${
                          isCurrent
                            ? 'bg-[#050709] border border-[#1B2631] text-[#7D8B99] opacity-60 cursor-default'
                            : 'bg-[#00F0FF]/20 hover:bg-[#00F0FF]/30 text-[#00F0FF] border border-[#00F0FF]/50 active:scale-95'
                        }`}
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>{isCurrent ? 'LOADED' : 'RELOAD'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Generated Mission Card */}
      {currentMission ? (
        <div className="bg-[#0E141B] border border-[#00F0FF]/40 rounded-xl p-4 sm:p-5 relative overflow-hidden shadow-2xl flex flex-col gap-3.5">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1B2631] pb-3">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-mono text-xs font-bold text-[#00F0FF]">
                  {currentMission.protocol_id}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-[#00F0FF]/15 border-[#00F0FF]/40 text-[#00F0FF] font-bold">
                  {currentMission.categoryName}
                </span>
                {currentMission.categories && currentMission.categories.length > 1 && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border bg-[#FFB300]/15 border-[#FFB300]/40 text-[#FFB300] font-bold flex items-center gap-1">
                    <Zap className="w-2.5 h-2.5 text-[#FFB300]" />
                    {currentMission.categories.length} STYLES FUSED
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#E6EDF3] tracking-wide">
                {currentMission.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-[#00E5A3] mt-1 font-mono">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Target: {currentMission.targetLocation}</span>
              </div>
            </div>

            {/* Actions: Save & Share */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  playTerminalClick();
                  onSaveMission(currentMission);
                }}
                className={`p-2 rounded-lg border transition-colors ${
                  isSaved
                    ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                    : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                }`}
                title={isSaved ? 'Saved in Logbook' : 'Save Mission'}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
              </button>

              <button
                onClick={handleCopyMarkdown}
                className="p-2 rounded-lg border bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] transition-colors"
                title="Copy formatted markdown"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* START MISSION HERO CTA BANNER */}
          <div className="bg-gradient-to-r from-[#00F0FF]/15 via-[#0E141B] to-[#00E5A3]/15 border-2 border-[#00F0FF]/60 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3 flex-wrap shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/20 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <Rocket className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm sm:text-base font-black text-[#E6EDF3] font-mono tracking-wide">
                    READY TO LAUNCH THIS MISSION?
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00E5A3]/20 text-[#00E5A3] border border-[#00E5A3]/40 font-bold">
                    AUTO-LOGS OFFLINE
                  </span>
                </div>
                <p className="text-xs text-[#7D8B99] mt-0.5">
                  Opens tactical HUD overlay with giant tiles, focus inspect, and chronometer. Automatically logged for offline replay.
                </p>
              </div>
            </div>

            <button
              onClick={handleStartMissionHud}
              className="py-2.5 px-5 rounded-xl font-mono text-xs sm:text-sm font-black tracking-wider uppercase bg-gradient-to-r from-[#00F0FF] via-[#00E5A3] to-[#00F0FF] text-black hover:opacity-95 shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2 transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              START MISSION // ENGAGE HUD
            </button>
          </div>

          {/* Flavor Quote */}
          <div className="bg-[#050709] border-l-2 border-[#00F0FF] p-3 rounded-r-lg font-mono text-xs text-[#E6EDF3]/90 italic leading-relaxed">
            "{currentMission.flavor_quote}"
          </div>

          {/* Canonical In-Game Lore Card */}
          {currentMission.lore && (
            <div className="bg-[#050709] border border-[#FF2A4D]/40 rounded-xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center justify-between border-b border-[#1B2631] pb-2">
                <div className="flex items-center gap-2">
                  <ScrollText className="w-4 h-4 text-[#FF2A4D]" />
                  <span className="text-xs font-mono font-bold text-[#E6EDF3] uppercase tracking-wider">
                    ATLAS ARCHIVE TRANSMISSION // IN-GAME LORE
                  </span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#FF2A4D]/15 text-[#FF2A4D] border border-[#FF2A4D]/30 font-bold">
                  {currentMission.lore.historicalContext || 'CANONICAL ARCHIVE'}
                </span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#FFB300] font-mono mb-0.5">
                  {currentMission.lore.headline}
                </h4>
                <div className="text-[10px] font-mono text-[#7D8B99] flex items-center gap-2 mb-1.5">
                  <span>Source: {currentMission.lore.origin}</span>
                  {currentMission.lore.canonEntity && (
                    <span>• Entity: {currentMission.lore.canonEntity}</span>
                  )}
                </div>
                <p className="text-xs text-[#C5D1DE] leading-relaxed font-sans whitespace-pre-line border-l-2 border-[#FF2A4D]/60 pl-2.5 my-1">
                  {currentMission.lore.narrative}
                </p>
              </div>
            </div>
          )}

          {/* Three Thematic Paths Selector */}
          {currentMission.paths && currentMission.paths.length > 0 && (
            <div className="bg-[#050709] border border-[#00F0FF]/30 rounded-xl p-3.5 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#1B2631] pb-2 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#00F0FF]" />
                  <span className="text-xs font-mono font-bold text-[#E6EDF3] uppercase tracking-wider">
                    THREE THEMATIC PATHS // CHOOSE YOUR APPROACH
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#7D8B99]">
                  Tap a path tab to switch approaches
                </span>
              </div>

              {/* Path Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                {currentMission.paths.map((path) => {
                  const isActive = path.path_id === activePathId;
                  return (
                    <button
                      key={path.path_id}
                      onClick={() => {
                        playTerminalClick();
                        setActivePathId(path.path_id);
                      }}
                      className={`text-left p-2.5 rounded-lg border text-xs font-mono transition-all duration-200 active:scale-95 flex flex-col gap-1 ${
                        isActive
                          ? 'bg-[#0E141B] border-[#00F0FF] text-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.25)] ring-1 ring-[#00F0FF]/40'
                          : 'bg-[#0E141B]/40 border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] hover:border-[#1B2631]'
                      }`}
                    >
                      <span className="font-bold text-[11px] block tracking-wide line-clamp-1">
                        {path.themeTitle}
                      </span>
                      <span className="text-[9px] text-[#7D8B99] line-clamp-1">
                        {path.approach}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Path Description & Tactical Advantage */}
              {currentPath && (
                <div className="p-3 rounded-lg bg-[#0E141B] border border-[#1B2631] flex flex-col gap-2">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="text-xs font-bold text-[#E6EDF3] font-mono">
                      {currentPath.themeTitle}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F0FF]/15 text-[#00F0FF]">
                      Approach: {currentPath.approach}
                    </span>
                  </div>

                  <p className="text-xs text-[#7D8B99] leading-relaxed">
                    {currentPath.description}
                  </p>

                  <div className="p-2 rounded bg-[#050709] border border-[#00E5A3]/30 text-xs flex items-start gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#00E5A3] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono text-[#00E5A3] font-bold block">
                        TACTICAL ADVANTAGE
                      </span>
                      <p className="text-xs text-[#E6EDF3]">
                        {currentPath.tacticalAdvantage}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Progress Tracker for Active Path */}
          <div className="bg-[#050709] p-3 rounded-lg border border-[#1B2631]">
            <div className="flex justify-between items-center text-xs font-mono mb-1.5">
              <span className="text-[#7D8B99] font-bold">
                {currentPath ? `${currentPath.themeTitle} Progress` : 'MISSION PROGRESS'}
              </span>
              <span className="text-[#00F0FF] font-bold">
                {completedStepsCount} of {totalStepsCount} Steps ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-[#0E141B] rounded-full overflow-hidden border border-[#1B2631]">
              <div
                className="h-full bg-gradient-to-r from-[#00F0FF] to-[#00E5A3] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Sequential Steps Checklist for Active Path */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-1">
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#E6EDF3] uppercase">
                {currentPath ? `${currentPath.themeTitle} OBJECTIVES` : 'SEQUENCE OF OBJECTIVES'}
              </h4>
              <button
                onClick={handleStartMissionHud}
                className="text-[11px] font-mono text-[#00F0FF] hover:underline flex items-center gap-1 font-bold"
              >
                <Maximize2 className="w-3 h-3" />
                Inspect in Large HUD Mode
              </button>
            </div>

            {stepsToDisplay.map((step) => {
              const stepKey = `${pathStorageKey}_${step.step_number}`;
              const isDone = !!stepChecklist[stepKey];

              return (
                <div
                  key={step.step_number}
                  onClick={() => toggleStep(pathStorageKey, step.step_number)}
                  className={`cursor-pointer p-3 rounded-xl border text-xs flex items-start gap-3 transition-all select-none ${
                    isDone
                      ? 'bg-[#00F0FF]/10 border-[#00F0FF]/50 text-[#E6EDF3] opacity-80'
                      : 'bg-[#050709] border-[#1B2631] text-[#E6EDF3] hover:border-[#00F0FF]/40 hover:bg-[#050709]/80'
                  }`}
                >
                  <div className="mt-0.5 text-[#00F0FF] shrink-0">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                    ) : (
                      <Circle className="w-4 h-4 text-[#7D8B99]" />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#0E141B] text-[#00F0FF] border border-[#1B2631]">
                        STEP {step.step_number}
                      </span>
                      <span className={`font-bold ${isDone ? 'line-through text-[#7D8B99]' : 'text-[#E6EDF3]'}`}>
                        {step.title}
                      </span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDone ? 'line-through text-[#7D8B99]' : 'text-[#7D8B99]'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bonus Goal if present */}
          {currentMission.bonusGoal && (
            <div className="bg-[#050709] border border-[#FFB300]/30 rounded-xl p-3 flex items-start gap-2.5">
              <Star className="w-4 h-4 text-[#FFB300] shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-mono text-[#FFB300] font-bold block mb-0.5">
                  OPTIONAL BONUS GOAL
                </span>
                <p className="text-xs text-[#E6EDF3] leading-relaxed">
                  {currentMission.bonusGoal}
                </p>
              </div>
            </div>
          )}

          {/* Special Section: Restaurant Blueprint & Culinary Menu if present (Placed at bottom of mission) */}
          {currentMission.restaurantSpec && (
            <div className="p-3.5 rounded-xl bg-[#050709] border border-[#FF7A00]/40 flex flex-col gap-3">
              {/* Venue Title */}
              <div className="flex items-center justify-between gap-2 border-b border-[#1B2631] pb-2">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-[#FF7A00]" />
                  <span className="text-xs font-mono font-bold text-[#E6EDF3] uppercase tracking-wider">
                    VENUE BLUEPRINT: {currentMission.restaurantSpec.venueType}
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/30 font-bold">
                  CHEF NOTES & OUTPOST
                </span>
              </div>

              {/* Aesthetic & Theme */}
              <div className="text-xs text-[#7D8B99] leading-relaxed">
                <span className="text-[#E6EDF3] font-bold font-mono mr-1">Architecture & Vibe:</span>
                {currentMission.restaurantSpec.aestheticTheme}
              </div>

              {/* Fresh Catch Fishing Requirement if present */}
              {currentMission.restaurantSpec.fishingCatch && (
                <div className="p-2.5 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-start gap-2 text-xs">
                  <Fish className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-mono text-[#00F0FF] font-bold block mb-0.5">
                      AQUARIUS FRESH CATCH SPECIFICATION
                    </span>
                    <p className="text-xs text-[#E6EDF3]">
                      {currentMission.restaurantSpec.fishingCatch}
                    </p>
                  </div>
                </div>
              )}

              {/* Signature Dishes & Processor Steps */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-mono font-bold text-[#FFB300] uppercase tracking-wider flex items-center gap-1.5">
                  <ChefHat className="w-3.5 h-3.5 text-[#FFB300]" />
                  SIGNATURE MENU & NUTRIENT PROCESSOR RECIPES
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentMission.restaurantSpec.signatureDishes.map((dish, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-[#0E141B] border border-[#1B2631]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#E6EDF3]">{dish.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#FF7A00]/20 text-[#FF7A00]">
                          DISH #{idx + 1}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 my-1.5">
                        {dish.ingredients.map((ing, iIdx) => (
                          <span key={iIdx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#050709] border border-[#1B2631] text-[#00F0FF]">
                            {ing}
                          </span>
                        ))}
                      </div>

                      <p className="text-[11px] text-[#7D8B99] leading-snug">
                        <strong className="text-[#E6EDF3] font-normal">Method: </strong>{dish.processorSteps}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decor Checklist with clickable checkmarks */}
              <div className="flex flex-col gap-1.5 pt-1 border-t border-[#1B2631]">
                <span className="text-[11px] font-mono font-bold text-[#7D8B99] uppercase tracking-wider">
                  DECOR & SEATING CHECKLIST (TAP TO VERIFY):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {currentMission.restaurantSpec.decorChecklist.map((item, idx) => {
                    const checkKey = `${currentMission.id}_decor_${idx}`;
                    const isDone = !!decorChecklist[checkKey];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleDecorItem(checkKey)}
                        className={`p-2 rounded-lg border text-[11px] flex items-center gap-2 cursor-pointer transition-colors select-none ${
                          isDone
                            ? 'bg-[#00E5A3]/10 border-[#00E5A3]/40 text-[#E6EDF3]'
                            : 'bg-[#0E141B] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5A3] shrink-0" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-[#7D8B99] shrink-0" />
                        )}
                        <span className={isDone ? 'line-through text-[#7D8B99]' : ''}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#0E141B]/60 border border-dashed border-[#1B2631] rounded-xl p-8 text-center text-[#7D8B99]">
          <p className="text-xs font-mono uppercase tracking-wider mb-1">
            // NO ACTIVE MISSION LOADED //
          </p>
          <p className="text-xs text-[#7D8B99]">
            Select one or combine multiple activities above and tap "GENERATE MISSION" to begin your adventure.
          </p>
        </div>
      )}

      {/* Expandable Chef's Nutrient & Fishing Cooking Guide (Moved to bottom of page) */}
      <div className="bg-[#0E141B] border border-[#FF7A00]/30 rounded-xl overflow-hidden shadow-md">
        <button
          onClick={() => {
            playTerminalClick();
            setCookingGuideOpen(!cookingGuideOpen);
          }}
          className="w-full p-3 flex items-center justify-between text-left hover:bg-[#1B2631]/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-[#FF7A00]" />
            <span className="text-xs font-mono font-bold text-[#E6EDF3] tracking-wide uppercase">
              CHEF'S NUTRIENT PROCESSOR & FISHING QUICK-GUIDE
            </span>
          </div>
          {cookingGuideOpen ? <ChevronUp className="w-4 h-4 text-[#7D8B99]" /> : <ChevronDown className="w-4 h-4 text-[#7D8B99]" />}
        </button>

        {cookingGuideOpen && (
          <div className="p-3.5 border-t border-[#1B2631] flex flex-col gap-3 text-xs bg-[#050709]">
            <p className="text-[11px] text-[#7D8B99] leading-relaxed">
              The <strong>Nutrient Processor</strong> is built like a portable refiner. Drop raw ingredients into its slots to craft high-value baked goods, desserts, and savory fish dishes!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-[#0E141B] border border-[#1B2631]">
                <span className="font-bold text-[#FFB300] block mb-1">🧈 Churning Butter & Cream</span>
                <p className="text-[11px] text-[#7D8B99] leading-relaxed">
                  Feed wild herbivores: Milk → <strong>Cream</strong> → <strong>Churned Butter</strong> → add Sugar for <strong>Sweetened Butter</strong>!
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0E141B] border border-[#1B2631]">
                <span className="font-bold text-[#38BDF8] block mb-1">🐟 Aquarius Fresh Catch</span>
                <p className="text-[11px] text-[#7D8B99] leading-relaxed">
                  Fish caught with your <strong>Fishing Rig</strong> can be dropped straight into the Processor to produce <strong>Raw Fish Fillets</strong> for chowders!
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0E141B] border border-[#1B2631]">
                <span className="font-bold text-[#00E5A3] block mb-1">💰 Free Nanites from Cronus</span>
                <p className="text-[11px] text-[#7D8B99] leading-relaxed">
                  Deliver cooked delicacies to <strong>Iteration Cronus</strong> on the Space Anomaly to earn hundreds of Nanites for each tasting!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Mission HUD Overlay with Large Tiles, Focus Inspect, and Live Chronometer */}
      {currentMission && (
        <ActiveMissionOverlay
          isOpen={isHudOpen}
          onClose={() => setIsHudOpen(false)}
          mission={currentMission}
          activePathId={activePathId}
          onChangePathId={(newPathId) => setActivePathId(newPathId)}
          stepChecklist={stepChecklist}
          onToggleStep={toggleStep}
          decorChecklist={decorChecklist}
          onToggleDecor={toggleDecorItem}
        />
      )}
    </div>
  );
};

export type IntensityLevel = 'Cadet' | 'Interloper' | 'Atlas Protocol';

export type MissionCategory = 
  | 'culinary_restaurant'
  | 'xeno_companion'
  | 'derelict_freighter'
  | 'planet_salvage'
  | 'space_salvage'
  | 'planet_expedition'
  | 'classic_expedition'
  | 'aquarius_fishing';

export interface MissionStep {
  step_number: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface CulinaryRecipe {
  name: string;
  ingredients: string[];
  processorSteps: string;
}

export interface RestaurantSpec {
  venueType: string; // e.g. "Volcanic Cliffside Stone Bar", "Underground Cavern Speakeasy", "Submerged Glass Coral Bistro", "Orbital Sky Bistro"
  aestheticTheme: string; // e.g. "Basalt stone pillars, wall braziers, rustic timber counters"
  signatureDishes: CulinaryRecipe[];
  fishingCatch?: string; // e.g. "Catch 2 Rare Deep-Water Fish with the Fishing Rig"
  decorChecklist: string[]; // e.g. ["Nutrient Processor serving station", "Bar counter with stools", "Decorative planters or farm"]
}

export interface MissionLore {
  origin: string; // e.g. "Ancient Korvax Echo Archives / Vy'keen Blood-Tablet / Autophage Memory Scrap"
  headline: string;
  narrative: string;
  historicalContext: string;
  canonEntity?: string;
}

export interface MissionPath {
  path_id: string; // "alpha" | "beta" | "gamma"
  themeTitle: string; // Thematic title of this branch
  approach: string; // Strategic methodology or archetype
  description: string;
  tacticalAdvantage: string;
  steps: MissionStep[];
  reward?: string;
}

export interface CasualMission {
  id: string;
  protocol_id: string;
  title: string;
  category: MissionCategory;
  categories?: MissionCategory[];
  categoryName: string;
  categoryNames?: string[];
  categoryIcon: string;
  flavor_quote: string;
  targetLocation: string;
  steps: MissionStep[];
  restaurantSpec?: RestaurantSpec;
  lore?: MissionLore;
  paths?: MissionPath[];
  activePathId?: string;
  bonusGoal?: string;
  reward?: string;
  createdAt: number;
  saved?: boolean;
  completed?: boolean;
}

export interface Directive {
  protocol_id: string;
  codename: string;
  classification: string;
  intensity: IntensityLevel;
  flavor_quote: string;
  core_vocation: string;
  rules_of_engagement: string[];
  primary_directives: string[];
  victory_condition: string;
  biome_target?: string;
  timestamp: number;
  saved?: boolean;
  completed?: boolean;
}

export interface ExpeditionMilestone {
  id: string;
  task: string;
  reward_flavor: string;
  completed: boolean;
}

export interface ExpeditionPhase {
  phase_number: number;
  phase_name: string;
  milestones: ExpeditionMilestone[];
}

export interface Expedition {
  id: string;
  expedition_title: string;
  tagline: string;
  badge_icon?: string;
  phases: ExpeditionPhase[];
  createdAt: number;
  completed?: boolean;
}

export interface WeaverManifesto {
  protocol_id: string;
  codename: string;
  vocation: string;
  economy: string;
  mobility: string;
  biome: string;
  lore_manifesto: string;
  recommended_setup: {
    game_mode: string;
    difficulty_preset: string;
    hud_mode: string;
  };
  rules_of_engagement: string[];
  milestone_phases: {
    phase: string;
    objective: string;
    validation: string;
  }[];
  victory_condition: string;
  timestamp: number;
  saved?: boolean;
}

export interface ChallengeOption {
  id: string;
  name: string;
  desc: string;
  tag: string;
}

export interface AxisOption {
  id: string;
  name: string;
  desc: string;
  icon?: string;
  tier?: 'Casual' | 'Variation' | 'Challenge';
}

export interface GenerationConfig {
  intensity: IntensityLevel;
  useAi: boolean;
  customNotes?: string;
}

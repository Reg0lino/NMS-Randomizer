export type IntensityLevel = 'Cadet' | 'Interloper' | 'Atlas Protocol';

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

export interface GenerationConfig {
  intensity: IntensityLevel;
  useAi: boolean;
  customNotes?: string;
}

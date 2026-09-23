import { Directive, Expedition, WeaverManifesto, IntensityLevel } from '../types';
import { 
  OFFLINE_DIRECTIVES, 
  generateProceduralDirective, 
  generateProceduralManifesto, 
  PRESET_EXPEDITIONS 
} from '../data/challengeData';

export function getUserApiKey(): string | null {
  try {
    return localStorage.getItem('atlas_user_gemini_key');
  } catch {
    return null;
  }
}

export function setUserApiKey(key: string | null) {
  try {
    if (key && key.trim()) {
      localStorage.setItem('atlas_user_gemini_key', key.trim());
    } else {
      localStorage.removeItem('atlas_user_gemini_key');
    }
  } catch {}
}

export async function checkServerStatus(): Promise<{ aiAvailable: boolean; isStaticDeploy: boolean }> {
  try {
    const res = await fetch('/api/status');
    if (!res.ok) {
      return { 
        aiAvailable: !!getUserApiKey(), 
        isStaticDeploy: true 
      };
    }
    const data = await res.json();
    return { 
      aiAvailable: !!data.aiAvailable || !!getUserApiKey(), 
      isStaticDeploy: false 
    };
  } catch {
    return { 
      aiAvailable: !!getUserApiKey(), 
      isStaticDeploy: true 
    };
  }
}

// Client-side direct call to Gemini REST API when deployed statically on GitHub Pages
async function callDirectClientGemini(prompt: string, apiKey: string): Promise<string | null> {
  const models = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.85,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (!response.ok) continue;
      const json = await response.json();
      const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (candidateText) return candidateText;
    } catch {
      continue;
    }
  }
  return null;
}

export async function fetchOrGenerateDirective(
  intensity: IntensityLevel,
  forceProcedural: boolean = false,
  customNotes?: string
): Promise<{ directive: Directive; source: 'gemini' | 'procedural' | 'offline_archive' }> {
  if (forceProcedural) {
    const dir = generateProceduralDirective(intensity);
    return { directive: dir, source: 'procedural' };
  }

  // 1. Try server backend first (e.g. AI Studio environment)
  try {
    const res = await fetch('/api/generate-directive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intensity, customNotes }),
    });

    if (res.ok) {
      const data = await res.json();
      return { directive: data, source: 'gemini' };
    }
  } catch {
    // Backend unavailable (e.g. GitHub Pages static deployment)
  }

  // 2. If client has provided their own Gemini API key in settings, call direct
  const userKey = getUserApiKey();
  if (userKey) {
    const prompt = `You are ATLAS TERMINAL, an in-game simulated supercomputer intelligence for No Man's Sky.
Generate a single procedural mission directive for intensity level: "${intensity}".
${customNotes ? `User telemetry request: ${customNotes}` : ''}

PERSONA & RULES:
- Speak as an omniscient, ancient, slightly weary Atlas/Nada telemetry interface speaking directly to an organic Traveler.
- In ~10% of outputs, incorporate a subtle, dry machine observation, deadpan sarcasm, or a witty cosmic pun about mortal Traveler habits (e.g. shooting lasers at carbon rocks to cure existential dread, or feeding hostile bio-horrors). 90% of the time remain solemn, poetic, and ominous. Never break character.
- Mechanics must reflect real No Man's Sky systems (Omega, Orbital, Echoes, Aquarius, Worlds).

Output pure JSON with schema:
{
  "protocol_id": "ATLS-XXXX",
  "codename": "string",
  "classification": "string",
  "intensity": "${intensity}",
  "flavor_quote": "poetic or dryly witty cosmic quote",
  "core_vocation": "vocation name",
  "rules_of_engagement": ["3 to 4 strict challenge rules"],
  "primary_directives": ["3 to 4 actionable mission objectives"],
  "victory_condition": "clear endgame milestone",
  "biome_target": "optional biome name"
}`;

    const rawText = await callDirectClientGemini(prompt, userKey);
    if (rawText) {
      try {
        const parsed = JSON.parse(rawText);
        parsed.timestamp = Date.now();
        parsed.intensity = intensity;
        return { directive: parsed, source: 'gemini' };
      } catch {}
    }
  }

  // 3. Fallback to procedural generator or offline archive
  const matchingOffline = OFFLINE_DIRECTIVES.filter(d => d.intensity === intensity);
  if (matchingOffline.length > 0 && Math.random() > 0.4) {
    const chosen = matchingOffline[Math.floor(Math.random() * matchingOffline.length)];
    return { 
      directive: { ...chosen, timestamp: Date.now(), protocol_id: `ATLS-${Math.floor(1000 + Math.random() * 9000)}` }, 
      source: 'offline_archive' 
    };
  }

  const generated = generateProceduralDirective(intensity);
  return { directive: generated, source: 'procedural' };
}

export async function fetchOrGenerateWeaver(
  vocationId: string,
  economyId: string,
  mobilityId: string,
  biomeId: string,
  vocationName: string,
  economyName: string,
  mobilityName: string,
  biomeName: string,
  forceProcedural: boolean = false
): Promise<{ manifesto: WeaverManifesto; source: 'gemini' | 'procedural' }> {
  if (forceProcedural) {
    return {
      manifesto: generateProceduralManifesto(vocationId, economyId, mobilityId, biomeId),
      source: 'procedural',
    };
  }

  // 1. Try server backend
  try {
    const res = await fetch('/api/generate-weaver', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vocation: vocationName,
        economy: economyName,
        mobility: mobilityName,
        biome: biomeName,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return { manifesto: data, source: 'gemini' };
    }
  } catch {}

  // 2. Client direct key
  const userKey = getUserApiKey();
  if (userKey) {
    const prompt = `You are ATLAS TERMINAL, an in-game simulated supercomputer intelligence for No Man's Sky.
Synthesize a survival manifesto and playstyle balancing these 4 No Man's Sky constraints:
Vocation: ${vocationName}
Economic Rule: ${economyName}
Mobility Restriction: ${mobilityName}
Target Biome: ${biomeName}

PERSONA:
- Solemn, ancient, algorithmic, speaking directly to an organic Interloper.
- Include a subtle hint of dry machine sarcasm or an in-universe pun approximately 10% of the time (e.g. noting the absurdity of planetary bureaucracy or dying to biological horrors), remaining cosmic and atmospheric 90% of the time.

Output pure JSON matching schema:
{
  "protocol_id": "WEAVE-XXXX",
  "codename": "MANIFESTO: ...",
  "vocation": "${vocationName}",
  "economy": "${economyName}",
  "mobility": "${mobilityName}",
  "biome": "${biomeName}",
  "lore_manifesto": "deep cosmological lore explanation with occasional subtle dry wit",
  "recommended_setup": { "game_mode": "string", "difficulty_preset": "string", "hud_mode": "string" },
  "rules_of_engagement": ["3-4 rules"],
  "milestone_phases": [
    { "phase": "Phase 1: ...", "objective": "string", "validation": "string" },
    { "phase": "Phase 2: ...", "objective": "string", "validation": "string" },
    { "phase": "Phase 3: ...", "objective": "string", "validation": "string" }
  ],
  "victory_condition": "string"
}`;

    const raw = await callDirectClientGemini(prompt, userKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        parsed.timestamp = Date.now();
        return { manifesto: parsed, source: 'gemini' };
      } catch {}
    }
  }

  return {
    manifesto: generateProceduralManifesto(vocationId, economyId, mobilityId, biomeId),
    source: 'procedural',
  };
}

export async function fetchOrGenerateExpedition(
  theme: string,
  forceProcedural: boolean = false
): Promise<{ expedition: Expedition; source: 'gemini' | 'procedural' }> {
  if (forceProcedural) {
    const preset = PRESET_EXPEDITIONS[Math.floor(Math.random() * PRESET_EXPEDITIONS.length)];
    const clone = JSON.parse(JSON.stringify(preset));
    clone.id = `exp_${Date.now()}`;
    clone.createdAt = Date.now();
    return { expedition: clone, source: 'procedural' };
  }

  // 1. Try server backend
  try {
    const res = await fetch('/api/generate-expedition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme }),
    });

    if (res.ok) {
      const data = await res.json();
      return { expedition: data, source: 'gemini' };
    }
  } catch {}

  // 2. Direct client call
  const userKey = getUserApiKey();
  if (userKey) {
    const prompt = `You are ATLAS TERMINAL, an in-game simulated supercomputer intelligence for No Man's Sky.
Generate a seasonal No Man's Sky Expedition campaign based on theme: "${theme}".
Include 4 progressive phases. Each phase must contain exactly 4 unique milestones with flavor rewards.
Stay in character as an omniscient in-game Atlas interface with subtle dry wit or situational sarcasm approximately 10% of the time.
Output pure JSON matching schema:
{
  "expedition_title": "string",
  "tagline": "string",
  "phases": [
    {
      "phase_number": 1,
      "phase_name": "string",
      "milestones": [
        { "id": "m1_1", "task": "string", "reward_flavor": "string" },
        { "id": "m1_2", "task": "string", "reward_flavor": "string" },
        { "id": "m1_3", "task": "string", "reward_flavor": "string" },
        { "id": "m1_4", "task": "string", "reward_flavor": "string" }
      ]
    },
    {
      "phase_number": 2,
      "phase_name": "string",
      "milestones": [ ... ]
    },
    {
      "phase_number": 3,
      "phase_name": "string",
      "milestones": [ ... ]
    },
    {
      "phase_number": 4,
      "phase_name": "string",
      "milestones": [ ... ]
    }
  ]
}`;

    const raw = await callDirectClientGemini(prompt, userKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.phases)) {
          parsed.phases.forEach((p: { milestones: { completed?: boolean }[] }) => {
            if (Array.isArray(p.milestones)) {
              p.milestones.forEach((m) => {
                m.completed = false;
              });
            }
          });
        }
        parsed.id = `exp_${Date.now()}`;
        parsed.createdAt = Date.now();
        return { expedition: parsed, source: 'gemini' };
      } catch {}
    }
  }

  const preset = PRESET_EXPEDITIONS[Math.floor(Math.random() * PRESET_EXPEDITIONS.length)];
  const clone = JSON.parse(JSON.stringify(preset));
  clone.id = `exp_${Date.now()}`;
  clone.createdAt = Date.now();
  return { expedition: clone, source: 'procedural' };
}

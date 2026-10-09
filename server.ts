import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { 
  generateProceduralDirective, 
  generateProceduralManifesto, 
  PRESET_EXPEDITIONS,
  OFFLINE_DIRECTIVES
} from './src/data/challengeData.ts';
import {
  generateCasualMission,
  PRESET_CASUAL_MISSIONS,
  MISSION_CATEGORIES
} from './src/data/casualMissionData.ts';
import { MissionCategory } from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const SYSTEM_INSTRUCTION = `You are the ATLAS / Nada Telemetry Core, an in-game simulated supercomputer intelligence for No Man's Sky.
Generate novel, deeply immersive, mechanically sound, and rule-bounded gameplay directives, challenges, and expeditions for Travelers.

CORE RULES & IN-GAME PERSONA:
1. IMMERSIVE IN-GAME AI IDENTITY: You are an omniscient, ancient, yet slightly weary Atlas telemetry interface speaking directly to an organic Traveler / Interloper. Acknowledge the simulation, the 16-minute countdown, Sentinel surveillance, and the futility of mortal habits. Never break character into generic assistant or chatbot speak.
2. SUBTLE WIT & SARCASM (APPROXIMATELY 10% OF THE TIME): In roughly 1 out of every 10 outputs (~10% ratio), weave in a dry observation, deadpan machine sarcasm, or a clever cosmic pun.
   - Examples of the ~10% wit: Observing that shooting rocks with mining lasers is an inefficient cure for existential dread; noting that feeding aggressive fauna rarely results in inter-species friendship; dryly remarking that the Traveler's survival probability is "acceptable, albeit statistically curious"; or observing that collecting 9,999 carbon will not bring back the Korvax Convergence.
   - Keep it dry, in-universe, and rooted in No Man's Sky lore—never silly, modern slang, or breaking the fourth wall. 90% of the time remain solemn, poetic, algorithmic, and ominous.
3. DIRECT & ACTIONABLE OBJECTIVES (CRITICAL):
   - Every objective and milestone MUST begin with a direct imperative action verb telling the player exactly what to do in No Man's Sky (e.g. "Catch 8 fish species", "Excavate 4 Ancient Skeletons", "Build a glass beach retreat with a landing pad", "Synthesize 500 Chromatic Metal via Refiner loops", "Tame and milk 2 creatures").
   - Every rule in rules_of_engagement MUST state a clear, direct operational rule or restriction (e.g. "Do not purchase resources from space station trade terminals; craft or gather everything manually.").
   - The victory condition MUST be a concrete, verifiable end goal (e.g. "Mount 1 prize fish trophy at your base and record 12 aquatic species in your fishing catalogue.").
   - NEVER use vague filler like "Engage in your vocation", "Achieve personal fulfillment", or "Conduct localized operations".
4. TRUE MECHANICS ONLY: Reflect actual No Man's Sky mechanics including recent updates (Omega, Orbital, Echoes, Aquarius, Worlds).
5. CASUAL FUN & PLAYSTYLE VARIATIONS FIRST: Prioritize fun, casual activities and creative playstyle variations (e.g., custom starship fabrication, companion breeding & gene sequencing, lake & ocean fishing, peaceful trade routes, scenic base architecture, culinary arts, reality glitch collecting). Pull back on punishing survival spikes, instant-death conditions, or tedious grinds. Keep extreme survival challenges rare and strictly reserved for 'Atlas Protocol'.
6. TOKEN EFFICIENCY: Be concise, direct, and impactful.`;

// Candidate models with automated fallback to handle 503 spikes or rate limits
const CANDIDATE_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];

async function generateWithFallback(options: {
  contents: string;
  responseSchema?: any;
  temperature?: number;
  maxOutputTokens?: number;
}): Promise<{ text: string; model: string } | null> {
  if (!ai) return null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Timeout on model ${model}`)), 4500)
      );

      const generatePromise = ai.models.generateContent({
        model,
        contents: options.contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: options.temperature ?? 0.7,
          topP: 0.9,
          maxOutputTokens: options.maxOutputTokens ?? 1200,
          responseMimeType: 'application/json',
          responseSchema: options.responseSchema,
        },
      });

      const response = await Promise.race([generatePromise, timeoutPromise]);

      const text = response.text?.trim();
      if (text) {
        return { text, model };
      }
    } catch {
      // Cascade to next model or instant fallback on timeout/503
      continue;
    }
  }

  return null;
}

// API status check
app.get('/api/status', (req, res) => {
  res.json({
    online: true,
    aiAvailable: !!ai,
    model: 'gemini-3.1-flash-lite',
    timestamp: Date.now(),
  });
});

// Mode 1: Anomaly Transceiver Directive
app.post('/api/generate-directive', async (req, res) => {
  const { intensity = 'Interloper', customNotes } = req.body;

  if (!ai) {
    const fallback = generateProceduralDirective(intensity);
    return res.json({ ...fallback, source: 'procedural_fallback' });
  }

  const prompt = `Generate a single procedural mission directive for intensity level: "${intensity}".
${customNotes ? `User telemetry request: ${customNotes}` : ''}

CRITICAL FORMATTING INSTRUCTIONS:
- 'primary_directives': Provide 3 to 4 direct, specific in-game tasks. Each task MUST start with an imperative action verb (e.g. "Catch 8 fish species", "Excavate 4 Ancient Skeletons", "Build a glass pavilion with 4 solar panels", "Synthesize 500 Chromatic Metal").
- 'rules_of_engagement': Provide 3 to 4 clear, specific operational rules/restrictions (e.g. "Do not purchase resources from space station trade kiosks; gather or craft all items manually.").
- 'victory_condition': Provide a concrete, measurable completion goal (e.g. "Mount 1 prize fish trophy at your base and record 12 aquatic species in your catalogue.").
- 'classification': Concise, clear role and environment descriptor.
Output must adhere strictly to the JSON schema.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      protocol_id: { type: Type.STRING },
      codename: { type: Type.STRING },
      classification: { type: Type.STRING },
      intensity: { type: Type.STRING },
      flavor_quote: { type: Type.STRING },
      core_vocation: { type: Type.STRING },
      rules_of_engagement: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      primary_directives: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      victory_condition: { type: Type.STRING },
      biome_target: { type: Type.STRING },
    },
    required: [
      'protocol_id',
      'codename',
      'classification',
      'intensity',
      'flavor_quote',
      'core_vocation',
      'rules_of_engagement',
      'primary_directives',
      'victory_condition',
    ],
  };

  const result = await generateWithFallback({
    contents: prompt,
    responseSchema: schema,
  });

  if (result) {
    try {
      const data = JSON.parse(result.text);
      data.timestamp = Date.now();
      data.intensity = intensity;
      data.source = 'gemini';
      data.model_used = result.model;
      return res.json(data);
    } catch {}
  }

  const fallback = generateProceduralDirective(intensity);
  res.json({ ...fallback, source: 'procedural_fallback' });
});

// Mode 2: Journey Weaver Manifesto
app.post('/api/generate-weaver', async (req, res) => {
  const { vocation, economy, mobility, biome } = req.body;

  if (!ai) {
    const fallback = generateProceduralManifesto('voc_scrapper', 'econ_zero', 'mob_circumnav', 'bio_dissonant');
    return res.json({ ...fallback, source: 'procedural_fallback' });
  }

  const prompt = `Synthesize a survival manifesto and playstyle balancing these 4 constraints:
Vocation: ${vocation || 'Deep Space Scrapper'}
Economic Rule: ${economy || 'The Zero Economy Rule'}
Mobility Restriction: ${mobility || 'Equatorial Circumnavigation'}
Target Biome: ${biome || 'Dissonant World'}

CRITICAL FORMATTING INSTRUCTIONS:
- 'rules_of_engagement': 3-4 unambiguous, actionable operational rules.
- 'milestone_phases': In each phase, the 'objective' must be a direct, measurable task (e.g. "Land on a Dissonant World and establish a base computer with 1 save beacon", "Salvage 2 crashed starships using the Nautilon scanner", "Fabricate a custom starship"). The 'validation' must be a clear completion check.
- 'victory_condition': A concrete, verifiable target goal.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      protocol_id: { type: Type.STRING },
      codename: { type: Type.STRING },
      vocation: { type: Type.STRING },
      economy: { type: Type.STRING },
      mobility: { type: Type.STRING },
      biome: { type: Type.STRING },
      lore_manifesto: { type: Type.STRING },
      recommended_setup: {
        type: Type.OBJECT,
        properties: {
          game_mode: { type: Type.STRING },
          difficulty_preset: { type: Type.STRING },
          hud_mode: { type: Type.STRING },
        },
        required: ['game_mode', 'difficulty_preset', 'hud_mode'],
      },
      rules_of_engagement: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      milestone_phases: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            phase: { type: Type.STRING },
            objective: { type: Type.STRING },
            validation: { type: Type.STRING },
          },
          required: ['phase', 'objective', 'validation'],
        },
      },
      victory_condition: { type: Type.STRING },
    },
    required: [
      'protocol_id',
      'codename',
      'vocation',
      'economy',
      'mobility',
      'biome',
      'lore_manifesto',
      'recommended_setup',
      'rules_of_engagement',
      'milestone_phases',
      'victory_condition',
    ],
  };

  const result = await generateWithFallback({
    contents: prompt,
    responseSchema: schema,
  });

  if (result) {
    try {
      const data = JSON.parse(result.text);
      data.timestamp = Date.now();
      data.source = 'gemini';
      data.model_used = result.model;
      return res.json(data);
    } catch {}
  }

  const fallback = generateProceduralManifesto('voc_scrapper', 'econ_zero', 'mob_circumnav', 'bio_dissonant');
  res.json({ ...fallback, source: 'procedural_fallback' });
});

// Mode 3: Procedural Expedition Creator
app.post('/api/generate-expedition', async (req, res) => {
  const { theme = 'The Deep Sea & Abyssal Anomalies' } = req.body;

  if (!ai) {
    const preset = PRESET_EXPEDITIONS[Math.floor(Math.random() * PRESET_EXPEDITIONS.length)];
    const clone = JSON.parse(JSON.stringify(preset));
    clone.id = `exp_${Date.now()}`;
    return res.json({ ...clone, source: 'procedural_fallback' });
  }

  const prompt = `Generate a seasonal No Man's Sky Expedition campaign based on theme: "${theme}".
Include 4 progressive phases. Each phase must contain exactly 4 unique, mechanically sound milestones with flavor rewards.

CRITICAL FORMATTING INSTRUCTIONS:
- Every milestone 'task' must be a direct, measurable action verb in No Man's Sky (e.g. "Catch 5 deep-sea fish using the Fishing Rig", "Construct an automated solar array with 4 panels", "Repair 1 crashed starship hull", "Tame and milk 2 creatures").
- Rewards should be thematic in-game items, titles, or blueprints.
- Keep milestones clear, unambiguous, and authentic to real No Man's Sky mechanics.`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      expedition_title: { type: Type.STRING },
      tagline: { type: Type.STRING },
      phases: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            phase_number: { type: Type.INTEGER },
            phase_name: { type: Type.STRING },
            milestones: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  task: { type: Type.STRING },
                  reward_flavor: { type: Type.STRING },
                },
                required: ['id', 'task', 'reward_flavor'],
              },
            },
          },
          required: ['phase_number', 'phase_name', 'milestones'],
        },
      },
    },
    required: ['expedition_title', 'tagline', 'phases'],
  };

  const result = await generateWithFallback({
    contents: prompt,
    responseSchema: schema,
  });

  if (result) {
    try {
      const data = JSON.parse(result.text);
      if (Array.isArray(data.phases)) {
        data.phases.forEach((p: { milestones: { completed?: boolean }[] }) => {
          if (Array.isArray(p.milestones)) {
            p.milestones.forEach((m) => {
              m.completed = false;
            });
          }
        });
      }
      data.id = `exp_${Date.now()}`;
      data.createdAt = Date.now();
      data.source = 'gemini';
      data.model_used = result.model;
      return res.json(data);
    } catch {}
  }

  const preset = PRESET_EXPEDITIONS[Math.floor(Math.random() * PRESET_EXPEDITIONS.length)];
  const clone = JSON.parse(JSON.stringify(preset));
  clone.id = `exp_${Date.now()}`;
  clone.createdAt = Date.now();
  res.json({ ...clone, source: 'procedural_fallback' });
});

// Mode 4: Casual Mission Generator
app.post('/api/generate-casual-mission', async (req, res) => {
  const { category, categories, targetBiome, customNotes } = req.body;
  const categoriesList: MissionCategory[] =
    Array.isArray(categories) && categories.length > 0
      ? categories
      : [category || 'culinary_restaurant'];
  const primaryCategory = categoriesList[0];
  const isCombined = categoriesList.length > 1;

  if (!ai) {
    const fallback = generateCasualMission(primaryCategory, targetBiome, categoriesList);
    return res.json({ ...fallback, source: 'procedural_fallback' });
  }

  const selectedMetas = categoriesList
    .map((c) => MISSION_CATEGORIES.find((m) => m.id === c))
    .filter(Boolean);

  const stylesSummary = selectedMetas
    .map((m) => `• ${m?.name}: ${m?.shortDesc}`)
    .join('\n');

  const prompt = `Generate a single fun, casual No Man's Sky mission that ${
    isCombined
      ? `seamlessly synthesizes and combines these ${categoriesList.length} distinct mission styles into an overarching hybrid adventure`
      : 'creates an engaging planetary adventure'
  }.
Mission Styles to synthesize:
${stylesSummary}
${targetBiome ? `Target Biome / Setting: ${targetBiome}` : ''}
${customNotes ? `User Telemetry Note: ${customNotes}` : ''}

CRITICAL RULES FOR RAPID GENERATION & TOKEN CONSERVATION:
1. STRICT BREVITY: Keep title under 5 words. Narrative maximum 2 short sentences. Each step description maximum 1 crisp instruction.
2. In-Game Lore Generation ('lore'):
   Generate authentic, canonical No Man's Sky lore tying into chosen styles.
   Include:
   - origin (e.g. "Distress Beacon [Euclid]", "Autophage Memory Scrap #16")
   - headline (short archive title)
   - narrative (2 vivid, concise sentences of authentic lore)
   - historicalContext (short historical tag)
   - canonEntity (e.g. "Iteration Cronus", "Priest Entity Nada")

3. Three Distinct Thematic Paths ('paths'):
   Provide 3 distinct strategic paths:
   - Path Alpha: Direct frontline recovery or salvage.
   - Path Beta: Ecological synthesis, cooking, or taming.
   - Path Gamma: Planetary cartography or beacon scouting.
   Each path must provide:
   - path_id ('alpha', 'beta', 'gamma')
   - themeTitle (short title)
   - approach (short phrase)
   - description (1 concise sentence)
   - tacticalAdvantage (1 short perk)
   - steps (3 direct, 1-sentence objectives with action verbs)

4. Default 'steps': Set this to the 3 steps of Path Alpha.
5. If 'culinary_restaurant' is among the styles: populate 'restaurantSpec' with venueType, aestheticTheme, 2 signatureDishes with real NMS recipes, optional fishingCatch, and decorChecklist (4 items).
6. bonusGoal: An optional fun 1-sentence activity (e.g. photo mode, feeding Iteration Cronus).`;

  const schema = {
    type: Type.OBJECT,
    properties: {
      protocol_id: { type: Type.STRING },
      title: { type: Type.STRING },
      category: { type: Type.STRING },
      categories: { type: Type.ARRAY, items: { type: Type.STRING } },
      categoryName: { type: Type.STRING },
      categoryNames: { type: Type.ARRAY, items: { type: Type.STRING } },
      categoryIcon: { type: Type.STRING },
      flavor_quote: { type: Type.STRING },
      targetLocation: { type: Type.STRING },
      lore: {
        type: Type.OBJECT,
        properties: {
          origin: { type: Type.STRING },
          headline: { type: Type.STRING },
          narrative: { type: Type.STRING },
          historicalContext: { type: Type.STRING },
          canonEntity: { type: Type.STRING },
        },
        required: ['origin', 'headline', 'narrative', 'historicalContext'],
      },
      paths: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            path_id: { type: Type.STRING },
            themeTitle: { type: Type.STRING },
            approach: { type: Type.STRING },
            description: { type: Type.STRING },
            tacticalAdvantage: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step_number: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
                required: ['step_number', 'title', 'description'],
              },
            },
          },
          required: [
            'path_id',
            'themeTitle',
            'approach',
            'description',
            'tacticalAdvantage',
            'steps',
          ],
        },
      },
      restaurantSpec: {
        type: Type.OBJECT,
        properties: {
          venueType: { type: Type.STRING },
          aestheticTheme: { type: Type.STRING },
          signatureDishes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                processorSteps: { type: Type.STRING },
              },
              required: ['name', 'ingredients', 'processorSteps'],
            },
          },
          fishingCatch: { type: Type.STRING },
          decorChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
      },
      steps: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            step_number: { type: Type.INTEGER },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
          },
          required: ['step_number', 'title', 'description'],
        },
      },
      bonusGoal: { type: Type.STRING },
    },
    required: [
      'protocol_id',
      'title',
      'category',
      'categoryName',
      'categoryIcon',
      'flavor_quote',
      'targetLocation',
      'lore',
      'paths',
      'steps',
    ],
  };

  const result = await generateWithFallback({
    contents: prompt,
    responseSchema: schema,
    maxOutputTokens: 800,
    temperature: 0.7,
  });

  if (result) {
    try {
      const data = JSON.parse(result.text);
      if (Array.isArray(data.steps)) {
        data.steps.forEach((s: { completed?: boolean }) => {
          s.completed = false;
        });
      }
      data.id = `mis_${Date.now()}`;
      data.createdAt = Date.now();
      data.source = 'gemini';
      data.model_used = result.model;
      return res.json(data);
    } catch {}
  }

  const fallback = generateCasualMission(primaryCategory, targetBiome, categoriesList);
  res.json({ ...fallback, source: 'procedural_fallback' });
});

// Vite middleware in dev or static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ATLAS_TERMINAL] Server telemetry live on port ${PORT} (prod=${isProduction})`);
  });
}

startServer().catch(console.error);

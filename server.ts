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
3. TRUE MECHANICS ONLY: Reflect actual No Man's Sky mechanics including recent updates (Omega, Orbital, Echoes, Aquarius, Worlds).
4. EXPLICIT CONSTRAINTS: Pair an inspiring goal with strict self-imposed rules (banning certain terminals, recharging methods, or hyperdrives).
5. CLEAR MILESTONES: Define unambiguous completion criteria and victory conditions.
6. TOKEN EFFICIENCY: Be concise, direct, and impactful.`;

// Candidate models with automated fallback to handle 503 spikes or rate limits
const CANDIDATE_MODELS = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];

async function generateWithFallback(options: {
  contents: string;
  responseSchema?: any;
  temperature?: number;
}): Promise<{ text: string; model: string } | null> {
  if (!ai) return null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: options.contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: options.temperature ?? 0.85,
          topP: 0.95,
          responseMimeType: 'application/json',
          responseSchema: options.responseSchema,
        },
      });

      const text = response.text?.trim();
      if (text) {
        return { text, model };
      }
    } catch {
      // Silently cascade to next model on 503 High Demand or network spike
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

Synthesize why these restrictions exist in lore, the recommended game difficulty setup, 3 progressive milestones, and an ultimate victory condition.`;

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
Keep milestones concise, challenging, and authentic to NMS mechanics (fishing, starship fabrication, dissonant camps, pirate freighters, etc.).`;

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

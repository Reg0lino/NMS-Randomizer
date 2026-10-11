/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CasualMission } from '../types';

export interface TtsSettings {
  enabled: boolean;
  voiceURI: string;
  rate: number; // 0.7 to 1.4
  pitch: number; // 0.7 to 1.4
  persona: 'exosuit' | 'atlas' | 'korvax' | 'vykeen' | 'custom';
}

export const DEFAULT_TTS_SETTINGS: TtsSettings = {
  enabled: false,
  voiceURI: '',
  rate: 1.0,
  pitch: 1.05,
  persona: 'exosuit',
};

const STORAGE_KEY = 'atlas_tts_settings';

export const NMS_PREVIEW_QUOTES = [
  "Suit telemetry nominal. Life support at 100 percent. Standing by for planetary directive, Interloper.",
  "Warning: Extreme hazard detected. Atlas carrier frequency locked at 16, 16, 16.",
  "Exosuit online. Sub-space coordinates verified. Proceed with exploration protocol.",
];

export function isTtsSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
}

export function getTtsSettings(): TtsSettings {
  if (typeof window === 'undefined') return DEFAULT_TTS_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_TTS_SETTINGS, ...parsed };
    }
  } catch {}
  return DEFAULT_TTS_SETTINGS;
}

export function saveTtsSettings(settings: TtsSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}

export function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (!isTtsSupported()) return [];
  const voices = window.speechSynthesis.getVoices();
  // Filter and prioritize English or system voices
  return voices.sort((a, b) => {
    const aEng = a.lang.toLowerCase().startsWith('en');
    const bEng = b.lang.toLowerCase().startsWith('en');
    if (aEng && !bEng) return -1;
    if (!aEng && bEng) return 1;
    return a.name.localeCompare(b.name);
  });
}

// Find best matching voice given stored voiceURI
function resolveVoice(voiceURI: string): SpeechSynthesisVoice | null {
  if (!isTtsSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voiceURI) {
    const found = voices.find((v) => v.voiceURI === voiceURI);
    if (found) return found;
  }
  // Fallbacks: Prefer natural/Google/English voices
  const defaultEng = voices.find(
    (v) => (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.default) && v.lang.startsWith('en')
  );
  if (defaultEng) return defaultEng;
  const anyEng = voices.find((v) => v.lang.startsWith('en'));
  return anyEng || voices[0] || null;
}

// Builds individual targeted spoken segments strictly starting at the mission title and ending at the mission end
export function buildMissionSpeechParts(mission: CasualMission, activePathId?: string): string[] {
  const parts: string[] = [];

  // 1. Mission Title & Protocol
  parts.push(`Mission Protocol: ${mission.protocol_id}. ${mission.title}.`);

  // 2. Category & Target Location
  parts.push(`Target Location: ${mission.targetLocation}. Style: ${mission.categoryName}.`);

  // 3. Flavor Quote
  if (mission.flavor_quote) {
    parts.push(`Field Transmission: "${mission.flavor_quote}".`);
  }

  // 4. Canonical In-game Lore
  if (mission.lore) {
    if (mission.lore.headline) {
      parts.push(`Atlas Archive In-Game Lore: ${mission.lore.headline}.`);
    }
    if (mission.lore.origin) {
      parts.push(`Lore Source: ${mission.lore.origin}.`);
    }
    if (mission.lore.narrative) {
      parts.push(mission.lore.narrative);
    }
  }

  // 5. Active Thematic Path
  const currentPath =
    mission.paths?.find((p) => p.path_id === activePathId) ||
    mission.paths?.[0];

  if (currentPath) {
    parts.push(`Selected Approach: ${currentPath.themeTitle}. ${currentPath.approach}.`);
    if (currentPath.description) {
      parts.push(currentPath.description);
    }
    if (currentPath.tacticalAdvantage) {
      parts.push(`Tactical Advantage: ${currentPath.tacticalAdvantage}.`);
    }
  }

  // 6. Sequential Step Objectives
  const steps = currentPath ? currentPath.steps : mission.steps || [];
  if (steps.length > 0) {
    parts.push(`Key Mission Objectives.`);
    steps.forEach((step) => {
      parts.push(`Step ${step.step_number}: ${step.title}. ${step.description}.`);
    });
  }

  // 7. Photography Sub-Goal & Optical Telemetry
  const photoGoal = currentPath?.photoGoal || mission.photoGoal;
  if (photoGoal) {
    parts.push(`Photo Mode Field Objective: ${photoGoal.title}. Target: ${photoGoal.targetSubject}. ${photoGoal.description}`);
  }

  // 8. Optional Bonus Goal
  if (mission.bonusGoal) {
    parts.push(`Optional Bonus Goal: ${mission.bonusGoal}.`);
  }

  // 9. Concluding Sign-off
  parts.push(`Directive briefing complete. Exosuit telemetry synchronized.`);

  return parts;
}

// Builds the full string script (for backwards compatibility)
export function buildMissionSpeechScript(mission: CasualMission, activePathId?: string): string {
  return buildMissionSpeechParts(mission, activePathId).join(' ');
}

// Splits text into natural sentence chunks
// Keeps sentences coherent while preventing any single chunk from exceeding browser limits
export function chunkTextIntoSentences(input: string | string[]): string[] {
  const rawItems = Array.isArray(input) ? input : [input];
  const results: string[] = [];

  for (const item of rawItems) {
    const cleaned = item
      .replace(/[*_#`[\]]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleaned) continue;

    // Split on full sentence terminators (. ! ?), correctly accounting for quotes (" or ') after the punctuation
    const sentences = cleaned.split(/(?<=[.!?]["'\u201d\u2019]?)\s+/);

    for (const s of sentences) {
      const trimmed = s.trim();
      if (!trimmed) continue;

      if (trimmed.length > 140) {
        // Only subdivide on commas/colons if the single sentence is unusually long
        const clauses = trimmed.split(/(?<=[,;:])\s+/);
        let buffer = '';
        for (const clause of clauses) {
          if (!buffer) {
            buffer = clause;
          } else if ((buffer + ' ' + clause).length <= 130) {
            buffer += ' ' + clause;
          } else {
            results.push(buffer);
            buffer = clause;
          }
        }
        if (buffer) {
          results.push(buffer);
        }
      } else {
        results.push(trimmed);
      }
    }
  }

  return results.filter((s) => s.length > 0);
}

// Module-level references to prevent browser Garbage Collection from cancelling speech
let activeUtterances: SpeechSynthesisUtterance[] = [];
let keepAliveTimer: number | null = null;
let watchdogTimer: number | null = null;
let currentQueueId = 0;

export function stopTts(): void {
  if (!isTtsSupported()) return;
  currentQueueId++; // Invalidate active queue execution
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
  if (watchdogTimer) {
    clearTimeout(watchdogTimer);
    watchdogTimer = null;
  }
  activeUtterances = [];
  try {
    window.speechSynthesis.cancel();
  } catch {}
}

export function isTtsSpeaking(): boolean {
  if (!isTtsSupported()) return false;
  return window.speechSynthesis.speaking;
}

// Speak text using a sequential sentence queue that never cuts off in Chrome/Safari/mobile
export function speakText(
  textOrParts: string | string[],
  settingsOverride?: Partial<TtsSettings>,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: unknown) => void
): void {
  if (!isTtsSupported()) {
    onError?.(new Error('Text to Speech is not supported in this browser.'));
    return;
  }

  stopTts();

  const chunks = chunkTextIntoSentences(textOrParts);
  if (chunks.length === 0) {
    onEnd?.();
    return;
  }

  const thisQueueId = ++currentQueueId;
  const settings = { ...getTtsSettings(), ...settingsOverride };

  // Calculate pitch and rate adjustments based on persona preset
  let effectivePitch = settings.pitch;
  let effectiveRate = settings.rate;

  if (settings.persona === 'exosuit') {
    effectivePitch = 1.1;
    effectiveRate = 1.02;
  } else if (settings.persona === 'atlas') {
    effectivePitch = 0.85;
    effectiveRate = 0.95;
  } else if (settings.persona === 'korvax') {
    effectivePitch = 1.25;
    effectiveRate = 1.1;
  } else if (settings.persona === 'vykeen') {
    effectivePitch = 0.75;
    effectiveRate = 0.9;
  }

  const selectedVoice = resolveVoice(settings.voiceURI);

  let chunkIndex = 0;
  let hasStarted = false;
  let advanceTimeout: number | null = null;
  let pollEndInterval: number | null = null;

  const cleanupChunkTimers = () => {
    if (watchdogTimer) {
      clearTimeout(watchdogTimer);
      watchdogTimer = null;
    }
    if (advanceTimeout) {
      clearTimeout(advanceTimeout);
      advanceTimeout = null;
    }
    if (pollEndInterval) {
      clearInterval(pollEndInterval);
      pollEndInterval = null;
    }
  };

  const playNextChunk = () => {
    if (thisQueueId !== currentQueueId) {
      cleanupChunkTimers();
      return;
    }

    cleanupChunkTimers();

    if (chunkIndex >= chunks.length) {
      // Completed all sentences in the mission directive!
      stopTts();
      onEnd?.();
      return;
    }

    const chunk = chunks[chunkIndex];
    chunkIndex++;

    const utterance = new SpeechSynthesisUtterance(chunk);
    utterance.rate = Math.max(0.7, Math.min(1.5, effectiveRate));
    utterance.pitch = Math.max(0.6, Math.min(1.6, effectivePitch));
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Retain explicit reference in global array so garbage collection doesn't kill it
    activeUtterances.push(utterance);

    let hasAdvanced = false;
    const advanceNext = () => {
      if (hasAdvanced) return;
      hasAdvanced = true;
      cleanupChunkTimers();

      // Brief 120ms breathing space between sentences for natural pacing and mobile audio buffer flush
      advanceTimeout = window.setTimeout(() => {
        if (thisQueueId === currentQueueId) {
          playNextChunk();
        }
      }, 120);
    };

    utterance.onstart = () => {
      if (thisQueueId !== currentQueueId) return;
      if (!hasStarted) {
        hasStarted = true;
        onStart?.();
      }
    };

    utterance.onend = () => {
      if (thisQueueId !== currentQueueId) return;
      advanceNext();
    };

    utterance.onerror = (e) => {
      if (thisQueueId !== currentQueueId) return;
      // If user halted audio, do not treat as failure
      if (e.error === 'canceled' || e.error === 'interrupted') {
        return;
      }
      advanceNext();
    };

    // Watchdog: If browser engine stalls or drops events for > 9s on this sentence, advance
    watchdogTimer = window.setTimeout(() => {
      if (thisQueueId === currentQueueId) {
        advanceNext();
      }
    }, 9000);

    // Mobile fallback poll: Android Chrome often finishes playing audio without firing onend.
    // Check when speaking stops after an initial grace period.
    let playStartTimestamp = Date.now();
    pollEndInterval = window.setInterval(() => {
      if (thisQueueId !== currentQueueId) {
        cleanupChunkTimers();
        return;
      }
      const elapsed = Date.now() - playStartTimestamp;
      // After at least 400ms, if window.speechSynthesis is no longer speaking, advance!
      if (elapsed > 400 && !window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
        advanceNext();
      }
    }, 250);

    try {
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      onError?.(err);
      advanceNext();
    }
  };

  playNextChunk();
}

// Preview a specific voice with on-theme No Man's Sky dialogue
export function previewVoice(
  voiceURI?: string,
  persona?: TtsSettings['persona'],
  pitch?: number,
  rate?: number,
  onStart?: () => void,
  onEnd?: () => void
): void {
  const quote = NMS_PREVIEW_QUOTES[0];
  speakText(
    quote,
    { voiceURI, persona, pitch, rate },
    onStart,
    onEnd,
    () => onEnd?.()
  );
}

// Speak full targeted mission text using structured parts
export function speakMission(
  mission: CasualMission,
  activePathId?: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: unknown) => void
): void {
  const parts = buildMissionSpeechParts(mission, activePathId);
  speakText(parts, undefined, onStart, onEnd, onError);
}

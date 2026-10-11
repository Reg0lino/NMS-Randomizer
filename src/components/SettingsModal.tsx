import React, { useState, useEffect } from 'react';
import { 
  X, 
  Key, 
  Volume2, 
  VolumeX, 
  Monitor, 
  Globe, 
  ShieldCheck, 
  Check, 
  Trash2, 
  ExternalLink,
  Mic,
  Play,
  Square,
  Sparkles,
  Bot
} from 'lucide-react';
import { getUserApiKey, setUserApiKey } from '../services/directiveApi';
import { playTerminalClick } from '../utils/audio';
import { 
  getTtsSettings, 
  saveTtsSettings, 
  getAvailableVoices, 
  isTtsSupported, 
  previewVoice, 
  stopTts,
  TtsSettings 
} from '../utils/tts';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isStaticDeploy: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCrt: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isStaticDeploy,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCrt,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const [ttsSettings, setTtsSettings] = useState<TtsSettings>(() => getTtsSettings());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPreviewSpeaking, setIsPreviewSpeaking] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKeyInput(getUserApiKey() || '');
      setTtsSettings(getTtsSettings());

      if (isTtsSupported()) {
        const loadVoices = () => {
          setVoices(getAvailableVoices());
        };
        loadVoices();
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }
    } else {
      stopTts();
      setIsPreviewSpeaking(false);
    }
  }, [isOpen]);

  const updateTts = (updates: Partial<TtsSettings>) => {
    const updated = { ...ttsSettings, ...updates };
    setTtsSettings(updated);
    saveTtsSettings(updated);
  };

  const handleToggleTts = () => {
    playTerminalClick();
    const nextEnabled = !ttsSettings.enabled;
    updateTts({ enabled: nextEnabled });
    if (!nextEnabled) {
      stopTts();
      setIsPreviewSpeaking(false);
    }
  };

  const handlePreviewVoice = () => {
    playTerminalClick();
    if (isPreviewSpeaking) {
      stopTts();
      setIsPreviewSpeaking(false);
    } else {
      setIsPreviewSpeaking(true);
      previewVoice(
        ttsSettings.voiceURI,
        ttsSettings.persona,
        ttsSettings.pitch,
        ttsSettings.rate,
        () => setIsPreviewSpeaking(true),
        () => setIsPreviewSpeaking(false)
      );
    }
  };

  if (!isOpen) return null;

  const handleSaveKey = () => {
    playTerminalClick();
    setUserApiKey(apiKeyInput.trim() || null);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleClearKey = () => {
    playTerminalClick();
    setUserApiKey(null);
    setApiKeyInput('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 select-none backdrop-blur-sm">
      <div className="bg-[#0E141B] border border-[#FF2A4D] rounded-xl max-w-md w-full p-4 relative shadow-[0_0_40px_rgba(255,42,77,0.3)] max-h-[90vh] overflow-y-auto nms-bracket">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1B2631] pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A4D] animate-ping" />
            <h3 className="font-mono text-sm font-bold text-[#E6EDF3] uppercase tracking-wider">
              ATLAS TELEMETRY CONFIGURATION
            </h3>
          </div>

          <button
            onClick={() => {
              playTerminalClick();
              onClose();
            }}
            className="p-1.5 rounded border border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Runtime Environment Status */}
        <div className="bg-[#050709] border border-[#1B2631] p-3 rounded-lg mb-3 text-xs font-mono">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#7D8B99] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#00F0FF]" />
              RUNTIME HOST:
            </span>
            <span className="font-bold text-[#00F0FF]">
              {isStaticDeploy ? 'GITHUB PAGES (CLIENT-ONLY)' : 'FULL-STACK CLOUD PROXY'}
            </span>
          </div>
          <p className="text-[10px] text-[#7D8B99] leading-relaxed">
            {isStaticDeploy
              ? 'Zero-backend static environment. Direct AI features use your stored client key; offline challenges and procedural engines function with zero tokens.'
              : 'Active server proxy running in Cloud environment with secured backend telemetry.'}
          </p>
        </div>

        {/* Gemini API Key Configuration */}
        <div className="bg-[#050709] border border-[#1B2631] p-3 rounded-lg mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-mono font-bold text-[#FFB300] uppercase flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5" />
              CUSTOM GEMINI API KEY (OPTIONAL)
            </label>
            {apiKeyInput && (
              <span className="text-[10px] font-mono text-green-400 flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" />
                KEY SET
              </span>
            )}
          </div>

          <p className="text-[11px] text-[#7D8B99] mb-2 leading-relaxed">
            For GitHub Pages static hosting: Provide your Google Gemini API key to enable direct neural transmissions. Kept strictly in your browser's <code className="text-[#00F0FF]">localStorage</code>.
          </p>

          <div className="flex gap-1.5">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="AIzaSy..."
              className="flex-1 bg-[#0E141B] border border-[#1B2631] text-xs font-mono text-[#E6EDF3] px-2.5 py-1.5 rounded focus:border-[#FF2A4D] focus:outline-none"
            />

            <button
              onClick={handleSaveKey}
              className="px-3 py-1.5 rounded bg-[#FF2A4D] hover:bg-[#ff4362] text-white text-xs font-mono font-bold transition-all active:scale-95 flex items-center gap-1"
            >
              {keySaved ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{keySaved ? 'SAVED' : 'SAVE'}</span>
            </button>

            {apiKeyInput && (
              <button
                onClick={handleClearKey}
                className="p-1.5 rounded border border-[#1B2631] text-[#7D8B99] hover:text-red-400 transition-colors"
                title="Remove key"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Audio & Immersion Controls */}
        <div className="bg-[#050709] border border-[#1B2631] p-3 rounded-lg mb-3 flex flex-col gap-2">
          <span className="text-xs font-mono font-bold text-[#E6EDF3] uppercase tracking-wider">
            ATMOSPHERIC & SENSORY CONTROLS
          </span>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#7D8B99] flex items-center gap-1.5">
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#FFB300]" /> : <VolumeX className="w-3.5 h-3.5" />}
              Web Audio Synthesizer:
            </span>
            <button
              onClick={onToggleSound}
              className={`px-2.5 py-1 rounded border text-[11px] font-bold ${
                soundEnabled
                  ? 'bg-[#FFB300]/15 border-[#FFB300] text-[#FFB300]'
                  : 'bg-[#0E141B] border-[#1B2631] text-[#7D8B99]'
              }`}
            >
              {soundEnabled ? 'ENABLED' : 'MUTED'}
            </button>
          </div>

          {/* CRT Scanline Toggle */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#7D8B99] flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-[#00F0FF]" />
              CRT Retro Scanline Mesh:
            </span>
            <button
              onClick={onToggleCrt}
              className={`px-2.5 py-1 rounded border text-[11px] font-bold ${
                crtEnabled
                  ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF]'
                  : 'bg-[#0E141B] border-[#1B2631] text-[#7D8B99]'
              }`}
            >
              {crtEnabled ? 'ACTIVE' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Optional Mission Text-To-Speech (TTS) Voice Synthesizer */}
        <div className="bg-[#050709] border border-[#1B2631] p-3 rounded-lg mb-3 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#E6EDF3] uppercase tracking-wider flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-[#00F0FF]" />
              MISSION TEXT-TO-SPEECH (TTS)
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#00E5A3]/15 text-[#00E5A3] font-bold">
              100% FREE & OFFLINE
            </span>
          </div>

          <p className="text-[11px] text-[#7D8B99] leading-relaxed">
            Targeted voice narration for active mission directives. Strictly starts at the mission title and continues to the end of active objectives (never reads logs).
          </p>

          {/* Master TTS Toggle */}
          <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-[#1B2631]/60">
            <span className="text-[#7D8B99] flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-[#00E5A3]" />
              Voice Synthesizer:
            </span>
            <button
              onClick={handleToggleTts}
              className={`px-2.5 py-1 rounded border text-[11px] font-bold transition-all active:scale-95 ${
                ttsSettings.enabled
                  ? 'bg-[#00E5A3]/20 border-[#00E5A3] text-[#00E5A3] shadow-[0_0_10px_rgba(0,229,163,0.3)]'
                  : 'bg-[#0E141B] border-[#1B2631] text-[#7D8B99]'
              }`}
            >
              {ttsSettings.enabled ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>

          {ttsSettings.enabled && (
            <div className="flex flex-col gap-2.5 mt-1 pt-2 border-t border-[#1B2631]/60">
              {/* Persona Presets */}
              <div>
                <label className="text-[10px] font-mono text-[#7D8B99] uppercase font-bold block mb-1">
                  VOICE PERSONA ARCHETYPE:
                </label>
                <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                  {[
                    { id: 'exosuit', label: 'Exosuit AI', desc: 'Standard Atlas suit tone' },
                    { id: 'atlas', label: 'Atlas Core', desc: 'Deep synthetic resonance' },
                    { id: 'korvax', label: 'Korvax Echo', desc: 'Harmonic machine pitch' },
                    { id: 'vykeen', label: "Vy'keen Leader", desc: 'Low authoritative pace' },
                  ].map((p) => {
                    const isSelected = ttsSettings.persona === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          playTerminalClick();
                          updateTts({ persona: p.id as any });
                        }}
                        className={`p-1.5 rounded border text-left transition-colors ${
                          isSelected
                            ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#00F0FF] font-bold'
                            : 'bg-[#0E141B] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
                        }`}
                      >
                        <span className="block font-bold">{p.label}</span>
                        <span className="text-[9px] text-[#7D8B99] block line-clamp-1">{p.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* System Voice Selection Dropdown */}
              {voices.length > 0 && (
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-mono text-[#7D8B99] uppercase font-bold">
                    BROWSER / DEVICE SYSTEM VOICE:
                  </label>
                  <select
                    value={ttsSettings.voiceURI}
                    onChange={(e) => updateTts({ voiceURI: e.target.value })}
                    className="bg-[#0E141B] border border-[#1B2631] text-xs text-[#E6EDF3] px-2.5 py-1.5 rounded font-mono focus:border-[#00F0FF] focus:outline-none"
                  >
                    <option value="">Default System Engine (Auto-Selected)</option>
                    {voices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Voice Speed / Rate Control */}
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[11px] text-[#7D8B99]">Speech Speed:</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { rate: 0.85, label: '0.8x' },
                    { rate: 1.0, label: '1.0x' },
                    { rate: 1.15, label: '1.2x' },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => updateTts({ rate: s.rate })}
                      className={`px-2 py-0.5 rounded text-[10px] border ${
                        ttsSettings.rate === s.rate
                          ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF] font-bold'
                          : 'bg-[#0E141B] border-[#1B2631] text-[#7D8B99]'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* On-Theme NMS Voice Preview Button */}
              <button
                type="button"
                onClick={handlePreviewVoice}
                className={`w-full py-2 px-3 rounded-lg border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm ${
                  isPreviewSpeaking
                    ? 'bg-[#FF2A4D]/20 border-[#FF2A4D] text-[#FF2A4D] shadow-[0_0_12px_rgba(255,42,77,0.3)] animate-pulse'
                    : 'bg-[#00F0FF]/15 hover:bg-[#00F0FF]/25 border-[#00F0FF]/50 text-[#00F0FF]'
                }`}
              >
                {isPreviewSpeaking ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" />
                    <span>STOP VOICE PREVIEW [ACTIVE]</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>PREVIEW VOICE // "LIFE SUPPORT AT 100%"</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* GitHub Pages Deployment Note */}
        <div className="bg-[#050709] border border-[#1B2631] p-2.5 rounded text-[11px] font-mono text-[#7D8B99] flex items-center justify-between">
          <span>GITHUB PAGES COMPATIBLE</span>
          <span className="text-[#00F0FF] font-bold">100% STATIC READY</span>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={() => {
              playTerminalClick();
              onClose();
            }}
            className="w-full py-2 rounded bg-[#050709] border border-[#1B2631] hover:border-[#FF2A4D] text-[#E6EDF3] text-xs font-mono font-bold transition-colors uppercase tracking-wider"
          >
            DISMISS TERMINAL CONFIG
          </button>
        </div>
      </div>
    </div>
  );
};

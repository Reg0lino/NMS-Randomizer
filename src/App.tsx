/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Directive, 
  WeaverManifesto, 
  Expedition, 
  IntensityLevel 
} from './types';
import { 
  OFFLINE_DIRECTIVES, 
  PRESET_EXPEDITIONS 
} from './data/challengeData';
import { 
  checkServerStatus, 
  fetchOrGenerateDirective, 
  fetchOrGenerateWeaver, 
  fetchOrGenerateExpedition 
} from './services/directiveApi';
import { 
  setSoundEnabled, 
  isSoundEnabled, 
  playMilestoneComplete, 
  playTerminalClick 
} from './utils/audio';

import { Header } from './components/Header';
import { ControlBar } from './components/ControlBar';
import { BottomNav, TabMode } from './components/BottomNav';
import { TransceiverView } from './components/TransceiverView';
import { WeaverView } from './components/WeaverView';
import { ExpeditionView } from './components/ExpeditionView';
import { ArchiveView } from './components/ArchiveView';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabMode>('transceiver');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isStaticDeploy, setIsStaticDeploy] = useState<boolean>(false);

  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());
  const [crtOn, setCrtOn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('atlas_crt');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  const [s10Frame, setS10Frame] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('atlas_s10_frame');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [aiAvailable, setAiAvailable] = useState<boolean>(false);
  const [useAi, setUseAi] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Active items
  const [currentDirective, setCurrentDirective] = useState<Directive | null>(() => {
    try {
      const saved = localStorage.getItem('atlas_current_directive');
      if (saved) return JSON.parse(saved);
    } catch {}
    return OFFLINE_DIRECTIVES[0];
  });

  const [currentManifesto, setCurrentManifesto] = useState<WeaverManifesto | null>(() => {
    try {
      const saved = localStorage.getItem('atlas_current_manifesto');
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  });

  const [currentExpedition, setCurrentExpedition] = useState<Expedition | null>(() => {
    try {
      const saved = localStorage.getItem('atlas_current_expedition');
      if (saved) return JSON.parse(saved);
    } catch {}
    return PRESET_EXPEDITIONS[0];
  });

  // Saved Vault collections
  const [savedDirectives, setSavedDirectives] = useState<Directive[]>(() => {
    try {
      const saved = localStorage.getItem('atlas_saved_directives');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [savedManifestos, setSavedManifestos] = useState<WeaverManifesto[]>(() => {
    try {
      const saved = localStorage.getItem('atlas_saved_manifestos');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [savedExpeditions, setSavedExpeditions] = useState<Expedition[]>(() => {
    try {
      const saved = localStorage.getItem('atlas_saved_expeditions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Check server status on mount
  useEffect(() => {
    checkServerStatus().then((status) => {
      setAiAvailable(status.aiAvailable);
      setIsStaticDeploy(status.isStaticDeploy);
      if (status.aiAvailable) {
        setUseAi(true);
      }
    });

    // Check URL hash for shared directive or tab
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#tab=')) {
        const tab = hash.replace('#tab=', '') as TabMode;
        if (['transceiver', 'weaver', 'expedition', 'archive'].includes(tab)) {
          setActiveTab(tab);
        }
      }
    } catch {}
  }, []);

  // Save current directive
  useEffect(() => {
    if (currentDirective) {
      localStorage.setItem('atlas_current_directive', JSON.stringify(currentDirective));
    }
  }, [currentDirective]);

  // Save current manifesto
  useEffect(() => {
    if (currentManifesto) {
      localStorage.setItem('atlas_current_manifesto', JSON.stringify(currentManifesto));
    }
  }, [currentManifesto]);

  // Save current expedition
  useEffect(() => {
    if (currentExpedition) {
      localStorage.setItem('atlas_current_expedition', JSON.stringify(currentExpedition));
    }
  }, [currentExpedition]);

  // Save collections
  useEffect(() => {
    localStorage.setItem('atlas_saved_directives', JSON.stringify(savedDirectives));
  }, [savedDirectives]);

  useEffect(() => {
    localStorage.setItem('atlas_saved_manifestos', JSON.stringify(savedManifestos));
  }, [savedManifestos]);

  useEffect(() => {
    localStorage.setItem('atlas_saved_expeditions', JSON.stringify(savedExpeditions));
  }, [savedExpeditions]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const toggleCrt = () => {
    const next = !crtOn;
    setCrtOn(next);
    localStorage.setItem('atlas_crt', next ? 'true' : 'false');
  };

  const toggleS10Frame = () => {
    const next = !s10Frame;
    setS10Frame(next);
    localStorage.setItem('atlas_s10_frame', next ? 'true' : 'false');
  };

  const toggleAi = () => {
    setUseAi(!useAi);
  };

  // Generate Directive (Transceiver)
  const handleGenerateDirective = async (intensity: IntensityLevel, customNotes?: string) => {
    setIsLoading(true);
    try {
      const { directive } = await fetchOrGenerateDirective(intensity, !useAi, customNotes);
      setCurrentDirective(directive);
    } finally {
      setIsLoading(false);
    }
  };

  // Compile Weaver Manifesto
  const handleCompileWeaver = async (
    vocationId: string,
    economyId: string,
    mobilityId: string,
    biomeId: string,
    vocationName: string,
    economyName: string,
    mobilityName: string,
    biomeName: string
  ) => {
    setIsLoading(true);
    try {
      const { manifesto } = await fetchOrGenerateWeaver(
        vocationId,
        economyId,
        mobilityId,
        biomeId,
        vocationName,
        economyName,
        mobilityName,
        biomeName,
        !useAi
      );
      setCurrentManifesto(manifesto);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Expedition Campaign
  const handleGenerateExpedition = async (theme: string) => {
    setIsLoading(true);
    try {
      const { expedition } = await fetchOrGenerateExpedition(theme, !useAi);
      setCurrentExpedition(expedition);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle milestone in active expedition
  const handleToggleMilestone = (phaseIndex: number, milestoneId: string) => {
    if (!currentExpedition) return;
    playTerminalClick();

    const updatedPhases = currentExpedition.phases.map((phase, pIdx) => {
      if (pIdx !== phaseIndex) return phase;
      return {
        ...phase,
        milestones: phase.milestones.map((m) => {
          if (m.id !== milestoneId) return m;
          const nextCompleted = !m.completed;
          if (nextCompleted) {
            playMilestoneComplete();
          }
          return { ...m, completed: nextCompleted };
        }),
      };
    });

    setCurrentExpedition({
      ...currentExpedition,
      phases: updatedPhases,
    });
  };

  // Reset milestone progress for current expedition
  const handleResetExpeditionProgress = () => {
    if (!currentExpedition) return;
    const resetPhases = currentExpedition.phases.map((p) => ({
      ...p,
      milestones: p.milestones.map((m) => ({ ...m, completed: false })),
    }));
    setCurrentExpedition({
      ...currentExpedition,
      phases: resetPhases,
    });
  };

  // Save / Bookmark operations
  const handleSaveDirective = (directive: Directive) => {
    if (savedDirectives.some((d) => d.protocol_id === directive.protocol_id)) {
      setSavedDirectives(savedDirectives.filter((d) => d.protocol_id !== directive.protocol_id));
    } else {
      setSavedDirectives([directive, ...savedDirectives]);
    }
  };

  const handleSaveManifesto = (manifesto: WeaverManifesto) => {
    if (savedManifestos.some((m) => m.protocol_id === manifesto.protocol_id)) {
      setSavedManifestos(savedManifestos.filter((m) => m.protocol_id !== manifesto.protocol_id));
    } else {
      setSavedManifestos([manifesto, ...savedManifestos]);
    }
  };

  const handleSaveExpedition = (expedition: Expedition) => {
    if (savedExpeditions.some((e) => e.id === expedition.id)) {
      setSavedExpeditions(savedExpeditions.filter((e) => e.id !== expedition.id));
    } else {
      setSavedExpeditions([expedition, ...savedExpeditions]);
    }
  };

  // Archive export / import
  const handleExportJson = () => {
    const data = {
      app: "No Man's Sky: Atlas Terminal",
      version: '5.0',
      exportedAt: new Date().toISOString(),
      directives: savedDirectives,
      manifestos: savedManifestos,
      expeditions: savedExpeditions,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atlas-terminal-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.directives)) {
        setSavedDirectives((prev) => [...parsed.directives, ...prev]);
      }
      if (Array.isArray(parsed.manifestos)) {
        setSavedManifestos((prev) => [...parsed.manifestos, ...prev]);
      }
      if (Array.isArray(parsed.expeditions)) {
        setSavedExpeditions((prev) => [...parsed.expeditions, ...prev]);
      }
      return true;
    } catch {
      return false;
    }
  };

  const handleClearAllArchive = () => {
    setSavedDirectives([]);
    setSavedManifestos([]);
    setSavedExpeditions([]);
  };

  const totalSavedCount = savedDirectives.length + savedManifestos.length + savedExpeditions.length;

  return (
    <div className="w-full min-h-screen min-h-[100dvh] bg-[#000000] text-[#E6EDF3] flex flex-col items-center relative">
      {/* CRT Scanline overlay (toggleable) */}
      {crtOn && <div className="fixed inset-0 crt-overlay z-40 pointer-events-none" />}

      {/* Main Terminal Enclosure */}
      <div
        className={`w-full flex flex-col bg-[#050709] transition-all duration-300 relative ${
          s10Frame
            ? 'max-w-[390px] h-[820px] max-h-[92vh] my-auto rounded-[36px] border-[8px] border-[#1B2631] shadow-[0_0_50px_rgba(255,42,77,0.3)] overflow-hidden'
            : 'max-w-2xl min-h-screen min-h-[100dvh] border-x border-[#1B2631]/60 shadow-2xl'
        }`}
      >
        {/* Top Header: Pure non-interactive title banner (Safe for broken top-15% digitizers) */}
        <Header />

        {/* Core Scrollable Body */}
        <main
          className={`flex-1 w-full px-3 pt-3 pb-24 ${
            s10Frame ? 'overflow-y-auto min-h-0 overscroll-contain' : ''
          }`}
        >
          {/* Scrollable Control Matrix (Buttons safely placed beneath top digitizer dead zone) */}
          <ControlBar
            soundEnabled={soundOn}
            onToggleSound={toggleSound}
            crtEnabled={crtOn}
            onToggleCrt={toggleCrt}
            useAi={useAi}
            onToggleAi={toggleAi}
            s10Frame={s10Frame}
            onToggleS10Frame={toggleS10Frame}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />

          {/* Active Operational View */}
          {activeTab === 'transceiver' && (
            <TransceiverView
              currentDirective={currentDirective}
              onGenerate={handleGenerateDirective}
              isLoading={isLoading}
              onSaveDirective={handleSaveDirective}
              isSaved={
                currentDirective
                  ? savedDirectives.some((d) => d.protocol_id === currentDirective.protocol_id)
                  : false
              }
            />
          )}

          {activeTab === 'weaver' && (
            <WeaverView
              currentManifesto={currentManifesto}
              onCompile={handleCompileWeaver}
              isLoading={isLoading}
              onSaveManifesto={handleSaveManifesto}
              isSaved={
                currentManifesto
                  ? savedManifestos.some((m) => m.protocol_id === currentManifesto.protocol_id)
                  : false
              }
            />
          )}

          {activeTab === 'expedition' && (
            <ExpeditionView
              currentExpedition={currentExpedition}
              onGenerate={handleGenerateExpedition}
              isLoading={isLoading}
              onToggleMilestone={handleToggleMilestone}
              onSaveExpedition={handleSaveExpedition}
              isSaved={
                currentExpedition
                  ? savedExpeditions.some((e) => e.id === currentExpedition.id)
                  : false
              }
              onResetProgress={handleResetExpeditionProgress}
            />
          )}

          {activeTab === 'archive' && (
            <ArchiveView
              savedDirectives={savedDirectives}
              savedManifestos={savedManifestos}
              savedExpeditions={savedExpeditions}
              onSelectDirective={(d) => {
                setCurrentDirective(d);
                setActiveTab('transceiver');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectManifesto={(m) => {
                setCurrentManifesto(m);
                setActiveTab('weaver');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectExpedition={(e) => {
                setCurrentExpedition(e);
                setActiveTab('expedition');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDeleteDirective={(id) => {
                setSavedDirectives(savedDirectives.filter((d) => d.protocol_id !== id));
              }}
              onDeleteManifesto={(id) => {
                setSavedManifestos(savedManifestos.filter((m) => m.protocol_id !== id));
              }}
              onDeleteExpedition={(id) => {
                setSavedExpeditions(savedExpeditions.filter((e) => e.id !== id));
              }}
              onExportJson={handleExportJson}
              onImportJson={handleImportJson}
              onClearAll={handleClearAllArchive}
            />
          )}
        </main>

        {/* Fixed Ergonomic Bottom Navigation Bar (in bottom 60px thumb zone) */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          savedCount={totalSavedCount}
        />
      </div>

      {/* Settings Modal (API Key, Ambient Drone, GitHub Pages info) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        isStaticDeploy={isStaticDeploy}
        soundEnabled={soundOn}
        onToggleSound={toggleSound}
        crtEnabled={crtOn}
        onToggleCrt={toggleCrt}
      />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Directive, 
  WeaverManifesto, 
  Expedition, 
  IntensityLevel,
  CasualMission,
  MissionCategory
} from './types';
import { 
  OFFLINE_DIRECTIVES, 
  PRESET_EXPEDITIONS 
} from './data/challengeData';
import {
  PRESET_CASUAL_MISSIONS,
} from './data/casualMissionData';
import { 
  checkServerStatus, 
  fetchOrGenerateDirective, 
  fetchOrGenerateWeaver, 
  fetchOrGenerateExpedition,
  fetchOrGenerateCasualMission
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
import { CasualMissionsView } from './components/CasualMissionsView';
import { ExpeditionView } from './components/ExpeditionView';
import { ArchiveView } from './components/ArchiveView';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabMode>('missions');
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

  // Casual Mission state (Simplified adventure board)
  const [currentCasualMission, setCurrentCasualMission] = useState<CasualMission | null>(() => {
    try {
      const saved = localStorage.getItem('atlas_current_casual_mission');
      if (saved) return JSON.parse(saved);
    } catch {}
    return PRESET_CASUAL_MISSIONS[0];
  });

  const [savedCasualMissions, setSavedCasualMissions] = useState<CasualMission[]>(() => {
    try {
      const saved = localStorage.getItem('atlas_saved_casual_missions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Expeditions & Legacy Directive states
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

    // Check URL hash for shared tab
    try {
      const hash = window.location.hash;
      if (hash.startsWith('#tab=')) {
        const tab = hash.replace('#tab=', '') as TabMode;
        if (['missions', 'expedition', 'archive'].includes(tab)) {
          setActiveTab(tab);
        }
      }
    } catch {}
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (currentCasualMission) {
      localStorage.setItem('atlas_current_casual_mission', JSON.stringify(currentCasualMission));
    }
  }, [currentCasualMission]);

  useEffect(() => {
    localStorage.setItem('atlas_saved_casual_missions', JSON.stringify(savedCasualMissions));
  }, [savedCasualMissions]);

  useEffect(() => {
    if (currentDirective) {
      localStorage.setItem('atlas_current_directive', JSON.stringify(currentDirective));
    }
  }, [currentDirective]);

  useEffect(() => {
    if (currentManifesto) {
      localStorage.setItem('atlas_current_manifesto', JSON.stringify(currentManifesto));
    }
  }, [currentManifesto]);

  useEffect(() => {
    if (currentExpedition) {
      localStorage.setItem('atlas_current_expedition', JSON.stringify(currentExpedition));
    }
  }, [currentExpedition]);

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

  // Generate Casual Mission
  const handleGenerateCasualMission = async (
    categoryOrCategories?: MissionCategory[] | MissionCategory,
    targetBiome?: string,
    customNotes?: string
  ) => {
    setIsLoading(true);
    try {
      const { mission } = await fetchOrGenerateCasualMission(categoryOrCategories, targetBiome, customNotes, !useAi);
      setCurrentCasualMission(mission);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCasualMission = (mission: CasualMission) => {
    const exists = savedCasualMissions.some((m) => m.id === mission.id);
    if (exists) {
      setSavedCasualMissions(savedCasualMissions.filter((m) => m.id !== mission.id));
    } else {
      setSavedCasualMissions([mission, ...savedCasualMissions]);
    }
  };

  const handleStartMission = (mission: CasualMission) => {
    // Automatically log into previous mission log, making it completely offline and reloadable
    setSavedCasualMissions((prev) => {
      const existsIndex = prev.findIndex((m) => m.id === mission.id || m.protocol_id === mission.protocol_id);
      if (existsIndex >= 0) {
        const updated = [...prev];
        updated.splice(existsIndex, 1);
        return [mission, ...updated];
      }
      return [mission, ...prev];
    });
  };

  const handleSelectCasualMission = (mission: CasualMission) => {
    setCurrentCasualMission(mission);
    setActiveTab('missions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate Expedition
  const handleGenerateExpedition = async (theme: string) => {
    setIsLoading(true);
    try {
      const { expedition } = await fetchOrGenerateExpedition(theme, !useAi);
      setCurrentExpedition(expedition);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMilestone = (phaseNumber: number, milestoneId: string) => {
    if (!currentExpedition) return;
    let becameCompleted = false;

    const nextPhases = currentExpedition.phases.map((phase) => {
      if (phase.phase_number !== phaseNumber) return phase;
      return {
        ...phase,
        milestones: phase.milestones.map((m) => {
          if (m.id === milestoneId) {
            const next = !m.completed;
            if (next) becameCompleted = true;
            return { ...m, completed: next };
          }
          return m;
        }),
      };
    });

    if (becameCompleted) {
      playMilestoneComplete();
    } else {
      playTerminalClick();
    }

    setCurrentExpedition({
      ...currentExpedition,
      phases: nextPhases,
    });
  };

  const handleResetExpeditionProgress = () => {
    if (!currentExpedition) return;
    const nextPhases = currentExpedition.phases.map((phase) => ({
      ...phase,
      milestones: phase.milestones.map((m) => ({ ...m, completed: false })),
    }));
    setCurrentExpedition({
      ...currentExpedition,
      phases: nextPhases,
    });
  };

  const handleSaveExpedition = (exp: Expedition) => {
    const exists = savedExpeditions.some((e) => e.id === exp.id);
    if (exists) {
      setSavedExpeditions(savedExpeditions.filter((e) => e.id !== exp.id));
    } else {
      setSavedExpeditions([exp, ...savedExpeditions]);
    }
  };

  const handleExportJson = () => {
    const data = {
      app: "No Man's Sky: Atlas Terminal",
      version: '6.0',
      exportedAt: new Date().toISOString(),
      casualMissions: savedCasualMissions,
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
      if (Array.isArray(parsed.casualMissions)) {
        setSavedCasualMissions((prev) => [...parsed.casualMissions, ...prev]);
      }
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
    setSavedCasualMissions([]);
    setSavedDirectives([]);
    setSavedManifestos([]);
    setSavedExpeditions([]);
  };

  const totalSavedCount = savedCasualMissions.length + savedDirectives.length + savedManifestos.length + savedExpeditions.length;

  return (
    <div className="w-full min-h-screen min-h-[100dvh] bg-[#000000] text-[#E6EDF3] flex flex-col items-center relative">
      {/* CRT Scanline overlay (toggleable) */}
      {crtOn && <div className="fixed inset-0 crt-overlay z-40 pointer-events-none" />}

      {/* Main Terminal Enclosure */}
      <div
        className={`w-full flex flex-col bg-[#050709] transition-all duration-300 relative ${
          s10Frame
            ? 'max-w-[390px] h-[820px] max-h-[92vh] my-auto rounded-[36px] border-[8px] border-[#1B2631] shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden'
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
          {activeTab === 'missions' && (
            <CasualMissionsView
              currentMission={currentCasualMission}
              onGenerate={handleGenerateCasualMission}
              isLoading={isLoading}
              onSaveMission={handleSaveCasualMission}
              isSaved={
                currentCasualMission
                  ? savedCasualMissions.some((m) => m.id === currentCasualMission.id)
                  : false
              }
              onStartMission={handleStartMission}
              savedCasualMissions={savedCasualMissions}
              onSelectCasualMission={handleSelectCasualMission}
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
              savedCasualMissions={savedCasualMissions}
              savedDirectives={savedDirectives}
              savedManifestos={savedManifestos}
              savedExpeditions={savedExpeditions}
              onSelectCasualMission={(m) => {
                setCurrentCasualMission(m);
                setActiveTab('missions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectDirective={(d) => {
                setCurrentDirective(d);
                setActiveTab('missions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectManifesto={(m) => {
                setCurrentManifesto(m);
                setActiveTab('missions');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectExpedition={(e) => {
                setCurrentExpedition(e);
                setActiveTab('expedition');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onDeleteCasualMission={(id) => {
                setSavedCasualMissions(savedCasualMissions.filter((m) => m.id !== id));
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

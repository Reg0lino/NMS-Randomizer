import React, { useState } from 'react';
import { Directive, WeaverManifesto, Expedition } from '../types';
import { OFFLINE_DIRECTIVES } from '../data/challengeData';
import { 
  BookOpen, 
  Trash2, 
  Download, 
  Upload, 
  Eye, 
  Sparkles, 
  Layers, 
  Radio, 
  GitFork, 
  Compass, 
  Check, 
  Share2 
} from 'lucide-react';
import { playTerminalClick } from '../utils/audio';

interface ArchiveViewProps {
  savedDirectives: Directive[];
  savedManifestos: WeaverManifesto[];
  savedExpeditions: Expedition[];
  onSelectDirective: (directive: Directive) => void;
  onSelectManifesto: (manifesto: WeaverManifesto) => void;
  onSelectExpedition: (expedition: Expedition) => void;
  onDeleteDirective: (protocolId: string) => void;
  onDeleteManifesto: (protocolId: string) => void;
  onDeleteExpedition: (id: string) => void;
  onExportJson: () => void;
  onImportJson: (jsonData: string) => boolean;
  onClearAll: () => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  savedDirectives,
  savedManifestos,
  savedExpeditions,
  onSelectDirective,
  onSelectManifesto,
  onSelectExpedition,
  onDeleteDirective,
  onDeleteManifesto,
  onDeleteExpedition,
  onExportJson,
  onImportJson,
  onClearAll,
}) => {
  const [filter, setFilter] = useState<'all' | 'directives' | 'manifestos' | 'expeditions' | 'offline_presets'>('all');
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleImportSubmit = () => {
    playTerminalClick();
    if (!importText.trim()) return;
    const success = onImportJson(importText.trim());
    if (success) {
      setImportStatus('Successfully imported archive records!');
      setTimeout(() => {
        setImportModalOpen(false);
        setImportStatus(null);
        setImportText('');
      }, 1200);
    } else {
      setImportStatus('Invalid JSON telemetry format.');
    }
  };

  const totalSaved = savedDirectives.length + savedManifestos.length + savedExpeditions.length;

  return (
    <div className="flex flex-col gap-4 pb-6">
      {/* Intro Header */}
      <div className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="flex items-center gap-1.5 text-xs font-mono text-[#00F0FF] font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            ATLAS ARCHIVE // TELEMETRY VAULT
          </span>
          <p className="text-[11px] text-[#7D8B99] mt-0.5">
            Locally stored directives, compiled survival manifestos, and expedition trackers ({totalSaved} stored).
          </p>
        </div>

        {/* Data portability actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              playTerminalClick();
              onExportJson();
            }}
            disabled={totalSaved === 0}
            className="p-1.5 px-2.5 rounded border bg-[#050709] border-[#1B2631] text-[#E6EDF3] hover:border-[#00F0FF] transition-colors text-[11px] font-mono flex items-center gap-1 disabled:opacity-40"
            title="Export local archive to JSON file"
          >
            <Download className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="hidden xs:inline">EXPORT</span>
          </button>

          <button
            onClick={() => {
              playTerminalClick();
              setImportModalOpen(true);
            }}
            className="p-1.5 px-2.5 rounded border bg-[#050709] border-[#1B2631] text-[#E6EDF3] hover:border-[#FFB300] transition-colors text-[11px] font-mono flex items-center gap-1"
            title="Import JSON data into archive"
          >
            <Upload className="w-3.5 h-3.5 text-[#FFB300]" />
            <span className="hidden xs:inline">IMPORT</span>
          </button>

          {totalSaved > 0 && (
            <button
              onClick={() => {
                playTerminalClick();
                if (confirm('Clear all saved directives and expeditions from memory?')) {
                  onClearAll();
                }
              }}
              className="p-1.5 rounded border bg-[#050709] border-[#1B2631] text-red-400 hover:border-red-500 transition-colors"
              title="Purge all archive records"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-mono">
        <button
          onClick={() => {
            playTerminalClick();
            setFilter('all');
          }}
          className={`px-2.5 py-1.5 rounded border whitespace-nowrap ${
            filter === 'all'
              ? 'bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#E6EDF3] font-bold'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
          }`}
        >
          ALL ({totalSaved})
        </button>

        <button
          onClick={() => {
            playTerminalClick();
            setFilter('directives');
          }}
          className={`px-2.5 py-1.5 rounded border whitespace-nowrap flex items-center gap-1 ${
            filter === 'directives'
              ? 'bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#E6EDF3] font-bold'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
          }`}
        >
          <Radio className="w-3 h-3 text-[#FF2A4D]" />
          <span>DIRECTIVES ({savedDirectives.length})</span>
        </button>

        <button
          onClick={() => {
            playTerminalClick();
            setFilter('manifestos');
          }}
          className={`px-2.5 py-1.5 rounded border whitespace-nowrap flex items-center gap-1 ${
            filter === 'manifestos'
              ? 'bg-[#00F0FF]/15 border-[#00F0FF] text-[#E6EDF3] font-bold'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
          }`}
        >
          <GitFork className="w-3 h-3 text-[#00F0FF]" />
          <span>MANIFESTOS ({savedManifestos.length})</span>
        </button>

        <button
          onClick={() => {
            playTerminalClick();
            setFilter('expeditions');
          }}
          className={`px-2.5 py-1.5 rounded border whitespace-nowrap flex items-center gap-1 ${
            filter === 'expeditions'
              ? 'bg-[#FFB300]/15 border-[#FFB300] text-[#E6EDF3] font-bold'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
          }`}
        >
          <Compass className="w-3 h-3 text-[#FFB300]" />
          <span>EXPEDITIONS ({savedExpeditions.length})</span>
        </button>

        <button
          onClick={() => {
            playTerminalClick();
            setFilter('offline_presets');
          }}
          className={`px-2.5 py-1.5 rounded border whitespace-nowrap flex items-center gap-1 ${
            filter === 'offline_presets'
              ? 'bg-purple-500/20 border-purple-400 text-[#E6EDF3] font-bold'
              : 'bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-[#E6EDF3]'
          }`}
        >
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>OFFLINE CACHE ({OFFLINE_DIRECTIVES.length})</span>
        </button>
      </div>

      {/* Lists of items */}
      <div className="flex flex-col gap-2">
        {/* Offline Presets View */}
        {filter === 'offline_presets' && (
          <div className="flex flex-col gap-2">
            <div className="bg-[#0E141B] p-2.5 rounded border border-[#1B2631] text-xs font-mono text-[#7D8B99]">
              16 curated, offline-ready directives pre-cached directly in the terminal memory. Tap "LOAD" to activate in the Transceiver view immediately.
            </div>

            {OFFLINE_DIRECTIVES.map((d) => (
              <div
                key={d.protocol_id}
                className="bg-[#0E141B] border border-[#1B2631] p-3 rounded-lg flex items-center justify-between gap-3 hover:border-[#FF2A4D]/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#FF2A4D]">
                      {d.protocol_id}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border bg-[#050709] border-[#1B2631] text-[#00F0FF]">
                      {d.intensity}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#E6EDF3] mt-0.5">{d.codename}</h4>
                  <p className="text-xs text-[#7D8B99] italic mt-0.5 line-clamp-1">
                    "{d.flavor_quote}"
                  </p>
                </div>

                <button
                  onClick={() => {
                    playTerminalClick();
                    onSelectDirective(d);
                  }}
                  className="px-3 py-1.5 rounded border bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#FF2A4D] hover:bg-[#FF2A4D] hover:text-white transition-all text-xs font-mono font-bold active:scale-95"
                >
                  LOAD
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Saved Directives */}
        {(filter === 'all' || filter === 'directives') &&
          savedDirectives.map((d) => (
            <div
              key={d.protocol_id}
              className="bg-[#0E141B] border border-[#FF2A4D]/40 p-3 rounded-lg flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Radio className="w-3.5 h-3.5 text-[#FF2A4D]" />
                  <span className="font-mono text-xs font-bold text-[#FF2A4D]">
                    {d.protocol_id}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded border bg-[#050709] border-[#1B2631] text-[#00F0FF]">
                    {d.intensity}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#E6EDF3] mt-0.5">{d.codename}</h4>
                <p className="text-xs text-[#7D8B99] line-clamp-1 mt-0.5">
                  Vocation: {d.core_vocation} • {d.classification}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    playTerminalClick();
                    onSelectDirective(d);
                  }}
                  className="p-1.5 px-2.5 rounded border bg-[#050709] border-[#1B2631] text-[#00F0FF] hover:border-[#00F0FF] transition-colors text-xs font-mono font-bold"
                  title="View Directive"
                >
                  VIEW
                </button>
                <button
                  onClick={() => {
                    playTerminalClick();
                    onDeleteDirective(d.protocol_id);
                  }}
                  className="p-1.5 rounded border bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

        {/* Saved Manifestos */}
        {(filter === 'all' || filter === 'manifestos') &&
          savedManifestos.map((m) => (
            <div
              key={m.protocol_id}
              className="bg-[#0E141B] border border-[#00F0FF]/40 p-3 rounded-lg flex items-center justify-between gap-3 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <GitFork className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span className="font-mono text-xs font-bold text-[#00F0FF]">
                    {m.protocol_id}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#E6EDF3] mt-0.5">{m.codename}</h4>
                <p className="text-xs text-[#7D8B99] line-clamp-1 mt-0.5">
                  {m.vocation} • {m.economy} • {m.mobility}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    playTerminalClick();
                    onSelectManifesto(m);
                  }}
                  className="p-1.5 px-2.5 rounded border bg-[#050709] border-[#1B2631] text-[#00F0FF] hover:border-[#00F0FF] transition-colors text-xs font-mono font-bold"
                  title="View Manifesto"
                >
                  VIEW
                </button>
                <button
                  onClick={() => {
                    playTerminalClick();
                    onDeleteManifesto(m.protocol_id);
                  }}
                  className="p-1.5 rounded border bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-red-400 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

        {/* Saved Expeditions */}
        {(filter === 'all' || filter === 'expeditions') &&
          savedExpeditions.map((e) => {
            const total = e.phases.reduce((acc, p) => acc + p.milestones.length, 0);
            const done = e.phases.reduce(
              (acc, p) => acc + p.milestones.filter((m) => m.completed).length,
              0
            );
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;

            return (
              <div
                key={e.id}
                className="bg-[#0E141B] border border-[#FFB300]/40 p-3 rounded-lg flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-[#FFB300]" />
                    <span className="font-mono text-xs font-bold text-[#FFB300]">
                      EXPEDITION TRACKER
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#050709] border border-[#1B2631] text-[#E6EDF3]">
                      {done}/{total} ({pct}%)
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#E6EDF3] mt-0.5">
                    {e.expedition_title}
                  </h4>
                  <p className="text-xs text-[#7D8B99] line-clamp-1 mt-0.5 italic">
                    "{e.tagline}"
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      playTerminalClick();
                      onSelectExpedition(e);
                    }}
                    className="p-1.5 px-2.5 rounded border bg-[#050709] border-[#1B2631] text-[#FFB300] hover:border-[#FFB300] transition-colors text-xs font-mono font-bold"
                    title="Track Expedition"
                  >
                    TRACK
                  </button>
                  <button
                    onClick={() => {
                      playTerminalClick();
                      onDeleteExpedition(e.id);
                    }}
                    className="p-1.5 rounded border bg-[#050709] border-[#1B2631] text-[#7D8B99] hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

        {/* Empty state */}
        {totalSaved === 0 && filter !== 'offline_presets' && (
          <div className="bg-[#0E141B]/60 border border-dashed border-[#1B2631] rounded-lg p-8 text-center text-[#7D8B99]">
            <p className="text-xs font-mono uppercase tracking-wider mb-1">
              // ARCHIVE EMPTY //
            </p>
            <p className="text-xs text-[#7D8B99] max-w-sm mx-auto mb-3">
              No saved protocols yet. Save generated directives from Transceiver, Weaver, or Expedition modes, or explore the pre-cached offline directives.
            </p>
            <button
              onClick={() => {
                playTerminalClick();
                setFilter('offline_presets');
              }}
              className="px-3 py-1.5 rounded border bg-[#FF2A4D]/15 border-[#FF2A4D] text-[#FF2A4D] text-xs font-mono font-bold"
            >
              BROWSE 16 OFFLINE DIRECTIVES
            </button>
          </div>
        )}
      </div>

      {/* JSON Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#0E141B] border border-[#FF2A4D] rounded-lg max-w-md w-full p-4 relative shadow-[0_0_30px_rgba(255,42,77,0.3)]">
            <h3 className="text-sm font-bold font-mono text-[#E6EDF3] uppercase mb-2 flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-[#FFB300]" />
              IMPORT ARCHIVE TELEMETRY
            </h3>
            <p className="text-xs text-[#7D8B99] mb-3 leading-relaxed">
              Paste previously exported JSON telemetry to restore your directives and active campaigns.
            </p>

            <textarea
              rows={6}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder='{"directives": [...], "manifestos": [...], "expeditions": [...]}'
              className="w-full bg-[#050709] border border-[#1B2631] text-xs font-mono text-[#E6EDF3] p-2.5 rounded focus:border-[#FF2A4D] focus:outline-none mb-3"
            />

            {importStatus && (
              <div className="text-xs font-mono text-[#00F0FF] mb-3">
                {importStatus}
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  playTerminalClick();
                  setImportModalOpen(false);
                }}
                className="px-3 py-1.5 rounded border border-[#1B2631] text-xs font-mono text-[#7D8B99]"
              >
                CANCEL
              </button>
              <button
                onClick={handleImportSubmit}
                className="px-3 py-1.5 rounded bg-[#FF2A4D] border border-[#FF2A4D] text-xs font-mono font-bold text-white"
              >
                RESTORE ARCHIVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

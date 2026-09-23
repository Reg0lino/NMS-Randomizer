import React from 'react';
import { Radio, GitFork, Compass, BookOpen } from 'lucide-react';
import { playTerminalClick } from '../utils/audio';

export type TabMode = 'transceiver' | 'weaver' | 'expedition' | 'archive';

interface BottomNavProps {
  activeTab: TabMode;
  onSelectTab: (tab: TabMode) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
}) => {
  const tabs = [
    {
      id: 'transceiver' as TabMode,
      label: 'TRANSCEIVER',
      subtext: 'Quick Mission',
      icon: Radio,
    },
    {
      id: 'weaver' as TabMode,
      label: 'WEAVER',
      subtext: 'Matrix Builder',
      icon: GitFork,
    },
    {
      id: 'expedition' as TabMode,
      label: 'EXPEDITION',
      subtext: 'Campaign',
      icon: Compass,
    },
    {
      id: 'archive' as TabMode,
      label: 'ARCHIVE',
      subtext: 'Log & Saved',
      icon: BookOpen,
      badge: savedCount > 0 ? savedCount : null,
    },
  ];

  return (
    <nav className="w-full bg-[#050709] border-t border-[#1B2631] px-2 py-1 select-none z-30 sticky bottom-0">
      <div className="grid grid-cols-4 gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                playTerminalClick();
                onSelectTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center min-h-[52px] py-1 px-1 rounded transition-all duration-200 relative group active:scale-95 ${
                isActive
                  ? 'bg-[#0E141B] text-[#FF2A4D] border-t-2 border-[#FF2A4D] shadow-[0_-4px_12px_rgba(255,42,77,0.2)]'
                  : 'text-[#7D8B99] hover:text-[#E6EDF3] hover:bg-[#0E141B]/40'
              }`}
            >
              {/* Badge if present */}
              {tab.badge !== null && (
                <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#FF2A4D] text-white text-[10px] font-mono flex items-center justify-center font-bold">
                  {tab.badge}
                </span>
              )}

              <Icon
                className={`w-5 h-5 mb-0.5 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-[#FF2A4D]' : 'group-hover:scale-105'
                }`}
              />
              <span
                className={`text-[10px] tracking-wider font-bold uppercase transition-colors ${
                  isActive ? 'text-[#E6EDF3]' : 'text-[#7D8B99]'
                }`}
              >
                {tab.label}
              </span>
              <span className="text-[8px] font-mono text-[#7D8B99] hidden xs:inline">
                {tab.subtext}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

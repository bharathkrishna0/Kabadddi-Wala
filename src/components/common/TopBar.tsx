import React from 'react';
import { MapPin, Wifi, WifiOff, Globe, Sparkles } from 'lucide-react';
import { Language, ViewPersona } from '../../types';

interface TopBarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  lastSyncedText: string;
  activePersona: ViewPersona;
  onSelectPersona: (persona: ViewPersona) => void;
  onOpenDemoMenu: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLanguage,
  onLanguageChange,
  isOffline,
  onToggleOffline,
  lastSyncedText,
  activePersona,
  onSelectPersona,
  onOpenDemoMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-b border-[#E7E5E0] px-4 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-2 max-w-lg mx-auto">
        {/* Left: Brand + Location */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2F6B4F]"></span>
            <span className="font-bold tracking-tight text-lg text-[#191919]">ReclaimX</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs text-[#6B6B6B] pl-2 border-l border-[#E7E5E0]">
            <MapPin className="w-3 h-3 text-[#2F6B4F]" />
            <span>Pune</span>
          </div>
        </div>

        {/* Right: Offline status, Language, Demo trigger */}
        <div className="flex items-center gap-2">
          {/* Connectivity indicator (clickable to toggle for demo) */}
          <button
            id="top-bar-connectivity-btn"
            type="button"
            onClick={onToggleOffline}
            title="Click to toggle Offline / Online demo simulation"
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium border transition cursor-pointer ${
              isOffline
                ? 'bg-[#FFF4DE] text-[#A66A00] border-[#E7E5E0]'
                : 'bg-[#EAF3EC] text-[#2F6B4F] border-[#E7E5E0]'
            }`}
          >
            {isOffline ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#A66A00]"></span>
                <span className="font-medium">Offline</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B4F] animate-pulse"></span>
                <span>Online</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#F4F3EF] rounded-lg p-0.5 border border-[#E7E5E0] text-xs">
            <button
              type="button"
              onClick={() => onLanguageChange('mr')}
              className={`px-1.5 py-0.5 rounded font-medium cursor-pointer transition ${
                currentLanguage === 'mr'
                  ? 'bg-white text-[#191919] shadow-2xs'
                  : 'text-[#6B6B6B] hover:text-[#191919]'
              }`}
            >
              मरा
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`px-1.5 py-0.5 rounded font-medium cursor-pointer transition ${
                currentLanguage === 'hi'
                  ? 'bg-white text-[#191919] shadow-2xs'
                  : 'text-[#6B6B6B] hover:text-[#191919]'
              }`}
            >
              हिं
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-0.5 rounded font-medium cursor-pointer transition ${
                currentLanguage === 'en'
                  ? 'bg-white text-[#191919] shadow-2xs'
                  : 'text-[#6B6B6B] hover:text-[#191919]'
              }`}
            >
              EN
            </button>
          </div>

          {/* Demo menu button */}
          <button
            id="open-demo-menu-btn"
            type="button"
            onClick={onOpenDemoMenu}
            className="flex items-center justify-center p-1.5 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#6B6B6B] hover:text-[#191919] cursor-pointer"
            title="Open Demo Workflow Controls"
          >
            <Sparkles className="w-4 h-4 text-[#2F6B4F]" />
          </button>
        </div>
      </div>
    </header>
  );
};

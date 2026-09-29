import React from 'react';
import { Home, PlusCircle, History, User } from 'lucide-react';
import { ScreenId, Language } from '../../types';
import { translations } from '../../translations';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate, lang }) => {
  const t = translations[lang];

  const isSellActive =
    currentScreen === 'camera' ||
    currentScreen === 'material_confirm' ||
    currentScreen === 'weight_entry' ||
    currentScreen === 'fair_price' ||
    currentScreen === 'recycler_compare' ||
    currentScreen === 'handover_prep' ||
    currentScreen === 'signed_qr' ||
    currentScreen === 'recycler_confirm' ||
    currentScreen === 'two_party_proof';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FBFBF9]/95 backdrop-blur-md border-t border-[#E7E5E0] px-3 py-2 max-w-lg mx-auto">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          id="nav-home-btn"
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer select-none ${
            currentScreen === 'home' ? 'text-[#2F6B4F] font-semibold' : 'text-[#6B6B6B] hover:text-[#191919]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] leading-none">{t.navHome}</span>
        </button>

        {/* Sell (Primary action, emphasized) */}
        <button
          id="nav-sell-btn"
          type="button"
          onClick={() => onNavigate('camera')}
          className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition cursor-pointer select-none ${
            isSellActive
              ? 'text-[#2F6B4F] font-bold bg-[#EAF3EC]'
              : 'text-[#191919] font-medium hover:bg-[#F4F3EF]'
          }`}
        >
          <PlusCircle className="w-5 h-5 text-[#2F6B4F]" />
          <span className="text-[11px] leading-none">{t.navSell}</span>
        </button>

        {/* History / Earnings */}
        <button
          id="nav-history-btn"
          type="button"
          onClick={() => onNavigate('earnings')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer select-none ${
            currentScreen === 'earnings' || currentScreen === 'transaction_detail'
              ? 'text-[#2F6B4F] font-semibold'
              : 'text-[#6B6B6B] hover:text-[#191919]'
          }`}
        >
          <History className="w-5 h-5" />
          <span className="text-[11px] leading-none">{t.navHistory}</span>
        </button>

        {/* Profile */}
        <button
          id="nav-profile-btn"
          type="button"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition cursor-pointer select-none ${
            currentScreen === 'profile' ? 'text-[#2F6B4F] font-semibold' : 'text-[#6B6B6B] hover:text-[#191919]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[11px] leading-none">{t.navProfile}</span>
        </button>
      </div>
    </nav>
  );
};

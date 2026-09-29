import React from 'react';
import { Shield, User, MapPin, Globe, Volume2, ShieldCheck, LogOut, Info } from 'lucide-react';
import { Language, CollectorProfile } from '../../types';
import { translations } from '../../translations';

interface ProfileScreenProps {
  profile: CollectorProfile;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onReset: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  lang,
  onLanguageChange,
  onReset,
}) => {
  const t = translations[lang];

  return (
    <div className="space-y-4 pb-20 pt-1">
      <div>
        <h1 className="text-xl font-bold text-[#191919]">{t.navProfile}</h1>
        <p className="text-xs text-[#6B6B6B]">Minimal privacy-preserving collector identity</p>
      </div>

      {/* Collector ID Card */}
      <div className="bg-white border-2 border-[#E7E5E0] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#EAF3EC] text-[#2F6B4F] flex items-center justify-center font-bold text-lg">
            RX
          </div>
          <div>
            <div className="text-xs text-[#6B6B6B]">{t.collectorId}</div>
            <div className="text-xl font-mono font-extrabold text-[#191919]">{profile.id}</div>
            <div className="text-xs text-[#2F6B4F] font-medium">Anonymous Authorized Collector</div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E7E5E0] grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-[#F4F3EF] rounded-lg">
            <span className="text-[10px] text-[#6B6B6B] block">Operating District</span>
            <span className="font-semibold text-[#191919]">{profile.area}</span>
          </div>

          <div className="p-2 bg-[#F4F3EF] rounded-lg">
            <span className="text-[10px] text-[#6B6B6B] block">Voice Audio</span>
            <span className="font-semibold text-[#2F6B4F]">Enabled (Speech TTS)</span>
          </div>
        </div>
      </div>

      {/* Language Switch */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-4 shadow-xs space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#2F6B4F]" />
          <span>App Interface Language</span>
        </label>
        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => onLanguageChange('mr')}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold cursor-pointer ${
              lang === 'mr' ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]' : 'border-[#E7E5E0] bg-white text-[#191919]'
            }`}
          >
            मराठी
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('hi')}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold cursor-pointer ${
              lang === 'hi' ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]' : 'border-[#E7E5E0] bg-white text-[#191919]'
            }`}
          >
            हिन्दी
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange('en')}
            className={`py-2 px-2 rounded-xl border text-xs font-semibold cursor-pointer ${
              lang === 'en' ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]' : 'border-[#E7E5E0] bg-white text-[#191919]'
            }`}
          >
            English
          </button>
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="bg-[#EAF3EC] border border-[#2F6B4F]/20 rounded-2xl p-4 space-y-1.5 text-xs text-[#2F6B4F]">
        <div className="font-bold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy-by-Design Architecture</span>
        </div>
        <p className="text-[11px] text-[#2F6B4F]/90">
          ReclaimX operates strictly without government identity numbers (No Aadhaar) or residential addresses. Your cryptographic keys remain locked in your phone hardware.
        </p>
      </div>

      {/* About ReclaimX */}
      <div className="bg-[#F4F3EF] border border-[#E7E5E0] rounded-2xl p-4 space-y-1 text-xs">
        <div className="font-bold text-[#191919]">ReclaimX — Kabadiwala Connect Trust Layer</div>
        <p className="text-[11px] text-[#6B6B6B] italic">
          "Know the value. Choose the right recycler. Prove the handover. Turning every informal e-waste transaction into a safer, smarter and traceable path into the formal recycling chain."
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-2.5 px-4 rounded-xl border border-[#B24A3A]/30 bg-white hover:bg-[#FBECE8] text-[#B24A3A] font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out / Reset Demo Profile</span>
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, MapPin, User, ShieldCheck, Check } from 'lucide-react';
import { Language, CollectorProfile } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface QuickSetupScreenProps {
  profile: CollectorProfile;
  onUpdateProfile: (profile: Partial<CollectorProfile>) => void;
  onComplete: () => void;
  lang: Language;
}

export const QuickSetupScreen: React.FC<QuickSetupScreenProps> = ({
  profile,
  onUpdateProfile,
  onComplete,
  lang,
}) => {
  const t = translations[lang];
  const [selectedArea, setSelectedArea] = useState(profile.area || 'Pune');

  const areas = ['Pune (Hadapsar)', 'Pune (Kothrud)', 'Pune (Bhosari)', 'Pune (Pimpri-Chinchwad)'];

  const speechText =
    lang === 'mr'
      ? 'रिक्लेम-एक्स खाते तयार करा. तुमचा परिसर निवडा. आधार किंवा पत्ता देण्याची अजिबात गरज नाही.'
      : lang === 'hi'
      ? 'रिक्लेम-एक्स सेट करें। अपना क्षेत्र चुनें। आधार कार्ड या पते की कोई आवश्यकता नहीं है।'
      : 'Quick setup. Select your operating district. No Aadhaar or personal address required.';

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-140px)] py-4 px-2">
      <div className="space-y-5">
        <div className="pt-2">
          <span className="text-xs font-semibold text-[#2F6B4F] uppercase tracking-wider">Step 2 of 2</span>
          <h1 className="text-2xl font-bold text-[#191919] mt-1">{t.setupTitle}</h1>
          <p className="text-xs text-[#6B6B6B] mt-0.5">{t.privacyNote}</p>
        </div>

        {/* Operating Area Selector */}
        <div className="bg-white border border-[#E7E5E0] rounded-2xl p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#2F6B4F]" />
              <span>{t.workArea}</span>
            </label>
            <span className="text-[11px] text-[#2F6B4F] font-medium bg-[#EAF3EC] px-2 py-0.5 rounded-full">
              Maharashtra
            </span>
          </div>

          <div className="space-y-2">
            {areas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => {
                  setSelectedArea(area);
                  onUpdateProfile({ area });
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition cursor-pointer ${
                  selectedArea === area
                    ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F] font-semibold'
                    : 'border-[#E7E5E0] hover:bg-[#F4F3EF] text-[#191919]'
                }`}
              >
                <span>{area}</span>
                {selectedArea === area && <Check className="w-4 h-4 text-[#2F6B4F]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Minimal Profile Card */}
        <div className="bg-[#F4F3EF] border border-[#E7E5E0] rounded-2xl p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#191919]">
            <User className="w-4 h-4 text-[#2F6B4F]" />
            <span>Anonymous Collector Profile</span>
          </div>
          <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-[#E7E5E0] text-xs">
            <span className="text-[#6B6B6B]">{t.collectorId}:</span>
            <span className="font-mono font-bold text-[#191919]">{profile.id}</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-[#2F6B4F] pt-1">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{t.noAadhaar} • {t.noAddress}</span>
          </div>
        </div>

        {/* Audio helper */}
        <div className="flex justify-center">
          <AudioButton
            textToSpeak={speechText}
            lang={lang}
            label={t.hearScreen}
            size="sm"
          />
        </div>
      </div>

      <div className="pt-6">
        <button
          id="setup-start-btn"
          type="button"
          onClick={onComplete}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>{t.startUsing}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Cpu, Cable, BatteryCharging, Cog, Monitor, Tv, Layers, Check } from 'lucide-react';
import { Language, MaterialInfo } from '../../types';
import { translations } from '../../translations';
import { MATERIALS } from '../../mockData';
import { AudioButton } from '../common/AudioButton';

interface MaterialConfirmScreenProps {
  selectedMaterial: MaterialInfo;
  onSelectMaterial: (mat: MaterialInfo) => void;
  onContinue: () => void;
  onBack: () => void;
  lang: Language;
}

export const MaterialConfirmScreen: React.FC<MaterialConfirmScreenProps> = ({
  selectedMaterial,
  onSelectMaterial,
  onContinue,
  onBack,
  lang,
}) => {
  const t = translations[lang];

  const getIcon = (pictogram: string) => {
    switch (pictogram) {
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'cable': return <Cable className="w-5 h-5" />;
      case 'battery-charging': return <BatteryCharging className="w-5 h-5" />;
      case 'cog': return <Cog className="w-5 h-5" />;
      case 'monitor': return <Monitor className="w-5 h-5" />;
      case 'tv': return <Tv className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const materialsSpeech =
    lang === 'mr'
      ? 'साहित्य पर्याय: सर्किट बोर्ड, तांब्याच्या केबल्स, बॅटऱ्या, मोटार चुंबक, एलसीडी स्क्रीन, जुने टीव्ही ट्युब, किंवा प्लास्टिक. तुम्ही गोळा केलेले साहित्य निवडा.'
      : lang === 'hi'
      ? 'सामग्री विकल्प: सर्किट बोर्ड, केबल और तांबे के तार, बैटरी, मोटर्स और चुंबक, एलसीडी स्क्रीन, सीआरटी पिक्चर ट्यूब, या प्लास्टिक।'
      : 'Material options: Circuit Boards, Cables, Batteries, Motors and Magnets, LCD panels, or CRTs. Select what you collected.';

  return (
    <div className="space-y-4 pb-20 pt-1">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6B6B] hover:text-[#191919] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs font-mono font-semibold text-[#2F6B4F] bg-[#EAF3EC] px-2.5 py-0.5 rounded-full">
          Step 2: Material
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#191919]">{t.whatDidYouCollect}</h1>
          <p className="text-xs text-[#6B6B6B]">Select the primary category in this lot</p>
        </div>
        <AudioButton
          textToSpeak={materialsSpeech}
          lang={lang}
          label={t.notSureHear}
          size="sm"
        />
      </div>

      {/* Suggested Primary Pick */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-[#2F6B4F] uppercase tracking-wider block">
          AI Suggestion (91% Match)
        </span>
        {MATERIALS.filter(m => m.id === 'mat_pcb').map((mat) => (
          <div
            key={mat.id}
            onClick={() => onSelectMaterial(mat)}
            className={`p-4 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
              selectedMaterial.id === mat.id
                ? 'border-[#2F6B4F] bg-[#EAF3EC]/50 shadow-xs'
                : 'border-[#E7E5E0] bg-white hover:bg-[#F4F3EF]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2F6B4F] text-white flex items-center justify-center">
                {getIcon(mat.pictogram)}
              </div>
              <div>
                <div className="text-sm font-bold text-[#191919]">
                  {lang === 'mr' ? mat.nameMr : lang === 'hi' ? mat.nameHi : mat.name}
                </div>
                <div className="text-xs text-[#6B6B6B]">
                  Avg ₹{mat.currentAvg}/kg · Range ₹{mat.basePriceMin}–₹{mat.basePriceMax}
                </div>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-[#2F6B4F] flex items-center justify-center bg-[#2F6B4F] text-white">
              <Check className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Other Materials Grid */}
      <div className="space-y-2 pt-2">
        <span className="text-[11px] font-semibold text-[#6B6B6B] uppercase tracking-wider block">
          {t.otherMaterials}
        </span>
        <div className="grid grid-cols-1 gap-2">
          {MATERIALS.filter(m => m.id !== 'mat_pcb').map((mat) => {
            const isSelected = selectedMaterial.id === mat.id;
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => onSelectMaterial(mat)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                  isSelected
                    ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F] font-bold'
                    : 'border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#2F6B4F] text-white' : 'bg-[#F4F3EF] text-[#2F6B4F]'}`}>
                    {getIcon(mat.pictogram)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold">
                      {lang === 'mr' ? mat.nameMr : lang === 'hi' ? mat.nameHi : mat.name}
                    </div>
                    <div className="text-[10px] text-[#6B6B6B]">
                      Typical: ₹{mat.basePriceMin} – ₹{mat.basePriceMax}/kg
                    </div>
                  </div>
                </div>
                {isSelected ? (
                  <Check className="w-4 h-4 text-[#2F6B4F]" />
                ) : (
                  <span className="text-xs text-[#6B6B6B]">Select</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue */}
      <div className="pt-4">
        <button
          id="material-continue-btn"
          type="button"
          onClick={onContinue}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

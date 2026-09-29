import React, { useState } from 'react';
import { ArrowLeft, ShieldAlert, AlertTriangle, CheckCircle2, Cpu, BatteryCharging, Tv, Cable } from 'lucide-react';
import { Language, MaterialInfo } from '../../types';
import { translations } from '../../translations';
import { MATERIALS } from '../../mockData';
import { AudioButton } from '../common/AudioButton';

interface SafetyScreenProps {
  onBack: () => void;
  lang: Language;
}

export const SafetyScreen: React.FC<SafetyScreenProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<'mat_pcb' | 'mat_batteries' | 'mat_crt'>('mat_pcb');

  const pcb = MATERIALS.find(m => m.id === 'mat_pcb')!;
  const battery = MATERIALS.find(m => m.id === 'mat_batteries')!;
  const crt = MATERIALS.find(m => m.id === 'mat_crt')!;

  const activeMat = activeTab === 'mat_pcb' ? pcb : activeTab === 'mat_batteries' ? battery : crt;

  const speechText =
    lang === 'mr'
      ? `${activeMat.nameMr} सुरक्षा नियम: ${activeMat.safetyShortMr}. ${activeMat.safetyGuidelinesMr.join('. ')}.`
      : lang === 'hi'
      ? `${activeMat.nameHi} सुरक्षा नियम: ${activeMat.safetyShortHi}. ${activeMat.safetyGuidelinesHi.join('. ')}.`
      : `Safety guidelines for ${activeMat.name}: ${activeMat.safetyShort} ${activeMat.safetyGuidelines.join('. ')}`;

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
        <span className="text-xs font-mono font-semibold text-[#A66A00] bg-[#FFF4DE] px-2.5 py-0.5 rounded-full">
          Harm Reduction
        </span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#191919]">{t.safety} Guidance</h1>
          <p className="text-xs text-[#6B6B6B]">Safe handling for informal waste collectors</p>
        </div>
        <AudioButton
          textToSpeak={speechText}
          lang={lang}
          label="🔊 Hear guidance"
          size="sm"
        />
      </div>

      {/* Material Category Tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('mat_pcb')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition ${
            activeTab === 'mat_pcb'
              ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]'
              : 'border-[#E7E5E0] bg-white text-[#191919] hover:bg-[#F4F3EF]'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>Circuit Boards</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mat_batteries')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition ${
            activeTab === 'mat_batteries'
              ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]'
              : 'border-[#E7E5E0] bg-white text-[#191919] hover:bg-[#F4F3EF]'
          }`}
        >
          <BatteryCharging className="w-4 h-4" />
          <span>Batteries</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('mat_crt')}
          className={`flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 cursor-pointer transition ${
            activeTab === 'mat_crt'
              ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]'
              : 'border-[#E7E5E0] bg-white text-[#191919] hover:bg-[#F4F3EF]'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>CRT Tubes</span>
        </button>
      </div>

      {/* Main Safety Card */}
      <div className="bg-white border-2 border-[#E7E5E0] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#A66A00] bg-[#FFF4DE] p-3 rounded-xl">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">
            {lang === 'mr' ? activeMat.safetyShortMr : lang === 'hi' ? activeMat.safetyShortHi : activeMat.safetyShort}
          </span>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block mb-2">
            Essential Precautions:
          </span>
          <div className="space-y-2">
            {(lang === 'mr'
              ? activeMat.safetyGuidelinesMr
              : lang === 'hi'
              ? activeMat.safetyGuidelinesHi
              : activeMat.safetyGuidelines
            ).map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-[#191919] bg-[#FBFBF9] p-2.5 rounded-xl border border-[#E7E5E0]">
                <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0 mt-0.5" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Equipment */}
        <div className="pt-2 border-t border-[#E7E5E0] text-xs text-[#6B6B6B] space-y-1">
          <span className="font-semibold text-[#191919]">Required Gear:</span>
          <div className="flex gap-2 text-[11px] pt-1">
            <span className="bg-[#F4F3EF] px-2.5 py-1 rounded-full text-[#191919]">🧤 Heavy Leather Gloves</span>
            <span className="bg-[#F4F3EF] px-2.5 py-1 rounded-full text-[#191919]">🥽 Impact Safety Glasses</span>
            <span className="bg-[#F4F3EF] px-2.5 py-1 rounded-full text-[#191919]">👟 Closed Shoes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

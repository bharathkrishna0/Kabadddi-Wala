import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Minus, Plus, Scale, AlertCircle, Edit3 } from 'lucide-react';
import { Language, MaterialInfo } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface WeightEntryScreenProps {
  material: MaterialInfo;
  weightKg: number;
  onChangeWeight: (weight: number) => void;
  onContinue: () => void;
  onBack: () => void;
  lang: Language;
}

export const WeightEntryScreen: React.FC<WeightEntryScreenProps> = ({
  material,
  weightKg,
  onChangeWeight,
  onContinue,
  onBack,
  lang,
}) => {
  const t = translations[lang];
  const [isDirectInputOpen, setIsDirectInputOpen] = useState(false);
  const [typedInput, setTypedInput] = useState(weightKg.toString());

  const handleStep = (delta: number) => {
    const next = Math.max(0.2, Math.round((weightKg + delta) * 10) / 10);
    onChangeWeight(next);
    setTypedInput(next.toString());
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChangeWeight(val);
    setTypedInput(val.toString());
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(typedInput);
    if (!isNaN(parsed) && parsed > 0) {
      onChangeWeight(Math.round(parsed * 10) / 10);
      setIsDirectInputOpen(false);
    }
  };

  const isHighWeight = weightKg > 80;

  const audioSpeechText =
    lang === 'mr'
      ? `वजन: ${weightKg} दशांश किलो. ${material.nameMr}. काट्यावरील वजन अचूक असल्याची खात्री करा.`
      : lang === 'hi'
      ? `वजन: ${weightKg} किलोग्राम। ${material.nameHi}। कांटे पर सही तौल दर्ज करें।`
      : `Verified weight: ${weightKg} kilograms for ${material.name}.`;

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
          Step 3: Weight
        </span>
      </div>

      <div className="text-center pt-2 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4F3EF] text-[#191919] text-xs font-medium">
          <Scale className="w-3.5 h-3.5 text-[#2F6B4F]" />
          <span>{lang === 'mr' ? material.nameMr : lang === 'hi' ? material.nameHi : material.name}</span>
        </div>
        <h1 className="text-xl font-bold text-[#191919]">{t.enterVerifiedWeight}</h1>
        <p className="text-xs text-[#6B6B6B]">Read directly from your certified mechanical or digital scale</p>
      </div>

      {/* Main Big Weight Display */}
      <div className="bg-white border-2 border-[#E7E5E0] rounded-2xl p-6 text-center shadow-xs">
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-5xl font-extrabold tracking-tight text-[#191919] font-mono">
            {weightKg.toFixed(1)}
          </span>
          <span className="text-xl font-bold text-[#6B6B6B]">kg</span>
        </div>

        {/* Stepper buttons & Slider */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            id="weight-minus-btn"
            type="button"
            onClick={() => handleStep(-0.2)}
            className="w-12 h-12 rounded-xl bg-[#F4F3EF] hover:bg-[#E7E5E0] border border-[#E7E5E0] flex items-center justify-center text-[#191919] cursor-pointer transition active:scale-95"
            aria-label="Decrease weight"
          >
            <Minus className="w-5 h-5" />
          </button>

          {/* Range Slider */}
          <div className="flex-1 max-w-xs px-2">
            <input
              id="weight-slider"
              type="range"
              min="0.5"
              max="50"
              step="0.1"
              value={weightKg}
              onChange={handleSliderChange}
              className="w-full h-2 bg-[#E7E5E0] rounded-lg appearance-none cursor-pointer accent-[#2F6B4F]"
            />
            <div className="flex justify-between text-[10px] text-[#6B6B6B] mt-1 font-mono">
              <span>0.5 kg</span>
              <span>25 kg</span>
              <span>50 kg</span>
            </div>
          </div>

          <button
            id="weight-plus-btn"
            type="button"
            onClick={() => handleStep(0.2)}
            className="w-12 h-12 rounded-xl bg-[#F4F3EF] hover:bg-[#E7E5E0] border border-[#E7E5E0] flex items-center justify-center text-[#191919] cursor-pointer transition active:scale-95"
            aria-label="Increase weight"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Manual Type Weight trigger */}
        <div className="mt-4 pt-3 border-t border-[#E7E5E0] flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setIsDirectInputOpen(!isDirectInputOpen)}
            className="inline-flex items-center gap-1.5 text-[#2F6B4F] font-semibold hover:underline cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Type exact weight keypad</span>
          </button>

          <AudioButton
            textToSpeak={audioSpeechText}
            lang={lang}
            label={`🔊 ${weightKg.toFixed(1)} kg`}
            size="sm"
          />
        </div>

        {isDirectInputOpen && (
          <form onSubmit={handleDirectSubmit} className="mt-3 p-3 bg-[#F4F3EF] rounded-xl flex gap-2">
            <input
              type="number"
              step="0.1"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-white rounded-lg border border-[#E7E5E0] text-sm font-mono"
              placeholder="e.g. 18.4"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#2F6B4F] text-white rounded-lg text-xs font-semibold cursor-pointer"
            >
              Set
            </button>
          </form>
        )}
      </div>

      {/* Category Plausibility Check Alert */}
      {isHighWeight && (
        <div className="bg-[#FFF4DE] border border-[#A66A00]/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#A66A00]">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block">Please check the scale reading</span>
            <span>
              {weightKg} kg is much higher than the usual informal collection range for {material.name} ({material.typicalWeightRange}).
            </span>
          </div>
        </div>
      )}

      {/* Typical weight reference */}
      <div className="p-3 bg-[#F4F3EF] rounded-xl border border-[#E7E5E0] text-xs text-[#6B6B6B] flex items-center justify-between">
        <span>Typical collection range:</span>
        <span className="font-medium text-[#191919]">{material.typicalWeightRange}</span>
      </div>

      {/* Continue button */}
      <div className="pt-2">
        <button
          id="weight-continue-btn"
          type="button"
          onClick={onContinue}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>Calculate Fair Price</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

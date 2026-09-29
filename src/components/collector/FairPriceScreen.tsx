import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Info, CheckCircle2, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { Language, MaterialInfo } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface FairPriceScreenProps {
  material: MaterialInfo;
  weightKg: number;
  onContinue: () => void;
  onBack: () => void;
  lang: Language;
}

export const FairPriceScreen: React.FC<FairPriceScreenProps> = ({
  material,
  weightKg,
  onContinue,
  onBack,
  lang,
}) => {
  const t = translations[lang];
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Dynamic fair value calculations
  const minRate = material.basePriceMin;
  const maxRate = material.basePriceMax;
  const avgRate = material.currentAvg;

  const totalMin = Math.round(minRate * weightKg);
  const totalMax = Math.round(maxRate * weightKg);
  const totalEstimated = Math.round(avgRate * weightKg);

  // Percent position along horizontal range bar
  const rangePercent = Math.min(100, Math.max(0, ((avgRate - minRate) / (maxRate - minRate)) * 100));

  const speechText =
    lang === 'mr'
      ? `तुमचा योग्य भाव अंदाज. पीसीबी १८ दशांश ४ किलोसाठी अंदाजित एकूण रक्कम ३,१४६ रुपये. स्थानिक दर १५० ते १९० रुपये प्रति किलो दरम्यान आहे. २८ स्थानिक व्यवहारांवर आधारित.`
      : lang === 'hi'
      ? `आपका उचित मूल्य अनुमान। 18.4 किग्रा पीसीबी के लिए अनुमानित मूल्य ₹3,146। स्थानीय दर ₹150 से ₹190 प्रति किग्रा है। 28 स्थानीय लेन-देन पर आधारित।`
      : `Your fair-price estimate: ₹${totalEstimated.toLocaleString('en-IN')} for ${weightKg} kg of ${material.name}. Local range is ₹${minRate} to ₹${maxRate} per kg, based on 28 recent transactions.`;

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
          Step 4: Fair Price
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-[#191919]">{t.fairPriceEstimateTitle}</h1>
        <p className="text-xs text-[#6B6B6B]">
          {lang === 'mr' ? material.nameMr : lang === 'hi' ? material.nameHi : material.name} ·{' '}
          <span className="font-semibold text-[#191919]">{weightKg} kg</span>
        </p>
      </div>

      {/* Main Fair-Price Range Card (Hero Visualization) */}
      <div className="bg-white border-2 border-[#2F6B4F] rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            {t.estimatedLotValue}
          </span>
          <div className="text-4xl font-extrabold tracking-tight text-[#191919] mt-1">
            ₹ {totalEstimated.toLocaleString('en-IN')}
          </div>
          <div className="text-xs font-medium text-[#2F6B4F] mt-0.5">
            Fair Range: ₹{totalMin.toLocaleString('en-IN')} – ₹{totalMax.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Horizontal Range Visualization */}
        <div className="pt-2">
          <div className="flex justify-between text-[11px] font-semibold text-[#6B6B6B] mb-2">
            <span>{t.lowRange} (₹{minRate}/kg)</span>
            <span className="text-[#2F6B4F]">{t.localRange}</span>
            <span>{t.highRange} (₹{maxRate}/kg)</span>
          </div>

          <div className="relative w-full h-3 bg-[#E7E5E0] rounded-full">
            {/* Highlighted middle corridor */}
            <div className="absolute left-[15%] right-[15%] top-0 bottom-0 bg-[#EAF3EC] rounded-full"></div>
            
            {/* Value marker pin */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${rangePercent}%` }}
            >
              <div className="w-5 h-5 rounded-full bg-[#2F6B4F] border-2 border-white shadow-xs"></div>
            </div>
          </div>

          <div className="flex justify-center mt-2">
            <span className="text-xs font-bold text-[#2F6B4F] bg-[#EAF3EC] px-2.5 py-0.5 rounded-full border border-[#2F6B4F]/20">
              Median: ₹{avgRate}/kg
            </span>
          </div>
        </div>

        {/* Audio helper */}
        <div className="pt-2 border-t border-[#E7E5E0] flex justify-center">
          <AudioButton
            textToSpeak={speechText}
            lang={lang}
            label={t.hearPrice}
            size="md"
            variant="solid"
          />
        </div>
      </div>

      {/* Evidence Card */}
      <div className="bg-[#F4F3EF] border border-[#E7E5E0] rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-[#191919] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2F6B4F]" />
            <span>{t.whyThisEstimate}</span>
          </div>
          <span className="text-[10px] text-[#6B6B6B]">Updated 10:42 AM</span>
        </div>

        <ul className="text-xs text-[#6B6B6B] space-y-1.5 pl-4 list-disc">
          <li><strong>28 recent local transactions</strong> verified across Pune district</li>
          <li>Identified as <strong>{material.name}</strong> with green PCB substrate</li>
          <li>Adjusted for current weight scale calibration (<strong>{weightKg} kg</strong>)</li>
          <li>No middleman commission subtracted</li>
        </ul>
      </div>

      {/* Expandable Explainability */}
      <div className="bg-white border border-[#E7E5E0] rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full p-3 flex items-center justify-between text-xs font-semibold text-[#191919] hover:bg-[#F4F3EF] cursor-pointer"
        >
          <span>{t.howCalculated}</span>
          {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showBreakdown && (
          <div className="p-3.5 pt-0 border-t border-[#E7E5E0] text-xs text-[#6B6B6B] space-y-2 bg-[#FBFBF9]">
            <div className="flex justify-between py-1 border-b border-[#E7E5E0]">
              <span>Base Material:</span>
              <span className="font-mono text-[#191919]">{material.code} ({material.name})</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E7E5E0]">
              <span>District:</span>
              <span className="font-mono text-[#191919]">Pune Hub (Hadapsar/Bhosari)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E7E5E0]">
              <span>Interquartile Rate Window:</span>
              <span className="font-mono text-[#191919]">₹{minRate} – ₹{maxRate} / kg</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Formula:</span>
              <span className="font-mono text-[#2F6B4F] font-bold">weight × median = ₹{totalEstimated}</span>
            </div>
          </div>
        )}
      </div>

      {/* Continue to compare recyclers */}
      <div className="pt-2">
        <button
          id="fair-price-continue-btn"
          type="button"
          onClick={onContinue}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>Compare Authorised Recyclers</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

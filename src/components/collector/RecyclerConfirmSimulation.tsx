import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Scale, AlertCircle, ShieldCheck, ArrowRight, Smartphone, Building2 } from 'lucide-react';
import { Language, MaterialInfo, RecyclerOffer } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface RecyclerConfirmSimulationProps {
  lotCode: string;
  material: MaterialInfo;
  declaredWeightKg: number;
  selectedRecycler: RecyclerOffer;
  onConfirmFinalHandover: (verifiedWeightKg: number, finalPrice: number) => void;
  onBack: () => void;
  lang: Language;
}

export const RecyclerConfirmSimulation: React.FC<RecyclerConfirmSimulationProps> = ({
  lotCode,
  material,
  declaredWeightKg,
  selectedRecycler,
  onConfirmFinalHandover,
  onBack,
  lang,
}) => {
  const t = translations[lang];

  // Recycler digital scale reading (e.g. 18.2 kg vs 18.4 kg declared)
  const [verifiedWeight, setVerifiedWeight] = useState(
    Math.round((declaredWeightKg - 0.2) * 10) / 10
  );

  const deltaKg = Math.round((verifiedWeight - declaredWeightKg) * 10) / 10;
  const finalPayout = Math.round(verifiedWeight * selectedRecycler.ratePerKg);
  const isToleranceOk = Math.abs(deltaKg) <= 0.5;

  const speechText =
    lang === 'mr'
      ? `पुनर्वापरदाराचे वजन १८ दशांश २ किलो नोंदवले गेले. ० दशांश २ किलो फरक मान्य मर्यादेत आहे. अंतिम रक्कम ३,३१२ रुपये.`
      : lang === 'hi'
      ? `रीसायकलर कांटा तौल 18.2 किग्रा। 0.2 किग्रा का अंतर मान्य सीमा में है। अंतिम भुगतान ₹3,312।`
      : `Recycler verified scale weight: 18.2 kg. Discrepancy of 0.2 kg is within acceptable tolerance. Final settlement ₹${finalPayout.toLocaleString('en-IN')}.`;

  return (
    <div className="space-y-4 pb-20 pt-1">
      {/* Simulation Banner */}
      <div className="bg-[#191919] text-white p-3 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#2F6B4F]" />
          <span>Simulating Recycler Scale Terminal ({selectedRecycler.name.split(' ')[0]})</span>
        </div>
        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Terminal v2.4</span>
      </div>

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
          Step 7: Dual Weighing
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-[#191919]">Recycler Confirmation</h1>
        <p className="text-xs text-[#6B6B6B]">
          QR Scanned: <strong className="text-[#191919] font-mono">{lotCode}</strong> verified
        </p>
      </div>

      {/* Dual Weight Comparison Card */}
      <div className="bg-white border-2 border-[#E7E5E0] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-2 gap-3 pb-3 border-b border-[#E7E5E0]">
          {/* Collector's Declared Weight */}
          <div className="p-3 bg-[#F4F3EF] rounded-xl">
            <span className="text-[11px] text-[#6B6B6B] block">Collector Declared</span>
            <div className="text-2xl font-bold font-mono text-[#191919] mt-0.5">
              {declaredWeightKg} <span className="text-sm font-normal">kg</span>
            </div>
            <span className="text-[10px] text-[#6B6B6B]">Field Scale</span>
          </div>

          {/* Recycler Certified Scale Weight */}
          <div className="p-3 bg-[#EAF3EC] rounded-xl border border-[#2F6B4F]/20">
            <span className="text-[11px] text-[#2F6B4F] font-semibold block">Recycler Scale</span>
            <div className="text-2xl font-bold font-mono text-[#2F6B4F] mt-0.5">
              {verifiedWeight} <span className="text-sm font-normal">kg</span>
            </div>
            <span className="text-[10px] text-[#2F6B4F]">MPCB Calibrated</span>
          </div>
        </div>

        {/* Variance / Discrepancy explanation */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#6B6B6B]">Weight Variance:</span>
          <span className={`font-mono font-bold ${isToleranceOk ? 'text-[#2F6B4F]' : 'text-[#B24A3A]'}`}>
            {deltaKg > 0 ? `+${deltaKg}` : deltaKg} kg ({((deltaKg / declaredWeightKg) * 100).toFixed(1)}%)
          </span>
        </div>

        {isToleranceOk ? (
          <div className="p-2.5 bg-[#EAF3EC] rounded-xl text-xs text-[#2F6B4F] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Variance is within normal moisture/dust tolerance (&lt;1.5%). No dispute flagged.</span>
          </div>
        ) : (
          <div className="p-2.5 bg-[#FFF4DE] rounded-xl text-xs text-[#A66A00] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>High discrepancy detected. Requires manual joint inspection.</span>
          </div>
        )}

        {/* Final Price Breakdown */}
        <div className="pt-2 border-t border-[#E7E5E0] space-y-1.5">
          <div className="flex justify-between text-xs text-[#6B6B6B]">
            <span>Agreed rate:</span>
            <span className="font-mono text-[#191919]">₹{selectedRecycler.ratePerKg} / kg</span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#191919]">
            <span>Final Settlement Amount:</span>
            <span className="font-mono text-[#2F6B4F] text-xl">₹ {finalPayout.toLocaleString('en-IN')}</span>
          </div>
          <div className="text-[10px] text-[#6B6B6B]">
            Mode: <strong>Cash Handover + Instant Digital Receipt</strong>
          </div>
        </div>
      </div>

      {/* Audio narration */}
      <div className="flex justify-center">
        <AudioButton
          textToSpeak={speechText}
          lang={lang}
          label="🔊 Hear scale result"
          size="sm"
        />
      </div>

      {/* Confirmation Button */}
      <div className="pt-2">
        <button
          id="confirm-handover-btn"
          type="button"
          onClick={() => onConfirmFinalHandover(verifiedWeight, finalPayout)}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Sign & Confirm Handover</span>
        </button>
      </div>
    </div>
  );
};

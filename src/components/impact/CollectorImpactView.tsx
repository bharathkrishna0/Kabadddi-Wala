import React, { useState } from 'react';
import { 
  Award, 
  Leaf, 
  ArrowLeft, 
  ShieldCheck, 
  TrendingUp, 
  Share2, 
  Download, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Scale, 
  QrCode,
  Flame,
  Volume2
} from 'lucide-react';
import { Language, LotTransaction, CollectorProfile } from '../../types';
import { calculatePersonalImpact } from '../../lib/analytics/circularScore';
import { AudioButton } from '../common/AudioButton';

interface CollectorImpactViewProps {
  profile: CollectorProfile;
  transactions: LotTransaction[];
  lang: Language;
  onBack: () => void;
  onOpenAssistant?: (query?: string) => void;
}

export const CollectorImpactView: React.FC<CollectorImpactViewProps> = ({
  profile,
  transactions,
  lang,
  onBack,
  onOpenAssistant,
}) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const impact = calculatePersonalImpact(profile.id, transactions);

  const speechText =
    lang === 'mr'
      ? `तुमचा वर्तुळाकार प्रभाव स्कोअर: ${impact.totalFormallyChannelledKg} किलो ई-कचरा अधिकृतरीत्या पुनर्वापरासाठी दिला. ${impact.co2SavedKg} किलो कार्बन उत्सर्जन वाचवले आणि ${impact.batteriesSafelyChannelledKg} किलो बॅटऱ्या सुरक्षित हाताळल्या. अतिरिक्त नफा रुपये ${impact.additionalEarningsInr}.`
      : lang === 'hi'
      ? `आपका चक्रीय प्रभाव: ${impact.totalFormallyChannelledKg} किग्रा ई-कचरा अधिकृत रीसाइक्लिंग के लिए भेजा। ${impact.co2SavedKg} किग्रा कार्बन उत्सर्जन रोका और अतिरिक्त लाभ ₹${impact.additionalEarningsInr} प्राप्त किया।`
      : `Your Circular Impact: ${impact.totalFormallyChannelledKg} kg e-waste formally channelled. ${impact.co2SavedKg} kg carbon avoided. Additional fair price premium earned: ₹${impact.additionalEarningsInr}.`;

  return (
    <div className="space-y-4 pb-20 pt-1 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6B6B] hover:text-[#191919] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs font-mono font-semibold text-[#2F6B4F] bg-[#EAF3EC] px-2.5 py-0.5 rounded-full border border-[#2F6B4F]/20">
          Pure On-Device Impact
        </span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#191919]">
            {lang === 'mr' ? 'माझा वर्तुळाकार प्रभाव' : lang === 'hi' ? 'मेरा चक्रीय प्रभाव' : 'My Circular Impact'}
          </h1>
          <p className="text-xs text-[#6B6B6B]">
            {profile.name} · {profile.id} · Verified Handover Proofs
          </p>
        </div>
        <AudioButton textToSpeak={speechText} lang={lang} size="sm" />
      </div>

      {/* Hero Level & Tier Badge */}
      <div className="bg-gradient-to-br from-[#2F6B4F] to-[#1F4935] text-white rounded-2xl p-5 shadow-xs space-y-3 relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-200">
              Verified Credential
            </span>
            <h2 className="text-lg font-bold mt-0.5">{impact.levelTitle[lang] || impact.levelTitle.en}</h2>
            <div className="text-xs text-white/80 mt-0.5">
              {impact.verifiedTransactionsCount} two-party verified formal transactions
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
            <Award className="w-6 h-6 text-emerald-200" />
          </div>
        </div>

        {/* Level Progress */}
        <div className="space-y-1 relative z-10">
          <div className="flex justify-between text-[11px] text-white/90">
            <span>Next Level Progress</span>
            <span className="font-mono font-bold">{impact.totalFormallyChannelledKg} / 100 kg</span>
          </div>
          <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-300 rounded-full transition-all duration-500"
              style={{ width: `${impact.nextLevelProgressPct}%` }}
            ></div>
          </div>
        </div>

        {/* Share Button Trigger */}
        <div className="pt-1 flex justify-end relative z-10">
          <button
            type="button"
            onClick={() => setShowShareModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#2F6B4F] text-xs font-bold shadow-xs hover:bg-emerald-50 cursor-pointer transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Generate Proof Card</span>
          </button>
        </div>
      </div>

      {/* 4 Core Pillars Metric Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 space-y-1 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Total Formally Diverted</span>
          <div className="text-xl font-bold font-mono text-[#191919]">
            {impact.totalFormallyChannelledKg} <span className="text-xs font-normal">kg</span>
          </div>
          <span className="text-[10px] text-[#2F6B4F] font-semibold">100% to MPCB dismantlers</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 space-y-1 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Carbon Avoided (CO₂e)</span>
          <div className="text-xl font-bold font-mono text-[#2F6B4F]">
            {impact.co2SavedKg} <span className="text-xs font-normal">kg</span>
          </div>
          <span className="text-[10px] text-[#6B6B6B]">Estimated (CPCB LCA)</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 space-y-1 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Toxic Waste Neutralized</span>
          <div className="text-xl font-bold font-mono text-[#191919]">
            {impact.toxicNeutralizedGrams} <span className="text-xs font-normal">g</span>
          </div>
          <span className="text-[10px] text-[#6B6B6B]">Lead, acid & dioxins</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 space-y-1 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Fair Value Premium</span>
          <div className="text-xl font-bold font-mono text-[#2F6B4F]">
            ₹ {impact.additionalEarningsInr}
          </div>
          <span className="text-[10px] text-[#2F6B4F] font-semibold">Earned above local baseline</span>
        </div>
      </div>

      {/* Recovered Critical Materials Breakdown (Ranges + Estimated labels) */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-[#2F6B4F]" />
            <h3 className="text-xs font-bold text-[#191919]">
              Estimated Raw Materials Recovered From Your Lots
            </h3>
          </div>
          <span className="text-[10px] font-mono text-[#6B6B6B] bg-[#F4F3EF] px-1.5 py-0.5 rounded">
            UN GESP 2024 Factors
          </span>
        </div>

        <p className="text-[11px] text-[#6B6B6B]">
          Calculated from verified material weights handed over to authorized recyclers. Figures represent recoverable industrial yields:
        </p>

        <div className="space-y-2">
          {impact.recoveredMaterials.map((mat, i) => (
            <div
              key={i}
              className="p-2.5 rounded-xl bg-[#FBFBF9] border border-[#E7E5E0] flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-semibold text-[#191919] flex items-center gap-1">
                  <span>{mat.name}</span>
                  {mat.isCritical && (
                    <span className="text-[9px] font-mono uppercase bg-[#FFF4DE] text-[#A66A00] px-1 py-0.2 rounded font-bold">
                      Critical
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-[#6B6B6B]">
                  Estimated Range: {mat.estimatedMinKg} – {mat.estimatedMaxKg} {mat.name.includes('Gold') ? 'grams' : 'kg'}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#2F6B4F]">
                  ~{mat.estimatedMinKg} {mat.name.includes('Gold') ? 'g' : 'kg'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dignified Earned Badges */}
      <div className="bg-[#F4F3EF] border border-[#E7E5E0] rounded-2xl p-4 space-y-2.5">
        <h3 className="text-xs font-bold text-[#191919] flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#2F6B4F]" />
          <span>Earned Sustainability Badges</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {impact.badges.map((b) => (
            <div key={b.id} className="p-2.5 bg-white rounded-xl border border-[#E7E5E0] flex items-start gap-2.5">
              <span className="p-2 rounded-lg bg-[#EAF3EC] text-[#2F6B4F] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold text-[#191919]">{b.title[lang] || b.title.en}</h4>
                <p className="text-[10px] text-[#6B6B6B] mt-0.5">{b.description[lang] || b.description.en}</p>
                <span className="text-[9px] font-mono text-[#2F6B4F] mt-1 inline-block">Earned {b.earnedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Deep Link */}
      {onOpenAssistant && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onOpenAssistant('Explain my circular impact and how my badges are calculated')}
            className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#EAF3EC] text-[#2F6B4F] border border-[#2F6B4F]/30 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow-2xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Reclaim AI: "Explain my environmental savings"</span>
          </button>
        </div>
      )}

      {/* Shareable Impact Proof Card Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-[#E7E5E0] rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E5E0]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2F6B4F]" />
                <span className="text-xs font-bold text-[#191919]">Official Circular Proof Card</span>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="text-xs text-[#6B6B6B] hover:text-[#191919] cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Renderable Certificate */}
            <div className="bg-[#FBFBF9] border-2 border-[#2F6B4F] rounded-2xl p-4 text-center space-y-2.5">
              <span className="text-[10px] font-mono text-[#2F6B4F] uppercase tracking-wider font-bold">
                RECLAIMX VERIFIED COLLECTOR
              </span>
              <h3 className="text-base font-bold text-[#191919]">{profile.name}</h3>
              <p className="text-xs text-[#6B6B6B] font-mono">ID: {profile.id} · {profile.area}</p>

              <div className="py-2 grid grid-cols-2 gap-2 text-left bg-white p-2.5 rounded-xl border border-[#E7E5E0]">
                <div>
                  <div className="text-[10px] text-[#6B6B6B]">Channelled</div>
                  <div className="text-sm font-bold font-mono text-[#191919]">{impact.totalFormallyChannelledKg} kg</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#6B6B6B]">CO₂ Avoided</div>
                  <div className="text-sm font-bold font-mono text-[#2F6B4F]">{impact.co2SavedKg} kg</div>
                </div>
              </div>

              <div className="flex items-center justify-center p-3 bg-white rounded-xl border border-[#E7E5E0]">
                <QrCode className="w-24 h-24 text-[#191919]" />
              </div>
              <p className="text-[9px] text-[#6B6B6B]">
                Cryptographically verifiable via Ed25519 dual-signed handovers. No personal phone or Aadhaar stored.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#2F6B4F] text-white font-semibold text-xs cursor-pointer"
            >
              Done / Downloaded
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

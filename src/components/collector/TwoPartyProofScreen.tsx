import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, ChevronDown, ChevronUp, ArrowRight, PlusCircle, Lock, Award } from 'lucide-react';
import { Language, LotTransaction } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface TwoPartyProofScreenProps {
  transaction: LotTransaction;
  onViewLedger: () => void;
  onNewLot: () => void;
  lang: Language;
}

export const TwoPartyProofScreen: React.FC<TwoPartyProofScreenProps> = ({
  transaction,
  onViewLedger,
  onNewLot,
  lang,
}) => {
  const t = translations[lang];
  const [showTechnicalProof, setShowTechnicalProof] = useState(false);

  const speechText =
    lang === 'mr'
      ? `हस्तांतरण यशस्वी. दोन्ही बाजूंची स्वाक्षरी पूर्ण झाली. अंतिम रक्कम ३,३१२ रुपये. ट्रॅकिंग आयडी ${transaction.traceabilityId}. ही पावती अधिकृत पुनर्वापर पुरावा आहे.`
      : lang === 'hi'
      ? `हस्तांतरण सत्यापित हुआ। दोनों पक्षों का डिजिटल प्रमाण पूरा। अंतिम भुगतान ₹3,312। ट्रैकिंग आईडी ${transaction.traceabilityId}।`
      : `Handover verified with two-party cryptographic proof. Final payout: ₹${transaction.finalPrice?.toLocaleString('en-IN')}. Traceability token ${transaction.traceabilityId}.`;

  return (
    <div className="space-y-4 pb-20 pt-1">
      {/* Top Success Badge */}
      <div className="text-center pt-4 space-y-2">
        <div className="w-16 h-16 rounded-full bg-[#EAF3EC] border-2 border-[#2F6B4F] flex items-center justify-center mx-auto text-[#2F6B4F]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold text-[#191919]">{t.handoverVerifiedTitle}</h1>
        <p className="text-xs text-[#6B6B6B] max-w-xs mx-auto">
          {t.twoPartyProofComplete}. Safe formal recycling chain initiated.
        </p>
      </div>

      {/* Main Proof Summary Card */}
      <div className="bg-white border-2 border-[#2F6B4F] rounded-2xl p-5 shadow-xs space-y-4">
        {/* Payout Metric */}
        <div className="text-center pb-3 border-b border-[#E7E5E0]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            {t.finalPayout} (Settled in Cash)
          </span>
          <div className="text-4xl font-extrabold tracking-tight text-[#2F6B4F] mt-1 font-mono">
            ₹ {(transaction.finalPrice || 0).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-[#6B6B6B]">
            {transaction.verifiedWeightKg} kg verified · ₹{transaction.offeredRatePerKg}/kg
          </span>
        </div>

        {/* 5-Point Proof Checklist */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center py-1">
            <span className="text-[#6B6B6B]">{t.collectorSignature}</span>
            <span className="font-semibold text-[#2F6B4F] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#6B6B6B]">{t.recyclerSignature}</span>
            <span className="font-semibold text-[#2F6B4F] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified ({transaction.recyclerName.split(' ')[0]})
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#6B6B6B]">{t.photoHash}</span>
            <span className="font-semibold text-[#2F6B4F] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Locked & Matched
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#6B6B6B]">Lot Code</span>
            <span className="font-mono text-[#191919] font-bold">{transaction.lotCode}</span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-[#6B6B6B]">{t.traceabilityId}</span>
            <span className="font-mono text-[#2F6B4F] font-bold bg-[#EAF3EC] px-2 py-0.5 rounded">
              {transaction.traceabilityId}
            </span>
          </div>
        </div>

        {/* Audio helper */}
        <div className="pt-2 border-t border-[#E7E5E0] flex justify-center">
          <AudioButton
            textToSpeak={speechText}
            lang={lang}
            label={t.hearPrice}
            size="sm"
          />
        </div>
      </div>

      {/* 3-Pillar Narrative Callout */}
      <div className="bg-[#F4F3EF] border border-[#E7E5E0] rounded-2xl p-4 text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6B6B] block mb-2">
          ReclaimX Trust Guarantee
        </span>
        <div className="flex items-center justify-around text-xs font-bold text-[#191919]">
          <div className="flex flex-col items-center">
            <span className="text-[#2F6B4F] text-sm">KNOW</span>
            <span className="text-[10px] font-normal text-[#6B6B6B]">Fair price</span>
          </div>
          <span className="text-[#6B6B6B]">→</span>
          <div className="flex flex-col items-center">
            <span className="text-[#2F6B4F] text-sm">CHOOSE</span>
            <span className="text-[10px] font-normal text-[#6B6B6B]">Verified buyer</span>
          </div>
          <span className="text-[#6B6B6B]">→</span>
          <div className="flex flex-col items-center">
            <span className="text-[#2F6B4F] text-sm">PROVE</span>
            <span className="text-[10px] font-normal text-[#6B6B6B]">Signed proof</span>
          </div>
        </div>
      </div>

      {/* Expandable Technical Proof Drawer */}
      <div className="bg-white border border-[#E7E5E0] rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setShowTechnicalProof(!showTechnicalProof)}
          className="w-full p-3.5 flex items-center justify-between text-xs font-semibold text-[#191919] hover:bg-[#F4F3EF] cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#2F6B4F]" />
            <span>{t.viewProof} (Cryptographic Merkle Tree)</span>
          </div>
          {showTechnicalProof ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showTechnicalProof && (
          <div className="p-3.5 pt-0 border-t border-[#E7E5E0] text-[11px] font-mono text-[#6B6B6B] space-y-2 bg-[#FBFBF9]">
            <div className="flex justify-between py-1 border-b border-[#E7E5E0]">
              <span>Receipt Merkle Hash:</span>
              <span className="text-[#191919] truncate max-w-[160px]">8b7d92f1a6c401ee</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E7E5E0]">
              <span>Collector Key ID:</span>
              <span className="text-[#191919]">ED25519:RX2048</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#E7E5E0]">
              <span>Recycler Terminal Key:</span>
              <span className="text-[#191919]">ED25519:GL_PUN_88</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Sync Status:</span>
              <span className="text-[#2F6B4F] font-bold">Stored locally on device (offline ready)</span>
            </div>
          </div>
        )}
      </div>

      {/* Primary Actions */}
      <div className="space-y-2 pt-2">
        <button
          id="view-in-ledger-btn"
          type="button"
          onClick={onViewLedger}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>View in Earnings Ledger</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          id="start-another-lot-btn"
          type="button"
          onClick={onNewLot}
          className="w-full py-2.5 px-4 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] font-medium text-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-[#2F6B4F]" />
          <span>Record Another E-Waste Lot</span>
        </button>
      </div>
    </div>
  );
};

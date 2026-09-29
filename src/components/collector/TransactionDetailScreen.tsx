import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Lock, MapPin, Calendar, Clock, Hash } from 'lucide-react';
import { Language, LotTransaction } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface TransactionDetailScreenProps {
  transaction: LotTransaction;
  onBack: () => void;
  lang: Language;
}

export const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = ({
  transaction,
  onBack,
  lang,
}) => {
  const t = translations[lang];

  const steps = [
    { num: 1, label: 'Lot created', desc: `${transaction.declaredWeightKg} kg declared on scale`, status: 'done' },
    { num: 2, label: 'Material confirmed', desc: `${transaction.materialName} verified`, status: 'done' },
    { num: 3, label: 'Fair price generated', desc: `Target range ₹${transaction.fairPriceMin}–₹${transaction.fairPriceMax}/kg`, status: 'done' },
    { num: 4, label: 'Recycler selected', desc: `${transaction.recyclerName} (Rate: ₹${transaction.offeredRatePerKg}/kg)`, status: 'done' },
    { num: 5, label: 'Collector signed', desc: `Hash: ${transaction.collectorSignatureHash}`, status: 'done' },
    { num: 6, label: 'Recycler confirmed', desc: `${transaction.verifiedWeightKg || transaction.declaredWeightKg} kg verified on facility scale`, status: 'done' },
    { num: 7, label: 'Payment recorded', desc: `₹${transaction.finalPrice || transaction.estimatedPayout} settled in cash/UPI`, status: 'done' },
  ];

  const speechText =
    lang === 'mr'
      ? `व्यवहार तपशील ${transaction.lotCode}. एकूण सात टप्प्यांची संपूर्ण पावती सत्यापित झाली आहे. अंतिम रक्कम ${transaction.finalPrice} रुपये.`
      : lang === 'hi'
      ? `लेनदेन विवरण ${transaction.lotCode}। सातों चरण सफलतापूर्वक सत्यापित हैं। कुल राशि ₹${transaction.finalPrice}।`
      : `Transaction detail for lot ${transaction.lotCode}. Full 7-stage chain of custody verified. Final payout ₹${transaction.finalPrice}.`;

  return (
    <div className="space-y-4 pb-20 pt-1">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6B6B] hover:text-[#191919] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ledger</span>
        </button>
        <span className="text-xs font-mono font-semibold text-[#2F6B4F] bg-[#EAF3EC] px-2.5 py-0.5 rounded-full">
          Verified Chain
        </span>
      </div>

      <div>
        <span className="text-xs text-[#6B6B6B]">Transaction Audit Record</span>
        <h1 className="text-xl font-bold font-mono text-[#191919]">{transaction.lotCode}</h1>
      </div>

      {/* Summary Highlight */}
      <div className="bg-white border-2 border-[#2F6B4F] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex justify-between items-center pb-3 border-b border-[#E7E5E0]">
          <div>
            <span className="text-[11px] text-[#6B6B6B] block">Settled Payout</span>
            <div className="text-2xl font-bold font-mono text-[#2F6B4F]">
              ₹ {(transaction.finalPrice || transaction.estimatedPayout).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#6B6B6B] block">Verified Weight</span>
            <div className="text-lg font-bold font-mono text-[#191919]">
              {transaction.verifiedWeightKg || transaction.declaredWeightKg} kg
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-[#6B6B6B]">
          <div>
            <span>Recycler:</span>
            <span className="font-semibold text-[#191919] block truncate">{transaction.recyclerName}</span>
          </div>
          <div>
            <span>Unit Rate:</span>
            <span className="font-mono font-semibold text-[#2F6B4F] block">₹{transaction.offeredRatePerKg}/kg</span>
          </div>
          <div>
            <span>Traceability Token:</span>
            <span className="font-mono text-[#191919] block">{transaction.traceabilityId}</span>
          </div>
          <div>
            <span>Location:</span>
            <span className="text-[#191919] block">{transaction.location}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E7E5E0] flex justify-center">
          <AudioButton
            textToSpeak={speechText}
            lang={lang}
            label={t.hearScreen}
            size="sm"
          />
        </div>
      </div>

      {/* 7-Step Complete Traceability Chain Timeline */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-5 space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block">
          Complete Traceability Chain
        </span>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2F6B4F]">
          {steps.map((st) => (
            <div key={st.num} className="relative text-xs">
              <div className="absolute -left-6 top-0 w-5 h-5 rounded-full bg-[#2F6B4F] text-white flex items-center justify-center text-[10px] font-bold">
                ✓
              </div>
              <div className="font-bold text-[#191919] flex items-center justify-between">
                <span>{st.num}. {st.label}</span>
                <span className="text-[10px] font-normal text-[#2F6B4F] font-mono">Verified</span>
              </div>
              <p className="text-[11px] text-[#6B6B6B] mt-0.5">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

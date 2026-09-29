import React, { useState } from 'react';
import { CheckCircle2, Clock, Filter, ChevronRight, ArrowDownUp } from 'lucide-react';
import { Language, LotTransaction } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface EarningsLedgerScreenProps {
  transactions: LotTransaction[];
  onSelectTransaction: (tx: LotTransaction) => void;
  lang: Language;
}

export const EarningsLedgerScreen: React.FC<EarningsLedgerScreenProps> = ({
  transactions,
  onSelectTransaction,
  lang,
}) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');

  const totalCompleted = transactions
    .filter(tx => tx.status === 'confirmed' || tx.status === 'paid')
    .reduce((acc, curr) => acc + (curr.finalPrice || 0), 0);

  const totalPaid = transactions
    .filter(tx => tx.status === 'paid')
    .reduce((acc, curr) => acc + (curr.finalPrice || 0), 0);

  const totalPending = transactions
    .filter(tx => tx.status === 'confirmed' || tx.status === 'priced' || tx.status === 'signed')
    .reduce((acc, curr) => acc + (curr.finalPrice || curr.estimatedPayout || 0), 0);

  const filtered = transactions.filter(tx => {
    if (filter === 'paid') return tx.status === 'paid';
    if (filter === 'pending') return tx.status === 'confirmed' || tx.status === 'signed';
    return true;
  });

  const speechText =
    lang === 'mr'
      ? `सप्टेंबर २०२६ कमाई. एकूण पूर्ण झालेली रक्कम १२,४८० रुपये. रोकड मिळालेले ८,९४० रुपये, आणि बाकी ३,५४० रुपये.`
      : lang === 'hi'
      ? `सितंबर 2026 की कमाई। कुल पूर्ण राशि ₹12,480। प्राप्त भुगतान ₹8,940, बाकी भुगतान ₹3,540।`
      : `September 2026 Earnings Ledger. Total completed: ₹${totalCompleted.toLocaleString('en-IN')}, Paid: ₹${totalPaid.toLocaleString('en-IN')}, Pending: ₹${totalPending.toLocaleString('en-IN')}.`;

  return (
    <div className="space-y-4 pb-20 pt-1">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#191919]">{t.earnings}</h1>
          <p className="text-xs text-[#6B6B6B]">September 2026 · Pune District</p>
        </div>
        <AudioButton
          textToSpeak={speechText}
          lang={lang}
          label="🔊 Hear total"
          size="sm"
        />
      </div>

      {/* Metrics Card */}
      <div className="bg-white border-2 border-[#E7E5E0] rounded-2xl p-5 shadow-xs space-y-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            {t.totalCompleted}
          </span>
          <div className="text-3xl font-extrabold tracking-tight text-[#191919] mt-0.5 font-mono">
            ₹ {totalCompleted.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#E7E5E0]">
          <div className="p-2.5 bg-[#EAF3EC] rounded-xl">
            <span className="text-[11px] text-[#2F6B4F] font-semibold block">{t.paid} (Cash/UPI)</span>
            <div className="text-lg font-bold font-mono text-[#2F6B4F] mt-0.5">
              ₹ {totalPaid.toLocaleString('en-IN')}
            </div>
          </div>

          <div className="p-2.5 bg-[#FFF4DE] rounded-xl">
            <span className="text-[11px] text-[#A66A00] font-semibold block">{t.pending}</span>
            <div className="text-lg font-bold font-mono text-[#A66A00] mt-0.5">
              ₹ {totalPending.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F4F3EF] rounded-xl border border-[#E7E5E0] text-xs">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filter === 'all' ? 'bg-white text-[#191919] font-bold shadow-2xs' : 'text-[#6B6B6B]'
          }`}
        >
          All ({transactions.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('paid')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filter === 'paid' ? 'bg-white text-[#191919] font-bold shadow-2xs' : 'text-[#6B6B6B]'
          }`}
        >
          Paid
        </button>
        <button
          type="button"
          onClick={() => setFilter('pending')}
          className={`flex-1 py-1.5 rounded-lg font-medium transition cursor-pointer ${
            filter === 'pending' ? 'bg-white text-[#191919] font-bold shadow-2xs' : 'text-[#6B6B6B]'
          }`}
        >
          Pending
        </button>
      </div>

      {/* Transaction List */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B6B6B] block">
          Transaction Records
        </span>

        {filtered.map((tx) => (
          <div
            key={tx.id}
            onClick={() => onSelectTransaction(tx)}
            className="bg-white border border-[#E7E5E0] hover:border-[#2F6B4F] rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition shadow-2xs"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#191919]">{tx.materialName}</span>
                {tx.status === 'confirmed' || tx.status === 'paid' ? (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#2F6B4F] bg-[#EAF3EC] px-1.5 py-0.2 rounded-full">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Confirmed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#A66A00] bg-[#FFF4DE] px-1.5 py-0.2 rounded-full">
                    <Clock className="w-2.5 h-2.5" /> Pending
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[#6B6B6B]">
                {tx.verifiedWeightKg || tx.declaredWeightKg} kg · {tx.recyclerName}
              </div>
              <div className="text-[10px] font-mono text-[#6B6B6B]">
                {tx.lotCode} · {tx.createdAt}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-sm font-bold text-[#191919] font-mono">
                  ₹ {(tx.finalPrice || tx.estimatedPayout).toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-[#2F6B4F] font-semibold">
                  ₹{tx.offeredRatePerKg}/kg
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#6B6B6B]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

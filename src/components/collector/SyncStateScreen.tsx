import React from 'react';
import { ArrowLeft, CheckCircle2, Wifi, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface SyncStateScreenProps {
  onBackToHome: () => void;
  lang: Language;
}

export const SyncStateScreen: React.FC<SyncStateScreenProps> = ({ onBackToHome, lang }) => {
  return (
    <div className="space-y-4 pb-20 pt-1">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToHome}
          className="inline-flex items-center gap-1 text-xs font-medium text-[#6B6B6B] hover:text-[#191919] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs font-mono font-semibold text-[#2F6B4F] bg-[#EAF3EC] px-2.5 py-0.5 rounded-full">
          Sync Complete
        </span>
      </div>

      <div className="text-center pt-4 space-y-2">
        <div className="w-16 h-16 rounded-full bg-[#EAF3EC] border-2 border-[#2F6B4F] flex items-center justify-center mx-auto text-[#2F6B4F]">
          <Wifi className="w-8 h-8 animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold text-[#191919]">Back Online</h1>
        <p className="text-xs text-[#6B6B6B]">
          All offline field transactions reconciled with the formal hub ledger
        </p>
      </div>

      {/* Sync checklist */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-5 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block">
          Synchronized Records:
        </span>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2.5 bg-[#EAF3EC] rounded-xl text-[#2F6B4F] font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>3 Offline Lots Synced</span>
            </div>
            <span className="text-[10px] font-mono">100% Verified</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-[#EAF3EC] rounded-xl text-[#2F6B4F] font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>3 Signed Receipts Uploaded</span>
            </div>
            <span className="text-[10px] font-mono">Merkle Locked</span>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-[#EAF3EC] rounded-xl text-[#2F6B4F] font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>2 Recycler Confirmations Reconciled</span>
            </div>
            <span className="text-[10px] font-mono">Matched</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#E7E5E0] flex justify-between items-center text-xs text-[#6B6B6B]">
          <span>Latest rate cache:</span>
          <span className="font-semibold text-[#191919]">Refreshed just now (Pune District)</span>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="button"
          onClick={onBackToHome}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Continue to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

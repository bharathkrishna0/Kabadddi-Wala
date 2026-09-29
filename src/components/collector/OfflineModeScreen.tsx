import React from 'react';
import { ArrowLeft, WifiOff, CheckCircle2, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';

interface OfflineModeScreenProps {
  onBack: () => void;
  onSimulateSync: () => void;
  lang: Language;
}

export const OfflineModeScreen: React.FC<OfflineModeScreenProps> = ({
  onBack,
  onSimulateSync,
  lang,
}) => {
  const t = translations[lang];

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
          Offline Resilience
        </span>
      </div>

      <div className="text-center pt-2 space-y-2">
        <div className="w-14 h-14 rounded-full bg-[#FFF4DE] border border-[#A66A00]/30 flex items-center justify-center mx-auto text-[#A66A00]">
          <WifiOff className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold text-[#191919]">ReclaimX Works 100% Offline</h1>
        <p className="text-xs text-[#6B6B6B] max-w-xs mx-auto">
          No cellular data or WiFi is required to protect yourself during field transactions.
        </p>
      </div>

      {/* Guaranteed offline capabilities */}
      <div className="bg-white border-2 border-[#E7E5E0] rounded-2xl p-5 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[#191919] block">
          Available Without Internet:
        </span>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 p-2 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
            <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
            <span><strong>Create new lot:</strong> Local camera capture & edge detection</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
            <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
            <span><strong>View cached prices:</strong> Last synced local price window stored locally</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
            <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
            <span><strong>Calculate fair estimate:</strong> In-memory calculation for your scale weight</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
            <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
            <span><strong>Sign tamper-proof receipt:</strong> Ed25519 cryptography executed on phone</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
            <CheckCircle2 className="w-4 h-4 text-[#2F6B4F] shrink-0" />
            <span><strong>Ledger updates:</strong> Transactions stored in encrypted local storage</span>
          </div>
        </div>

        <p className="text-[11px] text-[#6B6B6B] pt-1">
          Sync resumes automatically when connectivity returns. Receipts are cryptographically immutable.
        </p>
      </div>

      {/* Action to test sync */}
      <div className="pt-2">
        <button
          id="simulate-reconnect-btn"
          type="button"
          onClick={onSimulateSync}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Simulate Reconnect & Sync (3 Lots)</span>
        </button>
      </div>
    </div>
  );
};

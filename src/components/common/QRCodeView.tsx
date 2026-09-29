import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface QRCodeViewProps {
  lotCode: string;
  material: string;
  weightKg: number;
  quotedValue: number;
  signatureHash: string;
  onSimulateScan?: () => void;
  isConfirmed?: boolean;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  lotCode,
  material,
  weightKg,
  quotedValue,
  signatureHash,
  onSimulateScan,
  isConfirmed = false,
}) => {
  return (
    <div id="qr-receipt-card" className="bg-white border border-[#E7E5E0] rounded-2xl p-5 shadow-xs flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-3 bg-[#EAF3EC] text-[#2F6B4F] px-3 py-1 rounded-full text-xs font-medium">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Cryptographically signed on-device (Ed25519)</span>
      </div>

      {/* SVG QR Code Pattern */}
      <div className="relative p-3 bg-white border-2 border-dashed border-[#E7E5E0] rounded-xl my-2">
        <svg
          viewBox="0 0 160 160"
          className="w-44 h-44 mx-auto text-[#191919]"
          fill="currentColor"
        >
          {/* Outer Border Corners / Finder patterns */}
          {/* Top Left Finder */}
          <rect x="10" y="10" width="38" height="38" rx="4" fill="#191919" />
          <rect x="16" y="16" width="26" height="26" rx="2" fill="#FFFFFF" />
          <rect x="22" y="22" width="14" height="14" rx="2" fill="#191919" />

          {/* Top Right Finder */}
          <rect x="112" y="10" width="38" height="38" rx="4" fill="#191919" />
          <rect x="118" y="16" width="26" height="26" rx="2" fill="#FFFFFF" />
          <rect x="124" y="22" width="14" height="14" rx="2" fill="#191919" />

          {/* Bottom Left Finder */}
          <rect x="10" y="112" width="38" height="38" rx="4" fill="#191919" />
          <rect x="16" y="118" width="26" height="26" rx="2" fill="#FFFFFF" />
          <rect x="22" y="124" width="14" height="14" rx="2" fill="#191919" />

          {/* Timing Patterns */}
          <rect x="54" y="24" width="6" height="6" />
          <rect x="66" y="24" width="6" height="6" />
          <rect x="78" y="24" width="6" height="6" />
          <rect x="90" y="24" width="6" height="6" />
          <rect x="102" y="24" width="6" height="6" />

          <rect x="24" y="54" width="6" height="6" />
          <rect x="24" y="66" width="6" height="6" />
          <rect x="24" y="78" width="6" height="6" />
          <rect x="24" y="90" width="6" height="6" />
          <rect x="24" y="102" width="6" height="6" />

          {/* Data Cells / Matrix Simulation */}
          <rect x="54" y="40" width="8" height="8" />
          <rect x="70" y="40" width="8" height="8" />
          <rect x="86" y="40" width="8" height="8" />
          <rect x="98" y="40" width="8" height="8" />

          <rect x="42" y="56" width="8" height="8" />
          <rect x="58" y="56" width="8" height="8" />
          <rect x="74" y="56" width="8" height="8" />
          <rect x="90" y="56" width="8" height="8" />
          <rect x="106" y="56" width="8" height="8" />
          <rect x="122" y="56" width="8" height="8" />

          <rect x="42" y="72" width="8" height="8" />
          <rect x="58" y="72" width="8" height="8" />
          <rect x="74" y="72" width="8" height="8" />
          <rect x="90" y="72" width="8" height="8" />
          <rect x="106" y="72" width="8" height="8" />
          <rect x="122" y="72" width="8" height="8" />

          <rect x="42" y="88" width="8" height="8" />
          <rect x="58" y="88" width="8" height="8" />
          <rect x="74" y="88" width="8" height="8" />
          <rect x="90" y="88" width="8" height="8" />
          <rect x="106" y="88" width="8" height="8" />
          <rect x="122" y="88" width="8" height="8" />

          <rect x="54" y="104" width="8" height="8" />
          <rect x="70" y="104" width="8" height="8" />
          <rect x="86" y="104" width="8" height="8" />
          <rect x="98" y="104" width="8" height="8" />

          {/* Bottom Right Data cluster */}
          <rect x="54" y="120" width="8" height="8" />
          <rect x="70" y="120" width="8" height="8" />
          <rect x="86" y="120" width="8" height="8" />
          <rect x="102" y="120" width="8" height="8" />
          <rect x="118" y="120" width="8" height="8" />
          <rect x="134" y="120" width="8" height="8" />

          <rect x="54" y="136" width="8" height="8" />
          <rect x="70" y="136" width="8" height="8" />
          <rect x="90" y="136" width="8" height="8" />
          <rect x="110" y="136" width="8" height="8" />
          <rect x="126" y="136" width="8" height="8" />
        </svg>

        {isConfirmed && (
          <div className="absolute inset-0 bg-[#EAF3EC]/90 rounded-xl flex flex-col items-center justify-center p-3">
            <CheckCircle2 className="w-12 h-12 text-[#2F6B4F] mb-1 animate-bounce" />
            <span className="text-sm font-semibold text-[#2F6B4F]">Recycler Scanned & Verified</span>
          </div>
        )}
      </div>

      <div className="w-full mt-2 pt-3 border-t border-[#E7E5E0] text-left">
        <div className="flex justify-between items-center text-xs text-[#6B6B6B]">
          <span>Lot ID: <strong className="text-[#191919] font-mono">{lotCode}</strong></span>
          <span>{weightKg} kg · {material}</span>
        </div>
        <div className="flex justify-between items-center text-xs text-[#6B6B6B] mt-1">
          <span>Quoted value:</span>
          <span className="text-sm font-semibold text-[#191919]">₹ {quotedValue.toLocaleString('en-IN')}</span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-[#6B6B6B] truncate bg-[#F4F3EF] px-2 py-1 rounded">
          Sig: {signatureHash}
        </div>
      </div>

      {onSimulateScan && !isConfirmed && (
        <button
          id="simulate-recycler-scan-btn"
          type="button"
          onClick={onSimulateScan}
          className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#191919] text-white text-xs font-semibold hover:bg-black active:scale-[0.98] transition cursor-pointer flex items-center justify-center gap-2"
        >
          <span>📱 Simulate Recycler Scanning this QR</span>
        </button>
      )}
    </div>
  );
};

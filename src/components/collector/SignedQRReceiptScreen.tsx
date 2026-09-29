import React from 'react';
import { ArrowLeft, CheckCircle2, Share2, Shield, Smartphone, Clock, Download } from 'lucide-react';
import { Language, MaterialInfo, RecyclerOffer } from '../../types';
import { translations } from '../../translations';
import { QRCodeView } from '../common/QRCodeView';
import { AudioButton } from '../common/AudioButton';

interface SignedQRReceiptScreenProps {
  lotCode: string;
  material: MaterialInfo;
  weightKg: number;
  selectedRecycler: RecyclerOffer;
  signatureHash: string;
  onSimulateScan: () => void;
  onBack: () => void;
  lang: Language;
}

export const SignedQRReceiptScreen: React.FC<SignedQRReceiptScreenProps> = ({
  lotCode,
  material,
  weightKg,
  selectedRecycler,
  signatureHash,
  onSimulateScan,
  onBack,
  lang,
}) => {
  const t = translations[lang];
  const quotedValue = Math.round(selectedRecycler.ratePerKg * weightKg);

  const speechText =
    lang === 'mr'
      ? `हस्तांतरण पावती तयार झाली आहे. तुमच्या स्वाक्षरीने सुरक्षित. क्यूआर कोड दाखवा आणि पुनर्वापरदाराला स्कॅन करू द्या.`
      : lang === 'hi'
      ? `हस्तांतरित रसीद तैयार है। कलेक्टर द्वारा हस्ताक्षरित। रीसायकलर को यह क्यूआर कोड स्कैन करने दें।`
      : `Handover receipt ready and cryptographically signed on-device. Present this QR code to the authorized recycler.`;

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
        <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[#2F6B4F] bg-[#EAF3EC] px-2.5 py-0.5 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Signed Offline</span>
        </div>
      </div>

      <div className="text-center space-y-1">
        <h1 className="text-xl font-bold text-[#191919]">{t.receiptSignedByCollector}</h1>
        <p className="text-xs text-[#6B6B6B]">
          Present this cryptographic token to {selectedRecycler.name} upon arrival
        </p>
      </div>

      {/* QR Card with SVG and simulate scan */}
      <QRCodeView
        lotCode={lotCode}
        material={lang === 'mr' ? material.nameMr : lang === 'hi' ? material.nameHi : material.name}
        weightKg={weightKg}
        quotedValue={quotedValue}
        signatureHash={signatureHash}
        onSimulateScan={onSimulateScan}
      />

      {/* Handover Details */}
      <div className="bg-white border border-[#E7E5E0] rounded-xl p-4 text-xs space-y-2">
        <div className="flex justify-between text-[#6B6B6B]">
          <span>Assigned Recycler:</span>
          <span className="font-semibold text-[#191919]">{selectedRecycler.name}</span>
        </div>
        <div className="flex justify-between text-[#6B6B6B]">
          <span>Agreed Unit Rate:</span>
          <span className="font-mono text-[#2F6B4F] font-bold">₹{selectedRecycler.ratePerKg} / kg</span>
        </div>
        <div className="flex justify-between text-[#6B6B6B]">
          <span>Generated Timestamp:</span>
          <span className="text-[#191919]">16 Sep 2026 · 10:48 AM</span>
        </div>
        <div className="flex justify-between text-[#6B6B6B]">
          <span>Status:</span>
          <span className="text-[#A66A00] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {t.waitingRecyclerScan}
          </span>
        </div>
      </div>

      {/* Audio helper */}
      <div className="flex justify-center">
        <AudioButton
          textToSpeak={speechText}
          lang={lang}
          label={t.hearScreen}
          size="sm"
        />
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={() => alert(`Receipt ${lotCode} saved to phone offline storage.`)}
          className="py-2.5 px-3 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save Offline</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: `ReclaimX Receipt ${lotCode}`, text: `Verified lot ${lotCode}` });
            } else {
              alert('Receipt link copied for SMS/WhatsApp');
            }
          }}
          className="py-2.5 px-3 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Receipt</span>
        </button>
      </div>
    </div>
  );
};

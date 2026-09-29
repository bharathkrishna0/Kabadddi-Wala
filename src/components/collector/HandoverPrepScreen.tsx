import React from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, MapPin, Truck, Calendar } from 'lucide-react';
import { Language, MaterialInfo, RecyclerOffer, CollectorProfile } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface HandoverPrepScreenProps {
  material: MaterialInfo;
  weightKg: number;
  selectedRecycler: RecyclerOffer;
  lotCode: string;
  profile: CollectorProfile;
  onGenerateReceipt: () => void;
  onBack: () => void;
  lang: Language;
}

export const HandoverPrepScreen: React.FC<HandoverPrepScreenProps> = ({
  material,
  weightKg,
  selectedRecycler,
  lotCode,
  profile,
  onGenerateReceipt,
  onBack,
  lang,
}) => {
  const t = translations[lang];
  const quotedPayout = Math.round(selectedRecycler.ratePerKg * weightKg);

  const speechText =
    lang === 'mr'
      ? `हस्तांतरण पावती तयार करा. लॉट आयडी ${lotCode}. ग्रीनलूप रिसायकलिंग १८२ रुपये दराने ३,३४९ रुपये देईल. ही पावती इंटरनेटशिवाय स्वाक्षरी केली जाईल.`
      : lang === 'hi'
      ? `हस्तांतरण रसीद तैयार करें। लॉट कोड ${lotCode}। ग्रीनलूप रीसायकलिंग ₹182 की दर से ₹3,349 देगा। बिना इंटरनेट के रसीद तैयार होगी।`
      : `Prepare handover for lot ${lotCode}. ${selectedRecycler.name} quoted ₹${quotedPayout.toLocaleString('en-IN')} for ${weightKg} kg of ${material.name}. Generated with offline cryptographic signing.`;

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
          Step 6: Handover Prep
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-[#191919]">{t.prepareHandoverTitle}</h1>
        <p className="text-xs text-[#6B6B6B]">
          Bind your declared weight and fair quote into a tamper-evident receipt
        </p>
      </div>

      {/* Lot Summary Card */}
      <div className="bg-white border-2 border-[#E7E5E0] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-3">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#6B6B6B] block">
              Unique Lot Identifier
            </span>
            <div className="text-base font-mono font-bold text-[#191919] mt-0.5">
              {lotCode}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#6B6B6B] block">Collector ID</span>
            <span className="font-mono text-xs font-semibold text-[#2F6B4F]">{profile.id}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[#6B6B6B] block text-[11px]">Material</span>
            <span className="font-bold text-[#191919] text-sm">
              {lang === 'mr' ? material.nameMr : lang === 'hi' ? material.nameHi : material.name}
            </span>
          </div>

          <div>
            <span className="text-[#6B6B6B] block text-[11px]">Scale Weight</span>
            <span className="font-bold text-[#191919] text-sm font-mono">{weightKg} kg</span>
          </div>

          <div>
            <span className="text-[#6B6B6B] block text-[11px]">Agreed Unit Rate</span>
            <span className="font-bold text-[#2F6B4F] text-sm font-mono">₹{selectedRecycler.ratePerKg} / kg</span>
          </div>

          <div>
            <span className="text-[#6B6B6B] block text-[11px]">Quoted Settlement</span>
            <span className="font-bold text-[#191919] text-base font-mono">₹ {quotedPayout.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      {/* Selected Recycler Details */}
      <div className="bg-[#F4F3EF] border border-[#E7E5E0] rounded-2xl p-4 space-y-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#191919]">{selectedRecycler.name}</span>
          <span className="text-[11px] text-[#2F6B4F] bg-[#EAF3EC] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Verified
          </span>
        </div>

        <div className="space-y-1 text-[#6B6B6B] pt-1">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#2F6B4F]" />
            <span>Doorstep pickup schedule: Today · 3:30 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#6B6B6B]" />
            <span>Facility distance: {selectedRecycler.distanceKm} km</span>
          </div>
        </div>
      </div>

      {/* Offline Cryptographic Guarantee Badge */}
      <div className="p-3.5 bg-[#EAF3EC] rounded-xl border border-[#2F6B4F]/20 flex items-start gap-2.5 text-xs text-[#2F6B4F]">
        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">{t.localSignatureReady}</span>
          <span className="text-[11px] text-[#2F6B4F]/80">
            This cryptographic receipt is signed locally on your phone with an Ed25519 private key. No internet or cell connectivity is required.
          </span>
        </div>
      </div>

      {/* Audio readout */}
      <div className="flex justify-center">
        <AudioButton
          textToSpeak={speechText}
          lang={lang}
          label={t.hearScreen}
          size="sm"
        />
      </div>

      {/* Main Action */}
      <div className="pt-2">
        <button
          id="generate-receipt-btn"
          type="button"
          onClick={onGenerateReceipt}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <Lock className="w-4 h-4" />
          <span>{t.generateSignedReceipt}</span>
        </button>
      </div>
    </div>
  );
};

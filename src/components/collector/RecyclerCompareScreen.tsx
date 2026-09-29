import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, AlertTriangle, CheckCircle2, Truck, Navigation, ChevronDown, ChevronUp, AlertCircle, Info } from 'lucide-react';
import { Language, MaterialInfo, RecyclerOffer } from '../../types';
import { translations } from '../../translations';
import { MOCK_RECYCLERS } from '../../mockData';
import { AudioButton } from '../common/AudioButton';

interface RecyclerCompareScreenProps {
  material: MaterialInfo;
  weightKg: number;
  onSelectRecycler: (offer: RecyclerOffer) => void;
  onBack: () => void;
  lang: Language;
}

export const RecyclerCompareScreen: React.FC<RecyclerCompareScreenProps> = ({
  material,
  weightKg,
  onSelectRecycler,
  onBack,
  lang,
}) => {
  const t = translations[lang];
  const [showRankingWhy, setShowRankingWhy] = useState(true);
  const [anomalyWarningOffer, setAnomalyWarningOffer] = useState<RecyclerOffer | null>(null);

  // Recalculate payouts based on dynamic weight
  const offersWithDynamicPayout = MOCK_RECYCLERS.map((r) => ({
    ...r,
    estimatedPayout: Math.round(r.ratePerKg * weightKg),
  }));

  const handleSelectOffer = (offer: RecyclerOffer) => {
    if (offer.isAnomalyWarning) {
      setAnomalyWarningOffer(offer);
    } else {
      onSelectRecycler(offer);
    }
  };

  const warningSpeech =
    lang === 'mr'
      ? 'सावधान: हा दर १३२ रुपये किलो आहे, जो स्थानिक दरापेक्षा १३ टक्के कमी आहे. अधिकृत ग्रीनलूप रिसायकलिंग निवडा, जिथे १८२ रुपये मिळतील.'
      : lang === 'hi'
      ? 'चेतावनी: यह दर 132 रुपये प्रति किलो है, जो उचित दर से 13% कम है। अधिकृत खरीदार ग्रीनलूप चुनें।'
      : 'Price check warning: 132 rupees per kg is 13% below typical local range. We recommend selecting Greenloop Recycling instead.';

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
          Step 5: Compare Buyers
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold text-[#191919]">{t.compareRecyclersTitle}</h1>
        <p className="text-xs text-[#6B6B6B]">
          Ranked transparently by verified compliance, payout, and doorstep pickup
        </p>
      </div>

      {/* Recycler Cards List */}
      <div className="space-y-3">
        {offersWithDynamicPayout.map((offer, index) => {
          const isAnomaly = offer.isAnomalyWarning;

          return (
            <div
              key={offer.id}
              className={`rounded-2xl border p-4 transition ${
                index === 0
                  ? 'border-2 border-[#2F6B4F] bg-white shadow-xs'
                  : isAnomaly
                  ? 'border-[#B24A3A]/40 bg-[#FBECE8]/30'
                  : 'border-[#E7E5E0] bg-white'
              }`}
            >
              {/* Header row with badge & ranking */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-[#191919]">{offer.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {offer.verified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#2F6B4F] bg-[#EAF3EC] px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{t.authVerified}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#B24A3A] bg-[#FBECE8] px-2 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Unverified Buyer</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className={`text-base font-extrabold ${isAnomaly ? 'text-[#B24A3A]' : 'text-[#2F6B4F]'}`}>
                    ₹{offer.ratePerKg}/kg
                  </div>
                  <div className="text-[10px] text-[#6B6B6B]">Offered rate</div>
                </div>
              </div>

              {/* Logistics & Payout row */}
              <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-[#F4F3EF] rounded-xl text-xs">
                <div>
                  <span className="text-[10px] text-[#6B6B6B] block">Logistics</span>
                  <div className="font-semibold text-[#191919] flex items-center gap-1 mt-0.5">
                    {offer.pickupAvailable ? (
                      <>
                        <Truck className="w-3.5 h-3.5 text-[#2F6B4F]" />
                        <span>{t.pickupAvailable}</span>
                      </>
                    ) : (
                      <>
                        <Navigation className="w-3.5 h-3.5 text-[#6B6B6B]" />
                        <span>{t.dropOff} ({offer.distanceKm} km)</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="text-right border-l border-[#E7E5E0] pl-2">
                  <span className="text-[10px] text-[#6B6B6B] block">{t.estimatedPayout}</span>
                  <div className="font-bold text-[#191919] text-sm mt-0.5">
                    ₹ {offer.estimatedPayout.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Reasons tags */}
              <div className="space-y-1 mb-3">
                {offer.matchReasons.map((reason, rIdx) => (
                  <div key={rIdx} className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B4F]"></span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>

              {/* Select Button */}
              <button
                id={`select-recycler-${offer.id}`}
                type="button"
                onClick={() => handleSelectOffer(offer)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  index === 0
                    ? 'bg-[#2F6B4F] hover:bg-[#25563F] text-white shadow-xs'
                    : isAnomaly
                    ? 'bg-[#FFF4DE] text-[#A66A00] hover:bg-[#FFECC7] border border-[#A66A00]/30'
                    : 'bg-[#191919] hover:bg-black text-white'
                }`}
              >
                <span>{isAnomaly ? '⚠ View Price Warning' : t.selectBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Transparent Ranking Multi-Factor Explanation */}
      <div className="bg-[#F4F3EF] border border-[#E7E5E0] rounded-xl p-3.5">
        <button
          type="button"
          onClick={() => setShowRankingWhy(!showRankingWhy)}
          className="w-full flex items-center justify-between text-xs font-bold text-[#191919] cursor-pointer"
        >
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-[#2F6B4F]" />
            <span>{t.whyFirst}</span>
          </div>
          {showRankingWhy ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showRankingWhy && (
          <div className="mt-2.5 pt-2 border-t border-[#E7E5E0] text-xs text-[#6B6B6B] space-y-1.5">
            <div className="flex justify-between">
              <span>Price Offering:</span>
              <span className="font-semibold text-[#2F6B4F]">Highest (₹182/kg vs ₹171 median)</span>
            </div>
            <div className="flex justify-between">
              <span>Distance & Ingress:</span>
              <span className="font-semibold text-[#191919]">Doorstep Collection (Today 3:30 PM)</span>
            </div>
            <div className="flex justify-between">
              <span>Legal Regulatory Compliance:</span>
              <span className="font-semibold text-[#2F6B4F]">MPCB E-Waste Dismantler Certified</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Integrity:</span>
              <span className="font-semibold text-[#191919]">Instant two-party receipt settlement</span>
            </div>
          </div>
        )}
      </div>

      {/* Anomaly / Low-Price Warning Modal (Screen 9 in Spec) */}
      {anomalyWarningOffer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border-2 border-[#B24A3A] rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-[#B24A3A]">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-bold">{t.priceCheckWarningTitle}</h3>
            </div>

            <div className="p-3 bg-[#FBECE8] rounded-xl text-xs text-[#191919] space-y-1.5">
              <div className="text-2xl font-extrabold text-[#B24A3A]">
                ₹{anomalyWarningOffer.ratePerKg} / kg
              </div>
              <p className="font-medium text-[#B24A3A]">
                {t.priceCheckWarningDesc}
              </p>
              <div className="text-[#6B6B6B] pt-1">
                Typical local range: <strong>₹{material.basePriceMin} – ₹{material.basePriceMax}/kg</strong>
              </div>
              <div className="text-[#6B6B6B]">
                Difference: <strong className="text-[#B24A3A]">−13% below market</strong>
              </div>
            </div>

            <p className="text-xs text-[#6B6B6B]">
              You may lose ₹{Math.round((182 - anomalyWarningOffer.ratePerKg) * weightKg)} by selling to this unverified dealer instead of Greenloop Recycling.
            </p>

            <div className="flex justify-center">
              <AudioButton
                textToSpeak={warningSpeech}
                lang={lang}
                label="🔊 Hear warning"
                size="sm"
              />
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setAnomalyWarningOffer(null)}
                className="w-full py-3 px-4 rounded-xl bg-[#2F6B4F] text-white font-bold text-xs hover:bg-[#25563F] cursor-pointer"
              >
                {t.compareAnotherBuyer} (Recommended)
              </button>

              <button
                type="button"
                onClick={() => {
                  const off = anomalyWarningOffer;
                  setAnomalyWarningOffer(null);
                  onSelectRecycler(off);
                }}
                className="w-full py-2 px-4 rounded-xl border border-[#E7E5E0] text-[#6B6B6B] hover:text-[#191919] font-medium text-xs cursor-pointer"
              >
                {t.acceptAnyway}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

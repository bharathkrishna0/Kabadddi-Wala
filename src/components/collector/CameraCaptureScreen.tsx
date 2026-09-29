import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Sparkles, Check, RefreshCw, Cpu, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Language, MaterialInfo } from '../../types';
import { translations } from '../../translations';
import { MATERIALS } from '../../mockData';
import { AudioButton } from '../common/AudioButton';

interface CameraCaptureScreenProps {
  lang: Language;
  onConfirmSuggested: (material: MaterialInfo) => void;
  onChooseAnother: () => void;
  onBack: () => void;
}

export const CameraCaptureScreen: React.FC<CameraCaptureScreenProps> = ({
  lang,
  onConfirmSuggested,
  onChooseAnother,
  onBack,
}) => {
  const t = translations[lang];
  const [photoState, setPhotoState] = useState<'idle' | 'processing' | 'suggested'>('idle');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const suggestedMat = MATERIALS.find(m => m.id === 'mat_pcb') || MATERIALS[0];

  const handleCapture = (isSample: boolean = false) => {
    setPhotoState('processing');
    setCapturedImage('sample_pcb_board');

    // Simulate edge MobileNet inference (800ms)
    setTimeout(() => {
      setPhotoState('suggested');
    }, 900);
  };

  const speechText =
    photoState === 'suggested'
      ? lang === 'mr'
        ? 'आम्ही ओळखले आहे: सर्किट बोर्ड पीसीबी. विश्वासार्हता ९१ टक्के. हे बरोबर असल्यास खात्री करा बटण दाबा किंवा दुसरे निवडा.'
        : lang === 'hi'
        ? 'सुझाव: सर्किट बोर्ड्स पीसीबी। सटीकता 91%। यदि सही है तो पुष्टि करें दबाएं।'
        : 'Suggested material: PCB Circuit Boards with 91% confidence. Click confirm to proceed, or choose another.'
      : lang === 'mr'
      ? 'मालाचा स्पष्ट फोटो काढा. फोनवर इंटरनेटशिवाय तपासणी होईल.'
      : lang === 'hi'
      ? 'ई-कचरे का स्पष्ट फोटो लें। फोन पर ही पहचान होगी।'
      : 'Take a clear photo of your e-waste lot for local edge classification.';

  return (
    <div className="space-y-4 pb-20 pt-1">
      {/* Top navigation row */}
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
          Step 1: Identify Lot
        </span>
      </div>

      <div className="space-y-1">
        <h1 className="text-xl font-bold text-[#191919]">{t.takePhoto}</h1>
        <p className="text-xs text-[#6B6B6B]">{t.takePhotoDesc}</p>
      </div>

      {/* Viewfinder / Camera View */}
      <div className="relative w-full aspect-4/3 rounded-2xl bg-[#191919] border-2 border-[#E7E5E0] overflow-hidden flex flex-col items-center justify-center text-white">
        {photoState === 'idle' && (
          <div className="text-center p-6 space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto border border-white/20">
              <Camera className="w-8 h-8 text-white/80" />
            </div>
            <div className="text-xs text-white/70">
              Center the e-waste pile in daylight
            </div>
            {/* Viewfinder reticle corners */}
            <div className="absolute inset-6 border border-white/20 rounded-xl pointer-events-none">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#2F6B4F]"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#2F6B4F]"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#2F6B4F]"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#2F6B4F]"></div>
            </div>
          </div>
        )}

        {photoState === 'processing' && (
          <div className="text-center p-6 space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full border-3 border-[#2F6B4F] border-t-transparent animate-spin mx-auto"></div>
            <div className="text-sm font-semibold text-white">{t.identifyingMaterial}</div>
            <div className="text-xs text-white/70 max-w-xs mx-auto">
              {t.analyzingLocally}
            </div>
          </div>
        )}

        {photoState === 'suggested' && (
          <div className="relative w-full h-full bg-[#252525] flex flex-col items-center justify-center">
            {/* Realistic visual PCB representation */}
            <div className="w-full h-full p-4 flex flex-col items-center justify-center bg-linear-to-br from-[#1E3B2B] to-[#12241A]">
              <div className="w-24 h-24 rounded-2xl bg-[#2F6B4F]/30 border-2 border-[#2F6B4F] flex items-center justify-center mb-2">
                <Cpu className="w-14 h-14 text-emerald-300" />
              </div>
              <span className="text-xs font-mono text-emerald-200 bg-black/40 px-2.5 py-1 rounded-full border border-emerald-400/30">
                Green PCB Substrate Detected
              </span>
            </div>

            {/* Overlay badge */}
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-white flex items-center gap-1 border border-white/10">
              <ShieldCheck className="w-3 h-3 text-[#2F6B4F]" />
              <span>SHA-256 photo hash locked</span>
            </div>
          </div>
        )}
      </div>

      {/* Audio guidance */}
      <div className="flex justify-center">
        <AudioButton
          textToSpeak={speechText}
          lang={lang}
          label={photoState === 'suggested' ? t.hearPrice : t.hearScreen}
          size="sm"
        />
      </div>

      {/* Actions based on state */}
      {photoState === 'idle' && (
        <div className="space-y-2 pt-2">
          <button
            id="camera-capture-btn"
            type="button"
            onClick={() => handleCapture(false)}
            className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <Camera className="w-5 h-5" />
            <span>{t.captureBtn}</span>
          </button>

          <button
            id="camera-sample-btn"
            type="button"
            onClick={() => handleCapture(true)}
            className="w-full py-2.5 px-4 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] font-medium text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4 text-[#2F6B4F]" />
            <span>{t.samplePhotoBtn}</span>
          </button>
        </div>
      )}

      {photoState === 'suggested' && (
        <div className="space-y-3 pt-1">
          {/* Classification result banner */}
          <div className="bg-white border-2 border-[#2F6B4F] rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2F6B4F]">
                {t.suggestedMaterial}
              </span>
              <span className="text-xs font-mono font-bold text-[#2F6B4F] bg-[#EAF3EC] px-2 py-0.5 rounded-full">
                {t.confidence}: 91%
              </span>
            </div>
            <div className="text-lg font-bold text-[#191919]">
              {lang === 'mr' ? suggestedMat.nameMr : lang === 'hi' ? suggestedMat.nameHi : suggestedMat.name}
            </div>
            <p className="text-xs text-[#6B6B6B] mt-1">
              {suggestedMat.safetyShort}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id="confirm-material-btn"
              type="button"
              onClick={() => onConfirmSuggested(suggestedMat)}
              className="py-3 px-3 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <Check className="w-4 h-4" />
              <span>{t.confirmBtn}</span>
            </button>

            <button
              id="choose-another-btn"
              type="button"
              onClick={onChooseAnother}
              className="py-3 px-3 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#6B6B6B]" />
              <span>{t.chooseAnother}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

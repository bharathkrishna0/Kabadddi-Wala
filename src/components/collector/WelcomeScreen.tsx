import React from 'react';
import { ArrowRight, Shield, Smartphone, WifiOff } from 'lucide-react';
import { Language } from '../../types';
import { translations } from '../../translations';
import { AudioButton } from '../common/AudioButton';

interface WelcomeScreenProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onContinue: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  currentLanguage,
  onLanguageChange,
  onContinue,
}) => {
  const t = translations[currentLanguage];

  const speechText =
    currentLanguage === 'mr'
      ? 'रिक्लेम-एक्स मध्ये आपले स्वागत आहे. हुशारीने विका आणि अधिकृतरीत्या पुनर्वापर करा. इंटरनेटशिवाय काम करते.'
      : currentLanguage === 'hi'
      ? 'रिक्लेम-एक्स में आपका स्वागत है। समझदारी से बेचें, सही दाम पाएं और अधिकृत रीसायकल करें।'
      : 'Welcome to ReclaimX. Sell smarter, recycle formally. Designed to work offline for informal collectors.';

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-140px)] py-4 px-2">
      <div className="space-y-6">
        {/* Brand identity */}
        <div className="text-center pt-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3EC] text-[#2F6B4F] text-xs font-medium">
            <Shield className="w-3.5 h-3.5" />
            <span>Kabadiwala Connect Trust Layer</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#191919] pt-2">
            ReclaimX
          </h1>
          <p className="text-lg font-semibold text-[#2F6B4F]">
            {t.tagline}
          </p>
          <p className="text-sm text-[#6B6B6B] max-w-xs mx-auto">
            {t.subTagline}
          </p>
        </div>

        {/* Language Selection Grid */}
        <div className="bg-white border border-[#E7E5E0] rounded-2xl p-5 space-y-3 shadow-xs">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            {t.chooseLanguage}
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="lang-mr-btn"
              type="button"
              onClick={() => onLanguageChange('mr')}
              className={`py-3 px-4 rounded-xl border text-center transition cursor-pointer ${
                currentLanguage === 'mr'
                  ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F] font-bold ring-1 ring-[#2F6B4F]'
                  : 'border-[#E7E5E0] hover:bg-[#F4F3EF] text-[#191919] font-medium'
              }`}
            >
              <div className="text-base">मराठी</div>
              <div className="text-xs text-[#6B6B6B]">Marathi</div>
            </button>

            <button
              id="lang-hi-btn"
              type="button"
              onClick={() => onLanguageChange('hi')}
              className={`py-3 px-4 rounded-xl border text-center transition cursor-pointer ${
                currentLanguage === 'hi'
                  ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F] font-bold ring-1 ring-[#2F6B4F]'
                  : 'border-[#E7E5E0] hover:bg-[#F4F3EF] text-[#191919] font-medium'
              }`}
            >
              <div className="text-base">हिन्दी</div>
              <div className="text-xs text-[#6B6B6B]">Hindi</div>
            </button>
          </div>

          <div className="pt-1">
            <button
              id="lang-en-btn"
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`w-full py-2 px-3 rounded-lg border text-center text-xs transition cursor-pointer ${
                currentLanguage === 'en'
                  ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F] font-semibold'
                  : 'border-[#E7E5E0] hover:bg-[#F4F3EF] text-[#6B6B6B]'
              }`}
            >
              English (Preview mode)
            </button>
          </div>

          {/* Audio narration button */}
          <div className="pt-2 flex justify-center">
            <AudioButton
              textToSpeak={speechText}
              lang={currentLanguage}
              label={t.hearScreen}
              variant="outline"
              size="md"
            />
          </div>
        </div>

        {/* Feature badges */}
        <div className="grid grid-cols-2 gap-3 text-xs text-[#6B6B6B]">
          <div className="flex items-center gap-2 p-3 bg-[#F4F3EF] rounded-xl border border-[#E7E5E0]">
            <WifiOff className="w-4 h-4 text-[#2F6B4F] shrink-0" />
            <span>{t.worksOffline}</span>
          </div>
          <div className="flex items-center gap-2 p-3 bg-[#F4F3EF] rounded-xl border border-[#E7E5E0]">
            <Smartphone className="w-4 h-4 text-[#2F6B4F] shrink-0" />
            <span>{t.designedForPhones}</span>
          </div>
        </div>
      </div>

      {/* Continue button */}
      <div className="pt-6">
        <button
          id="welcome-continue-btn"
          type="button"
          onClick={onContinue}
          className="w-full py-3.5 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-base transition flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>{t.continueBtn}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

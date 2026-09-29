import React, { useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { speakText, stopSpeech } from '../../utils/audio';
import { Language } from '../../types';

interface AudioButtonProps {
  textToSpeak: string;
  lang: Language;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'outline' | 'solid' | 'ghost';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  textToSpeak,
  lang,
  label = 'Hear aloud',
  size = 'md',
  className = '',
  variant = 'outline',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopSpeech();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      const ok = speakText(
        textToSpeak,
        lang,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
      if (!ok) {
        setIsPlaying(false);
      }
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-3.5 py-2 text-sm gap-2',
    lg: 'px-4 py-2.5 text-base gap-2.5',
  };

  const variantClasses = {
    outline: 'border border-[#E7E5E0] bg-[#FFFFFF] hover:bg-[#F4F3EF] text-[#191919]',
    solid: 'bg-[#2F6B4F] text-white hover:bg-[#25563F]',
    ghost: 'text-[#2F6B4F] hover:bg-[#EAF3EC]',
  };

  return (
    <button
      id={`audio-btn-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      type="button"
      onClick={handleClick}
      title={isPlaying ? 'Stop reading' : 'Listen in voice'}
      className={`inline-flex items-center justify-center font-medium rounded-xl transition-all cursor-pointer select-none active:scale-[0.98] ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {isPlaying ? (
        <Square className="w-4 h-4 text-[#B24A3A] fill-current animate-pulse" />
      ) : (
        <Volume2 className="w-4 h-4 text-[#2F6B4F]" />
      )}
      <span className="whitespace-nowrap">{isPlaying ? 'Stop' : label}</span>
      {isPlaying && (
        <span className="flex items-center gap-0.5 ml-1">
          <span className="w-1 h-2.5 bg-[#2F6B4F] rounded-full animate-bounce [animation-delay:0ms]"></span>
          <span className="w-1 h-3.5 bg-[#2F6B4F] rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="w-1 h-2 bg-[#2F6B4F] rounded-full animate-bounce [animation-delay:300ms]"></span>
        </span>
      )}
    </button>
  );
};

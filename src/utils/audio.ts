import { Language } from '../types';

let currentUtterance: SpeechSynthesisUtterance | null = null;

export const speakText = (
  text: string,
  lang: Language = 'mr',
  onStart?: () => void,
  onEnd?: () => void
): boolean => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set appropriate BCP-47 language tag
    if (lang === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.92; // Slightly measured for field clarity
    utterance.pitch = 1.0;

    // Pick best available voice for language if possible
    const voices = window.speechSynthesis.getVoices();
    const langCode = lang === 'mr' ? 'mr' : lang === 'hi' ? 'hi' : 'en';
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(langCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      onStart?.();
    };

    utterance.onend = () => {
      onEnd?.();
      currentUtterance = null;
    };

    utterance.onerror = (e) => {
      console.log('Speech playback error or cancelled:', e);
      onEnd?.();
      currentUtterance = null;
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to trigger speech synthesis:', err);
    onEnd?.();
    return false;
  }
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

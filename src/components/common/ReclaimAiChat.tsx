import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  ShieldAlert, 
  TrendingUp, 
  HelpCircle, 
  Cpu, 
  MapPin, 
  ExternalLink,
  ChevronDown,
  Bot
} from 'lucide-react';
import { Language, MaterialInfo, ViewPersona } from '../../types';
import { DecisionResult, evaluateLotDecision } from '../../ml/decisionEngine';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  type: 'text' | 'verdict_card' | 'lot_summary' | 'safety_card';
  text?: string;
  verdictData?: DecisionResult;
  safetyData?: {
    material: string;
    hazardLevel: string;
    tips: string[];
  };
  providerBadge?: string;
  timestamp: string;
}

interface ReclaimAiChatProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  persona: ViewPersona;
  currentMaterial: MaterialInfo;
  currentWeightKg: number;
  offeredRatePerKg?: number;
  onNavigateToScreen?: (screen: any) => void;
}

export const ReclaimAiChat: React.FC<ReclaimAiChatProps> = ({
  isOpen,
  onClose,
  lang,
  persona,
  currentMaterial,
  currentWeightKg,
  offeredRatePerKg,
  onNavigateToScreen,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contextChipVisible, setContextChipVisible] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Evaluate local decision engine for current lot
  const decision: DecisionResult = evaluateLotDecision({
    materialId: currentMaterial.id,
    declaredWeightKg: currentWeightKg,
    offeredRatePerKg: offeredRatePerKg ?? currentMaterial.currentAvg,
    hasBatteryAttached: currentMaterial.id === 'mat_batteries',
  });

  // Initial welcome greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'msg-init-1',
        sender: 'assistant',
        type: 'text',
        text:
          lang === 'mr'
            ? `नमस्कार! मी रिक्लेम-एआय आहे. तुमच्या ${currentMaterial.nameMr} (${currentWeightKg} kg) लॉटबद्दल किंवा योग्य बाजारभावाबाबत काही विचारायचे आहे का?`
            : lang === 'hi'
            ? `नमस्ते! मैं रिक्लेम-एआई हूँ। आपके ${currentMaterial.nameHi} (${currentWeightKg} kg) लॉट या सही दाम के बारे में कुछ भी पूछ सकते हैं।`
            : `Hello! I am Reclaim AI. How can I help you understand your ${currentMaterial.name} (${currentWeightKg} kg) lot and fair market pricing?`,
        providerBadge: 'On-Device Assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      const initialVerdict: ChatMessage = {
        id: 'msg-init-2',
        sender: 'assistant',
        type: 'verdict_card',
        verdictData: decision,
        providerBadge: 'ReclaimX-Price-Anomaly-Edge v1.0',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages([initialGreeting, initialVerdict]);
    }
  }, [isOpen, lang, currentMaterial, currentWeightKg]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      type: 'text',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          materialName: currentMaterial.name,
          weightKg: currentWeightKg,
          offeredRatePerKg: offeredRatePerKg ?? currentMaterial.currentAvg,
          fairPriceMin: decision.fairPriceMin,
          fairPriceLikely: decision.fairPriceLikely,
          fairPriceMax: decision.fairPriceMax,
          verdict: decision.verdict,
          percentDeviation: decision.percentDeviation,
          anomalyScore: decision.anomaly.score,
          reasons: decision.reasonCodes.map(r => r.en),
          recommendedAction: decision.recommendedAction.en,
          language: lang,
          persona,
          userQuery: query,
        }),
      });

      const data = await response.json();

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        type: 'text',
        text: data.explanation || 'Pricing data confirmed by offline model.',
        providerBadge: data.activeProvider || 'AI Decision Engine',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      // Offline fallback reply
      const fallbackText =
        lang === 'mr'
          ? `ऑफलाइन मोड: सध्या इंटरनेट उपलब्ध नाही. तुमच्या ${currentMaterial.nameMr} चा योग्य भाव ₹${decision.fairPriceMin} ते ₹${decision.fairPriceMax}/किलो आहे.`
          : lang === 'hi'
          ? `ऑफ़लाइन मोड: इंटरनेट उपलब्ध नहीं है। आपके ${currentMaterial.nameHi} का उचित दाम ₹${decision.fairPriceMin} से ₹${decision.fairPriceMax}/किग्रा है।`
          : `Offline Mode: Operating via local cache. Fair benchmark for ${currentMaterial.name} is ₹${decision.fairPriceMin}–₹${decision.fairPriceMax}/kg.`;

      const fallbackMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        type: 'text',
        text: fallbackText,
        providerBadge: 'On-Device Rule Engine',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    {
      en: 'Is this price fair?',
      hi: 'क्या यह दाम सही है?',
      mr: 'हा भाव योग्य आहे का?',
    },
    {
      en: 'Explain my circular impact',
      hi: 'मेरा चक्रीय प्रभाव समझाएं',
      mr: 'माझा वर्तुळाकार प्रभाव समजावून सांगा',
    },
    {
      en: 'Why is district score low?',
      hi: 'जिले का स्कोर कम क्यों है?',
      mr: 'जिल्ह्याचा स्कोर कमी का आहे?',
    },
    {
      en: 'Safety handling tips',
      hi: 'सुरक्षा निर्देश दिखाएं',
      mr: 'सुरक्षितता नियम सांगा',
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
      <div 
        className="w-full sm:max-w-md h-[88vh] sm:h-[620px] bg-[#FBFBF9] border border-[#E7E5E0] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-4 py-3 bg-white border-b border-[#E7E5E0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#EAF3EC] text-[#2F6B4F]">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-[#191919]">Reclaim AI</h3>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#EAF3EC] text-[#2F6B4F] font-medium">
                  Trilingual Assistant
                </span>
              </div>
              <p className="text-[11px] text-[#6B6B6B]">The AI Decides · The LLM Explains</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6B6B6B] hover:text-[#191919] hover:bg-[#F4F3EF] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Removable Context Chip */}
        {contextChipVisible && (
          <div className="bg-[#F4F3EF] px-3 py-1.5 border-b border-[#E7E5E0] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#191919] truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B4F]"></span>
              <span className="text-[11px] font-medium">Active Lot:</span>
              <span className="font-semibold text-[11px]">{currentMaterial.name} ({currentWeightKg} kg)</span>
            </div>
            <button
              type="button"
              onClick={() => setContextChipVisible(false)}
              className="text-[#6B6B6B] hover:text-[#191919] text-[10px] font-medium cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Message Bubble */}
              {msg.type === 'text' && (
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#EAF3EC] text-[#191919] rounded-br-xs border border-[#2F6B4F]/20'
                      : 'bg-white text-[#191919] rounded-bl-xs border border-[#E7E5E0]'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              )}

              {/* Rich Message: Verdict Card */}
              {msg.type === 'verdict_card' && msg.verdictData && (
                <div className="max-w-[92%] bg-white border border-[#E7E5E0] rounded-2xl p-3 space-y-2.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B]">
                      Decision Engine Verdict
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        msg.verdictData.verdict === 'FAIR'
                          ? 'bg-[#EAF3EC] text-[#2F6B4F]'
                          : msg.verdictData.verdict === 'UNDERPAID'
                          ? 'bg-[#FFF4DE] text-[#A66A00]'
                          : 'bg-[#FEECEB] text-[#D9381E]'
                      }`}
                    >
                      {msg.verdictData.verdict} ({msg.verdictData.percentDeviation > 0 ? '+' : ''}{msg.verdictData.percentDeviation}%)
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#FBFBF9] border border-[#E7E5E0] flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-[#6B6B6B]">Benchmark Band</div>
                      <div className="text-sm font-bold font-mono text-[#191919]">
                        ₹{msg.verdictData.fairPriceMin} – ₹{msg.verdictData.fairPriceMax} /kg
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-[#6B6B6B]">Confidence</div>
                      <div className="text-xs font-bold font-mono text-[#2F6B4F]">
                        {msg.verdictData.confidenceScore}%
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#191919] space-y-1">
                    <div className="font-semibold text-[#2F6B4F]">
                      Action: {msg.verdictData.recommendedAction[lang] || msg.verdictData.recommendedAction.en}
                    </div>
                    <div className="text-[10px] text-[#6B6B6B]">
                      {msg.verdictData.reasonCodes[0]?.[lang] || msg.verdictData.reasonCodes[0]?.en}
                    </div>
                  </div>
                </div>
              )}

              {/* Attribution / Badge */}
              <div className="flex items-center gap-1.5 mt-1 px-1 text-[10px] text-[#6B6B6B]">
                {msg.providerBadge && (
                  <span className="font-mono bg-[#F4F3EF] px-1.5 py-0.2 rounded border border-[#E7E5E0]">
                    {msg.providerBadge}
                  </span>
                )}
                <span>{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-1.5 bg-white border border-[#E7E5E0] rounded-2xl px-3 py-2 w-28 text-xs text-[#6B6B6B]">
              <span className="w-2 h-2 rounded-full bg-[#2F6B4F] animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-[#2F6B4F] animate-bounce delay-100"></span>
              <span className="w-2 h-2 rounded-full bg-[#2F6B4F] animate-bounce delay-200"></span>
              <span className="text-[10px] ml-1">Analyzing…</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-3 py-1.5 flex gap-1.5 overflow-x-auto bg-[#FBFBF9] border-t border-[#E7E5E0] no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(p[lang] || p.en)}
              className="text-[11px] font-medium whitespace-nowrap bg-white hover:bg-[#EAF3EC] text-[#191919] border border-[#E7E5E0] px-2.5 py-1 rounded-full cursor-pointer transition shrink-0"
            >
              {p[lang] || p.en}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-2.5 bg-white border-t border-[#E7E5E0] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              lang === 'mr'
                ? 'काहीही विचारा (मराठीत किंवा इंग्रजीत)…'
                : lang === 'hi'
                ? 'कुछ भी पूछें (हिंदी या अंग्रेजी में)…'
                : 'Ask anything about price or safety…'
            }
            className="flex-1 text-xs bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl px-3 py-2 text-[#191919] focus:outline-none focus:border-[#2F6B4F]"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white disabled:opacity-40 cursor-pointer transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

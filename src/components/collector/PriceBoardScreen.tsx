import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Cpu, Cable, BatteryCharging, Cog, Monitor, Tv, Layers, Calendar, Volume2 } from 'lucide-react';
import { Language, MaterialInfo } from '../../types';
import { translations } from '../../translations';
import { MATERIALS, PCB_30DAY_TREND } from '../../mockData';
import { AudioButton } from '../common/AudioButton';

interface PriceBoardScreenProps {
  onBack: () => void;
  lang: Language;
}

export const PriceBoardScreen: React.FC<PriceBoardScreenProps> = ({ onBack, lang }) => {
  const t = translations[lang];
  const [selectedMatId, setSelectedMatId] = useState('mat_pcb');

  const selectedMat = MATERIALS.find(m => m.id === selectedMatId) || MATERIALS[0];

  const getIcon = (pictogram: string) => {
    switch (pictogram) {
      case 'cpu': return <Cpu className="w-5 h-5" />;
      case 'cable': return <Cable className="w-5 h-5" />;
      case 'battery-charging': return <BatteryCharging className="w-5 h-5" />;
      case 'cog': return <Cog className="w-5 h-5" />;
      case 'monitor': return <Monitor className="w-5 h-5" />;
      case 'tv': return <Tv className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  const speechText =
    lang === 'mr'
      ? `पुणे स्थानिक दर फलक: पीसीबी १५० ते १९० रुपये, तांब्याच्या केबल्स ७० ते ९५ रुपये, बॅटऱ्या ९० ते १२५ रुपये किलो. सर्व दर अधिकृत व्यवहारांवर आधारित.`
      : lang === 'hi'
      ? `पुणे स्थानीय दाम सूची: पीसीबी ₹150 से ₹190, केबल्स ₹70 से ₹95, बैटरी ₹90 से ₹125 प्रति किग्रा।`
      : `Pune local e-waste price board: PCBs ₹150–₹190, Cables ₹70–₹95, Batteries ₹90–₹125 per kg. Based on verified transactions.`;

  // Construct SVG points for 30-day trend
  const minP = 150;
  const maxP = 190;
  const svgWidth = 320;
  const svgHeight = 120;

  const points = PCB_30DAY_TREND.map((pt, idx) => {
    const x = (idx / (PCB_30DAY_TREND.length - 1)) * (svgWidth - 40) + 20;
    const y = svgHeight - 25 - ((pt.price - minP) / (maxP - minP)) * (svgHeight - 40);
    return { x, y, ...pt };
  });

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - 15} L ${points[0].x} ${svgHeight - 15} Z`;

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
          Live Rate Transparency
        </span>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#191919]">{t.localPriceBoard}</h1>
          <p className="text-xs text-[#6B6B6B]">Pune Hub · Updated Today 10:42 AM</p>
        </div>
        <AudioButton
          textToSpeak={speechText}
          lang={lang}
          label={t.hearScreen}
          size="sm"
        />
      </div>

      {/* Materials List */}
      <div className="space-y-2">
        {MATERIALS.map((mat) => {
          const isSelected = selectedMatId === mat.id;
          return (
            <div
              key={mat.id}
              onClick={() => setSelectedMatId(mat.id)}
              className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'border-2 border-[#2F6B4F] bg-[#EAF3EC]/40 shadow-xs'
                  : 'border-[#E7E5E0] bg-white hover:bg-[#F4F3EF]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#2F6B4F] text-white' : 'bg-[#F4F3EF] text-[#2F6B4F]'}`}>
                  {getIcon(mat.pictogram)}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#191919]">
                    {lang === 'mr' ? mat.nameMr : lang === 'hi' ? mat.nameHi : mat.name}
                  </div>
                  <div className="text-[10px] text-[#6B6B6B]">
                    Current Average: ₹{mat.currentAvg}/kg
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-[#2F6B4F] font-mono">
                  ₹{mat.basePriceMin} – ₹{mat.basePriceMax}
                </div>
                <div className="text-[10px] text-[#6B6B6B]">per kg</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 30-Day Trend Chart Card */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#2F6B4F]" />
            <h2 className="text-xs font-bold text-[#191919]">
              {selectedMat.name} — 30-Day Rate Trend
            </h2>
          </div>
          <span className="text-[10px] text-[#6B6B6B]">Based on 142 handovers</span>
        </div>

        {/* SVG Chart */}
        <div className="w-full bg-[#FBFBF9] rounded-xl p-2 border border-[#E7E5E0] overflow-hidden">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-32">
            {/* Horizontal Grid lines */}
            <line x1="20" y1="20" x2={svgWidth - 20} y2="20" stroke="#E7E5E0" strokeDasharray="3 3" />
            <line x1="20" y1="55" x2={svgWidth - 20} y2="55" stroke="#E7E5E0" strokeDasharray="3 3" />
            <line x1="20" y1="90" x2={svgWidth - 20} y2="90" stroke="#E7E5E0" strokeDasharray="3 3" />

            <text x="2" y="24" fontSize="9" fill="#6B6B6B" fontFamily="monospace">₹190</text>
            <text x="2" y="59" fontSize="9" fill="#6B6B6B" fontFamily="monospace">₹170</text>
            <text x="2" y="94" fontSize="9" fill="#6B6B6B" fontFamily="monospace">₹150</text>

            {/* Filled Area */}
            <path d={areaD} fill="#2F6B4F" fillOpacity="0.08" />

            {/* Line Path */}
            <path d={pathD} fill="none" stroke="#2F6B4F" strokeWidth="2.5" strokeLinecap="round" />

            {/* Data Dots */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#FFFFFF"
                stroke="#2F6B4F"
                strokeWidth="2"
              />
            ))}
          </svg>

          <div className="flex justify-between text-[10px] text-[#6B6B6B] px-4 pt-1 font-mono">
            <span>Day 1 (17 Aug)</span>
            <span>Day 15</span>
            <span>Today (16 Sep)</span>
          </div>
        </div>

        <p className="text-[11px] text-[#6B6B6B]">
          Rates reflect real settled prices from MPCB authorised aggregators in Hadapsar and Bhosari industrial corridors.
        </p>
      </div>
    </div>
  );
};

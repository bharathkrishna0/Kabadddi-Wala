import React, { useState } from 'react';
import { 
  Smartphone, 
  BatteryCharging, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Clock, 
  QrCode,
  Recycle,
  HelpCircle
} from 'lucide-react';
import { Language, CitizenHandoverRecord } from '../../types';

interface CitizenImpactViewProps {
  lang: Language;
  onSwitchToCollector: () => void;
  onOpenAssistant?: (query?: string) => void;
}

export const CitizenImpactView: React.FC<CitizenImpactViewProps> = ({
  lang,
  onSwitchToCollector,
  onOpenAssistant,
}) => {
  const [activeTab, setActiveTab] = useState<'trace' | 'impact'>('trace');

  // Household demo handovers
  const demoCitizenItems: CitizenHandoverRecord[] = [
    {
      id: 'cit-01',
      itemType: 'Redmi Note 9 + Old Laptop Battery',
      itemCategory: 'Smartphones & Energy Storage',
      weightKg: 1.4,
      date: '14 Sep 2026',
      collectorName: 'Ramesh Sonawane (Verified Collector)',
      recyclerName: 'Greenloop Recycling Pvt Ltd',
      status: 'recovered_into_raw_materials',
      lifecycleSteps: [
        { step: 'Collected at Doorstep', time: '14 Sep, 10:20 AM', completed: true, location: 'Kothrud, Pune' },
        { step: 'Two-Party Verified Weigh-in', time: '14 Sep, 12:45 PM', completed: true, location: 'Hadapsar Facility' },
        { step: 'Dismantled & Battery Neutralized', time: '15 Sep, 03:00 PM', completed: true, location: 'MPCB Authorized Yard' },
        { step: 'Copper & Cobalt Channelled to Smelter', time: '16 Sep, 09:30 AM', completed: true, location: 'Authorized Smelter' },
      ],
      personalDiversionCo2Kg: 4.8,
      toxicChemicalsKeptFromWaterGrams: 85,
      traceToken: 'EPR-CIT-2026-9921',
    },
  ];

  const item = demoCitizenItems[0];

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 space-y-5 animate-fade-in pb-20">
      {/* Top Banner & Switch */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-[#EAF3EC] text-[#2F6B4F]">
            <Recycle className="w-5 h-5" />
          </span>
          <div>
            <h1 className="text-lg font-bold text-[#191919]">Citizen E-Waste Handover Tracker</h1>
            <p className="text-xs text-[#6B6B6B]">Follow what happened to your old electronics</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwitchToCollector}
          className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] cursor-pointer"
        >
          Collector App →
        </button>
      </div>

      {/* Hero Impact Badge for Household */}
      <div className="bg-[#FBFBF9] border-2 border-[#2F6B4F] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F6B4F]">
            Handover Certificate ✓ Verified
          </span>
          <span className="text-[10px] font-mono text-[#6B6B6B] bg-white px-2 py-0.5 rounded border border-[#E7E5E0]">
            Token: {item.traceToken}
          </span>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#191919]">{item.itemType}</h2>
          <p className="text-xs text-[#6B6B6B]">
            Given to <span className="font-semibold text-[#191919]">{item.collectorName}</span> on {item.date}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <div className="p-2.5 bg-white rounded-xl border border-[#E7E5E0]">
            <span className="text-[10px] text-[#6B6B6B]">CO₂ Emissions Prevented</span>
            <div className="text-lg font-bold font-mono text-[#2F6B4F]">{item.personalDiversionCo2Kg} kg</div>
          </div>
          <div className="p-2.5 bg-white rounded-xl border border-[#E7E5E0]">
            <span className="text-[10px] text-[#6B6B6B]">Lead/Acid Kept From Groundwater</span>
            <div className="text-lg font-bold font-mono text-[#191919]">{item.toxicChemicalsKeptFromWaterGrams} g</div>
          </div>
        </div>
      </div>

      {/* Lifecycle Timeline */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
            Verified Handover Journey
          </h3>
          <span className="text-[10px] text-[#2F6B4F] font-semibold bg-[#EAF3EC] px-2 py-0.5 rounded-full">
            100% Formal Recycling
          </span>
        </div>

        <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E7E5E0]">
          {item.lifecycleSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 relative z-10">
              <span className="w-7 h-7 rounded-full bg-[#2F6B4F] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div className="flex-1 bg-[#FBFBF9] border border-[#E7E5E0] p-2.5 rounded-xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#191919]">{step.step}</h4>
                  <span className="text-[10px] font-mono text-[#6B6B6B]">{step.time}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#6B6B6B] mt-0.5">
                  <MapPin className="w-3 h-3 text-[#2F6B4F]" />
                  <span>{step.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assistant Link */}
      {onOpenAssistant && (
        <button
          type="button"
          onClick={() => onOpenAssistant('What happened to my old battery after handover?')}
          className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#EAF3EC] text-[#2F6B4F] border border-[#2F6B4F]/30 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow-2xs"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Reclaim AI: "How does my old phone get recycled safely?"</span>
        </button>
      )}
    </div>
  );
};

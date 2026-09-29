import React, { useState } from 'react';
import { BarChart3, Database, RefreshCw, ShieldCheck, ArrowRight, TrendingUp, Layers, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { STRUCTURED_DATASETS } from '../../mockData';

interface DataFlywheelViewProps {
  onSwitchToCollector: () => void;
}

export const DataFlywheelView: React.FC<DataFlywheelViewProps> = ({ onSwitchToCollector }) => {
  const [selectedDatasetId, setSelectedDatasetId] = useState(STRUCTURED_DATASETS[0].id);

  const selectedDs = STRUCTURED_DATASETS.find(d => d.id === selectedDatasetId) || STRUCTURED_DATASETS[0];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E5E0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#EAF3EC] text-[#2F6B4F]">
              <BarChart3 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#191919]">Intelligence Layer & Data Flywheel</h1>
              <p className="text-xs text-[#6B6B6B]">
                How informal transactions feed fair-price discovery and formal EPR compliance
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onSwitchToCollector}
          className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] cursor-pointer"
        >
          ← Back to Collector App
        </button>
      </div>

      {/* Program-Level Impact Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Formal Lots</span>
          <div className="text-xl font-bold font-mono text-[#191919] mt-0.5">1,248</div>
          <span className="text-[10px] text-[#2F6B4F]">From informal sector</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-[#2F6B4F] font-semibold">Verified Proofs</span>
          <div className="text-xl font-bold font-mono text-[#2F6B4F] mt-0.5">1,192</div>
          <span className="text-[10px] text-[#2F6B4F]">95.5% Dual signed</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Material Volume</span>
          <div className="text-xl font-bold font-mono text-[#191919] mt-0.5">18.4 tonnes</div>
          <span className="text-[10px] text-[#6B6B6B]">Safely diverted</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Active Collectors</span>
          <div className="text-xl font-bold font-mono text-[#191919] mt-0.5">86</div>
          <span className="text-[10px] text-[#6B6B6B]">Pune Hub</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-3.5 shadow-2xs">
          <span className="text-[11px] text-[#6B6B6B]">Authorised Recyclers</span>
          <div className="text-xl font-bold font-mono text-[#191919] mt-0.5">12</div>
          <span className="text-[10px] text-[#6B6B6B]">MPCB audited</span>
        </div>
      </div>

      {/* The Core Visual Data Flywheel */}
      <div className="bg-white border-2 border-[#2F6B4F] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2F6B4F]" />
            <h2 className="text-base font-bold text-[#191919]">The Self-Reinforcing Intelligence Flywheel</h2>
          </div>
          <span className="text-xs font-mono font-semibold bg-[#EAF3EC] text-[#2F6B4F] px-2.5 py-1 rounded-full">
            No Cloud Dependency on Field
          </span>
        </div>

        <p className="text-xs text-[#6B6B6B] max-w-2xl">
          Every signed handover captures verified transaction data (declared weight vs scale weight, fair prices, recycler compliance). This continually trains the lightweight edge algorithms protecting collectors from asymmetry.
        </p>

        {/* Circular Flywheel Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2 text-center text-xs">
          <div className="p-3 bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#2F6B4F] mb-1">01</span>
            <span className="font-bold text-[#191919]">Lot Photo</span>
            <span className="text-[10px] text-[#6B6B6B] mt-0.5">Edge MobileNet</span>
          </div>

          <div className="p-3 bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#2F6B4F] mb-1">02</span>
            <span className="font-bold text-[#191919]">Weight</span>
            <span className="text-[10px] text-[#6B6B6B] mt-0.5">Scale validation</span>
          </div>

          <div className="p-3 bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#2F6B4F] mb-1">03</span>
            <span className="font-bold text-[#191919]">Quote</span>
            <span className="text-[10px] text-[#6B6B6B] mt-0.5">Local range IQR</span>
          </div>

          <div className="p-3 bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#2F6B4F] mb-1">04</span>
            <span className="font-bold text-[#191919]">Recycler</span>
            <span className="text-[10px] text-[#6B6B6B] mt-0.5">Compliance match</span>
          </div>

          <div className="p-3 bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-[#2F6B4F] mb-1">05</span>
            <span className="font-bold text-[#191919]">Dual Sign</span>
            <span className="text-[10px] text-[#6B6B6B] mt-0.5">Ed25519 token</span>
          </div>

          <div className="p-3 bg-[#EAF3EC] border border-[#2F6B4F] rounded-xl flex flex-col items-center justify-center">
            <RefreshCw className="w-5 h-5 text-[#2F6B4F] mb-1 animate-spin [animation-duration:8s]" />
            <span className="font-bold text-[#2F6B4F]">Intelligence</span>
            <span className="text-[10px] text-[#2F6B4F] mt-0.5">Trains next quote ↺</span>
          </div>
        </div>
      </div>

      {/* Six Structured Datasets Viewer */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-[#2F6B4F]" />
          <h2 className="text-sm font-bold text-[#191919]">Six Structured Datasets Specified in Proposal</h2>
        </div>

        {/* Dataset Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {STRUCTURED_DATASETS.map((ds) => (
            <button
              key={ds.id}
              type="button"
              onClick={() => setSelectedDatasetId(ds.id)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                selectedDatasetId === ds.id
                  ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]'
                  : 'border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919]'
              }`}
            >
              <div className="text-xs font-bold truncate">{ds.title}</div>
            </button>
          ))}
        </div>

        {/* Selected Dataset Detail */}
        <div className="p-4 bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#191919]">{selectedDs.title}</h3>
            <span className="text-[10px] font-mono text-[#2F6B4F] bg-[#EAF3EC] px-2 py-0.5 rounded">
              Active Schema v1.2
            </span>
          </div>

          <p className="text-[#6B6B6B]">{selectedDs.description}</p>

          <div>
            <span className="font-bold text-[#191919] block mb-1">Role in Model & Engine:</span>
            <p className="text-[#2F6B4F] font-medium bg-[#EAF3EC]/60 p-2.5 rounded-lg border border-[#2F6B4F]/20">
              {selectedDs.roleInIntelligence}
            </p>
          </div>

          <div>
            <span className="font-bold text-[#191919] block mb-1">Key Fields Collected:</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedDs.fields.map((field, i) => (
                <span key={i} className="font-mono text-[11px] bg-white px-2 py-1 rounded border border-[#E7E5E0] text-[#191919]">
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

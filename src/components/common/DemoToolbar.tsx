import React from 'react';
import { X, RotateCcw, WifiOff, Wifi, Smartphone, Building2, BarChart3, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { ViewPersona, ScreenId } from '../../types';

interface DemoToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  activePersona: ViewPersona;
  onSelectPersona: (persona: ViewPersona) => void;
  onResetJourney: () => void;
  onLoadSampleLot: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onQuickNavigate: (screen: ScreenId) => void;
  onSimulateRecyclerConfirm: () => void;
}

export const DemoToolbar: React.FC<DemoToolbarProps> = ({
  isOpen,
  onClose,
  activePersona,
  onSelectPersona,
  onResetJourney,
  onLoadSampleLot,
  isOffline,
  onToggleOffline,
  onQuickNavigate,
  onSimulateRecyclerConfirm,
}) => {
  if (!isOpen) return null;

  const demoScreens: { id: ScreenId; label: string; stage: string }[] = [
    { id: 'welcome', label: '1. Welcome / Language', stage: 'Onboarding' },
    { id: 'setup', label: '2. Quick Setup (No Aadhaar)', stage: 'Onboarding' },
    { id: 'home', label: '3. Home Dashboard', stage: 'Core' },
    { id: 'camera', label: '4. Lot Photo & AI Detect', stage: 'Create Lot' },
    { id: 'material_confirm', label: '5. Material Confirmation', stage: 'Create Lot' },
    { id: 'weight_entry', label: '6. Weight Verification Slider', stage: 'Create Lot' },
    { id: 'fair_price', label: '7. Fair Price Discovery', stage: 'Valuation' },
    { id: 'recycler_compare', label: '8. Authorised Recyclers + Low-Price Alert', stage: 'Matching' },
    { id: 'handover_prep', label: '9. Offline Handover Prep', stage: 'Handover' },
    { id: 'signed_qr', label: '10. Signed QR Receipt', stage: 'Handover' },
    { id: 'recycler_confirm', label: '11. Recycler Dual Weighing', stage: 'Handover' },
    { id: 'two_party_proof', label: '12. Two-Party Handover Proof', stage: 'Traceability' },
    { id: 'earnings', label: '13. Earnings & Ledger', stage: 'Records' },
    { id: 'price_board', label: '14. Local Price Board & 30d Trend', stage: 'Market' },
    { id: 'safety', label: '15. Safety Guidelines', stage: 'Guidance' },
    { id: 'offline_explain', label: '16. Offline Resilience Guarantee', stage: 'System' },
    { id: 'sync_state', label: '17. Online Sync Flow', stage: 'System' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 animate-fade-in">
      <div className="bg-white border border-[#E7E5E0] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2F6B4F]">ReclaimX Prototype Controls</span>
            <h2 className="text-lg font-bold text-[#191919]">Demo Workflow Replay</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#6B6B6B] hover:text-[#191919] hover:bg-[#F4F3EF] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona Switcher */}
        <div className="mt-4">
          <label className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide block mb-2">
            Switch Perspective / Portal
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                onSelectPersona('collector');
                onClose();
              }}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                activePersona === 'collector'
                  ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]'
                  : 'border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919]'
              }`}
            >
              <Smartphone className="w-4 h-4 mb-1" />
              <div className="text-xs font-semibold">Collector App</div>
              <div className="text-[10px] text-[#6B6B6B]">Field Mobile View</div>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectPersona('recycler');
                onClose();
              }}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                activePersona === 'recycler'
                  ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]'
                  : 'border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919]'
              }`}
            >
              <Building2 className="w-4 h-4 mb-1" />
              <div className="text-xs font-semibold">Recycler Portal</div>
              <div className="text-[10px] text-[#6B6B6B]">Weigh-in & Settlement</div>
            </button>

            <button
              type="button"
              onClick={() => {
                onSelectPersona('admin');
                onClose();
              }}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                activePersona === 'admin'
                  ? 'border-[#2F6B4F] bg-[#EAF3EC] text-[#2F6B4F]'
                  : 'border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919]'
              }`}
            >
              <BarChart3 className="w-4 h-4 mb-1" />
              <div className="text-xs font-semibold">AI Flywheel</div>
              <div className="text-[10px] text-[#6B6B6B]">6 Datasets & Analytics</div>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-4 pt-3 border-t border-[#E7E5E0]">
          <label className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide block mb-2">
            One-Click Scenarios
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                onLoadSampleLot();
                onClose();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-xs font-medium text-[#191919] cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#2F6B4F]" />
              <span>Use Sample PCB Lot (18.4 kg)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onToggleOffline();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-xs font-medium text-[#191919] cursor-pointer"
            >
              {isOffline ? <Wifi className="w-4 h-4 text-[#2F6B4F]" /> : <WifiOff className="w-4 h-4 text-[#A66A00]" />}
              <span>{isOffline ? 'Switch Online' : 'Simulate Offline'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onSimulateRecyclerConfirm();
                onClose();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-xs font-medium text-[#191919] cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2F6B4F]" />
              <span>Simulate Recycler Sign</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onResetJourney();
                onClose();
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-xs font-medium text-[#B24A3A] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Journey to Start</span>
            </button>
          </div>
        </div>

        {/* Screen Jump List */}
        <div className="mt-4 pt-3 border-t border-[#E7E5E0]">
          <label className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wide block mb-2">
            Jump to Exact Screen
          </label>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {demoScreens.map((screen) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => {
                  onSelectPersona('collector');
                  onQuickNavigate(screen.id);
                  onClose();
                }}
                className="w-full flex items-center justify-between p-2 rounded-lg text-xs hover:bg-[#F4F3EF] text-left text-[#191919] cursor-pointer transition border border-transparent hover:border-[#E7E5E0]"
              >
                <span>{screen.label}</span>
                <div className="flex items-center gap-1.5 text-[10px] text-[#6B6B6B]">
                  <span className="bg-[#F4F3EF] px-1.5 py-0.5 rounded">{screen.stage}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

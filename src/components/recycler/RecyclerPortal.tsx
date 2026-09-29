import React, { useState } from 'react';
import { Building2, ShieldCheck, Scale, CheckCircle2, Clock, AlertCircle, ArrowLeft, RefreshCw, FileText, Check, Cpu, Cable, BatteryCharging } from 'lucide-react';
import { LotTransaction } from '../../types';

interface RecyclerPortalProps {
  transactions: LotTransaction[];
  onConfirmLotByRecycler: (lotId: string, verifiedKg: number) => void;
  onSwitchToCollector: () => void;
}

export const RecyclerPortal: React.FC<RecyclerPortalProps> = ({
  transactions,
  onConfirmLotByRecycler,
  onSwitchToCollector,
}) => {
  const [selectedLotForConfirm, setSelectedLotForConfirm] = useState<LotTransaction | null>(null);
  const [verifiedScaleInput, setVerifiedScaleInput] = useState('18.2');

  const pendingLots = transactions.filter(t => t.status === 'signed' || t.status === 'priced');
  const completedLots = transactions.filter(t => t.status === 'confirmed' || t.status === 'paid');

  const handleOpenConfirm = (lot: LotTransaction) => {
    setSelectedLotForConfirm(lot);
    setVerifiedScaleInput((lot.verifiedWeightKg || (lot.declaredWeightKg - 0.2)).toFixed(1));
  };

  const handleConfirmSubmit = () => {
    if (!selectedLotForConfirm) return;
    const kg = parseFloat(verifiedScaleInput) || selectedLotForConfirm.declaredWeightKg;
    onConfirmLotByRecycler(selectedLotForConfirm.id, kg);
    setSelectedLotForConfirm(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E5E0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#EAF3EC] text-[#2F6B4F]">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-[#191919]">Greenloop Recycling Pvt Ltd</h1>
              <p className="text-xs text-[#6B6B6B]">
                MPCB Authorised E-Waste Dismantler · Hadapsar Industrial Hub, Pune
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2F6B4F] bg-[#EAF3EC] px-3 py-1 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            <span>MPCB/RO-PUN/2024-88</span>
          </span>

          <button
            type="button"
            onClick={onSwitchToCollector}
            className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] cursor-pointer"
          >
            ← View Field App
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#E7E5E0] rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-[#6B6B6B]">Today's Inbound</span>
          <div className="text-2xl font-bold text-[#191919] mt-1 font-mono">18 lots</div>
          <span className="text-[11px] text-[#2F6B4F] font-medium">+4 scheduled pickup</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-[#6B6B6B]">Pending Scale Weigh-in</span>
          <div className="text-2xl font-bold text-[#A66A00] mt-1 font-mono">
            {pendingLots.length} lots
          </div>
          <span className="text-[11px] text-[#A66A00]">Requires dual sign</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-[#6B6B6B]">Total Verified Weight</span>
          <div className="text-2xl font-bold text-[#2F6B4F] mt-1 font-mono">348 kg</div>
          <span className="text-[11px] text-[#6B6B6B]">EPR compliant mass</span>
        </div>

        <div className="bg-white border border-[#E7E5E0] rounded-xl p-4 shadow-2xs">
          <span className="text-xs text-[#6B6B6B]">Active Collector Network</span>
          <div className="text-2xl font-bold text-[#191919] mt-1 font-mono">23 collectors</div>
          <span className="text-[11px] text-[#2F6B4F]">Zero middleman margin</span>
        </div>
      </div>

      {/* Inbound Lots Table */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-[#E7E5E0] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#191919]">Inbound Handover Queue</h2>
            <p className="text-xs text-[#6B6B6B]">Digital scale verification and cash handover settlement</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F4F3EF] text-[#6B6B6B] border-b border-[#E7E5E0] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Lot ID</th>
                <th className="py-3 px-4">Material</th>
                <th className="py-3 px-4">Scale Weight</th>
                <th className="py-3 px-4">Quoted Payout</th>
                <th className="py-3 px-4">Collector</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E0]">
              {transactions.map((tx) => {
                const isConfirmed = tx.status === 'confirmed' || tx.status === 'paid';
                return (
                  <tr key={tx.id} className="hover:bg-[#FBFBF9] transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#191919]">
                      {tx.lotCode}
                    </td>
                    <td className="py-3 px-4 font-medium text-[#191919]">
                      {tx.materialName}
                    </td>
                    <td className="py-3 px-4 font-mono">
                      {tx.verifiedWeightKg || tx.declaredWeightKg} kg
                      {tx.weightDifferenceKg !== undefined && (
                        <span className="text-[10px] text-[#6B6B6B] block">
                          Δ {tx.weightDifferenceKg > 0 ? `+${tx.weightDifferenceKg}` : tx.weightDifferenceKg} kg
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#191919]">
                      ₹ {(tx.finalPrice || tx.estimatedPayout).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-[#6B6B6B]">
                      Collector #2048
                    </td>
                    <td className="py-3 px-4">
                      {isConfirmed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F6B4F] bg-[#EAF3EC] px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" /> Confirmed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A66A00] bg-[#FFF4DE] px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" /> Awaiting Scale
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {isConfirmed ? (
                        <span className="text-[11px] font-mono text-[#6B6B6B]">{tx.traceabilityId}</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenConfirm(tx)}
                          className="py-1.5 px-3 rounded-lg bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-xs cursor-pointer"
                        >
                          Weigh & Sign
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recycler Confirmation Modal */}
      {selectedLotForConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-[#E7E5E0] rounded-2xl p-5 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E0]">
              <div>
                <span className="text-xs font-semibold text-[#2F6B4F] uppercase">Scale Weigh-In</span>
                <h3 className="text-lg font-bold font-mono text-[#191919]">{selectedLotForConfirm.lotCode}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLotForConfirm(null)}
                className="text-xs text-[#6B6B6B] hover:text-[#191919] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Material:</span>
                <span className="font-bold text-[#191919]">{selectedLotForConfirm.materialName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B6B6B]">Collector Declared:</span>
                <span className="font-mono font-bold text-[#191919]">{selectedLotForConfirm.declaredWeightKg} kg</span>
              </div>

              {/* Verified Scale Input */}
              <div className="p-3 bg-[#EAF3EC] rounded-xl space-y-1.5">
                <label className="font-bold text-[#2F6B4F] block">
                  Certified Scale Reading (kg)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={verifiedScaleInput}
                    onChange={(e) => setVerifiedScaleInput(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-[#E7E5E0] font-mono text-sm font-bold text-[#191919]"
                  />
                </div>
                <span className="text-[10px] text-[#2F6B4F]">
                  MPCB Calibration Certificate #PUN-SCALE-4412
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#E7E5E0]">
                <span>Settlement Payout (@ ₹{selectedLotForConfirm.offeredRatePerKg}/kg):</span>
                <span className="font-mono text-[#2F6B4F] text-base">
                  ₹ {Math.round((parseFloat(verifiedScaleInput) || 0) * selectedLotForConfirm.offeredRatePerKg).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmSubmit}
              className="w-full py-3 px-4 rounded-xl bg-[#2F6B4F] hover:bg-[#25563F] text-white font-semibold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sign Recycler Handover Token</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

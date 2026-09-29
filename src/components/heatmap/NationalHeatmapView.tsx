import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Layers, 
  BarChart3, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Sparkles, 
  Building2, 
  Cpu, 
  Compass, 
  Eye, 
  Info,
  Filter,
  FileSpreadsheet
} from 'lucide-react';
import { 
  DistrictMetrics, 
  HeatmapMetric, 
  PolicyInsight, 
  LotTransaction, 
  Language 
} from '../../types';
import { aggregateDistrictMetrics, generateDistrictPolicyInsights, DISTRICT_NAMES } from '../../lib/analytics/districtAggregator';
import { SEED_DISTRICT_TRANSACTIONS, DEMO_DATASET_LABEL } from '../../data/demo/demoDistricts';
import { calculateDistrictCircularityBreakdown } from '../../lib/analytics/circularScore';

interface NationalHeatmapViewProps {
  transactions: LotTransaction[];
  lang: Language;
  onSwitchToCollector: () => void;
  onOpenAssistant?: (query?: string) => void;
}

export const NationalHeatmapView: React.FC<NationalHeatmapViewProps> = ({
  transactions,
  lang,
  onSwitchToCollector,
  onOpenAssistant,
}) => {
  const [selectedMetric, setSelectedMetric] = useState<HeatmapMetric>('formal_route_pct');
  const [selectedDistrictCode, setSelectedDistrictCode] = useState<string>('IN-MH-PU');
  const [viewMode, setViewMode] = useState<'map' | 'table'>('map');

  // Combine real user transactions with synthetic demo transactions
  const combinedTransactions = useMemo(() => {
    return [...transactions, ...SEED_DISTRICT_TRANSACTIONS];
  }, [transactions]);

  // Aggregate metrics
  const districtMetricsMap = useMemo(() => {
    return aggregateDistrictMetrics(combinedTransactions);
  }, [combinedTransactions]);

  const districtList = useMemo(() => {
    return Object.values(districtMetricsMap);
  }, [districtMetricsMap]);

  const selectedDistrict = districtMetricsMap[selectedDistrictCode] || districtList[0];

  const policyInsights = useMemo(() => {
    if (!selectedDistrict || selectedDistrict.isSuppressed) return [];
    return generateDistrictPolicyInsights(selectedDistrict);
  }, [selectedDistrict]);

  const circularityBreakdown = useMemo(() => {
    if (!selectedDistrict || selectedDistrict.isSuppressed) return null;
    return calculateDistrictCircularityBreakdown(
      selectedDistrict.formalRoutePct,
      selectedDistrict.totalTrackedKg > 0 ? 88 : 0,
      selectedDistrict.materialComposition.find((m) => m.materialId === 'mat_batteries') ? 72 : 45,
      68
    );
  }, [selectedDistrict]);

  // Metric selector metadata
  const metricOptions: { id: HeatmapMetric; label: string; unit: string; description: string }[] = [
    {
      id: 'formal_route_pct',
      label: 'Formal-Route Share',
      unit: '%',
      description: 'Share of collected e-waste reaching MPCB registered dismantlers vs informal aggregators.',
    },
    {
      id: 'kg_collected',
      label: 'Tracked Volume',
      unit: 'kg',
      description: 'Total verified e-waste volume logged via two-party signatures.',
    },
    {
      id: 'unserved_score',
      label: 'Unserved Deficit',
      unit: '/100',
      description: 'Index of collection demand vs registered dismantler capacity (100 = critical deficit).',
    },
    {
      id: 'critical_material_kg',
      label: 'Recoverable Copper',
      unit: 'kg',
      description: 'Estimated recoverable critical raw materials based on UN GESP yields.',
    },
    {
      id: 'leakage_risk_pct',
      label: 'Leakage Risk Signal',
      unit: '%',
      description: 'Lots with weight discrepancies or unverified informal trader drop-offs.',
    },
  ];

  // Helper to extract metric value for color scale
  const getMetricValue = (d: DistrictMetrics): number => {
    if (d.isSuppressed) return 0;
    switch (selectedMetric) {
      case 'formal_route_pct': return d.formalRoutePct;
      case 'kg_collected': return d.totalTrackedKg;
      case 'unserved_score': return d.unservedScore;
      case 'critical_material_kg': return d.criticalMaterialsRecoverableKg.copperKg;
      case 'leakage_risk_pct': return d.leakageSignals.leakageRatePct;
    }
  };

  // Color mapper based on metric thresholds
  const getDistrictColor = (d: DistrictMetrics): string => {
    if (d.isSuppressed) return '#D1D5DB'; // Gray for suppressed
    const val = getMetricValue(d);

    if (selectedMetric === 'formal_route_pct') {
      if (val >= 80) return '#2F6B4F'; // High formal (emerald)
      if (val >= 50) return '#529672';
      if (val >= 30) return '#E09F3E'; // Warning
      return '#B24A3A'; // Low formal (crimson)
    }

    if (selectedMetric === 'unserved_score' || selectedMetric === 'leakage_risk_pct') {
      if (val >= 60) return '#B24A3A'; // High risk/deficit (crimson)
      if (val >= 30) return '#E09F3E';
      return '#2F6B4F'; // Low risk (emerald)
    }

    // Default sequential green
    if (val >= 100) return '#2F6B4F';
    if (val >= 40) return '#529672';
    return '#97C1A9';
  };

  // Export CSV summary
  const handleExportCSV = () => {
    const headers = 'District,Total Tracked Kg,Formal Route %,Circularity Score,Unserved Score,Copper Kg,Leakage Risk\n';
    const rows = districtList
      .map(d => `${d.districtName},${d.totalTrackedKg},${d.formalRoutePct}%,${d.circularityScore},${d.unservedScore},${d.criticalMaterialsRecoverableKg.copperKg},${d.leakageSignals.leakageRiskLevel}`)
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reclaimx_national_ewaste_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 pb-20 animate-fade-in">
      {/* Top Authority Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E7E5E0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#2F6B4F] text-white">
              <Compass className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#191919]">
                  National E-Waste Intelligence Heatmap
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#191919] text-white font-semibold">
                  JNARDDC / MPCB Decision Support
                </span>
              </div>
              <p className="text-xs text-[#6B6B6B]">
                Government Decision-Support Layer: District Circularity, Leakage Signals & Recycler Infrastructure Planning
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="text-xs font-semibold py-1.5 px-3 rounded-lg border border-[#E7E5E0] bg-white hover:bg-[#F4F3EF] text-[#191919] flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToCollector}
            className="text-xs font-semibold py-1.5 px-3 rounded-lg bg-[#2F6B4F] hover:bg-[#25563F] text-white cursor-pointer shadow-2xs"
          >
            Collector App →
          </button>
        </div>
      </div>

      {/* Mandatory Demo Data Disclosure Banner */}
      <div className="bg-[#FFF4DE] border border-[#E7E5E0] text-[#A66A00] p-3 rounded-xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A66A00] animate-pulse"></span>
          <span className="font-bold uppercase tracking-wider text-[10px]">
            [DEMO MODE — {DEMO_DATASET_LABEL}]
          </span>
          <span className="text-[11px] text-[#A66A00]">
            Pune Hub contains verified field data. Other district rollups are synthetic simulations calibrated with CPCB/MPCB baseline inventories.
          </span>
        </div>
        <span className="text-[10px] font-mono font-semibold bg-white px-2 py-0.5 rounded border border-[#E7E5E0]">
          Threshold: N &ge; 5
        </span>
      </div>

      {/* Metric Selector Bar */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-3 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">
            Select Primary Intelligence Layer:
          </span>
          <div className="flex items-center gap-1 bg-[#F4F3EF] p-0.5 rounded-lg border border-[#E7E5E0] text-xs">
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                viewMode === 'map' ? 'bg-white text-[#191919] shadow-2xs' : 'text-[#6B6B6B]'
              }`}
            >
              Choropleth Heatmap
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition ${
                viewMode === 'table' ? 'bg-white text-[#191919] shadow-2xs' : 'text-[#6B6B6B]'
              }`}
            >
              Table View
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {metricOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setSelectedMetric(opt.id)}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition ${
                selectedMetric === opt.id
                  ? 'border-2 border-[#2F6B4F] bg-[#EAF3EC]/40 shadow-xs'
                  : 'border-[#E7E5E0] bg-[#FBFBF9] hover:bg-white'
              }`}
            >
              <div className="text-xs font-bold text-[#191919]">{opt.label}</div>
              <div className="text-[10px] text-[#6B6B6B] mt-0.5 line-clamp-1">{opt.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Heatmap Visualizer (Left) + District Deep Dive (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Visual Map / Table (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E7E5E0] rounded-2xl p-4 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#2F6B4F]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#191919]">
                Maharashtra State District Cluster Map
              </h2>
            </div>
            <span className="text-[10px] text-[#6B6B6B] font-mono">
              Click a district node to inspect
            </span>
          </div>

          {viewMode === 'map' ? (
            <div className="relative w-full aspect-[4/3] bg-[#FBFBF9] border border-[#E7E5E0] rounded-xl overflow-hidden p-4 flex flex-col justify-between">
              {/* Interactive SVG Geographic Grid of Districts */}
              <svg viewBox="0 0 600 450" className="w-full h-full">
                {/* State outline placeholder */}
                <rect x="20" y="20" width="560" height="410" rx="16" fill="#F4F3EF" stroke="#E7E5E0" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="35" y="45" fill="#A0A09C" fontSize="12" fontWeight="bold">MAHARASHTRA STATE BOUNDARY (SCHEMATIC CHOROPLETH)</text>

                {/* District Nodes / Polygonal Tiles */}
                {districtList.map((d, idx) => {
                  // Coordinate project onto SVG viewport
                  // Lat range: 16 to 21.5, Lng range: 72.5 to 80
                  const [lat, lng] = d.coordinates;
                  const x = ((lng - 72.5) / 7.5) * 500 + 40;
                  const y = 410 - ((lat - 16.0) / 5.5) * 360;
                  const isSelected = d.districtCode === selectedDistrictCode;
                  const color = getDistrictColor(d);
                  const val = getMetricValue(d);

                  return (
                    <g
                      key={d.districtCode}
                      className="cursor-pointer transition-transform duration-200 hover:scale-105"
                      onClick={() => setSelectedDistrictCode(d.districtCode)}
                    >
                      {/* Pulse ring for selected */}
                      {isSelected && (
                        <circle cx={x} cy={y} r="28" fill="none" stroke="#2F6B4F" strokeWidth="2.5" className="animate-pulse" />
                      )}

                      {/* District Circle Node */}
                      <circle
                        cx={x}
                        cy={y}
                        r="20"
                        fill={color}
                        stroke={isSelected ? '#191919' : '#FFFFFF'}
                        strokeWidth="2"
                        className="shadow-sm"
                      />

                      {/* Label */}
                      <text
                        x={x}
                        y={y - 25}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="bold"
                        fill="#191919"
                      >
                        {d.districtName}
                      </text>

                      {/* Value inside node */}
                      <text
                        x={x}
                        y={y + 4}
                        textAnchor="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="#FFFFFF"
                      >
                        {d.isSuppressed ? 'N/A' : `${val}`}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E7E5E0] text-[11px] text-[#6B6B6B]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#2F6B4F]"></span>
                    <span>Optimal Formal Route</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#E09F3E]"></span>
                    <span>Moderate Deficit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#B24A3A]"></span>
                    <span>High Risk / Unserved</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-[#D1D5DB]"></span>
                    <span>Suppressed (N &lt; 5)</span>
                  </div>
                </div>

                <span className="font-mono text-[10px]">
                  Metric: {metricOptions.find(m => m.id === selectedMetric)?.label}
                </span>
              </div>
            </div>
          ) : (
            /* Table Accessibility Alternative */
            <div className="overflow-x-auto border border-[#E7E5E0] rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F4F3EF] border-b border-[#E7E5E0] text-[#6B6B6B]">
                  <tr>
                    <th className="p-2.5 font-semibold">District</th>
                    <th className="p-2.5 font-semibold">Tracked (kg)</th>
                    <th className="p-2.5 font-semibold">Formal Route %</th>
                    <th className="p-2.5 font-semibold">Unserved Score</th>
                    <th className="p-2.5 font-semibold">Circularity</th>
                    <th className="p-2.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E0]">
                  {districtList.map((d) => (
                    <tr
                      key={d.districtCode}
                      onClick={() => setSelectedDistrictCode(d.districtCode)}
                      className={`cursor-pointer hover:bg-[#FBFBF9] ${
                        d.districtCode === selectedDistrictCode ? 'bg-[#EAF3EC]/50 font-bold' : ''
                      }`}
                    >
                      <td className="p-2.5">{d.districtName}</td>
                      <td className="p-2.5 font-mono">{d.isSuppressed ? 'Suppressed' : `${d.totalTrackedKg} kg`}</td>
                      <td className="p-2.5 font-mono">{d.isSuppressed ? 'N/A' : `${d.formalRoutePct}%`}</td>
                      <td className="p-2.5 font-mono">{d.isSuppressed ? 'N/A' : `${d.unservedScore}/100`}</td>
                      <td className="p-2.5 font-mono">{d.isSuppressed ? 'N/A' : `${d.circularityScore}/100`}</td>
                      <td className="p-2.5">
                        {d.isSuppressed ? (
                          <span className="text-[10px] text-gray-500 font-mono">Small cell</span>
                        ) : d.formalRoutePct >= 70 ? (
                          <span className="text-[10px] text-[#2F6B4F] font-bold">Compliant</span>
                        ) : (
                          <span className="text-[10px] text-[#B24A3A] font-bold">Intervention</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: District Drill-Down & Policy Insights (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* District Header Card */}
          <div className="bg-white border-2 border-[#2F6B4F] rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#2F6B4F] font-bold">
                  District Inspection Deep-Dive
                </span>
                <h2 className="text-xl font-bold text-[#191919] mt-0.5">{selectedDistrict.districtName}</h2>
                <div className="text-xs text-[#6B6B6B] mt-0.5">
                  Code: <span className="font-mono">{selectedDistrict.districtCode}</span> · State: Maharashtra
                </div>
              </div>

              {/* District Circularity Score Badge */}
              <div className="text-right">
                <span className="text-[10px] text-[#6B6B6B] font-semibold">Circularity Score</span>
                <div className="text-2xl font-bold font-mono text-[#2F6B4F]">
                  {selectedDistrict.isSuppressed ? 'N/A' : `${selectedDistrict.circularityScore}/100`}
                </div>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#EAF3EC] text-[#2F6B4F]">
                  {circularityBreakdown?.tier || 'Unrated'}
                </span>
              </div>
            </div>

            {selectedDistrict.isSuppressed ? (
              <div className="p-3 bg-[#FFF4DE] rounded-xl text-xs text-[#A66A00] space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Privacy Suppression Enforced</span>
                </div>
                <p className="text-[11px]">
                  Fewer than {5} transactions logged in this district. Aggregated statistics are suppressed to prevent de-anonymization of individual collectors.
                </p>
              </div>
            ) : (
              <>
                {/* Key KPIs */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2.5 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
                    <span className="text-[10px] text-[#6B6B6B]">Formal Route Share</span>
                    <div className="text-base font-bold font-mono text-[#191919]">
                      {selectedDistrict.formalRoutePct}%
                    </div>
                    <span className="text-[9px] text-[#2F6B4F]">{selectedDistrict.verifiedFormalKg} kg verified</span>
                  </div>

                  <div className="p-2.5 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
                    <span className="text-[10px] text-[#6B6B6B]">Unserved Deficit</span>
                    <div className="text-base font-bold font-mono text-[#B24A3A]">
                      {selectedDistrict.unservedScore} / 100
                    </div>
                    <span className="text-[9px] text-[#6B6B6B]">{selectedDistrict.registeredRecyclersCount} recyclers registered</span>
                  </div>
                </div>

                {/* Material Composition Wheel Mini */}
                <div className="p-3 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0] space-y-2">
                  <span className="text-[11px] font-bold text-[#191919] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#2F6B4F]" />
                    <span>Tracked Feedstock Composition</span>
                  </span>

                  <div className="flex h-3 rounded-full overflow-hidden border border-[#E7E5E0]">
                    {selectedDistrict.materialComposition.map((m, i) => (
                      <div
                        key={m.materialId}
                        style={{ width: `${m.pct}%` }}
                        className={
                          m.materialId === 'mat_pcb' ? 'bg-[#2F6B4F]' :
                          m.materialId === 'mat_batteries' ? 'bg-[#E09F3E]' :
                          m.materialId === 'mat_cables' ? 'bg-[#529672]' : 'bg-[#97C1A9]'
                        }
                        title={`${m.materialName}: ${m.pct}%`}
                      ></div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 text-[10px] text-[#6B6B6B]">
                    {selectedDistrict.materialComposition.map((m) => (
                      <span key={m.materialId} className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#2F6B4F]"></span>
                        <span>{m.materialName} ({m.pct}%)</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Critical Material Recoverable Potential */}
                <div className="p-3 bg-white rounded-xl border border-[#E7E5E0] space-y-1.5">
                  <span className="text-[11px] font-bold text-[#191919] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#2F6B4F]" />
                    <span>Recoverable Strategic Materials</span>
                  </span>
                  <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-[#6B6B6B]">
                    <div>Copper: <strong className="text-[#191919]">{selectedDistrict.criticalMaterialsRecoverableKg.copperKg} kg</strong></div>
                    <div>Gold: <strong className="text-[#191919]">{selectedDistrict.criticalMaterialsRecoverableKg.goldGrams} g</strong></div>
                    <div>Cobalt: <strong className="text-[#191919]">{selectedDistrict.criticalMaterialsRecoverableKg.cobaltKg} kg</strong></div>
                    <div>Lithium: <strong className="text-[#191919]">{selectedDistrict.criticalMaterialsRecoverableKg.lithiumKg} kg</strong></div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Policy Insight Cards (Deterministic Rules Engine) */}
          <div className="bg-white border border-[#E7E5E0] rounded-2xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-[#2F6B4F]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#191919]">
                  Actionable Policy & Infrastructure Insights
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#6B6B6B] bg-[#F4F3EF] px-1.5 py-0.5 rounded">
                Deterministic Rules
              </span>
            </div>

            {policyInsights.length === 0 ? (
              <p className="text-xs text-[#6B6B6B] p-2 bg-[#FBFBF9] rounded-xl border border-[#E7E5E0]">
                No critical infrastructure anomalies triggered for {selectedDistrict.districtName}.
              </p>
            ) : (
              <div className="space-y-2.5">
                {policyInsights.map((pi) => (
                  <div
                    key={pi.id}
                    className={`p-3 rounded-xl border space-y-1.5 ${
                      pi.severity === 'URGENT'
                        ? 'bg-[#FBECE8]/40 border-[#B24A3A]/40'
                        : 'bg-[#FFF4DE]/40 border-[#E09F3E]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#191919]">
                        {pi.title[lang] || pi.title.en}
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-white text-[#B24A3A]">
                        {pi.severity}
                      </span>
                    </div>

                    <p className="text-[11px] text-[#6B6B6B]">
                      {pi.description[lang] || pi.description.en}
                    </p>

                    <div className="p-2 bg-white rounded-lg border border-[#E7E5E0] text-[11px] space-y-0.5">
                      <span className="font-semibold text-[#2F6B4F]">Recommended Action:</span>
                      <p className="text-[#191919]">{pi.recommendedAction[lang] || pi.recommendedAction.en}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* AI Assistant Link for Authority */}
            {onOpenAssistant && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenAssistant(`Explain the e-waste policy insights and recommendations for ${selectedDistrict.districtName}`)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-[#EAF3EC] text-[#2F6B4F] border border-[#2F6B4F]/30 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition shadow-2xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask Reclaim AI: "What policy action should {selectedDistrict.districtName} take first?"</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

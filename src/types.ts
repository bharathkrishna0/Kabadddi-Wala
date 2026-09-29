export type Language = 'mr' | 'hi' | 'en';

export type ViewPersona = 'collector' | 'recycler' | 'admin' | 'authority' | 'citizen';

export type ScreenId =
  | 'welcome'
  | 'setup'
  | 'home'
  | 'camera'
  | 'material_confirm'
  | 'weight_entry'
  | 'fair_price'
  | 'recycler_compare'
  | 'low_price_warning'
  | 'handover_prep'
  | 'signed_qr'
  | 'recycler_confirm'
  | 'two_party_proof'
  | 'earnings'
  | 'transaction_detail'
  | 'price_board'
  | 'safety'
  | 'offline_explain'
  | 'sync_state'
  | 'profile'
  | 'my_impact'
  | 'national_heatmap'
  | 'citizen_trace';

export interface CollectorProfile {
  id: string;
  name: string;
  area: string;
  language: Language;
  audioEnabled: boolean;
  avatarUrl?: string;
}

export interface MaterialInfo {
  id: string;
  code: string;
  name: string;
  nameMr: string;
  nameHi: string;
  category: string;
  basePriceMin: number;
  basePriceMax: number;
  currentAvg: number;
  unit: string;
  suggestedConfidence?: number;
  typicalWeightRange: string;
  hazardLevel: 'low' | 'medium' | 'high';
  safetyShort: string;
  safetyShortMr: string;
  safetyShortHi: string;
  safetyGuidelines: string[];
  safetyGuidelinesMr: string[];
  safetyGuidelinesHi: string[];
  pictogram: string; // SVG icon identifier
}

export interface RecyclerOffer {
  id: string;
  name: string;
  verified: boolean;
  authorizationNumber: string;
  ratePerKg: number;
  distanceKm: number;
  pickupAvailable: boolean;
  estimatedPayout: number;
  matchScore: number; // 0-100
  rankingLabel: string;
  matchReasons: string[];
  matchReasonsMr: string[];
  matchReasonsHi: string[];
  paymentMode: 'Cash on Handover' | 'Digital / UPI' | 'Either';
  isAnomalyWarning?: boolean;
}

export interface LotTransaction {
  id: string;
  lotCode: string; // e.g. RX-LT-2026-004281
  materialId: string;
  materialName: string;
  declaredWeightKg: number;
  verifiedWeightKg?: number;
  fairPriceMin: number;
  fairPriceMax: number;
  offeredRatePerKg: number;
  estimatedPayout: number;
  finalPrice?: number;
  recyclerId: string;
  recyclerName: string;
  recyclerVerified: boolean;
  isFormalRecycler?: boolean;
  status: 'draft' | 'priced' | 'signed' | 'confirmed' | 'paid';
  createdAt: string;
  confirmedAt?: string;
  collectorSignatureHash: string;
  recyclerSignatureHash?: string;
  photoHash: string;
  traceabilityId: string;
  eprTokenId?: string;
  synced: boolean;
  isFlaggedDiscrepancy?: boolean;
  weightDifferenceKg?: number;
  location: string;
  // Geographic dimensions for national intelligence
  districtCode: string; // e.g. 'IN-MH-PU'
  districtName: string; // e.g. 'Pune'
  stateCode: string; // e.g. 'MH'
  citizenReceiptId?: string; // Links to citizen if originated from household
}

export interface PricePoint {
  day: number;
  date: string;
  price: number;
}

export interface StructuredDatasetInfo {
  id: string;
  title: string;
  description: string;
  fields: string[];
  roleInIntelligence: string;
}

// ----------------------------------------------------
// FEATURE 8 & 10: ANALYTICS, HEATMAP & IMPACT TYPES
// ----------------------------------------------------

export type HeatmapMetric =
  | 'formal_route_pct'
  | 'kg_collected'
  | 'unserved_score'
  | 'critical_material_kg'
  | 'leakage_risk_pct';

export interface DistrictMetrics {
  districtCode: string;
  districtName: string;
  stateCode: string;
  coordinates: [number, number]; // [lat, lng]
  totalTrackedKg: number;
  verifiedFormalKg: number;
  formalRoutePct: number; // 0 to 100
  estimatedAnnualGenerationKg: number;
  formalVsEstimatedPct: number;
  materialComposition: {
    materialId: string;
    materialName: string;
    kg: number;
    pct: number;
  }[];
  avgRealisedPricePerKg: number;
  benchmarkPricePerKg: number;
  registeredRecyclersCount: number;
  activeCollectorsCount: number;
  recyclerCapacityMtYear: number;
  recyclerUtilizationPct: number;
  unservedScore: number; // 0 (well served) to 100 (critical deficit)
  criticalMaterialsRecoverableKg: {
    copperKg: number;
    goldGrams: number;
    cobaltKg: number;
    lithiumKg: number;
  };
  leakageSignals: {
    unverifiedLotsCount: number;
    weightDiscrepancyKg: number;
    leakageRiskLevel: 'LOW' | 'ELEVATED' | 'HIGH';
    leakageRatePct: number;
  };
  circularityScore: number; // 0 to 100
  isSuppressed: boolean; // Privacy threshold suppression (< 5 transactions)
  totalTransactionsCount: number;
}

export interface PolicyInsight {
  id: string;
  districtCode: string;
  category: 'INFRASTRUCTURE' | 'PRICING' | 'HAZARD' | 'AWARENESS';
  severity: 'INFO' | 'OPPORTUNITY' | 'URGENT';
  title: { en: string; hi: string; mr: string };
  description: { en: string; hi: string; mr: string };
  recommendedAction: { en: string; hi: string; mr: string };
  triggerRule: string;
}

export interface CircularityScoreBreakdown {
  overallScore: number; // 0 - 100
  tier: 'Emerging' | 'Developing' | 'Progressive' | 'Leader';
  components: {
    formalRouteShare: { score: number; weight: number; value: number }; // 35% weight
    verifiedTransactionRate: { score: number; weight: number; value: number }; // 25% weight
    hazardousSafeChannelling: { score: number; weight: number; value: number }; // 20% weight
    materialRecoveryYield: { score: number; weight: number; value: number }; // 20% weight
  };
  benchmarkComparison: string;
}

export interface PersonalImpactSummary {
  collectorId: string;
  totalFormallyChannelledKg: number;
  verifiedTransactionsCount: number;
  batteriesSafelyChannelledKg: number;
  pcbRecoveredKg: number;
  recoveredMaterials: {
    name: string;
    estimatedMinKg: number;
    estimatedMaxKg: number;
    isCritical: boolean;
  }[];
  landfillDiversionLiters: number;
  co2SavedKg: number;
  toxicNeutralizedGrams: number;
  additionalEarningsInr: number; // Verified price - local baseline rate
  hasRealBaseline: boolean;
  levelTitle: { en: string; hi: string; mr: string };
  levelNumber: number;
  nextLevelProgressPct: number;
  badges: {
    id: string;
    title: { en: string; hi: string; mr: string };
    description: { en: string; hi: string; mr: string };
    icon: string;
    earnedDate: string;
  }[];
}

export interface CitizenHandoverRecord {
  id: string;
  itemType: string;
  itemCategory: string;
  weightKg: number;
  date: string;
  collectorName: string;
  recyclerName: string;
  status: 'handed_over' | 'verified_at_facility' | 'recovered_into_raw_materials';
  lifecycleSteps: {
    step: string;
    time: string;
    completed: boolean;
    location: string;
  }[];
  personalDiversionCo2Kg: number;
  toxicChemicalsKeptFromWaterGrams: number;
  traceToken: string;
}

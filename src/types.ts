export type Language = 'mr' | 'hi' | 'en';

export type ViewPersona = 'collector' | 'recycler' | 'admin';

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
  | 'profile';

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
  status: 'draft' | 'priced' | 'signed' | 'confirmed' | 'paid';
  createdAt: string;
  confirmedAt?: string;
  collectorSignatureHash: string;
  recyclerSignatureHash?: string;
  photoHash: string;
  traceabilityId: string;
  synced: boolean;
  isFlaggedDiscrepancy?: boolean;
  weightDifferenceKg?: number;
  location: string;
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

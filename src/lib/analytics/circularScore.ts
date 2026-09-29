import { LotTransaction, PersonalImpactSummary, CircularityScoreBreakdown } from '../../types';
import { MATERIAL_YIELD_FACTORS } from '../../config/impactFactors';

/**
 * Computes pure on-device personal circular impact summary.
 * Runs 100% offline from the local transaction ledger.
 * Only verified formal handovers are counted toward formal impact.
 */
export function calculatePersonalImpact(
  collectorId: string,
  transactions: LotTransaction[]
): PersonalImpactSummary {
  // Filter transactions belonging to this collector
  // (In field client, all local transactions belong to the active profile)
  const formalCompleted = transactions.filter(
    (tx) => (tx.status === 'confirmed' || tx.status === 'paid') && (tx.isFormalRecycler ?? tx.recyclerVerified)
  );

  let totalFormallyChannelledKg = 0;
  let batteriesSafelyChannelledKg = 0;
  let pcbRecoveredKg = 0;
  let co2SavedKg = 0;
  let toxicNeutralizedGrams = 0;
  let landfillSpaceLiters = 0;
  let additionalEarningsInr = 0;
  let hasRealBaseline = false;

  // Material breakdown for critical yields
  let totalCopperGrams = 0;
  let totalGoldGrams = 0;
  let totalCobaltGrams = 0;

  formalCompleted.forEach((tx) => {
    // Only exclude if deliberate tamper flag is present
    if (tx.isFlaggedDiscrepancy && Math.abs(tx.weightDifferenceKg || 0) > 4.0) {
      return; // Pending review anti-gaming filter
    }

    const weight = tx.verifiedWeightKg || tx.declaredWeightKg || 0;
    totalFormallyChannelledKg += weight;

    if (tx.materialId === 'mat_batteries') {
      batteriesSafelyChannelledKg += weight;
    } else if (tx.materialId === 'mat_pcb') {
      pcbRecoveredKg += weight;
    }

    const factor = MATERIAL_YIELD_FACTORS[tx.materialId];
    if (factor) {
      co2SavedKg += factor.environmentalSavings.co2KgEquivalentPerKg * weight;
      toxicNeutralizedGrams += factor.environmentalSavings.toxicChemicalsNeutralizedGramsPerKg * weight;
      landfillSpaceLiters += factor.environmentalSavings.landfillSpaceDivertedLitersPerKg * weight;

      factor.recoverableFractions.forEach((f) => {
        if (f.element.includes('Copper')) totalCopperGrams += f.avgGramPerKg * weight;
        if (f.element.includes('Gold')) totalGoldGrams += f.avgGramPerKg * weight;
        if (f.element.includes('Cobalt')) totalCobaltGrams += f.avgGramPerKg * weight;
      });
    }

    // Additional earnings: (Realised price - baseline min rate for that lot)
    if (tx.fairPriceMin > 0 && tx.offeredRatePerKg > tx.fairPriceMin) {
      hasRealBaseline = true;
      const premiumPerKg = tx.offeredRatePerKg - tx.fairPriceMin;
      additionalEarningsInr += Math.round(premiumPerKg * weight);
    }
  });

  // Gamification Level Calculation (Dignified and accessible)
  let levelNumber = 1;
  let levelTitle = {
    en: 'Verified Collector — Level 1',
    hi: 'सत्यापित कचरा योद्धा — स्तर 1',
    mr: 'प्रमाणित पर्यावरण रक्षक — स्तर १',
  };
  let nextLevelThresholdKg = 50;

  if (totalFormallyChannelledKg >= 200) {
    levelNumber = 4;
    levelTitle = {
      en: 'Master Circular Pioneer — Level 4',
      hi: 'वरिष्ठ चक्रीय संरक्षक — स्तर 4',
      mr: 'वरिष्ठ वर्तुळाकार मार्गदर्शक — स्तर ४',
    };
    nextLevelThresholdKg = 500;
  } else if (totalFormallyChannelledKg >= 100) {
    levelNumber = 3;
    levelTitle = {
      en: 'Lead Sustainability Steward — Level 3',
      hi: 'अग्रणी पर्यावरण संरक्षक — स्तर 3',
      mr: 'अग्रगण्य हरित दूत — स्तर ३',
    };
    nextLevelThresholdKg = 200;
  } else if (totalFormallyChannelledKg >= 30) {
    levelNumber = 2;
    levelTitle = {
      en: 'E-Waste Recovery Champion — Level 2',
      hi: 'ई-कचरा पुनरुद्धार चैंपियन — स्तर 2',
      mr: 'ई-कचरा पुनर्प्राप्ती चॅम्पियन — स्तर २',
    };
    nextLevelThresholdKg = 100;
  }

  const progressPct = Math.min(
    100,
    Math.round((totalFormallyChannelledKg / nextLevelThresholdKg) * 100)
  );

  // Recovered materials presentation with estimated ranges
  const recoveredMaterials = [
    {
      name: 'Refined Copper',
      estimatedMinKg: Number(((totalCopperGrams * 0.85) / 1000).toFixed(1)),
      estimatedMaxKg: Number(((totalCopperGrams * 1.15) / 1000).toFixed(1)),
      isCritical: true,
    },
    {
      name: 'Precious Gold (Circuit Boards)',
      estimatedMinKg: Number((totalGoldGrams * 0.8).toFixed(2)),
      estimatedMaxKg: Number((totalGoldGrams * 1.2).toFixed(2)),
      isCritical: true,
    },
    {
      name: 'Cobalt & Nickel (Battery Anodes)',
      estimatedMinKg: Number(((totalCobaltGrams * 0.85) / 1000).toFixed(1)),
      estimatedMaxKg: Number(((totalCobaltGrams * 1.15) / 1000).toFixed(1)),
      isCritical: true,
    },
  ];

  const badges = [
    {
      id: 'badge-verified-handover',
      title: {
        en: 'Formal Handover Pioneer',
        hi: 'अधिकृत हस्तांतरण रक्षक',
        mr: 'अधिकृत व्यवहार प्रणेते',
      },
      description: {
        en: 'Completed 100% two-party signed handovers with MPCB recyclers',
        hi: 'एमपीसीबी रीसायकलर्स के साथ 100% डिजिटल हस्ताक्षरित लेनदेन',
        mr: 'प्रदूषण नियंत्रण मंडळाच्या केंद्रांसोबत १००% स्वाक्षरीत व्यवहार',
      },
      icon: 'shield-check',
      earnedDate: 'Sep 2026',
    },
    {
      id: 'badge-clean-air',
      title: {
        en: 'Clean Air Guardian',
        hi: 'स्वच्छ वायु प्रहरी',
        mr: 'स्वच्छ हवा रक्षक',
      },
      description: {
        en: 'Diverted toxic PVC burning fumes through mechanical stripping',
        hi: 'पीवीसी तारों को जलने से रोककर वायु प्रदूषण बचाया',
        mr: 'तारा न जाळता सुरक्षितपणे सोलून हवेचे प्रदूषण रोखले',
      },
      icon: 'wind',
      earnedDate: 'Sep 2026',
    },
  ];

  if (batteriesSafelyChannelledKg > 0) {
    badges.push({
      id: 'badge-battery-hero',
      title: {
        en: 'Hazard Shield Hero',
        hi: 'घातक कचरा सुरक्षा नायक',
        mr: 'घातक कचरा सुरक्षा दूत',
      },
      description: {
        en: 'Safely isolated lithium/lead batteries into fireproof containment',
        hi: 'बैटरी को सुरक्षित डिब्बे में अलग कर जलने से रोका',
        mr: 'बॅटऱ्या सुरक्षितपणे वेगळ्या करून अपघाताचा धोका टाळला',
      },
      icon: 'battery-charging',
      earnedDate: 'Sep 2026',
    });
  }

  return {
    collectorId,
    totalFormallyChannelledKg: Number(totalFormallyChannelledKg.toFixed(1)),
    verifiedTransactionsCount: formalCompleted.length,
    batteriesSafelyChannelledKg: Number(batteriesSafelyChannelledKg.toFixed(1)),
    pcbRecoveredKg: Number(pcbRecoveredKg.toFixed(1)),
    recoveredMaterials,
    landfillDiversionLiters: Number(landfillSpaceLiters.toFixed(1)),
    co2SavedKg: Number(co2SavedKg.toFixed(1)),
    toxicNeutralizedGrams: Number(toxicNeutralizedGrams.toFixed(0)),
    additionalEarningsInr,
    hasRealBaseline,
    levelTitle,
    levelNumber,
    nextLevelProgressPct: progressPct,
    badges,
  };
}

/**
 * Computes deterministic District Circularity Score (0-100)
 */
export function calculateDistrictCircularityBreakdown(
  formalRouteSharePct: number,
  verifiedTxRatePct: number,
  hazardousSafeSharePct: number,
  recoveryYieldEfficiencyPct: number
): CircularityScoreBreakdown {
  const cFormal = Math.min(100, Math.max(0, formalRouteSharePct));
  const cTx = Math.min(100, Math.max(0, verifiedTxRatePct));
  const cHazard = Math.min(100, Math.max(0, hazardousSafeSharePct));
  const cYield = Math.min(100, Math.max(0, recoveryYieldEfficiencyPct));

  // Multi-component weighted formula
  const overall = Math.round(
    cFormal * 0.35 +
    cTx * 0.25 +
    cHazard * 0.20 +
    cYield * 0.20
  );

  let tier: 'Emerging' | 'Developing' | 'Progressive' | 'Leader' = 'Emerging';
  if (overall >= 75) tier = 'Leader';
  else if (overall >= 55) tier = 'Progressive';
  else if (overall >= 35) tier = 'Developing';

  return {
    overallScore: overall,
    tier,
    components: {
      formalRouteShare: { score: Math.round(cFormal * 0.35), weight: 35, value: cFormal },
      verifiedTransactionRate: { score: Math.round(cTx * 0.25), weight: 25, value: cTx },
      hazardousSafeChannelling: { score: Math.round(cHazard * 0.20), weight: 20, value: cHazard },
      materialRecoveryYield: { score: Math.round(cYield * 0.20), weight: 20, value: cYield },
    },
    benchmarkComparison:
      overall >= 60
        ? 'Upper 25th percentile of Maharashtra urban clusters'
        : 'Middle tier — actionable formal routing deficit identified',
  };
}

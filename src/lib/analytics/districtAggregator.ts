import { LotTransaction, DistrictMetrics, PolicyInsight } from '../../types';
import { MATERIAL_YIELD_FACTORS, DISTRICT_GENERATION_BASELINES } from '../../config/impactFactors';

// Geographic Centroids for Maharashtra Key Districts
export const DISTRICT_COORDINATES: Record<string, [number, number]> = {
  'IN-MH-PU': [18.5204, 73.8567], // Pune
  'IN-MH-MC': [18.9388, 72.8354], // Mumbai City
  'IN-MH-MU': [19.0760, 72.8777], // Mumbai Suburban
  'IN-MH-TH': [19.2183, 72.9781], // Thane
  'IN-MH-NG': [21.1458, 79.0882], // Nagpur
  'IN-MH-NS': [19.9975, 73.7898], // Nashik
  'IN-MH-AU': [19.8762, 75.3433], // Chhatrapati Sambhajinagar
  'IN-MH-SO': [17.6599, 75.9064], // Solapur
  'IN-MH-KO': [16.7050, 74.2433], // Kolhapur
  'IN-MH-AM': [20.9374, 77.7796], // Amravati
};

export const DISTRICT_NAMES: Record<string, string> = {
  'IN-MH-PU': 'Pune',
  'IN-MH-MC': 'Mumbai City',
  'IN-MH-MU': 'Mumbai Suburban',
  'IN-MH-TH': 'Thane',
  'IN-MH-NG': 'Nagpur',
  'IN-MH-NS': 'Nashik',
  'IN-MH-AU': 'Chhatrapati Sambhajinagar',
  'IN-MH-SO': 'Solapur',
  'IN-MH-KO': 'Kolhapur',
  'IN-MH-AM': 'Amravati',
};

// Registered Recycler Capacity Benchmarks (MPCB Public Registry Data)
export const DISTRICT_RECYCLER_STATS: Record<
  string,
  { registeredCount: number; capacityMtYear: number; activeCollectors: number }
> = {
  'IN-MH-PU': { registeredCount: 12, capacityMtYear: 4500, activeCollectors: 86 },
  'IN-MH-MC': { registeredCount: 18, capacityMtYear: 7800, activeCollectors: 142 },
  'IN-MH-MU': { registeredCount: 14, capacityMtYear: 6200, activeCollectors: 118 },
  'IN-MH-TH': { registeredCount: 8, capacityMtYear: 3100, activeCollectors: 54 },
  'IN-MH-NG': { registeredCount: 3, capacityMtYear: 1200, activeCollectors: 28 },
  'IN-MH-NS': { registeredCount: 4, capacityMtYear: 1450, activeCollectors: 32 },
  'IN-MH-AU': { registeredCount: 2, capacityMtYear: 800, activeCollectors: 18 },
  'IN-MH-SO': { registeredCount: 1, capacityMtYear: 350, activeCollectors: 12 },
  'IN-MH-KO': { registeredCount: 2, capacityMtYear: 600, activeCollectors: 16 },
  'IN-MH-AM': { registeredCount: 1, capacityMtYear: 280, activeCollectors: 9 },
};

export const PRIVACY_SUPPRESSION_THRESHOLD = 5; // Suppress district analytics if < 5 transactions

/**
 * Aggregates lot transactions by district with privacy preservation,
 * critical material yields, and leakage risk detection.
 */
export function aggregateDistrictMetrics(
  transactions: LotTransaction[],
  suppressionThreshold: number = PRIVACY_SUPPRESSION_THRESHOLD
): Record<string, DistrictMetrics> {
  const grouped: Record<string, LotTransaction[]> = {};

  // Group by district code
  transactions.forEach((tx) => {
    const code = tx.districtCode || 'IN-MH-PU';
    if (!grouped[code]) grouped[code] = [];
    grouped[code].push(tx);
  });

  const result: Record<string, DistrictMetrics> = {};

  // Compute metrics for known districts
  Object.keys(DISTRICT_COORDINATES).forEach((districtCode) => {
    const dName = DISTRICT_NAMES[districtCode] || 'District';
    const txList = grouped[districtCode] || [];
    const count = txList.length;

    const recyclerStats = DISTRICT_RECYCLER_STATS[districtCode] || {
      registeredCount: 1,
      capacityMtYear: 300,
      activeCollectors: 10,
    };

    const baseline = DISTRICT_GENERATION_BASELINES[districtCode] || {
      estimatedAnnualKg: 500000,
      populationLakhs: 25.0,
    };

    // Check privacy threshold
    const isSuppressed = count > 0 && count < suppressionThreshold;

    let totalTrackedKg = 0;
    let verifiedFormalKg = 0;
    let totalRealisedVal = 0;
    let totalBenchmarkVal = 0;
    let unverifiedLots = 0;
    let weightDiscrepancyTotal = 0;

    const materialKgMap: Record<string, number> = {};

    txList.forEach((tx) => {
      const w = tx.verifiedWeightKg || tx.declaredWeightKg || 0;
      totalTrackedKg += w;

      const isFormal = tx.isFormalRecycler ?? tx.recyclerVerified;
      const isCompleted = tx.status === 'confirmed' || tx.status === 'paid';

      if (isFormal && isCompleted) {
        verifiedFormalKg += w;
      } else if (!isCompleted) {
        unverifiedLots += 1;
      }

      if (tx.isFlaggedDiscrepancy && tx.weightDifferenceKg) {
        weightDiscrepancyTotal += Math.abs(tx.weightDifferenceKg);
      }

      totalRealisedVal += (tx.finalPrice || tx.offeredRatePerKg * w);
      totalBenchmarkVal += (tx.fairPriceMax + tx.fairPriceMin) / 2 * w;

      materialKgMap[tx.materialId] = (materialKgMap[tx.materialId] || 0) + w;
    });

    // Material composition
    const composition = Object.keys(materialKgMap).map((matId) => {
      const kg = materialKgMap[matId];
      return {
        materialId: matId,
        materialName: matId.replace('mat_', '').toUpperCase(),
        kg: Number(kg.toFixed(1)),
        pct: totalTrackedKg > 0 ? Number(((kg / totalTrackedKg) * 100).toFixed(1)) : 0,
      };
    });

    const formalRoutePct = totalTrackedKg > 0
      ? Number(((verifiedFormalKg / totalTrackedKg) * 100).toFixed(1))
      : 0;

    const formalVsEstimatedPct = baseline.estimatedAnnualKg > 0
      ? Number(((verifiedFormalKg / (baseline.estimatedAnnualKg / 12)) * 100).toFixed(2)) // Monthly baseline slice
      : 0;

    const avgPrice = totalTrackedKg > 0 ? Math.round(totalRealisedVal / totalTrackedKg) : 0;
    const benchPrice = totalTrackedKg > 0 ? Math.round(totalBenchmarkVal / totalTrackedKg) : 0;

    // Critical raw materials calculation based on verified yield factors
    let copperKg = 0;
    let goldGrams = 0;
    let cobaltKg = 0;
    let lithiumKg = 0;

    Object.keys(materialKgMap).forEach((matId) => {
      const kg = materialKgMap[matId];
      const factor = MATERIAL_YIELD_FACTORS[matId];
      if (factor) {
        factor.recoverableFractions.forEach((f) => {
          if (f.element.includes('Copper')) copperKg += (f.avgGramPerKg * kg) / 1000;
          if (f.element.includes('Gold')) goldGrams += f.avgGramPerKg * kg;
          if (f.element.includes('Cobalt')) cobaltKg += (f.avgGramPerKg * kg) / 1000;
          if (f.element.includes('Lithium')) lithiumKg += (f.avgGramPerKg * kg) / 1000;
        });
      }
    });

    // Leakage rate & risk
    const leakageRatePct = totalTrackedKg > 0
      ? Number((((totalTrackedKg - verifiedFormalKg) / totalTrackedKg) * 100).toFixed(1))
      : 0;

    let leakageRiskLevel: 'LOW' | 'ELEVATED' | 'HIGH' = 'LOW';
    if (leakageRatePct > 40 || weightDiscrepancyTotal > 15) {
      leakageRiskLevel = 'HIGH';
    } else if (leakageRatePct > 20 || weightDiscrepancyTotal > 5) {
      leakageRiskLevel = 'ELEVATED';
    }

    // Unserved Score (0 to 100, where 100 is high deficit: generation with few recyclers)
    const trackedMtMonth = totalTrackedKg / 1000;
    const capacityMtMonth = recyclerStats.capacityMtYear / 12;
    const utilizationPct = capacityMtMonth > 0 ? Math.min(100, Math.round((trackedMtMonth / capacityMtMonth) * 100)) : 0;

    let unserved = 100 - (recyclerStats.registeredCount * 8) - (formalRoutePct * 0.4);
    if (recyclerStats.registeredCount <= 2) unserved += 25;
    const unservedScore = Math.max(0, Math.min(100, Math.round(unserved)));

    // Circularity Score (0-100)
    const cScore = Math.round(
      formalRoutePct * 0.45 +
        (100 - leakageRatePct) * 0.25 +
        Math.min(100, count * 3) * 0.15 +
        (recyclerStats.registeredCount > 3 ? 15 : 5)
    );

    result[districtCode] = {
      districtCode,
      districtName: dName,
      stateCode: 'MH',
      coordinates: DISTRICT_COORDINATES[districtCode],
      totalTrackedKg: Math.round(totalTrackedKg),
      verifiedFormalKg: Math.round(verifiedFormalKg),
      formalRoutePct,
      estimatedAnnualGenerationKg: baseline.estimatedAnnualKg,
      formalVsEstimatedPct,
      materialComposition: composition,
      avgRealisedPricePerKg: avgPrice,
      benchmarkPricePerKg: benchPrice,
      registeredRecyclersCount: recyclerStats.registeredCount,
      activeCollectorsCount: recyclerStats.activeCollectors,
      recyclerCapacityMtYear: recyclerStats.capacityMtYear,
      recyclerUtilizationPct: utilizationPct,
      unservedScore,
      criticalMaterialsRecoverableKg: {
        copperKg: Number(copperKg.toFixed(1)),
        goldGrams: Number(goldGrams.toFixed(2)),
        cobaltKg: Number(cobaltKg.toFixed(1)),
        lithiumKg: Number(lithiumKg.toFixed(1)),
      },
      leakageSignals: {
        unverifiedLotsCount: unverifiedLots,
        weightDiscrepancyKg: Number(weightDiscrepancyTotal.toFixed(1)),
        leakageRiskLevel,
        leakageRatePct,
      },
      circularityScore: isSuppressed ? 0 : Math.min(100, Math.max(0, cScore)),
      isSuppressed,
      totalTransactionsCount: count,
    };
  });

  return result;
}

/**
 * Deterministic Policy Insights Engine
 * Produces structured recommendations for government authorities based on clear thresholds.
 */
export function generateDistrictPolicyInsights(metric: DistrictMetrics): PolicyInsight[] {
  const insights: PolicyInsight[] = [];

  // 1. High Battery composition + Low Formal Route -> Urgent Collection Centre
  const batteryPct = metric.materialComposition.find((m) => m.materialId === 'mat_batteries')?.pct || 0;
  if (batteryPct >= 12 && metric.formalRoutePct < 70) {
    insights.push({
      id: `pol-${metric.districtCode}-bat`,
      districtCode: metric.districtCode,
      category: 'HAZARD',
      severity: 'URGENT',
      title: {
        en: 'High Battery Stream with Elevated Leakage Risk',
        hi: 'उच्च बैटरी अपशिष्ट और रिसाव का जोखिम',
        mr: 'बॅटरी कचऱ्याचे मोठे प्रमाण व गळतीचा धोका',
      },
      description: {
        en: `Batteries constitute ${batteryPct}% of tracked volume, but formal recycling is at ${metric.formalRoutePct}%. Informal acid extraction risk detected.`,
        hi: `ट्रैक किए गए कचरे में ${batteryPct}% बैटरी है, परंतु औपचारिक रीसाइक्लिंग मात्र ${metric.formalRoutePct}% है।`,
        mr: `एकूण कचऱ्यात ${batteryPct}% बॅटऱ्या आहेत, पण अधिकृत पुनर्वापर केवळ ${metric.formalRoutePct}% आहे.`,
      },
      recommendedAction: {
        en: 'Designate a hazardous e-waste aggregation depot in industrial zone with fire-safe containment.',
        hi: 'औद्योगिक क्षेत्र में अग्नि-सुरक्षित बैटरी संग्रहण केंद्र तुरंत स्थापित करें।',
        mr: 'एमआयडीसी परिसरात अग्निरोधक बॅटरी संकलन केंद्र तातडीने उभारा.',
      },
      triggerRule: 'battery_pct >= 12% AND formal_route < 70%',
    });
  }

  // 2. High Unserved Score -> Recycler Licensing Opportunity
  if (metric.unservedScore > 60) {
    insights.push({
      id: `pol-${metric.districtCode}-uns`,
      category: 'INFRASTRUCTURE',
      severity: 'OPPORTUNITY',
      districtCode: metric.districtCode,
      title: {
        en: 'Formal Dismantler Deficit Identified',
        hi: 'अधिकृत रीसाइक्लिंग संयंत्र की कमी',
        mr: 'अधिकृत विघटन केंद्रांची तीव्र कमतरता',
      },
      description: {
        en: `District unserved index is ${metric.unservedScore}/100 with only ${metric.registeredRecyclersCount} registered facility. Collectors face high logistics overheads.`,
        hi: `जिले का सेवा-अभाव स्कोर ${metric.unservedScore}/100 है तथा केवल ${metric.registeredRecyclersCount} केंद्र पंजीकृत है।`,
        mr: `जिल्ह्यात सेवेचा अभाव ${metric.unservedScore}/100 असून फक्त ${metric.registeredRecyclersCount} नोंदणीकृत केंद्र आहे.`,
      },
      recommendedAction: {
        en: 'Fast-track MPCB consent-to-operate for regional aggregation hub within a 15km cluster radius.',
        hi: '15 किमी के दायरे में क्षेत्रीय हब के लिए एमपीसीबी अनुमति प्रक्रिया तेज करें।',
        mr: '१५ किमी परिसरामध्ये प्रादेशिक संकलन केंद्रासाठी प्रदूषण नियंत्रण मंडळाची मंजुरी जलद गतीने द्या.',
      },
      triggerRule: 'unserved_score > 60',
    });
  }

  // 3. Price Realisation Deficit -> Transparency Intervention
  if (metric.benchmarkPricePerKg > 0 && metric.avgRealisedPricePerKg < metric.benchmarkPricePerKg * 0.85) {
    insights.push({
      id: `pol-${metric.districtCode}-pri`,
      category: 'PRICING',
      severity: 'INFO',
      districtCode: metric.districtCode,
      title: {
        en: 'Middleman Value Capture Detected',
        hi: 'बिचौलियों द्वारा मूल्य में असमानता',
        mr: 'मध्यस्थांकडून दरांमध्ये तफावत',
      },
      description: {
        en: `Collectors realise ₹${metric.avgRealisedPricePerKg}/kg vs benchmark ₹${metric.benchmarkPricePerKg}/kg (15%+ deficit).`,
        hi: `कचरा बीनने वालों को बेंचमार्क से 15% कम मूल्य मिल रहा है।`,
        mr: `कचरा वेचकांना आधारभूत किमतीपेक्षा १५% कमी दर मिळत आहे.`,
      },
      recommendedAction: {
        en: 'Deploy ReclaimX digital price transparency boards at cooperative scrap yards.',
        hi: 'कबाड़ी मंडियों में रिक्लेम-एक्स मूल्य पारदर्शिता बोर्ड सक्रिय करें।',
        mr: 'भंगार बाजारांमध्ये रिक्लेम-एक्स डिजिटल भाव फलक कार्यान्वित करा.',
      },
      triggerRule: 'realised_price < benchmark * 0.85',
    });
  }

  return insights;
}

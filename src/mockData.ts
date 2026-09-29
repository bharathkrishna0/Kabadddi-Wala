import { MaterialInfo, RecyclerOffer, LotTransaction, PricePoint, StructuredDatasetInfo } from './types';

export const MATERIALS: MaterialInfo[] = [
  {
    id: 'mat_pcb',
    code: 'PCB',
    name: 'PCB / Circuit Boards',
    nameMr: 'सर्किट बोर्ड (PCB)',
    nameHi: 'सर्किट बोर्ड (PCB)',
    category: 'High Value Electronics',
    basePriceMin: 150,
    basePriceMax: 190,
    currentAvg: 171,
    unit: 'kg',
    suggestedConfidence: 91,
    typicalWeightRange: '5 – 35 kg',
    hazardLevel: 'medium',
    safetyShort: 'Contains trace heavy metals (lead, bromine). Wear gloves.',
    safetyShortMr: 'यात शिसे व घातक घटक असू शकतात. हाताळताना हातमोजे वापरा.',
    safetyShortHi: 'इसमें सीसा और भारी धातुएं होती हैं। दस्ताने अवश्य पहनें।',
    safetyGuidelines: [
      'Avoid burning or heating components outdoors.',
      'Wear protective gloves and eye wear.',
      'Keep away from open flame, children, and food storage.',
      'Do not crush or hammer IC chips.'
    ],
    safetyGuidelinesMr: [
      'उघड्यावर जाळणे किंवा गरम करणे पूर्णपणे टाळा.',
      'संरक्षक हातमोजे व चष्मा वापरा.',
      'आग, लहान मुले व जेवणाच्या जागेपासून लांब ठेवा.',
      'आयसी चिप्स हातोड्याने फोडू नका.'
    ],
    safetyGuidelinesHi: [
      'खुली आग में कभी न जलाएं।',
      'सुरक्षा दस्ताने और चश्मा पहनें।',
      'बच्चों और भोजन के बर्तनों से दूर रखें।',
      'सर्किट बोर्ड्स को हथौड़े से न तोड़ें।'
    ],
    pictogram: 'cpu',
  },
  {
    id: 'mat_cables',
    code: 'CBL',
    name: 'Cables & Copper Wires',
    nameMr: 'तांब्याच्या तारा व केबल्स',
    nameHi: 'तांबे की केबल व तार',
    category: 'Metals & Wires',
    basePriceMin: 70,
    basePriceMax: 95,
    currentAvg: 80,
    unit: 'kg',
    typicalWeightRange: '10 – 60 kg',
    hazardLevel: 'low',
    safetyShort: 'Do not open burn PVC coating. Strip mechanically.',
    safetyShortMr: 'तारा जाळू नका. प्लास्टिकचे आवरण हाताने किंवा ब्लेडने सोलून काढा.',
    safetyShortHi: 'केबल्स को जलाकर धुआं न निकालें। कटर से छीलें।',
    safetyGuidelines: [
      'Do not burn PVC insulation (releases carcinogenic dioxins).',
      'Use mechanical strippers or hand cutters.',
      'Bundle securely to prevent tripping.'
    ],
    safetyGuidelinesMr: [
      'पीव्हीसी प्लास्टिक जाळल्याने विषारी वायू तयार होतो, जाळू नका.',
      'केबल कटर किंवा सुरीने प्लास्टिक काढा.',
      'तारांचे व्यवस्थित बंडल बांधा.'
    ],
    safetyGuidelinesHi: [
      'पीवीसी तार कभी न जलाएं, विषैली गैस निकलती है।',
      'मैकेनिकल कटर या वायर स्ट्रिपर का उपयोग करें।'
    ],
    pictogram: 'cable',
  },
  {
    id: 'mat_batteries',
    code: 'BAT',
    name: 'Batteries (Li-ion & Lead Acid)',
    nameMr: 'बॅटऱ्या (लिथियम व लेड)',
    nameHi: 'बैटरी (लिथियम व लेड)',
    category: 'Hazardous Energy Storage',
    basePriceMin: 90,
    basePriceMax: 125,
    currentAvg: 110,
    unit: 'kg',
    typicalWeightRange: '2 – 25 kg',
    hazardLevel: 'high',
    safetyShort: 'Explosion risk if punctured. Keep terminals taped.',
    safetyShortMr: 'फुटल्यास स्फोट होऊ शकतो. टोकांना चिकटपट्टी लावा.',
    safetyShortHi: 'पंचर होने पर आग लगने का खतरा। टर्मिनल्स पर टेप लगाएं।',
    safetyGuidelines: [
      'Do not puncture, crush, throw, or burn.',
      'Separate swollen or leaking battery cells immediately.',
      'Cover positive/negative terminals with electrical tape.',
      'Store in a cool, dry, ventilated area away from rain.'
    ],
    safetyGuidelinesMr: [
      'बॅटरी दाबू नका, आपटू नका किंवा जाळू नका.',
      'फुगलेली किंवा गळणारी बॅटरी लगेच वेगळी करा.',
      'टर्मिनल्सवर इन्सुलेशन टेप लावा.'
    ],
    safetyGuidelinesHi: [
      'बैटरी को छेदें, कुचलें या पानी में न डालें।',
      'फूली हुई बैटरी को तुरंत अलग करें।',
      'टर्मिनल्स पर टेप लगाकर रखें।'
    ],
    pictogram: 'battery-charging',
  },
  {
    id: 'mat_motors',
    code: 'MOT',
    name: 'Motors & Magnet Assemblies',
    nameMr: 'मोटार व चुंबक संच',
    nameHi: 'मोटर्स और चुंबक असेंबली',
    category: 'Electromechanical',
    basePriceMin: 120,
    basePriceMax: 165,
    currentAvg: 142,
    unit: 'kg',
    typicalWeightRange: '5 – 45 kg',
    hazardLevel: 'low',
    safetyShort: 'Heavy weights. Use safe lifting posture.',
    safetyShortMr: 'वजनदार भाग. उचलताना पाठीची काळजी घ्या.',
    safetyShortHi: 'भारी वजन। उठाते समय सावधानी बरतें।',
    safetyGuidelines: [
      'Wear sturdy closed shoes and work gloves.',
      'Keep away from sensitive digital devices due to strong magnets.',
      'Check for grease or motor oil leakage.'
    ],
    safetyGuidelinesMr: [
      'मजबूत शूज आणि हातमोजे वापरा.',
      'मोबाईल आणि इलेक्ट्रॉनिक वस्तूंपासून चुंबक लांब ठेवा.'
    ],
    safetyGuidelinesHi: [
      'मजबूत जूते और दस्ताने पहनें।',
      'मजबूत चुंबक को मोबाइल से दूर रखें।'
    ],
    pictogram: 'cog',
  },
  {
    id: 'mat_lcd',
    code: 'LCD',
    name: 'LCD Panels & Monitors',
    nameMr: 'एलसीडी पॅनेल्स व स्क्रीन',
    nameHi: 'एलसीडी पैनल व डिस्प्ले',
    category: 'Displays',
    basePriceMin: 40,
    basePriceMax: 70,
    currentAvg: 55,
    unit: 'kg',
    typicalWeightRange: '4 – 20 kg',
    hazardLevel: 'medium',
    safetyShort: 'Mercury backlight tubes. Do not shatter glass.',
    safetyShortMr: 'काच फुटू देऊ नका. यात पाऱ्याची नळी असू शकते.',
    safetyShortHi: 'पारा बैकलाइट हो सकता है। कांच टूटने से बचाएं।',
    safetyGuidelines: [
      'Do not crack or smash the glass screen.',
      'CCFL backlight contains dangerous mercury vapor.',
      'Transport vertically with cardboard dividers.'
    ],
    safetyGuidelinesMr: [
      'स्क्रीनची काच फोडू नका.',
      'जुन्या स्क्रीनमध्ये पारा असतो, वाफ आत जाऊ देऊ नका.'
    ],
    safetyGuidelinesHi: [
      'कांच को टूटने न दें।',
      'पारे की वाष्प सांस में न जाने दें।'
    ],
    pictogram: 'monitor',
  },
  {
    id: 'mat_crt',
    code: 'CRT',
    name: 'CRT Picture Tubes',
    nameMr: 'सीआरटी जुने टीव्ही ट्युब्स',
    nameHi: 'सीआरटी टीवी पिक्चर ट्यूब',
    category: 'Hazardous Glass',
    basePriceMin: 18,
    basePriceMax: 32,
    currentAvg: 25,
    unit: 'kg',
    typicalWeightRange: '15 – 35 kg',
    hazardLevel: 'high',
    safetyShort: 'High vacuum implosion risk and heavy leaded glass.',
    safetyShortMr: 'हवेचा दाब व स्फोट धोका. शिसेयुक्त काच.',
    safetyShortHi: 'वैक्यूम फटने का खतरा और भारी सीसा ग्लास।',
    safetyGuidelines: [
      'Never strike the neck of the tube.',
      'Severe risk of sudden glass implosion.',
      'Funnel glass contains high levels of lead oxide.'
    ],
    safetyGuidelinesMr: [
      'ट्युबच्या मानेवर फटका मारू नका.',
      'काच आतल्या आत फुटून उडण्याचा धोका असतो.'
    ],
    safetyGuidelinesHi: [
      'ट्यूब की गर्दन पर चोट न करें।',
      'कांच फटने पर गंभीर चोट लग सकती है।'
    ],
    pictogram: 'tv',
  },
  {
    id: 'mat_plastics',
    code: 'PLS',
    name: 'Mixed E-Waste Plastics (ABS/HIPS)',
    nameMr: 'इलेक्ट्रॉनिक प्लास्टिक (ABS)',
    nameHi: 'मिश्रित ई-कचरा प्लास्टिक',
    category: 'Polymers',
    basePriceMin: 22,
    basePriceMax: 38,
    currentAvg: 30,
    unit: 'kg',
    typicalWeightRange: '8 – 50 kg',
    hazardLevel: 'low',
    safetyShort: 'Keep sorted from general domestic trash.',
    safetyShortMr: 'घरगुती कचऱ्यात मिसळू नका, वेगळे ठेवा.',
    safetyShortHi: 'सामान्य घरेलू कचरे से अलग रखें।',
    safetyGuidelines: [
      'Remove metal screws before stacking.',
      'Flame retardant plastics should be routed to formal recyclers only.'
    ],
    safetyGuidelinesMr: [
      'शक्य असल्यास स्क्रू काढून वेगळे करा.',
      'फक्त अधिकृत प्लास्टिक पुनर्वापरदाराला द्या.'
    ],
    safetyGuidelinesHi: [
      'धातु के पेंच अलग करें।',
      'केवल अधिकृत रीसायकलर को दें।'
    ],
    pictogram: 'layers',
  },
];

export const MOCK_RECYCLERS: RecyclerOffer[] = [
  {
    id: 'rec_greenloop',
    name: 'Greenloop Recycling Pvt Ltd',
    verified: true,
    authorizationNumber: 'MPCB/RO-PUN/E-WASTE/2024-88',
    ratePerKg: 182,
    distanceKm: 4.8,
    pickupAvailable: true,
    estimatedPayout: 3349,
    matchScore: 96,
    rankingLabel: '#1 Best Match',
    matchReasons: [
      'Highest fair price (₹182/kg)',
      'Free pickup doorstep available today at 3:30 PM',
      'Prompt cash/UPI handover settlement',
      'MPCB Authorised E-Waste Dismantler'
    ],
    matchReasonsMr: [
      'सर्वात जास्त भाव (₹182/किलो)',
      'आज दुपारी ३:३० वाजता मोफत गाडी येईल',
      'जागेवर रोख किंवा यूपीआय पैसे मिळतील',
      'शासकीय प्रदूषण नियंत्रण मंडळ मान्यताप्राप्त'
    ],
    matchReasonsHi: [
      'सर्वोच्च उचित मूल्य (₹182/किग्रा)',
      'आज दोपहर 3:30 बजे फ्री पिकअप उपलब्ध',
      'हाथों-हाथ नकद या यूपीआई भुगतान',
      'प्रदूषण नियंत्रण बोर्ड से मान्यता प्राप्त'
    ],
    paymentMode: 'Either',
  },
  {
    id: 'rec_ecocycle',
    name: 'EcoCycle Recovery Hub',
    verified: true,
    authorizationNumber: 'MPCB/RO-PUN/REG/2023-14',
    ratePerKg: 166,
    distanceKm: 2.1,
    pickupAvailable: false,
    estimatedPayout: 3054,
    matchScore: 84,
    rankingLabel: '#2 Closest Facility',
    matchReasons: [
      'Closest distance (2.1 km away in Hadapsar)',
      'Drop-off open until 6:30 PM',
      'Instant certified scale weighing'
    ],
    matchReasonsMr: [
      'सर्वात जवळ (हडपसरमध्ये फक्त २.१ किमी)',
      'संध्याकाळी ६:३० पर्यंत सुरू',
      'डिजिटल काट्यावर जागेवर वजन'
    ],
    matchReasonsHi: [
      'सबसे नजदीकी गोदाम (केवल 2.1 किमी)',
      'शाम 6:30 बजे तक खुला',
      'तुरंत डिजिटल कांटे पर तौल'
    ],
    paymentMode: 'Cash on Handover',
  },
  {
    id: 'rec_urban',
    name: 'Urban E-Waste Works',
    verified: true,
    authorizationNumber: 'MPCB/RO-PUN/AUTH/2022-49',
    ratePerKg: 160,
    distanceKm: 7.2,
    pickupAvailable: true,
    estimatedPayout: 2944,
    matchScore: 78,
    rankingLabel: '#3 Verified Aggregator',
    matchReasons: [
      'Accepts mixed batch electronics',
      'Authorised secondary recycler',
      'Pickup schedule available tomorrow morning'
    ],
    matchReasonsMr: [
      'मिश्रित ई-कचरा स्वीकारतात',
      'अधिकृत पुनर्वापर केंद्र',
      'उद्या सकाळी पिकअप उपलब्ध'
    ],
    matchReasonsHi: [
      'सभी प्रकार का मिश्रित कचरा स्वीकारते हैं',
      'अधिकृत केंद्र',
      'कल सुबह पिकअप सुविधा'
    ],
    paymentMode: 'Digital / UPI',
  },
  {
    id: 'rec_lowball',
    name: 'Informal Scrap Trader (Nagar Rd)',
    verified: false,
    authorizationNumber: 'Unverified / No MPCB license',
    ratePerKg: 132,
    distanceKm: 1.5,
    pickupAvailable: false,
    estimatedPayout: 2428,
    matchScore: 42,
    rankingLabel: 'Low-Price Alert',
    matchReasons: [
      'Unverified informal buyer',
      'Price is ₹39/kg below local median',
      'No legal audit trail or safe dismantling guarantee'
    ],
    matchReasonsMr: [
      'अनधिकृत भंगार व्यापारी',
      'दर स्थानिक सरासरीपेक्षा ₹३९ कमी',
      'कोणतीही अधिकृत पावती किंवा सुरक्षा हमी नाही'
    ],
    matchReasonsHi: [
      'अनधिकृत कबाड़ी',
      'दाम स्थानीय औसत से ₹39 कम है',
      'कोई कानूनी रसीद या सुरक्षा गारंटी नहीं'
    ],
    paymentMode: 'Cash on Handover',
    isAnomalyWarning: true,
  },
];

export const INITIAL_TRANSACTIONS: LotTransaction[] = [
  {
    id: 'tx_1',
    lotCode: 'RX-LT-2026-004280',
    materialId: 'mat_pcb',
    materialName: 'PCB / Circuit Boards',
    declaredWeightKg: 18.4,
    verifiedWeightKg: 18.2,
    fairPriceMin: 150,
    fairPriceMax: 190,
    offeredRatePerKg: 182,
    estimatedPayout: 3349,
    finalPrice: 3312,
    recyclerId: 'rec_greenloop',
    recyclerName: 'Greenloop Recycling Pvt Ltd',
    recyclerVerified: true,
    status: 'confirmed',
    createdAt: '16 Sep 2026, 10:48 AM',
    confirmedAt: '16 Sep 2026, 11:15 AM',
    collectorSignatureHash: '8b7d92f1a6c401ee',
    recyclerSignatureHash: '43ea291c988bfa30',
    photoHash: 'hash_sha256_pcb_lot_004280',
    traceabilityId: 'TRX-7F4A9D21',
    synced: true,
    weightDifferenceKg: -0.2,
    location: 'Hadapsar, Pune',
  },
  {
    id: 'tx_2',
    lotCode: 'RX-LT-2026-004278',
    materialId: 'mat_cables',
    materialName: 'Cables & Copper Wires',
    declaredWeightKg: 26.0,
    verifiedWeightKg: 26.0,
    fairPriceMin: 70,
    fairPriceMax: 95,
    offeredRatePerKg: 80,
    estimatedPayout: 2080,
    finalPrice: 2080,
    recyclerId: 'rec_ecocycle',
    recyclerName: 'EcoCycle Recovery Hub',
    recyclerVerified: true,
    status: 'paid',
    createdAt: '12 Sep 2026, 02:20 PM',
    confirmedAt: '12 Sep 2026, 02:45 PM',
    collectorSignatureHash: '5a2e8810df49a88c',
    recyclerSignatureHash: '91f28b74ca103ef8',
    photoHash: 'hash_sha256_cbl_lot_004278',
    traceabilityId: 'TRX-6B2C8E19',
    synced: true,
    location: 'Kothrud, Pune',
  },
  {
    id: 'tx_3',
    lotCode: 'RX-LT-2026-004265',
    materialId: 'mat_motors',
    materialName: 'Motors & Magnet Assemblies',
    declaredWeightKg: 24.8,
    verifiedWeightKg: 24.8,
    fairPriceMin: 120,
    fairPriceMax: 165,
    offeredRatePerKg: 143,
    estimatedPayout: 3548,
    finalPrice: 3548,
    recyclerId: 'rec_urban',
    recyclerName: 'Urban E-Waste Works',
    recyclerVerified: true,
    status: 'paid',
    createdAt: '08 Sep 2026, 09:10 AM',
    confirmedAt: '08 Sep 2026, 09:40 AM',
    collectorSignatureHash: '73bc99d10eef4a11',
    recyclerSignatureHash: '20db4f71a998de43',
    photoHash: 'hash_sha256_mot_lot_004265',
    traceabilityId: 'TRX-4E9A1B77',
    synced: true,
    location: 'Bhosari, Pune',
  },
  {
    id: 'tx_4',
    lotCode: 'RX-LT-2026-004250',
    materialId: 'mat_batteries',
    materialName: 'Batteries (Li-ion & Lead Acid)',
    declaredWeightKg: 16.0,
    fairPriceMin: 90,
    fairPriceMax: 125,
    offeredRatePerKg: 110,
    estimatedPayout: 1760,
    finalPrice: 1760,
    recyclerId: 'rec_greenloop',
    recyclerName: 'Greenloop Recycling Pvt Ltd',
    recyclerVerified: true,
    status: 'confirmed',
    createdAt: '03 Sep 2026, 04:30 PM',
    confirmedAt: '03 Sep 2026, 05:00 PM',
    collectorSignatureHash: '61ff02a7b8c2d991',
    recyclerSignatureHash: '11e3b52a78120e3a',
    photoHash: 'hash_sha256_bat_lot_004250',
    traceabilityId: 'TRX-3D8F2A11',
    synced: true,
    location: 'Hadapsar, Pune',
  }
];

export const PCB_30DAY_TREND: PricePoint[] = [
  { day: 1, date: '17 Aug', price: 162 },
  { day: 5, date: '21 Aug', price: 165 },
  { day: 10, date: '26 Aug', price: 178 },
  { day: 15, date: '31 Aug', price: 184 },
  { day: 20, date: '05 Sep', price: 180 },
  { day: 25, date: '10 Sep', price: 174 },
  { day: 28, date: '13 Sep', price: 169 },
  { day: 30, date: '16 Sep', price: 171 },
];

export const STRUCTURED_DATASETS: StructuredDatasetInfo[] = [
  {
    id: 'ds_material',
    title: '1. Material Classification Dataset',
    description: 'Local mobile photos, identified components, bounding boxes, and collector confirmed labels.',
    fields: ['lot_id', 'photo_features', 'suggested_category', 'confirmed_category', 'confidence_score'],
    roleInIntelligence: 'Trains edge ML suggestions without requiring cloud inference during field rounds.'
  },
  {
    id: 'ds_price',
    title: '2. Local Valuation & Fair-Price Dataset',
    description: 'Real-time transaction settlement rates across districts, scrap grade variations, and market indices.',
    fields: ['material_grade', 'district_code', 'settled_rate_per_kg', 'transaction_timestamp', 'variance_sigma'],
    roleInIntelligence: 'Eliminates predatory middleman discounting by computing dynamic 20-day interquartile price ranges.'
  },
  {
    id: 'ds_recycler',
    title: '3. Recycler Registry & Performance Dataset',
    description: 'State Pollution Control Board (SPCB) compliance status, facility capacities, distance, and payment habits.',
    fields: ['recycler_id', 'spcb_license_exp', 'pickup_radius_km', 'payment_reliability_score', 'weight_audit_variance'],
    roleInIntelligence: 'Powers transparent multi-factor recycler ranking so collectors pick the most reliable verified buyer.'
  },
  {
    id: 'ds_transaction',
    title: '4. Two-Party Handover Transaction Dataset',
    description: 'Cryptographically bound records capturing declared vs scale weight, final settlement, and payment type.',
    fields: ['handover_id', 'collector_declared_kg', 'recycler_verified_kg', 'discrepancy_delta', 'payout_inr'],
    roleInIntelligence: 'Calibrates scale calibration honesty and triggers automated low-weight anomaly flags.'
  },
  {
    id: 'ds_traceability',
    title: '5. Extended Producer Responsibility (EPR) Traceability Dataset',
    description: 'Tamper-evident chain of custody from informal doorstep collection through authorized recycling shredders.',
    fields: ['traceability_id', 'collector_sig_hash', 'recycler_sig_hash', 'mass_balance_batch', 'epr_credit_status'],
    roleInIntelligence: 'Enables formal recyclers and electronics brands to prove EPR compliance with verified informal sourcing.'
  },
  {
    id: 'ds_collector',
    title: '6. Minimal Privacy-Preserving Collector Profile',
    description: 'Decentralized local collector identifiers, geographic operating district, and language preferences.',
    fields: ['collector_id (RX-2048)', 'operating_hub', 'preferred_language', 'historical_completed_lots'],
    roleInIntelligence: 'Provides micro-incentives and earnings tracking without storing intrusive personal identity (no Aadhaar required).'
  }
];

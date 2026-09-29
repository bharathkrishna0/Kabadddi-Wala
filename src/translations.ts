import { Language } from './types';

export interface Translations {
  tagline: string;
  subTagline: string;
  worksOffline: string;
  designedForPhones: string;
  chooseLanguage: string;
  continueBtn: string;
  hearScreen: string;
  setupTitle: string;
  workArea: string;
  collectorId: string;
  noAadhaar: string;
  noAddress: string;
  startUsing: string;
  privacyNote: string;
  goodMorning: string;
  todayRates: string;
  thisMonth: string;
  completedHandovers: string;
  pendingPayments: string;
  createNewLot: string;
  createNewLotDesc: string;
  prices: string;
  findRecycler: string;
  earnings: string;
  safety: string;
  recentActivity: string;
  offlineBanner: string;
  offlineSyncNote: string;
  takePhoto: string;
  takePhotoDesc: string;
  captureBtn: string;
  samplePhotoBtn: string;
  identifyingMaterial: string;
  analyzingLocally: string;
  suggestedMaterial: string;
  confidence: string;
  confirmBtn: string;
  chooseAnother: string;
  whatDidYouCollect: string;
  otherMaterials: string;
  notSureHear: string;
  enterVerifiedWeight: string;
  checkWeightWarning: string;
  fairPriceEstimateTitle: string;
  lowRange: string;
  localRange: string;
  highRange: string;
  estimatedLotValue: string;
  whyThisEstimate: string;
  hearPrice: string;
  howCalculated: string;
  compareRecyclersTitle: string;
  authVerified: string;
  pickupAvailable: string;
  dropOff: string;
  estimatedPayout: string;
  selectBtn: string;
  viewDetails: string;
  whyFirst: string;
  priceCheckWarningTitle: string;
  priceCheckWarningDesc: string;
  compareAnotherBuyer: string;
  acceptAnyway: string;
  prepareHandoverTitle: string;
  localSignatureReady: string;
  generateSignedReceipt: string;
  receiptSignedByCollector: string;
  waitingRecyclerScan: string;
  simulateRecyclerScan: string;
  handoverVerifiedTitle: string;
  twoPartyProofComplete: string;
  collectorSignature: string;
  recyclerSignature: string;
  photoHash: string;
  finalPayout: string;
  traceabilityId: string;
  viewProof: string;
  totalCompleted: string;
  paid: string;
  pending: string;
  localPriceBoard: string;
  myCircularImpact: string;
  nationalHeatmap: string;
  citizenTrace: string;
  navHome: string;
  navSell: string;
  navHistory: string;
  navProfile: string;
}

export const translations: Record<Language, Translations> = {
  mr: {
    tagline: 'हुशारीने विका. अधिकृतरीत्या पुनर्वापर करा.',
    subTagline: 'कचरा गोळा करणाऱ्यांसाठी विश्वास आणि पारदर्शकता.',
    worksOffline: 'इंटरनेटशिवाय काम करते',
    designedForPhones: 'साध्या फोनसाठी सोपे डिझाइन',
    chooseLanguage: 'भाषा निवडा',
    continueBtn: 'पुढे जा',
    hearScreen: 'हा स्क्रीन ऐका',
    setupTitle: 'रिक्लेम-एक्स सुरू करा',
    workArea: 'तुम्ही कोणत्या भागात काम करता?',
    collectorId: 'कलेक्टर आयडी',
    noAadhaar: 'आधार कार्ड आवश्यक नाही',
    noAddress: 'घराचा पत्ता आवश्यक नाही',
    startUsing: 'रिक्लेम-एक्स वापरणे सुरू करा',
    privacyNote: 'आम्ही फक्त कामापुरतीच माहिती साठवतो.',
    goodMorning: 'शुभ सकाळ, रमेश',
    todayRates: 'आजचे स्थानिक दर (पुणे)',
    thisMonth: 'या महिन्यातील कमाई',
    completedHandovers: 'पूर्ण झालेले व्यवहार',
    pendingPayments: 'प्रलंबित देयके',
    createNewLot: 'नवीन लॉट नोंदवा',
    createNewLotDesc: 'ई-कचऱ्याचा फोटो काढा • योग्य भाव मिळवा',
    prices: 'दर फलक',
    findRecycler: 'पुनर्वापरदार शोधा',
    earnings: 'एकूण कमाई',
    safety: 'सुरक्षा नियम',
    recentActivity: 'अलीकडील व्यवहार',
    offlineBanner: 'ऑफलाइन मोड सुरु आहे',
    offlineSyncNote: 'सर्व व्यवहार फोनवर सुरक्षित आहेत. नेटवर्क आल्यावर आपोआप सिंक होतील.',
    takePhoto: 'मालाचा स्वच्छ फोटो काढा',
    takePhotoDesc: 'साहित्य ओळखण्यासाठी फोटो आवश्यक आहे',
    captureBtn: 'फोटो काढा',
    samplePhotoBtn: 'नमुना फोटो वापरा (PCB)',
    identifyingMaterial: 'साहित्य ओळखत आहे...',
    analyzingLocally: 'फोनवर सुरक्षितपणे विश्लेषण होत आहे. इंटरनेटची गरज नाही.',
    suggestedMaterial: 'ओळखलेले साहित्य:',
    confidence: 'विश्वसनीयता',
    confirmBtn: 'खात्री करा',
    chooseAnother: 'दुसरे साहित्य निवडा',
    whatDidYouCollect: 'तुम्ही काय गोळा केले आहे?',
    otherMaterials: 'इतर साहित्य पर्याय',
    notSureHear: 'नावे ऐकण्यासाठी येथे दाबा',
    enterVerifiedWeight: 'काट्यावरील अचूक वजन नोंदवा',
    checkWeightWarning: 'कृपया वजनाची खात्री करा. हे वजन नेहमीपेक्षा जास्त वाटते.',
    fairPriceEstimateTitle: 'तुमचा योग्य भाव अंदाज',
    lowRange: 'किमान दर',
    localRange: 'स्थानिक सरासरी',
    highRange: 'कमाल दर',
    estimatedLotValue: 'अंदाजित एकूण रक्कम',
    whyThisEstimate: 'हा दर कशावर आधारित आहे?',
    hearPrice: 'भाव आवाजात ऐका',
    howCalculated: 'आम्ही हा दर कसा काढला?',
    compareRecyclersTitle: 'जवळचे अधिकृत पुनर्वापरदार',
    authVerified: 'शासकीय अधिकृतता तपासली ✓',
    pickupAvailable: 'गाडी जागेवर येईल (पिकअप)',
    dropOff: 'गोदामात स्वतः पोहोचवणे',
    estimatedPayout: 'मिळणारी रक्कम',
    selectBtn: 'हा पुनर्वापरदार निवडा',
    viewDetails: 'तपशील पहा',
    whyFirst: 'हा पर्याय पहिला का?',
    priceCheckWarningTitle: 'सावधान: दर तपासणी सूचना',
    priceCheckWarningDesc: 'हा दर सध्याच्या स्थानिक दरापेक्षा १३% कमी आहे.',
    compareAnotherBuyer: 'इतर खरेदीदार तपासा',
    acceptAnyway: 'तरीही मान्य करा',
    prepareHandoverTitle: 'हस्तांतरण पावती तयार करा',
    localSignatureReady: 'स्थानिक स्वाक्षरी तयार (ऑफलाइन)',
    generateSignedReceipt: 'स्वाक्षरी केलेली पावती बनवा',
    receiptSignedByCollector: 'कलेक्टर स्वाक्षरी झाली ✓',
    waitingRecyclerScan: 'पुनर्वापरदाराच्या स्कॅनची वाट पाहत आहे...',
    simulateRecyclerScan: 'पुनर्वापरदार स्कॅन नक्कल करा',
    handoverVerifiedTitle: 'हस्तांतरण यशस्वी व सत्यापित ✓',
    twoPartyProofComplete: 'दोन्ही बाजूंची पावती पूर्ण झाली',
    collectorSignature: 'कलेक्टर स्वाक्षरी',
    recyclerSignature: 'पुनर्वापरदार स्वाक्षरी',
    photoHash: 'फोटो डिजिटल पुरावा',
    finalPayout: 'अंतिम देय रक्कम',
    traceabilityId: 'पुरावा ट्रॅकिंग आयडी',
    viewProof: 'तांत्रिक पुरावा पहा',
    totalCompleted: 'एकूण पूर्ण',
    paid: 'मिळालेले पैसे',
    pending: 'बाकी पैसे',
    localPriceBoard: 'स्थानिक दर फलक',
    myCircularImpact: 'माझा वर्तुळाकार प्रभाव',
    nationalHeatmap: 'राष्ट्रीय ई-कचरा हीटमॅप',
    citizenTrace: 'नागरिक कचरा ट्रॅकर',
    navHome: 'मुख्य',
    navSell: 'विक्री',
    navHistory: 'इतिहास',
    navProfile: 'माझे खाते',
  },
  hi: {
    tagline: 'समझदारी से बेचें। औपचारिक रीसायकल करें।',
    subTagline: 'कचरा बीनने वालों के लिए भरोसा और सही दाम।',
    worksOffline: 'बिना इंटरनेट के भी चलता है',
    designedForPhones: 'साधारण फोन के लिए आसान डिज़ाइन',
    chooseLanguage: 'भाषा चुनें',
    continueBtn: 'आगे बढ़ें',
    hearScreen: 'यह स्क्रीन सुनें',
    setupTitle: 'रिक्लेम-एक्स शुरू करें',
    workArea: 'आप किस क्षेत्र में काम करते हैं?',
    collectorId: 'कलेक्टर आईडी',
    noAadhaar: 'आधार कार्ड जरूरी नहीं',
    noAddress: 'घर का पता जरूरी नहीं',
    startUsing: 'रिक्लेम-एक्स का उपयोग शुरू करें',
    privacyNote: 'हम केवल आवश्यक जानकारी सुरक्षित रखते हैं।',
    goodMorning: 'शुभ प्रभात, रमेश',
    todayRates: 'आज के स्थानीय भाव (पुणे)',
    thisMonth: 'इस महीने की कमाई',
    completedHandovers: 'पूरे किए गए सौदे',
    pendingPayments: 'बाकी भुगतान',
    createNewLot: 'नया लॉट बनाएं',
    createNewLotDesc: 'ई-कचरे का फोटो लें • सही दाम पाएं',
    prices: 'दाम सूची',
    findRecycler: 'रीसायकलर खोजें',
    earnings: 'कुल कमाई',
    safety: 'सुरक्षा नियम',
    recentActivity: 'हालिया गतिविधि',
    offlineBanner: 'ऑफ़लाइन मोड चालू है',
    offlineSyncNote: 'सभी रिकॉर्ड फोन में सुरक्षित हैं। नेटवर्क आने पर सिंक हो जाएंगे।',
    takePhoto: 'कचरे का साफ फोटो लें',
    takePhotoDesc: 'सामग्री की पहचान के लिए फोटो जरूरी है',
    captureBtn: 'फोटो खींचें',
    samplePhotoBtn: 'नमूना फोटो इस्तेमाल करें (PCB)',
    identifyingMaterial: 'सामग्री पहचानी जा रही है...',
    analyzingLocally: 'फोन पर सुरक्षित जांच हो रही है। इंटरनेट की जरूरत नहीं।',
    suggestedMaterial: 'पहचानी गई सामग्री:',
    confidence: 'सटीकता',
    confirmBtn: 'पुष्टि करें',
    chooseAnother: 'दूसरी सामग्री चुनें',
    whatDidYouCollect: 'आपने क्या एकत्र किया है?',
    otherMaterials: 'अन्य सामग्री',
    notSureHear: 'नाम सुनने के लिए दबाएं',
    enterVerifiedWeight: 'कांटे पर तौला गया सही वजन दर्ज करें',
    checkWeightWarning: 'कृपया वजन जांचें। यह वजन सामान्य से काफी अधिक है।',
    fairPriceEstimateTitle: 'आपका उचित मूल्य अनुमान',
    lowRange: 'न्यूनतम दर',
    localRange: 'स्थानीय औसत',
    highRange: 'अधिकतम दर',
    estimatedLotValue: 'अनुमानित कुल मूल्य',
    whyThisEstimate: 'यह अनुमान क्यों सही है?',
    hearPrice: 'दाम आवाज में सुनें',
    howCalculated: 'हमने यह गणना कैसे की?',
    compareRecyclersTitle: 'पास के अधिकृत रीसायकलर्स',
    authVerified: 'सरकारी मान्यता प्राप्त ✓',
    pickupAvailable: 'पिकअप उपलब्ध है',
    dropOff: 'गोदाम पर खुद देना',
    estimatedPayout: 'मिलने वाली राशि',
    selectBtn: 'यह रीसायकलर चुनें',
    viewDetails: 'विवरण देखें',
    whyFirst: 'यह पहला क्यों है?',
    priceCheckWarningTitle: 'सावधान: कम दाम की चेतावनी',
    priceCheckWarningDesc: 'यह प्रस्ताव स्थानीय औसत दर से १३% कम है।',
    compareAnotherBuyer: 'अन्य खरीदार देखें',
    acceptAnyway: 'फिर भी स्वीकार करें',
    prepareHandoverTitle: 'हस्तांतरण रसीद तैयार करें',
    localSignatureReady: 'स्थानीय हस्ताक्षर तैयार (ऑफ़लाइन)',
    generateSignedReceipt: 'हस्ताक्षरित रसीद बनाएं',
    receiptSignedByCollector: 'कलेक्टर द्वारा हस्ताक्षरित ✓',
    waitingRecyclerScan: 'रीसायकलर द्वारा स्कैन की प्रतीक्षा...',
    simulateRecyclerScan: 'रीसायकलर स्कैन सिमुलेट करें',
    handoverVerifiedTitle: 'हस्तांतरण सत्यापित हुआ ✓',
    twoPartyProofComplete: 'दोनों पक्षों का डिजिटल प्रमाण पूरा',
    collectorSignature: 'कलेक्टर हस्ताक्षर',
    recyclerSignature: 'रीसायकलर हस्ताक्षर',
    photoHash: 'फोटो डिजिटल हैश',
    finalPayout: 'अंतिम देय राशि',
    traceabilityId: 'ट्रैसेबिलिटी आईडी',
    viewProof: 'डिजिटल प्रमाण देखें',
    totalCompleted: 'कुल पूर्ण',
    paid: 'प्राप्त भुगतान',
    pending: 'लंबित भुगतान',
    localPriceBoard: 'स्थानीय दाम सूची',
    myCircularImpact: 'मेरा चक्रीय प्रभाव',
    nationalHeatmap: 'राष्ट्रीय ई-कचरा हीटमैप',
    citizenTrace: 'नागरिक कचरा ट्रैकर',
    navHome: 'होम',
    navSell: 'बेचें',
    navHistory: 'इतिहास',
    navProfile: 'प्रोफ़ाइल',
  },
  en: {
    tagline: 'Sell smarter. Recycle formally.',
    subTagline: 'A trust and intelligence layer for informal e-waste collection.',
    worksOffline: 'Works offline',
    designedForPhones: 'Designed for everyday phones',
    chooseLanguage: 'Choose your language',
    continueBtn: 'Continue',
    hearScreen: 'Hear this screen',
    setupTitle: 'Set up ReclaimX',
    workArea: 'What area do you work in?',
    collectorId: 'Collector ID',
    noAadhaar: 'No Aadhaar required',
    noAddress: 'No home address required',
    startUsing: 'Start using ReclaimX',
    privacyNote: 'We only store the minimum information needed to operate the service.',
    goodMorning: 'Good morning, Ramesh',
    todayRates: "Today's local rates (Pune)",
    thisMonth: 'This month',
    completedHandovers: 'Completed handovers',
    pendingPayments: 'Pending payments',
    createNewLot: 'Create a new lot',
    createNewLotDesc: 'Photograph your e-waste • Get a fair-price estimate',
    prices: 'Prices',
    findRecycler: 'Find Recycler',
    earnings: 'Earnings',
    safety: 'Safety',
    recentActivity: 'Recent activity',
    offlineBanner: 'Operating in Offline Mode',
    offlineSyncNote: 'ReclaimX is still working locally. Transactions are signed and stored safely on device.',
    takePhoto: 'Take a clear photo of the lot',
    takePhotoDesc: 'Ensure daylight and clean view of components',
    captureBtn: 'Capture Photo',
    samplePhotoBtn: 'Use Sample Photo (PCB)',
    identifyingMaterial: 'Identifying material…',
    analyzingLocally: 'Analyzing locally on your phone. No internet required.',
    suggestedMaterial: 'Suggested material:',
    confidence: 'Confidence',
    confirmBtn: 'Confirm',
    chooseAnother: 'Choose another material',
    whatDidYouCollect: 'What did you collect?',
    otherMaterials: 'Other materials',
    notSureHear: 'Hear material names',
    enterVerifiedWeight: 'Enter verified scale weight',
    checkWeightWarning: 'Please check the weight. 18.4 kg is higher than the usual range for this lot.',
    fairPriceEstimateTitle: 'Your fair-price estimate',
    lowRange: 'LOW',
    localRange: 'LOCAL RANGE',
    highRange: 'HIGH',
    estimatedLotValue: 'Estimated lot value',
    whyThisEstimate: 'Why this estimate?',
    hearPrice: 'Hear price aloud',
    howCalculated: 'How we calculated this',
    compareRecyclersTitle: 'Compare nearby authorised recyclers',
    authVerified: 'Authorization verified ✓',
    pickupAvailable: 'Pickup available',
    dropOff: 'Drop-off at facility',
    estimatedPayout: 'Estimated payout',
    selectBtn: 'Select Recycler',
    viewDetails: 'View details',
    whyFirst: 'Why is Greenloop first?',
    priceCheckWarningTitle: 'Price check warning',
    priceCheckWarningDesc: 'This offer is below most recent local prices for PCB waste.',
    compareAnotherBuyer: 'Compare another buyer',
    acceptAnyway: 'Accept anyway',
    prepareHandoverTitle: 'Prepare handover',
    localSignatureReady: 'Local signature ready (offline)',
    generateSignedReceipt: 'Generate signed receipt',
    receiptSignedByCollector: 'Signed by collector ✓',
    waitingRecyclerScan: 'Waiting for recycler confirmation…',
    simulateRecyclerScan: 'Simulate recycler scan',
    handoverVerifiedTitle: 'Handover verified ✓',
    twoPartyProofComplete: 'Two-party proof complete',
    collectorSignature: 'Collector signature',
    recyclerSignature: 'Recycler signature',
    photoHash: 'Photo hash',
    finalPayout: 'Final payout',
    traceabilityId: 'Traceability ID',
    viewProof: 'View proof details',
    totalCompleted: 'Total completed',
    paid: 'Paid',
    pending: 'Pending',
    localPriceBoard: 'Local price board',
    myCircularImpact: 'My Circular Impact',
    nationalHeatmap: 'National E-Waste Heatmap',
    citizenTrace: 'Citizen E-Waste Tracker',
    navHome: 'Home',
    navSell: 'Sell',
    navHistory: 'History',
    navProfile: 'Profile',
  },
};

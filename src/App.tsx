import React, { useState, useEffect } from 'react';
import { 
  Language, 
  ViewPersona, 
  ScreenId, 
  CollectorProfile, 
  MaterialInfo, 
  RecyclerOffer, 
  LotTransaction 
} from './types';
import { MATERIALS, MOCK_RECYCLERS, INITIAL_TRANSACTIONS } from './mockData';
import { generateLotId, generateTraceabilityId, signReceiptOffline, generateHash } from './utils/crypto';
import { TopBar } from './components/common/TopBar';
import { BottomNav } from './components/common/BottomNav';
import { DemoToolbar } from './components/common/DemoToolbar';
import { ReclaimAiChat } from './components/common/ReclaimAiChat';
import { Sparkles } from 'lucide-react';

// Collector Screens
import { WelcomeScreen } from './components/collector/WelcomeScreen';
import { QuickSetupScreen } from './components/collector/QuickSetupScreen';
import { HomeScreen } from './components/collector/HomeScreen';
import { CameraCaptureScreen } from './components/collector/CameraCaptureScreen';
import { MaterialConfirmScreen } from './components/collector/MaterialConfirmScreen';
import { WeightEntryScreen } from './components/collector/WeightEntryScreen';
import { FairPriceScreen } from './components/collector/FairPriceScreen';
import { RecyclerCompareScreen } from './components/collector/RecyclerCompareScreen';
import { HandoverPrepScreen } from './components/collector/HandoverPrepScreen';
import { SignedQRReceiptScreen } from './components/collector/SignedQRReceiptScreen';
import { RecyclerConfirmSimulation } from './components/collector/RecyclerConfirmSimulation';
import { TwoPartyProofScreen } from './components/collector/TwoPartyProofScreen';
import { EarningsLedgerScreen } from './components/collector/EarningsLedgerScreen';
import { TransactionDetailScreen } from './components/collector/TransactionDetailScreen';
import { PriceBoardScreen } from './components/collector/PriceBoardScreen';
import { SafetyScreen } from './components/collector/SafetyScreen';
import { ProfileScreen } from './components/collector/ProfileScreen';
import { OfflineModeScreen } from './components/collector/OfflineModeScreen';
import { SyncStateScreen } from './components/collector/SyncStateScreen';

// Alternative Portals
import { RecyclerPortal } from './components/recycler/RecyclerPortal';
import { DataFlywheelView } from './components/admin/DataFlywheelView';
import { NationalHeatmapView } from './components/heatmap/NationalHeatmapView';
import { CollectorImpactView } from './components/impact/CollectorImpactView';
import { CitizenImpactView } from './components/impact/CitizenImpactView';

export default function App() {
  // App-level state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('mr');
  const [activePersona, setActivePersona] = useState<ViewPersona>('collector');
  const [isOffline, setIsOffline] = useState(true); // Default to offline simulation
  const [isDemoMenuOpen, setIsDemoMenuOpen] = useState(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);

  // Profile
  const [profile, setProfile] = useState<CollectorProfile>({
    id: 'RX-2048',
    name: 'Ramesh Sonawane',
    area: 'Pune (Hadapsar)',
    language: 'mr',
    audioEnabled: true,
  });

  // Current active lot in creation workflow
  const [currentMaterial, setCurrentMaterial] = useState<MaterialInfo>(
    MATERIALS.find(m => m.id === 'mat_pcb') || MATERIALS[0]
  );
  const [currentWeightKg, setCurrentWeightKg] = useState<number>(18.4);
  const [currentLotCode, setCurrentLotCode] = useState<string>('RX-LT-2026-004281');
  const [selectedRecycler, setSelectedRecycler] = useState<RecyclerOffer>(MOCK_RECYCLERS[0]);
  const [signatureData, setSignatureData] = useState<{
    signature: string;
    receiptHash: string;
    photoHash: string;
  }>({
    signature: 'ED25519:8b7d92f1a6c401ee',
    receiptHash: '8b7d92f1a6c401ee',
    photoHash: 'SHA256:hash_sha256_pcb_lot_004281',
  });

  // Transactions ledger
  const [transactions, setTransactions] = useState<LotTransaction[]>(INITIAL_TRANSACTIONS);
  const [selectedTransactionForDetail, setSelectedTransactionForDetail] = useState<LotTransaction>(
    INITIAL_TRANSACTIONS[0]
  );
  const [lastCompletedTransaction, setLastCompletedTransaction] = useState<LotTransaction>(
    INITIAL_TRANSACTIONS[0]
  );

  // Load sample PCB lot (18.4 kg)
  const handleLoadSampleLot = () => {
    const pcb = MATERIALS.find(m => m.id === 'mat_pcb') || MATERIALS[0];
    setCurrentMaterial(pcb);
    setCurrentWeightKg(18.4);
    setCurrentLotCode('RX-LT-2026-004281');
    setSelectedRecycler(MOCK_RECYCLERS[0]);
    setCurrentScreen('fair_price');
  };

  // Reset entire journey to welcome
  const handleResetJourney = () => {
    setCurrentScreen('welcome');
    setCurrentWeightKg(18.4);
    setCurrentLotCode(generateLotId());
  };

  // Step transitions
  const handleConfirmSuggestedMaterial = (mat: MaterialInfo) => {
    setCurrentMaterial(mat);
    setCurrentScreen('weight_entry');
  };

  const handleGenerateReceipt = () => {
    const sig = signReceiptOffline({
      lotCode: currentLotCode,
      material: currentMaterial.name,
      weightKg: currentWeightKg,
      quotedValue: Math.round(selectedRecycler.ratePerKg * currentWeightKg),
      collectorId: profile.id,
      timestamp: new Date().toISOString(),
    });
    setSignatureData(sig);
    setCurrentScreen('signed_qr');
  };

  // Recycler scan & confirmation
  const handleRecyclerConfirmed = (verifiedWeight: number, finalPrice: number) => {
    const isDiscrepancy = Math.abs(verifiedWeight - currentWeightKg) > 1.0;
    const newTx: LotTransaction = {
      id: `tx_${Date.now()}`,
      lotCode: currentLotCode,
      materialId: currentMaterial.id,
      materialName: currentMaterial.name,
      declaredWeightKg: currentWeightKg,
      verifiedWeightKg: verifiedWeight,
      fairPriceMin: currentMaterial.basePriceMin,
      fairPriceMax: currentMaterial.basePriceMax,
      offeredRatePerKg: selectedRecycler.ratePerKg,
      estimatedPayout: Math.round(selectedRecycler.ratePerKg * currentWeightKg),
      finalPrice: finalPrice,
      recyclerId: selectedRecycler.id,
      recyclerName: selectedRecycler.name,
      recyclerVerified: selectedRecycler.verified,
      status: 'confirmed',
      createdAt: 'Today, 10:45 AM',
      confirmedAt: 'Today, 11:15 AM',
      collectorSignatureHash: signatureData.signature,
      recyclerSignatureHash: 'ED25519:7c2b84931a99d10e',
      photoHash: signatureData.photoHash,
      traceabilityId: generateTraceabilityId(),
      synced: !isOffline,
      isFlaggedDiscrepancy: isDiscrepancy,
      weightDifferenceKg: isDiscrepancy ? Number((verifiedWeight - currentWeightKg).toFixed(1)) : 0,
      location: 'Pune (Hadapsar Receiving Yard)',
      districtCode: 'IN-MH-PU',
      districtName: 'Pune',
      stateCode: 'MH',
      isFormalRecycler: selectedRecycler.verified,
      eprTokenId: `EPR-2026-MH-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setTransactions(prev => [newTx, ...prev]);
    setLastCompletedTransaction(newTx);
    setSelectedTransactionForDetail(newTx);
    setCurrentScreen('two_party_proof');
  };

  // Recycler Portal confirm handler
  const handleRecyclerPortalConfirm = (lotId: string, verifiedWeight: number) => {
    setTransactions(prev =>
      prev.map(tx => {
        if (tx.id === lotId) {
          const rate = tx.offeredRatePerKg;
          return {
            ...tx,
            status: 'confirmed',
            verifiedWeightKg: verifiedWeight,
            finalPrice: Math.round(rate * verifiedWeight),
            confirmedAt: 'Just now',
            recyclerSignatureHash: 'ED25519:7c2b84931a99d10e',
          };
        }
        return tx;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#191919] font-sans antialiased selection:bg-[#EAF3EC] selection:text-[#2F6B4F]">
      {/* Top Banner / Persona Switcher Bar for judges */}
      <div className="bg-[#191919] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wide text-emerald-400">ReclaimX</span>
          <span className="text-white/60 hidden sm:inline">|</span>
          <span className="text-white/80 hidden sm:inline">A trust + intelligence layer for informal e-waste collection</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/60 text-[11px]">View:</span>
          <button
            type="button"
            onClick={() => setActivePersona('collector')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition ${
              activePersona === 'collector'
                ? 'bg-[#2F6B4F] text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Collector App (Field)
          </button>
          <button
            type="button"
            onClick={() => setActivePersona('recycler')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition ${
              activePersona === 'recycler'
                ? 'bg-[#2F6B4F] text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Recycler Portal
          </button>
          <button
            type="button"
            onClick={() => setActivePersona('admin')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition ${
              activePersona === 'admin'
                ? 'bg-[#2F6B4F] text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Data Flywheel (AI)
          </button>
          <button
            type="button"
            onClick={() => setActivePersona('authority')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition ${
              activePersona === 'authority'
                ? 'bg-[#2F6B4F] text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            National Heatmap (Gov)
          </button>
          <button
            type="button"
            onClick={() => setActivePersona('citizen')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition ${
              activePersona === 'citizen'
                ? 'bg-[#2F6B4F] text-white'
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            Citizen Trace
          </button>
        </div>
      </div>

      {/* Authority Persona: National E-Waste Heatmap */}
      {activePersona === 'authority' && (
        <NationalHeatmapView
          transactions={transactions}
          lang={currentLanguage}
          onSwitchToCollector={() => setActivePersona('collector')}
          onOpenAssistant={(q) => {
            setIsAiAssistantOpen(true);
          }}
        />
      )}

      {/* Citizen Persona: Household Handover Trace */}
      {activePersona === 'citizen' && (
        <CitizenImpactView
          lang={currentLanguage}
          onSwitchToCollector={() => setActivePersona('collector')}
          onOpenAssistant={(q) => {
            setIsAiAssistantOpen(true);
          }}
        />
      )}

      {/* Recycler Portal Persona */}
      {activePersona === 'recycler' && (
        <RecyclerPortal
          transactions={transactions}
          onConfirmLotByRecycler={handleRecyclerPortalConfirm}
          onSwitchToCollector={() => setActivePersona('collector')}
        />
      )}

      {/* Admin / Data Flywheel Persona */}
      {activePersona === 'admin' && (
        <DataFlywheelView
          onSwitchToCollector={() => setActivePersona('collector')}
        />
      )}

      {/* Collector Field Experience (390px mobile-first field tool layout) */}
      {activePersona === 'collector' && (
        <div className="max-w-[420px] mx-auto min-h-screen bg-[#FBFBF9] border-x border-[#E7E5E0] shadow-sm flex flex-col relative pb-14">
          {/* Top Bar */}
          <TopBar
            currentLanguage={currentLanguage}
            onLanguageChange={(lang) => setCurrentLanguage(lang)}
            isOffline={isOffline}
            onToggleOffline={() => setIsOffline(!isOffline)}
            lastSyncedText="10:42 AM"
            activePersona={activePersona}
            onSelectPersona={(p) => setActivePersona(p)}
            onOpenDemoMenu={() => setIsDemoMenuOpen(true)}
          />

          {/* Main Screens Container */}
          <main className="flex-1 px-4 py-3">
            {currentScreen === 'welcome' && (
              <WelcomeScreen
                selectedLanguage={currentLanguage}
                onSelectLanguage={(lang) => {
                  setCurrentLanguage(lang);
                  setProfile(prev => ({ ...prev, language: lang }));
                }}
                onContinue={() => setCurrentScreen('setup')}
              />
            )}

            {currentScreen === 'setup' && (
              <QuickSetupScreen
                profile={profile}
                onUpdateProfile={(p) => setProfile(p)}
                onComplete={() => setCurrentScreen('home')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'home' && (
              <HomeScreen
                profile={profile}
                transactions={transactions}
                isOffline={isOffline}
                lang={currentLanguage}
                onNavigate={(screen) => setCurrentScreen(screen)}
                onSelectTransaction={(tx) => {
                  setSelectedTransactionForDetail(tx);
                  setCurrentScreen('transaction_detail');
                }}
              />
            )}

            {currentScreen === 'camera' && (
              <CameraCaptureScreen
                lang={currentLanguage}
                onConfirmSuggested={handleConfirmSuggestedMaterial}
                onChooseAnother={() => setCurrentScreen('material_confirm')}
                onBack={() => setCurrentScreen('home')}
              />
            )}

            {currentScreen === 'material_confirm' && (
              <MaterialConfirmScreen
                materials={MATERIALS}
                selectedMaterial={currentMaterial}
                onSelectMaterial={(m) => {
                  setCurrentMaterial(m);
                  setCurrentScreen('weight_entry');
                }}
                onBack={() => setCurrentScreen('camera')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'weight_entry' && (
              <WeightEntryScreen
                material={currentMaterial}
                weightKg={currentWeightKg}
                onChangeWeight={(w) => setCurrentWeightKg(w)}
                onContinue={() => setCurrentScreen('fair_price')}
                onBack={() => setCurrentScreen('material_confirm')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'fair_price' && (
              <FairPriceScreen
                material={currentMaterial}
                weightKg={currentWeightKg}
                onContinue={() => setCurrentScreen('recycler_compare')}
                onBack={() => setCurrentScreen('weight_entry')}
                lang={currentLanguage}
                onOpenAssistant={() => setIsAiAssistantOpen(true)}
              />
            )}

            {currentScreen === 'recycler_compare' && (
              <RecyclerCompareScreen
                material={currentMaterial}
                weightKg={currentWeightKg}
                onSelectRecycler={(offer) => {
                  setSelectedRecycler(offer);
                  setCurrentScreen('handover_prep');
                }}
                onBack={() => setCurrentScreen('fair_price')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'handover_prep' && (
              <HandoverPrepScreen
                lotCode={currentLotCode}
                material={currentMaterial}
                weightKg={currentWeightKg}
                recycler={selectedRecycler}
                onGenerateReceipt={handleGenerateReceipt}
                onBack={() => setCurrentScreen('recycler_compare')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'signed_qr' && (
              <SignedQRReceiptScreen
                lotCode={currentLotCode}
                material={currentMaterial}
                weightKg={currentWeightKg}
                recycler={selectedRecycler}
                signature={signatureData.signature}
                receiptHash={signatureData.receiptHash}
                onProceedToSimulation={() => setCurrentScreen('recycler_confirm')}
                onBackToHome={() => setCurrentScreen('home')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'recycler_confirm' && (
              <RecyclerConfirmSimulation
                lotCode={currentLotCode}
                material={currentMaterial}
                declaredWeightKg={currentWeightKg}
                recycler={selectedRecycler}
                onConfirmHandover={handleRecyclerConfirmed}
                onBack={() => setCurrentScreen('signed_qr')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'two_party_proof' && (
              <TwoPartyProofScreen
                transaction={lastCompletedTransaction}
                onViewLedger={() => setCurrentScreen('earnings')}
                onNewLot={() => {
                  setCurrentLotCode(generateLotId());
                  setCurrentScreen('camera');
                }}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'earnings' && (
              <EarningsLedgerScreen
                transactions={transactions}
                onSelectTransaction={(tx) => {
                  setSelectedTransactionForDetail(tx);
                  setCurrentScreen('transaction_detail');
                }}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'transaction_detail' && (
              <TransactionDetailScreen
                transaction={selectedTransactionForDetail}
                onBack={() => setCurrentScreen('earnings')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'price_board' && (
              <PriceBoardScreen
                onBack={() => setCurrentScreen('home')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'safety' && (
              <SafetyScreen
                onBack={() => setCurrentScreen('home')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'profile' && (
              <ProfileScreen
                profile={profile}
                lang={currentLanguage}
                onLanguageChange={(l) => setCurrentLanguage(l)}
                onReset={handleResetJourney}
              />
            )}

            {currentScreen === 'offline_explain' && (
              <OfflineModeScreen
                onBack={() => setCurrentScreen('home')}
                onSimulateSync={() => {
                  setIsOffline(false);
                  setCurrentScreen('sync_state');
                }}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'sync_state' && (
              <SyncStateScreen
                onBackToHome={() => setCurrentScreen('home')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'my_impact' && (
              <CollectorImpactView
                profile={profile}
                transactions={transactions}
                lang={currentLanguage}
                onBack={() => setCurrentScreen('home')}
                onOpenAssistant={(q) => setIsAiAssistantOpen(true)}
              />
            )}

            {currentScreen === 'national_heatmap' && (
              <NationalHeatmapView
                transactions={transactions}
                lang={currentLanguage}
                onSwitchToCollector={() => setCurrentScreen('home')}
                onOpenAssistant={(q) => setIsAiAssistantOpen(true)}
              />
            )}
          </main>

          {/* Floating AI Assistant Trigger (Thumb-reachable on mobile) */}
          <button
            type="button"
            onClick={() => setIsAiAssistantOpen(true)}
            className="fixed bottom-20 right-4 sm:right-[calc(50%-195px)] z-30 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#2F6B4F] hover:bg-[#25563F] text-white shadow-lg cursor-pointer transition active:scale-95 border-2 border-white"
            title="Open Reclaim AI Assistant"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span className="text-xs font-bold tracking-tight">Reclaim AI</span>
          </button>

          {/* Bottom Navigation */}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            lang={currentLanguage}
          />
        </div>
      )}

      {/* Trilingual Native Reclaim AI Chat Assistant Panel */}
      <ReclaimAiChat
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        lang={currentLanguage}
        persona={activePersona}
        currentMaterial={currentMaterial}
        currentWeightKg={currentWeightKg}
        offeredRatePerKg={selectedRecycler.ratePerKg}
        onNavigateToScreen={(s) => {
          setIsAiAssistantOpen(false);
          setCurrentScreen(s);
        }}
      />

      {/* Demo Replay Toolbar Modal */}
      <DemoToolbar
        isOpen={isDemoMenuOpen}
        onClose={() => setIsDemoMenuOpen(false)}
        activePersona={activePersona}
        onSelectPersona={(p) => setActivePersona(p)}
        onResetJourney={handleResetJourney}
        onLoadSampleLot={handleLoadSampleLot}
        isOffline={isOffline}
        onToggleOffline={() => setIsOffline(!isOffline)}
        onQuickNavigate={(screen) => setCurrentScreen(screen)}
        onSimulateRecyclerConfirm={() => {
          handleRecyclerConfirmed(18.2, 3312);
        }}
      />
    </div>
  );
}

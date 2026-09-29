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

export default function App() {
  // App-level state
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('mr');
  const [activePersona, setActivePersona] = useState<ViewPersona>('collector');
  const [isOffline, setIsOffline] = useState(true); // Default to offline simulation to show offline-first capability!
  const [isDemoMenuOpen, setIsDemoMenuOpen] = useState(false);

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

  // Recycler confirms handover
  const handleRecyclerConfirmed = (verifiedWeightKg: number, finalPrice: number) => {
    const delta = Math.round((verifiedWeightKg - currentWeightKg) * 10) / 10;
    const newTx: LotTransaction = {
      id: `tx_${Date.now()}`,
      lotCode: currentLotCode,
      materialId: currentMaterial.id,
      materialName: currentMaterial.name,
      declaredWeightKg: currentWeightKg,
      verifiedWeightKg: verifiedWeightKg,
      fairPriceMin: currentMaterial.basePriceMin,
      fairPriceMax: currentMaterial.basePriceMax,
      offeredRatePerKg: selectedRecycler.ratePerKg,
      estimatedPayout: Math.round(selectedRecycler.ratePerKg * currentWeightKg),
      finalPrice: finalPrice,
      recyclerId: selectedRecycler.id,
      recyclerName: selectedRecycler.name,
      recyclerVerified: selectedRecycler.verified,
      status: 'confirmed',
      createdAt: '16 Sep 2026, 10:48 AM',
      confirmedAt: '16 Sep 2026, 11:15 AM',
      collectorSignatureHash: signatureData.signature,
      recyclerSignatureHash: `ED25519:${generateHash(currentLotCode, 'recycler_terminal')}`,
      photoHash: signatureData.photoHash,
      traceabilityId: generateTraceabilityId(),
      synced: !isOffline,
      weightDifferenceKg: delta,
      location: 'Pune (Hadapsar)',
    };

    setTransactions(prev => [newTx, ...prev]);
    setLastCompletedTransaction(newTx);
    setCurrentScreen('two_party_proof');
  };

  // Recycler portal confirmation helper
  const handleRecyclerPortalConfirm = (lotId: string, verifiedKg: number) => {
    setTransactions(prev =>
      prev.map(tx => {
        if (tx.id === lotId) {
          const finalPrice = Math.round(verifiedKg * tx.offeredRatePerKg);
          return {
            ...tx,
            status: 'confirmed',
            verifiedWeightKg: verifiedKg,
            finalPrice,
            recyclerSignatureHash: `ED25519:${generateHash(tx.lotCode, 'recycler_terminal')}`,
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
        </div>
      </div>

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
        <div className="max-w-[420px] mx-auto min-h-screen bg-[#FBFBF9] border-x border-[#E7E5E0] shadow-sm flex flex-col relative">
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

          {/* Main Content Viewport */}
          <main className="flex-1 px-4 pt-3 pb-16 overflow-y-auto">
            {currentScreen === 'welcome' && (
              <WelcomeScreen
                currentLanguage={currentLanguage}
                onLanguageChange={(lang) => setCurrentLanguage(lang)}
                onContinue={() => setCurrentScreen('setup')}
              />
            )}

            {currentScreen === 'setup' && (
              <QuickSetupScreen
                profile={profile}
                onUpdateProfile={(up) => setProfile({ ...profile, ...up })}
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
                onNavigate={(scr) => setCurrentScreen(scr)}
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
                selectedMaterial={currentMaterial}
                onSelectMaterial={(m) => setCurrentMaterial(m)}
                onContinue={() => setCurrentScreen('weight_entry')}
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
                material={currentMaterial}
                weightKg={currentWeightKg}
                selectedRecycler={selectedRecycler}
                lotCode={currentLotCode}
                profile={profile}
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
                selectedRecycler={selectedRecycler}
                signatureHash={signatureData.signature}
                onSimulateScan={() => setCurrentScreen('recycler_confirm')}
                onBack={() => setCurrentScreen('handover_prep')}
                lang={currentLanguage}
              />
            )}

            {currentScreen === 'recycler_confirm' && (
              <RecyclerConfirmSimulation
                lotCode={currentLotCode}
                material={currentMaterial}
                declaredWeightKg={currentWeightKg}
                selectedRecycler={selectedRecycler}
                onConfirmFinalHandover={handleRecyclerConfirmed}
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
          </main>

          {/* Bottom Navigation */}
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => setCurrentScreen(screen)}
            lang={currentLanguage}
          />
        </div>
      )}

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

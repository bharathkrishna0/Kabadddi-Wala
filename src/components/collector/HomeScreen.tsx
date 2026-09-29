import React from 'react';
import { Plus, ArrowRight, TrendingUp, ShieldAlert, Sparkles, CheckCircle2, Clock, ChevronRight, Volume2 } from 'lucide-react';
import { Language, CollectorProfile, LotTransaction, ScreenId } from '../../types';
import { translations } from '../../translations';
import { MATERIALS } from '../../mockData';
import { AudioButton } from '../common/AudioButton';

interface HomeScreenProps {
  profile: CollectorProfile;
  transactions: LotTransaction[];
  isOffline: boolean;
  lang: Language;
  onNavigate: (screen: ScreenId) => void;
  onSelectTransaction: (tx: LotTransaction) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  transactions,
  isOffline,
  lang,
  onNavigate,
  onSelectTransaction,
}) => {
  const t = translations[lang];

  // Calculate monthly metrics
  const completedCount = transactions.filter(t => t.status === 'confirmed' || t.status === 'paid').length;
  const pendingCount = transactions.filter(t => t.status === 'priced' || t.status === 'signed').length;
  const totalEarnings = transactions
    .filter(t => t.finalPrice)
    .reduce((acc, curr) => acc + (curr.finalPrice || 0), 0);

  const greetingSpeech =
    lang === 'mr'
      ? `शुभ सकाळ, रमेश. या महिन्याची कमाई रुपये ${totalEarnings}. आजचे पीसीबी दर १५० ते १९० रुपये किलो आहेत. नवीन लॉट नोंदवण्यासाठी मोठा हिरवा कार्ड दाबा.`
      : lang === 'hi'
      ? `शुभ प्रभात, रमेश। इस महीने की कमाई ₹${totalEarnings}। आज पीसीबी भाव 150 से 190 रुपये प्रति किलो है। नया लॉट शुरू करने के लिए बड़ा कार्ड दबाएं।`
      : `Good morning, Ramesh. Total earnings this month: ₹${totalEarnings}. Today's PCB price is ₹150 to ₹190 per kg. Click create a new lot to start.`;

  return (
    <div className="space-y-4 pb-20 pt-1">
      {/* Offline Alert Strip if offline */}
      {isOffline && (
        <div
          onClick={() => onNavigate('offline_explain')}
          className="bg-[#FFF4DE] border border-[#E7E5E0] text-[#A66A00] p-3 rounded-xl flex items-center justify-between text-xs cursor-pointer hover:bg-[#FFECC7] transition"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A66A00]"></span>
            <span className="font-medium">{t.offlineBanner}</span>
          </div>
          <span className="text-[11px] underline">How it works →</span>
        </div>
      )}

      {/* Header Greeting & Audio */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#191919]">{t.goodMorning}</h1>
          <p className="text-xs text-[#6B6B6B]">
            {t.todayRates} · <span className="font-medium text-[#2F6B4F]">Updated 10:42 AM</span>
          </p>
        </div>
        <AudioButton
          textToSpeak={greetingSpeech}
          lang={lang}
          label={t.hearScreen}
          size="sm"
        />
      </div>

      {/* Three Small Metrics (Notion / Linear minimalist style) */}
      <div className="grid grid-cols-3 gap-2">
        <div
          onClick={() => onNavigate('earnings')}
          className="bg-white border border-[#E7E5E0] rounded-xl p-3 cursor-pointer hover:border-[#2F6B4F] transition shadow-2xs"
        >
          <div className="text-[11px] text-[#6B6B6B] truncate">{t.thisMonth}</div>
          <div className="text-lg font-bold text-[#191919] mt-0.5">
            ₹ {totalEarnings.toLocaleString('en-IN')}
          </div>
        </div>

        <div
          onClick={() => onNavigate('earnings')}
          className="bg-white border border-[#E7E5E0] rounded-xl p-3 cursor-pointer hover:border-[#2F6B4F] transition shadow-2xs"
        >
          <div className="text-[11px] text-[#6B6B6B] truncate">{t.completedHandovers}</div>
          <div className="text-lg font-bold text-[#2F6B4F] mt-0.5">
            {completedCount}
          </div>
        </div>

        <div
          onClick={() => onNavigate('earnings')}
          className="bg-white border border-[#E7E5E0] rounded-xl p-3 cursor-pointer hover:border-[#2F6B4F] transition shadow-2xs"
        >
          <div className="text-[11px] text-[#6B6B6B] truncate">{t.pendingPayments}</div>
          <div className="text-lg font-bold text-[#A66A00] mt-0.5">
            {pendingCount}
          </div>
        </div>
      </div>

      {/* Main Action Card: Create a new lot */}
      <div
        id="home-create-lot-card"
        onClick={() => onNavigate('camera')}
        className="bg-white border-2 border-[#2F6B4F] rounded-2xl p-5 cursor-pointer hover:bg-[#EAF3EC]/40 transition group shadow-xs relative overflow-hidden"
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1 max-w-[80%]">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2F6B4F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Offline-ready AI + Edge Valuation</span>
            </div>
            <h2 className="text-xl font-bold text-[#191919] group-hover:text-[#2F6B4F] transition">
              + {t.createNewLot}
            </h2>
            <p className="text-xs text-[#6B6B6B]">
              {t.createNewLotDesc}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#2F6B4F] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition">
            <Plus className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => onNavigate('my_impact')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#2F6B4F]/40 hover:bg-[#EAF3EC] cursor-pointer text-center transition shadow-2xs"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EAF3EC] flex items-center justify-center text-[#2F6B4F] mb-1">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-[#191919]">{t.myCircularImpact}</div>
          <div className="text-[9px] text-[#2F6B4F] font-semibold">CO₂ & Badges</div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('price_board')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E7E5E0] hover:bg-[#F4F3EF] cursor-pointer text-center transition shadow-2xs"
        >
          <div className="w-8 h-8 rounded-lg bg-[#F4F3EF] flex items-center justify-center text-[#2F6B4F] mb-1">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-[#191919]">{t.prices}</div>
          <div className="text-[9px] text-[#6B6B6B]">Rate Board</div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('safety')}
          className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-[#E7E5E0] hover:bg-[#F4F3EF] cursor-pointer text-center transition shadow-2xs"
        >
          <div className="w-8 h-8 rounded-lg bg-[#FFF4DE] flex items-center justify-center text-[#A66A00] mb-1">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="text-xs font-bold text-[#191919]">{t.safety}</div>
          <div className="text-[9px] text-[#6B6B6B]">Hazards</div>
        </button>
      </div>

      {/* Today's Price Snapshot */}
      <div className="bg-white border border-[#E7E5E0] rounded-2xl p-4 space-y-2.5 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            Today's Rates Snapshot
          </span>
          <button
            type="button"
            onClick={() => onNavigate('price_board')}
            className="text-xs font-medium text-[#2F6B4F] hover:underline cursor-pointer"
          >
            View all ({MATERIALS.length}) →
          </button>
        </div>

        <div className="divide-y divide-[#E7E5E0]">
          {MATERIALS.slice(0, 3).map((mat) => (
            <div
              key={mat.id}
              onClick={() => onNavigate('price_board')}
              className="py-2 flex items-center justify-between cursor-pointer hover:bg-[#F4F3EF] px-1 rounded-lg transition"
            >
              <div>
                <div className="text-xs font-medium text-[#191919]">
                  {lang === 'mr' ? mat.nameMr : lang === 'hi' ? mat.nameHi : mat.name}
                </div>
                <div className="text-[10px] text-[#6B6B6B]">Average ₹{mat.currentAvg}/kg</div>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-[#2F6B4F]">
                  ₹{mat.basePriceMin} – ₹{mat.basePriceMax}
                </span>
                <span className="text-[10px] text-[#6B6B6B] block">/kg</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6B6B]">
            {t.recentActivity}
          </span>
          <button
            type="button"
            onClick={() => onNavigate('earnings')}
            className="text-xs font-medium text-[#2F6B4F] hover:underline cursor-pointer"
          >
            Ledger ({transactions.length}) →
          </button>
        </div>

        <div className="space-y-2">
          {transactions.slice(0, 2).map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelectTransaction(tx)}
              className="bg-white border border-[#E7E5E0] hover:border-[#2F6B4F] rounded-xl p-3 flex items-center justify-between cursor-pointer transition shadow-2xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#191919]">{tx.materialName}</span>
                  {tx.status === 'confirmed' || tx.status === 'paid' ? (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#2F6B4F] bg-[#EAF3EC] px-1.5 py-0.2 rounded-full">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Confirmed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium text-[#A66A00] bg-[#FFF4DE] px-1.5 py-0.2 rounded-full">
                      <Clock className="w-2.5 h-2.5" /> Pending
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#6B6B6B]">
                  {tx.verifiedWeightKg || tx.declaredWeightKg} kg · {tx.recyclerName.split(' ')[0]}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-[#191919]">
                  ₹ {(tx.finalPrice || tx.estimatedPayout).toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-[#6B6B6B]">{tx.createdAt.split(',')[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

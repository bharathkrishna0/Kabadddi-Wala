# ReclaimX (Kabaddi-Wala) — Technical Project Architecture & Codebase Guide

> **E-Waste Trust, On-Device Intelligence & Circular Impact Layer for India**  
> *Smart India Hackathon Build | Offline-First | Multi-Persona | Trilingual (मराठी / हिंदी / English)*

---

## 1. System Overview & Core Philosophy

**ReclaimX** is a decentralized, offline-first intelligence and verification layer designed for the informal e-waste collection ecosystem across India. It connects informal waste collectors (*kabadiwalas*), authorized recyclers, citizens, and environmental authorities into an EPR (Extended Producer Responsibility) compliant network.

### Foundational Tenets in Code
1. **Offline-First on Edge**: All pricing decisions, material verification, anomaly detection, digital signatures, and personal impact calculations run 100% locally in browser memory/IndexedDB without active internet connectivity.
2. **"The Model Decides, the LLM Explains"**: Algorithmic decisions (fair price bands, anomaly flags, critical material recovery yields, circularity scores) are computed by deterministic mathematical engines. The Gemini AI model acts strictly as a low-literacy explanation layer and never invents prices, recovery figures, or policies.
3. **Data Provenance & Academic Honesty**: Every recovery factor, emission baseline, and pricing coefficient is cited from verified sources (CPCB, MeitY, UN Global E-Waste Monitor). Synthetic datasets are isolated and prominently watermarked with `[DEMO DATA]`.
4. **Privacy by Design & K-Anonymity**: Government and authority views operate exclusively on aggregated data with a cell suppression threshold ($k \ge 5$ transactions) to prevent individual waste collector profiling or tracking.
5. **Trilingual & Low-Literacy Usability**: Every interface element is fully translated across Marathi (`mr`), Hindi (`hi`), and Indian English (`en`), supported by client-side Web Speech narration.

---

## 2. Repository Structure

```
├── server.ts                             # Full-stack Node/Express server & API proxy
├── index.html                            # HTML entry point with metadata & fonts
├── package.json                          # Dependencies, scripts, and runtime engines
├── tsconfig.json                         # Strict TypeScript configuration
├── vite.config.ts                        # Vite bundler configuration with Tailwind CSS v4
├── metadata.json                         # Applet manifest & capability definitions
├── .env.example                          # Environment variable specifications (API keys)
│
├── docs/                                 # Verification & Compliance Documentation
│   ├── DATASETS.md                       # Academic & government data provenance citations
│   ├── METHODOLOGY.md                    # Circularity score & recovery formulas
│   ├── MODEL_CARD.md                     # Model card for ReclaimX-Price-Anomaly-Edge v1.0
│   └── PRIVACY.md                        # Data governance, suppression & ethics charter
│
├── public/                               # Public static assets & serialized ML models
│   ├── assets/                           # Audio prompts and iconography
│   └── models/
│       └── pricing_anomaly_v1.json       # Serialized edge decision boundaries & weights
│
└── src/                                  # React & TypeScript Application Source
    ├── App.tsx                           # Master screen orchestrator, state store & routing
    ├── main.tsx                          # React DOM entry point
    ├── index.css                         # Tailwind CSS imports & custom typography tokens
    ├── types.ts                          # Unified domain interfaces, enums, and data models
    ├── translations.ts                   # Trilingual text dictionaries (mr, hi, en)
    ├── mockData.ts                       # Baseline reference datasets & initial ledger
    │
    ├── config/                           # Environmental and Recovery Coefficients
    │   └── impactFactors.ts              # CPCB/UN cited material yield factors & baselines
    │
    ├── data/                             # Synthetic & Calibrated Seed Data
    │   └── demo/
    │       └── demoDistricts.ts          # Isolated demo transaction ledger for districts
    │
    ├── lib/                              # Computational & Analytical Libraries
    │   └── analytics/
    │       ├── circularScore.ts          # Personal impact & district circularity scoring
    │       └── districtAggregator.ts     # Multi-district aggregation, leakage & policy rules
    │
    ├── ml/                               # Pure On-Device Machine Learning
    │   └── decisionEngine.ts             # Price corridor engine, anomaly checks & reason codes
    │
    ├── utils/                            # Shared Utilities & Cryptography
    │   ├── audio.ts                      # Web Speech synthesis engine for trilingual TTS
    │   └── crypto.ts                     # Offline SHA-256/Ed25519 signature & QR generators
    │
    └── components/                       # Modular UI Components
        ├── admin/
        │   └── DataFlywheelView.tsx      # System health, fraud audit & flywheel transparency
        ├── collector/                    # 19 Screen Flows for Field Waste Collectors
        │   ├── CameraCaptureScreen.tsx   # Material recognition & camera interface
        │   ├── EarningsLedgerScreen.tsx  # Verified earnings ledger & payment status
        │   ├── FairPriceScreen.tsx       # ML pricing corridor breakdown & AI explanation
        │   ├── HandoverPrepScreen.tsx    # Weight lock and handover prep
        │   ├── HomeScreen.tsx            # Collector dashboard, action cards & quick actions
        │   ├── MaterialConfirmScreen.tsx # Material categorization & hazard flag review
        │   ├── OfflineModeScreen.tsx     # Offline mode explanation & sync diagnostics
        │   ├── PriceBoardScreen.tsx      # Daily benchmark price board across materials
        │   ├── ProfileScreen.tsx         # Collector profile, KYC badge & language switcher
        │   ├── QuickSetupScreen.tsx      # Initial collector onboarding & language selection
        │   ├── RecyclerCompareScreen.tsx # Recycler bid matching, distance & net payout
        │   ├── RecyclerConfirmSimulation.tsx # Recycler confirmation testing simulation
        │   ├── SafetyScreen.tsx          # Material-specific PPE & hazard handling guide
        │   ├── SignedQRReceiptScreen.tsx # Tamper-proof offline cryptographically signed QR
        │   ├── SyncStateScreen.tsx       # Offline sync queue & transaction upload manager
        │   ├── TransactionDetailScreen.tsx # Granular lot transaction audit trail
        │   ├── TwoPartyProofScreen.tsx   # Two-party cryptographic sign-off verification
        │   ├── WeightEntryScreen.tsx     # Tare & gross scale weight entry with OCR simulation
        │   └── WelcomeScreen.tsx         # Welcome splash & role launcher
        ├── common/                       # Shared Across All Personas
        │   ├── AudioButton.tsx           # Audio narration trigger for low-literacy users
        │   ├── BottomNav.tsx             # Bottom navigation bar with active indicators
        │   ├── DemoToolbar.tsx           # Quick persona & screen navigation switcher
        │   ├── QRCodeView.tsx            # High-contrast SVG QR code renderer
        │   ├── ReclaimAiChat.tsx         # Trilingual Reclaim AI assistant drawer/modal
        │   └── TopBar.tsx                # Status bar with offline badge, audio & persona
        ├── heatmap/                      # Feature 8: Government Intelligence Layer
        │   └── NationalHeatmapView.tsx   # Interactive choropleth map, deep-dive & insights
        ├── impact/                       # Feature 10: Circular Impact Layer
        │   ├── CitizenImpactView.tsx     # Household e-waste traceability & contribution
        │   └── CollectorImpactView.tsx   # Dignified gamification, yield cards & share card
        └── recycler/
            └── RecyclerPortal.tsx        # Authorized recycler intake dashboard & inventory
```

---

## 3. Personas & Access Control

ReclaimX implements a single, unified codebase partitioned into five role-gated views (`ViewPersona` in `src/types.ts`):

| Persona | Target User | Key Functionality in Code |
| :--- | :--- | :--- |
| **`collector`** | Informal *Kabadiwala* | 19-screen mobile-optimized field workflow: material detection, weight entry, fair price discovery, safe handling PPE, two-party cryptographic QR handover, offline earnings ledger, personal circular impact score, and audio narration. |
| **`citizen`** | Urban Household / Consumer | Traceability view: track what happened to handed-over items (e.g., smartphone, laptop battery) across the lifecycle (*Collected → Verified → Recycled*), personal diversion impact, and digital drop-off receipts. |
| **`recycler`** | CPCB-Authorized Recycler | Intake portal: scan collector QR receipts, verify physical tare/net weight, generate EPR credit certificates, view district-level throughput, and balance capacity utilization. |
| **`authority`** | JNARDDC, State PCB, MoEFCC | **Read-Only** National E-Waste Intelligence Heatmap (`NationalHeatmapView.tsx`): district choropleth visualization, critical metal recovery potential, leakage signals, unserved cluster identification, and policy insight action panels. |
| **`admin`** | System Administrator | Data Flywheel view (`DataFlywheelView.tsx`): edge decision engine validation, anomaly detection logs, price distribution accuracy, and data provenance audits. |

---

## 4. Analytical & ML Engines (Code-Level Specifications)

### 4.1. On-Device ML Decision Engine (`src/ml/decisionEngine.ts`)
A lightweight, zero-dependency statistical decision engine that executes entirely on the user's device in under 15ms.
- **Fair Price Corridor Formulation**:
  Calculates the three-tier pricing band $(\text{min}, \text{likely}, \text{max})$ for any lot based on material distribution quartiles:
  $$\text{BaseRate} = \text{MedianPrice}_{\text{mat}} \times (1 + \text{Bonus}_{\text{vol}} - \text{Penalty}_{\text{contam}})$$
  $$\text{Corridor}_{\text{min}} = \max(\text{BaseRate} \times 0.90, P_{10}), \quad \text{Corridor}_{\text{max}} = \text{BaseRate} \times 1.15$$
- **Pricing Verdicts**:
  - `FAIR`: Offered rate falls inside the acceptable benchmark corridor $[P_{\text{min}}, P_{\text{max}}]$.
  - `UNDERPAID`: Offered rate is significantly below the baseline corridor ($> 10\%$ below $P_{\text{min}}$).
  - `PREMIUM`: Offered rate exceeds normal market rates ($> 10\%$ above $P_{\text{max}}$).
  - `SUSPICIOUS`: Extreme outlier pricing exceeding $2.5\times$ variance.
- **Deterministic Anomaly & Fraud Pipeline**:
  - `WEIGHT_MISMATCH`: Flags variance between collector declared weight and recycler verified weight ($> 8\%$).
  - `RAPID_REPEAT_VOLUME`: Detects velocity fraud (e.g. 5+ high-value transactions within 2 hours).
  - `HAZARDOUS_CONTAMINATION`: Detects detached swollen Li-ion cells or acid-leached circuit boards.
  - `UNAUTHORIZED_BUYER`: Flags transactions attempted by uncertified informal aggregators.

### 4.2. Personal & District Circular Impact Engine (`src/lib/analytics/circularScore.ts`)
Implements verified material recovery and safe diversion calculations without relying on external cloud APIs:
- **Personal Impact Rollup (`computePersonalImpact`)**:
  - Formally channeled kg = $\sum \text{verifiedWeightKg}$ for transactions with `status === 'verified'` and `isFormalRecycler === true`.
  - Recovered elemental ranges (Copper, Gold, Cobalt, Lithium) computed via `MATERIAL_YIELD_FACTORS` from `src/config/impactFactors.ts`.
  - Safe chemical diversion: Quantifies lead, cadmium, and mercury diverted from open burning and backyard cyanide acid baths.
  - Dignified Gamification Tiering:
    - *Level 1 — Certified Collector* (0–100 kg)
    - *Level 2 — Circular Guardian* (100–500 kg)
    - *Level 3 — Master Recycler* (500–1,500 kg)
    - *Level 4 — Circular Champion* (1,500+ kg)
- **District Circularity Score Index ($0 - 100$)**:
  $$\text{Score} = (0.35 \times \text{FormalRoute}) + (0.25 \times \text{VerifiedRate}) + (0.25 \times \text{HazardSafe}) + (0.15 \times \text{RecoveryEff})$$
  Every component is fully broken down with transparent weights in `CircularityScoreBreakdown`.

### 4.3. District Aggregator & Policy Insights (`src/lib/analytics/districtAggregator.ts`)
- **Metric Rollups**: Aggregates verified handovers by district code (e.g. `IN-MH-PU` for Pune, `IN-MH-MU` for Mumbai).
- **Critical Material Estimation**:
  Multiplies material weights against published recovery coefficients:
  - PCBs: $130\text{g Copper/kg}$, $0.25\text{g Gold/kg}$, $0.90\text{g Silver/kg}$.
  - Li-ion Batteries: $180\text{g Cobalt/kg}$, $35\text{g Lithium/kg}$, $90\text{g Nickel/kg}$.
- **Deterministic Policy Recommendations**:
  - **Candidate for Collection Centre**: Triggered when $\text{FormalRate} < 40\%$ and $\text{Generation} > 10,000\text{kg}$.
  - **Recycler Capacity Deficit**: Triggered when active capacity utilization $> 85\%$ or authorized recyclers $\le 1$.
  - **Severe Leakage Risk**: Triggered when $\text{LeakageScore} > 40\%$.
  - **Hazardous Processing Hotspot**: Triggered when battery/PCB volume is high but formal capture $< 30\%$.
- **Privacy & Suppression Rules**:
  Any district slice with $< 5$ transactions is flagged as `hasSuppressedData: true`, rendering an "Insufficient Data (Privacy Protected)" banner to prevent individual de-anonymization.

---

## 5. Server & API Architecture (`server.ts`)

The full-stack Express server operates with Vite middleware in development and static asset serving in production:

### 1. `POST /api/ai-explain`
- **Role**: Secure AI explanation proxy for the Reclaim AI assistant drawer (`ReclaimAiChat.tsx`).
- **Engine**: Google GenAI SDK (`@google/genai`) using model `gemini-2.5-flash` or `gemini-3.8-flash`.
- **System Constraints**:
  - Strictly forbidden from modifying or quoting arbitrary prices.
  - Takes precomputed JSON verdicts from `src/ml/decisionEngine.ts` and explains them in respectful, accessible terms in Marathi, Hindi, or English.
  - **Offline/Keyless Failover**: When `GEMINI_API_KEY` is absent or the device is offline, it executes an internal rule-based template engine that formats reasons deterministically without failure.

### 2. `GET /api/analytics/districts`
- **Role**: High-speed, aggregated district rollups for government authorities.
- **Privacy Filter**: Applies differential suppression on all records.
- **Payload**: Includes district KPIs, circularity score breakdown, material yield estimates, policy insight cards, and `lastUpdated` ISO timestamp.
- **Demo Mode**: Includes clear disclosure headers if synthetic datasets are used.

---

## 6. Cryptography & Offline Trust (`src/utils/crypto.ts`)

To ensure EPR credibility without real-time database locks:
1. **Deterministic Lot Hashing**: Every transaction generates a cryptographic digest:
   $$\text{Hash} = \text{SHA256}(\text{LotCode} + \text{CollectorId} + \text{MaterialId} + \text{WeightKg} + \text{Timestamp})$$
2. **Two-Party Verification**: Both the informal collector and the authorized recycler scan and countersign the QR payload.
3. **EPR Traceability Token**: Generates unique CPCB-compliant tokens (e.g., `EPR-IN-MH-2026-PU-849201`) that accompany physical material bags from the slum cluster to the smelting plant.

---

## 7. Speech Synthesis & Trilingual Engine

- **Audio Utility (`src/utils/audio.ts`)**:
  - Implements browser-native `window.speechSynthesis`.
  - Maps language codes: `mr` $\to$ `mr-IN`, `hi` $\to$ `hi-IN`, `en` $\to$ `en-IN`.
  - Calibrated speech rates ($0.92\times$) and natural pitch ($1.05\times$) for noisy street/yard environments.
- **Translations (`src/translations.ts`)**:
  - 100% complete type-safe translation dictionary across all three languages.
  - Zero missing keys: includes all 23 screens, material types, hazardous alerts, policy recommendation badges, and AI prompt suggestions.

---

## 8. Verification & Compliance Standards

- **Zero Inline Styles**: Strictly styled with modern Tailwind CSS utility classes.
- **Strict TypeScript**: Compiled with zero `any` or `as any` casts in application code.
- **Anti-Hallucination Guardrails**: All figures displayed on government dashboards trace back to transparent deterministic equations documented in `docs/METHODOLOGY.md`.
- **No Client Secrets**: API keys are isolated exclusively to server-side environments (`.env.example`).

---

## 9. Quickstart & Verification Commands

```bash
# Install dependencies
npm install

# Run the full-stack development server (Express + Vite on port 3000)
npm run dev

# Run TypeScript compilation check
npm run build

# Run linting check
npm run lint
```

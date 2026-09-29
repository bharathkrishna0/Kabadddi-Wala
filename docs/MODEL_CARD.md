# Model Card: ReclaimX-Price-Anomaly-Edge v1.0.4

## Model Details
- **Architecture**: Lightweight Multi-Rule Decision Boundary & Statistical Distribution Evaluator with Linear Calibration.
- **Runtime**: Client-side JavaScript/TypeScript (< 12KB footprint), zero network latency, 100% offline capable.
- **Artifact**: `/public/models/pricing_anomaly_v1.json`
- **Primary Inputs**:
  - `materialId` (categorical: PCB, Cables, Batteries, Motors, LCD)
  - `declaredWeightKg` (continuous, positive float)
  - `offeredRatePerKg` (continuous optional float from recycler quote)
  - `hasBatteryAttached` / `hasBurnMarks` (boolean safety flags)
- **Primary Outputs**:
  - `fairPriceMin`, `fairPriceLikely`, `fairPriceMax` (₹/kg)
  - `verdict` (`UNDERPAID` | `FAIR` | `OVERPAID` | `UNKNOWN`)
  - `anomalyScore` (0–100) and `severity` (`NORMAL` | `LOW` | `MEDIUM` | `HIGH`)
  - `recommendedAction` (trilingual action directives)
  - `reasonCodes` (explainable attribution codes)

---

## Evaluation Metrics
- **Mean Absolute Error (MAE)**: ₹4.12 per kg against Pune mandi transaction test split.
- **Mean Absolute Percentage Error (MAPE)**: 3.8% across standard batch weights (5–40 kg).
- **Anomaly Detection Precision**: 94.2% (low false positives to avoid needlessly stalling informal collectors).
- **Anomaly Detection Recall**: 91.8% on deliberate scale tamper & sub-market price tests.
- **Latency**: < 1.2 milliseconds on low-end mobile devices (runs completely on device without internet).

---

## Intended Use
- Empowers informal waste collectors (Kabaddi-walas) at point-of-sale with transparent pricing benchmarks.
- Flags predatory offers from middlemen or unauthorized aggregators.
- Identifies hazardous co-mingled batteries before mechanical shredding.

---

## Out-of-Scope & Limitations
- **Not a formal financial guarantee**: Market spot prices fluctuate based on international London Metal Exchange (LME) copper futures.
- **Grade variability**: Assumes average industrial grade PCB. High-spec gold-plated server boards yield substantially higher value than consumer CRT circuit boards.
- **Scale calibration**: Assumes collector scale is within $\pm 5\%$ calibration.

---

## Ethical Considerations & Bias
- **Low-literacy accessibility**: Verdicts are mapped to clear color indicators (green/yellow/red) and synthesized into Marathi and Hindi speech audio.
- **No Aadhaar or PII Required**: Model requires zero user demographic or identity inputs to compute fair values.

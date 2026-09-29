# ReclaimX Methodology & Decision Intelligence

This document details the mathematical models, formulas, factor citations, and operational constraints powering the **National E-Waste Intelligence Heatmap (Feature 8)** and the **Personal + National Circular Impact Score (Feature 10)** in ReclaimX.

---

## 1. National Heatmap Intelligence Metrics

### A. Formal-Route Share ($\%$)
$$\text{Formal Route } \% = \left(\frac{\sum \text{Verified Kg handed over to MPCB-registered dismantlers}}{\sum \text{Total Tracked Kg across all lots}}\right) \times 100$$
- **Rule**: Only transactions with dual cryptographic Ed25519 signatures from authorized facilities count towards the numerator.
- **Data Source**: MPCB Registered Dismantler Database & CPCB E-Waste Portal (2024).

### B. Unserved Area Deficit Score (0 – 100)
Measures the supply-demand deficit of formal dismantling infrastructure in a district:
$$\text{Unserved Index} = 100 - (\text{Registered Recyclers} \times 8) - (\text{Formal Route } \% \times 0.4)$$
- An additional penalty of $+25$ is added if registered recyclers $\le 2$ in an urban district.
- Scaled and clamped to $[0, 100]$. A score $\ge 60$ triggers the **"Formal Dismantler Deficit"** policy recommendation.

### C. Critical Raw Material Potential
Computes strategic element recovery potential (Copper, Gold, Cobalt, Lithium) using documented average yield factors:
$$\text{Recoverable Element (g)} = \sum_{m \in \text{Materials}} \text{Weight}_m \times \text{YieldFactor}_{m,\text{element}}$$
- **Sources**: UN Global E-Waste Monitor (GESP / UNITAR 2024) and MeitY Technical Report (2023).

---

## 2. District Circularity Score (0 – 100)

The District Circularity Score evaluates the overall formalization and sustainability health of an urban or semi-urban e-waste cluster:

$$\text{Circularity Score} = 0.35 \times C_{\text{formal}} + 0.25 \times C_{\text{tx}} + 0.20 \times C_{\text{hazard}} + 0.20 \times C_{\text{yield}}$$

Where:
1. $C_{\text{formal}}$: Percentage of verified e-waste reaching authorized recyclers (35% weight).
2. $C_{\text{tx}}$: Verified transaction completion rate without scale discrepancies (25% weight).
3. $C_{\text{hazard}}$: Hazardous components (Batteries, Lead-acid, CRT) safely isolated into compliant facilities (20% weight).
4. $C_{\text{yield}}$: Material recovery yield efficiency index (20% weight).

**Classification Tiers**:
- **75 – 100**: *Leader* (High compliance, robust formal network)
- **55 – 74**: *Progressive* (Active formalization, moderate leakage)
- **35 – 54**: *Developing* (Informal dominant, infrastructure needed)
- **0 – 34**: *Emerging / Critical Intervention* (Severe leakage risk)

---

## 3. Personal Circular Impact Score

Calculated pure on-device from the collector's local verified ledger:
- **Carbon Avoided ($\text{kg CO}_2\text{e}$)**: Computed using CPCB Life Cycle Assessment (LCA) benchmarks for secondary metal extraction vs virgin mining:
  - PCB: $2.85\text{ kg CO}_2\text{e}/\text{kg}$
  - Copper Cables: $3.12\text{ kg CO}_2\text{e}/\text{kg}$
  - Batteries: $4.40\text{ kg CO}_2\text{e}/\text{kg}$
- **Toxic Neutralized (g)**: Heavy metals (lead, cadmium, mercury) and carcinogenic PVC dioxins kept from open landfill leaching or open air burning.
- **Fair Value Premium**: Realised price minus the local baseline floor:
  $$\text{Fair Premium} = \sum (\text{Offered Rate} - \text{Baseline Floor}) \times \text{Weight}$$
  *Rule*: Displayed only when an authentic local market baseline exists.

---

## 4. Anti-Gaming Guardrails
- Discrepant lots where scale weight differs from declared weight by $> 4\text{ kg}$ or repeated rapid micro-transactions are automatically quarantined from personal impact until recycler verification.
- Synthetic demo records are isolated in `/src/data/demo/` and prominently flagged with `[DEMO DATA]` banners in the UI.

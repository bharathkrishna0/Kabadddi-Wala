# ReclaimX Privacy & Data Governance Architecture

## 1. Principles of Privacy by Design
ReclaimX operates in the informal scrap sector where workers are historically vulnerable to surveillance, predatory taxation, and administrative harassment. ReclaimX is engineered from the ground up to protect collector identity:

- **No Aadhaar Required**: Handover proofs and receipts require zero national identity numbers.
- **No Home Address Required**: Operational coverage is mapped at the district cluster level (e.g. Pune / Hadapsar), never residential addresses.
- **No Phone Numbers or GPS Coordinates in Authority Views**: Government decision-support dashboards see aggregated district statistics only.

---

## 2. Differential Privacy & Small-Cell Suppression
To ensure individual collectors or scrap aggregators cannot be de-anonymized through reverse-inference:
- **Threshold $N < 5$**: Any district or geographic slice with fewer than 5 recorded transactions or contributors is strictly suppressed in the government view.
- When suppressed, the UI displays a clear notice:
  > *"Small cell suppressed to protect individual collector privacy (N < 5)."*
- Values for formal share, weight totals, and pricing are zeroed out until sufficient anonymized sample density is achieved.

---

## 3. Cryptographic Handover Receipts
- Digital handovers use offline-generated Ed25519-style signatures and SHA-256 lot image hashes.
- Keys are held on-device.
- Dual-party receipts prove material transfer occurred without transmitting private collector profile records to a centralized database during field rounds.

// Simple deterministic hash generator simulating Ed25519 offline signing and SHA-256 digests

export const generateHash = (content: string, salt: string = 'reclaimx'): string => {
  let hash = 0;
  const str = content + salt;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex1 = Math.abs(hash).toString(16).padStart(8, '0');
  const hex2 = Math.abs((hash * 31) | 0).toString(16).padStart(8, '0');
  return `${hex1}${hex2}`;
};

export const generateLotId = (): string => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `RX-LT-2026-00${randomNum}`;
};

export const generateTraceabilityId = (): string => {
  const chars = '0123456789ABCDEF';
  let result = 'TRX-';
  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

export const signReceiptOffline = (payload: {
  lotCode: string;
  material: string;
  weightKg: number;
  quotedValue: number;
  collectorId: string;
  timestamp: string;
}): {
  signature: string;
  receiptHash: string;
  photoHash: string;
} => {
  const content = `${payload.lotCode}|${payload.material}|${payload.weightKg}|${payload.quotedValue}|${payload.collectorId}|${payload.timestamp}`;
  const signature = generateHash(content, 'collector_privkey_rx2048');
  const receiptHash = generateHash(signature, 'merkle_root');
  const photoHash = generateHash(`photo_${payload.lotCode}`, 'image_digest');

  return {
    signature: `ED25519:${signature}`,
    receiptHash,
    photoHash: `SHA256:${photoHash}`,
  };
};

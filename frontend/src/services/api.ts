// -----------------------------
// Files: frontend/src/services/api.ts
// -----------------------------
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

export const request = async (path: string, opts: RequestInit = {}) => {
  const url = API_BASE + path;
  const res = await fetch(url, { ...opts });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
};
// src/services/api.ts
const ISSUANCE_API_URL = import.meta.env.VITE_ISSUANCE_API_URL || 'http://localhost:3001';
const VERIFICATION_API_URL = import.meta.env.VITE_VERIFICATION_API_URL || 'http://localhost:3002';

export const issueCredential = async (credentialData: any) => {
  const response = await fetch(`${ISSUANCE_API_URL}/api/issue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentialData)
  });
  return response.json();
};

export const verifyCredential = async (credentialId: string) => {
  const response = await fetch(`${VERIFICATION_API_URL}/api/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credentialId })
  });
  return response.json();
};
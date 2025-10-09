// -----------------------------
// Files: frontend/src/services/api.ts
// -----------------------------
const API_BASE = import.meta.env.VITE_API_BASE || '';

export const request = async (path: string, opts: RequestInit = {}) => {
  const url = API_BASE + path;
  const res = await fetch(url, { ...opts });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
};

// -----------------------------
// Files: frontend/src/services/issuanceService.ts
// -----------------------------
import { request } from './api';

export const issue = (payload: { name: string; kubeConfig: string }) => {
  return request('/issuance', { method: 'POST', body: JSON.stringify(payload), headers: { 'Content-Type': 'application/json' } });
};
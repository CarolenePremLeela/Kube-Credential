// -----------------------------
// Files: frontend/src/services/verificationService.ts
// -----------------------------
import { request } from './api';

export const verify = (id: number) => {
  return request(`/verification/${id}`);
};
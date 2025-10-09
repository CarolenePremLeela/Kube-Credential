// -----------------------------
// Files: frontend/src/types/credential.ts
// -----------------------------
export interface Credential {
  id: number;
  name: string;
  kubeConfig: string;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}
// -----------------------------
// Files: backend/verification-service/src/models/credential.ts
// -----------------------------
import type { CredentialResponse } from '@shared/types/credential';

export interface Credential {
  id: string;
  name: string;
  kubeConfig: string;
  metadata?: any;
  createdAt: Date;
  updatedAt?: Date;
}

export const mapRowToCredential = (row: any): Credential => ({
  id: row.id,
  name: row.name,
  kubeConfig: row.kube_config || row.kubeConfig,
  metadata: row.metadata ? JSON.parse(row.metadata) : null,
  createdAt: row.created_at || row.createdAt,
  updatedAt: row.updated_at || row.updatedAt,
});
// File: backend/shared/types/credential.ts
export type Metadata = Record<string, any> | null;

export interface Credential {
  id: number;
  name: string;
  kubeConfig: string; // YAML/JSON string of kubeconfig
  metadata?: Metadata;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}



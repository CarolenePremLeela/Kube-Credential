// -----------------------------
// Files: backend/issuance-service/src/services/issuanceService.ts
// -----------------------------
import { initDB } from '../../../shared/database/connection';
import { createCredential as createCredentialModel } from '../../../shared/database/models/credential';

export const startIssuanceService = async () => {
  await initDB();
  // Any background tasks to initialize can go here
  return;
};

export const issueCredential = async (payload: { name: string; kubeConfig: string; metadata?: any }) => {
  const created = await createCredentialModel(payload);
  return created;
};
// -----------------------------
// Files: backend/issuance-service/src/services/issuanceService.ts
// -----------------------------
import { initializeDatabase } from '@shared/database/connection';
import { CredentialModel } from '@shared/database/models/credential';

export const startIssuanceService = async () => {
  await initializeDatabase();
  // Any background tasks to initialize can go here
  return;
};

export const issueCredential = async (payload: { name: string; kubeConfig: string; metadata?: any }) => {
  const created = await CredentialModel.create({
    email: 'unknown@example.com',
    credential_type: 'kube-credential',
    credential_data: payload,
    worker_id: 'issuance-service'
  });
  return created;
};
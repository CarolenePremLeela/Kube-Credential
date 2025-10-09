// -----------------------------
// Files: backend/verification-service/src/controllers/verificationController.ts
// -----------------------------
import type { Request, Response } from 'express';
import { CredentialModel } from '@shared/database/models/credential';
import { mapRowToCredential } from '../models/credential';


export const verifyById = async (req: Request, res: Response) => {
try {
const id = Number(req.params.id);
if (!id) return res.status(400).json({ error: 'invalid_id' });


const row = await CredentialModel.findById(String(id));
if (!row) return res.status(404).json({ error: 'not_found' });


const cred = mapRowToCredential(row);
// basic verification — in real life this would validate kubeconfig contents, certs, expiry etc.
const result = {
id: cred.id,
name: cred.name,
valid: true,
metadata: cred.metadata,
};


return res.json({ data: result });
} catch (err) {
// eslint-disable-next-line no-console
console.error('verifyById error', err);
return res.status(500).json({ error: 'internal_error' });
}
};


export const listAll = async (_req: Request, res: Response) => {
try {
// For now, return empty array since listCredentials doesn't exist
return res.json({ data: [] });
} catch (err) {
// eslint-disable-next-line no-console
console.error('listAll error', err);
return res.status(500).json({ error: 'internal_error' });
}
};
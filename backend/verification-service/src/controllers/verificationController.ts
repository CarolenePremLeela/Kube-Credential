// -----------------------------
// Files: backend/verification-service/src/controllers/verificationController.ts
// -----------------------------
import type { Request, Response } from 'express';
import { getCredentialById, listCredentials } from '../../shared/database/models/credential';
import { mapRowToCredential } from '../models/credential';


export const verifyById = async (req: Request, res: Response) => {
try {
const id = Number(req.params.id);
if (!id) return res.status(400).json({ error: 'invalid_id' });


const row = await getCredentialById(id);
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
const rows = await listCredentials(100, 0);
const mapped = rows.map(mapRowToCredential);
return res.json({ data: mapped });
} catch (err) {
// eslint-disable-next-line no-console
console.error('listAll error', err);
return res.status(500).json({ error: 'internal_error' });
}
};
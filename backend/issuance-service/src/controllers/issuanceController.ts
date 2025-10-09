// -----------------------------
// Files: backend/issuance-service/src/controllers/issuanceController.ts
// -----------------------------
import type { Request, Response } from 'express';
import { createCredential as createCredentialModel, listCredentials } from '../../shared/database/models/credential';
import { normalizeCredential, validateCredentialForCreate, parseWorkerId } from '../../shared/utils/helpers';

export const createIssuance = async (req: Request, res: Response) => {
  try {
    const input = normalizeCredential(req.body);
    const errors = validateCredentialForCreate(input);
    if (errors.length) return res.status(400).json({ errors });

    // attach worker id if present
    const worker = parseWorkerId(String(req.headers['x-worker-id'] || ''));

    const created = await createCredentialModel({
      name: String(input.name),
      kubeConfig: String(input.kubeConfig),
      metadata: { issuedBy: worker?.raw || 'api', ...input.metadata },
    } as any);

    return res.status(201).json({ data: created });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('createIssuance error', err);
    return res.status(500).json({ error: 'internal_error' });
  }
};

export const listIssuances = async (_req: Request, res: Response) => {
  try {
    const rows = await listCredentials(100, 0);
    return res.json({ data: rows });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('listIssuances error', err);
    return res.status(500).json({ error: 'internal_error' });
  }
};























// -----------------------------
// Files: backend/issuance-service/src/routes/issuanceRoutes.ts
// -----------------------------
import express from 'express';
import { createIssuance, listIssuances } from '../controllers/issuanceController';

const router = express.Router();

router.post('/', createIssuance);
router.get('/', listIssuances);

export default router;


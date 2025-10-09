import { Router } from 'express';
import { createIssuance } from '../controllers/issuanceController';

const router = Router();

router.post('/issue', createIssuance);

export default router;
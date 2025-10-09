// -----------------------------
// Files: backend/verification-service/src/routes/verificationRoutes.ts
// -----------------------------
import express from 'express';
import { verifyById, listAll } from '../controllers/verificationController';

const router = express.Router();

router.get('/:id', verifyById);
router.get('/', listAll);

export default router;

import { Router } from 'express';
import { verifyById } from '../controllers/verificationController';

const router = Router();

router.post('/verify/:id', verifyById);

export default router;
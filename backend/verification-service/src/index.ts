// -----------------------------
// Files: backend/verification-service/src/index.ts
// -----------------------------
import express from 'express';
import bodyParser from 'body-parser';
import verificationRoutes from './routes/verificationRoutes';
import { startVerificationService } from './services/verificationService';

const PORT = process.env.VERIFICATION_PORT || 5000;

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

app.use('/verification', verificationRoutes);

app.get('/healthz', (_req, res) => res.send('ok'));

startVerificationService()
  .then(() => {
    app.listen(Number(PORT), () => {
      // eslint-disable-next-line no-console
      console.log(`Verification service listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start verification service', err);
    process.exit(1);
  });


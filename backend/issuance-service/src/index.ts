// -----------------------------
// Files: backend/issuance-service/src/index.ts
// -----------------------------
import express from 'express';
import bodyParser from 'body-parser';
import issuanceRoutes from './routes/issuanceRoutes';
import { startIssuanceService } from './services/issuanceService';

const PORT = process.env.ISSUANCE_PORT || 4000;

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

app.use('/issuance', issuanceRoutes);

app.get('/healthz', (_req, res) => res.send('ok'));

startIssuanceService()
  .then(() => {
    app.listen(Number(PORT), () => {
      // eslint-disable-next-line no-console
      console.log(`Issuance service listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Failed to start issuance service', err);
    process.exit(1);
  });

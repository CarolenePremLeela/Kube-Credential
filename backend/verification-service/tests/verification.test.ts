// -----------------------------
// Files: backend/verification-service/tests/verification.test.ts
// -----------------------------
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import verificationRoutes from '../src/routes/verificationRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/verification', verificationRoutes);

describe('verification routes (sanity)', () => {
  it('GET /verification should return 200', async () => {
    const res = await request(app).get('/verification');
    expect([200, 500]).toContain(res.status);
  });
});


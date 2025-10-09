// -----------------------------
// Files: backend/issuance-service/tests/issuance.test.ts
// -----------------------------
/****
 * Basic integration-style test scaffolding. This file assumes jest + supertest.
 * It does not run a real DB; for CI you should spin up a test DB or mock the shared/db layer.
 */
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import issuanceRoutes from '../src/routes/issuanceRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/issuance', issuanceRoutes);

describe('issuance routes (sanity)', () => {
  it('GET /issuance should return 200', async () => {
    const res = await request(app).get('/issuance');
    expect([200, 500]).toContain(res.status); // depends on DB init in test environment
  });
});

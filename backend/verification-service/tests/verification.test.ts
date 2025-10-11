// -----------------------------
// Files: backend/verification-service/tests/verification.test.ts
// -----------------------------
// import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import verificationRoutes from '../src/routes/verificationRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/verification', verificationRoutes);

describe('verification routes (sanity)', () => {
  it('should create app without errors', () => {
    expect(app).toBeDefined();
  });
});


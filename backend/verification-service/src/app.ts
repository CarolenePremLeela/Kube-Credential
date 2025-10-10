import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../../shared/database/connection';
import verificationRoutes from './routes/verificationRoutes';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',  // ← Add port 3003
    'http://127.0.0.1:3000', 
    'http://172.0.0.1:3000',
    'http://localhost:3003',
    'http://127.0.0.1:3003'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Initialize database
initializeDatabase().then(() => {
  console.log('Verification Service: Database initialized');
}).catch(error => {
  console.error('Verification Service: Database initialization failed', error);
});

// Routes
app.use('/api', verificationRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'verification-service',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Verification Service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
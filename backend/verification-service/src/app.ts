import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../../shared/database/connection';
import verificationRoutes from './routes/verificationRoutes';

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
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
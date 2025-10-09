import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../../shared/database/connection';
import issuanceRoutes from './routes/issuanceRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase().then(() => {
  console.log('Issuance Service: Database initialized');
}).catch(error => {
  console.error('Issuance Service: Database initialization failed', error);
});

// Routes
app.use('/api', issuanceRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'issuance-service',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Issuance Service running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
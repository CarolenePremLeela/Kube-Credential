import express from 'express';
import cors from 'cors';
import { initializeDatabase } from '../../shared/database/connection';
import issuanceRoutes from './routes/issuanceRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

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
// Initialize database with retry logic
const startServer = async () => {
  try {
    console.log('Initializing database connection...');
    await initializeDatabase();
    console.log('Database initialized successfully');
    
    // Import routes after DB is ready
    const routes = await import('./routes/issuanceRoutes'); // or verificationRoutes
    app.use('/api', routes.default);
    
    app.listen(PORT, () => {
      console.log(`Issuance Service running on port ${PORT}`);
      console.log(`Health: http://localhost:${PORT}/health`);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
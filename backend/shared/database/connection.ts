import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const createDbConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'kube_credential_db',
      port: parseInt(process.env.DB_PORT || '3306')
    });
    
    console.log('Connected to MySQL database');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export const initializeDatabase = async () => {
  const connection = await createDbConnection();
  
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS credentials (
        id VARCHAR(36) PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        credential_type VARCHAR(100) NOT NULL,
        credential_data JSON NOT NULL,
        worker_id VARCHAR(100) NOT NULL,
        issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_credential (email, credential_type)
      )
    `);
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Table creation failed:', error);
    throw error;
  } finally {
    await connection.end();
  }
};
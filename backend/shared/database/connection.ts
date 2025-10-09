// File: backend/shared/database/connection.ts
import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

const {
  DB_HOST = 'localhost',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_DATABASE = 'kube_credential',
} = process.env;

let pool: Pool | null = null;

export const initDB = async () => {
  if (pool) return pool;
  pool = mysql.createPool({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Optionally create table if not exists (safe in dev)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS credentials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      kube_config TEXT NOT NULL,
      metadata JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  return pool;
};

export const getPool = () => {
  if (!pool) throw new Error('Database pool not initialized. Call initDB() first.');
  return pool;
};

export const closeDB = async () => {
  if (!pool) return;
  await pool.end();
  pool = null;
};



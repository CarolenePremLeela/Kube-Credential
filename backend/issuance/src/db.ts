import mysql from "mysql2/promise";

let pool: mysql.Pool;

export async function initDB() {
  pool = mysql.createPool({
    host: process.env.DB_HOST || "mysql",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "rootpassword",
    database: process.env.DB_NAME || "kube_credential",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  // Ensure DB and table exist
  await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME || "kube_credential"}\``);
  await pool.query(`USE \`${process.env.DB_NAME || "kube_credential"}\``);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS credentials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      credential_id VARCHAR(100) UNIQUE,
      data JSON,
      worker_id VARCHAR(100),
      issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export function getPool() {
  if (!pool) throw new Error("DB pool not initialized");
  return pool;
}

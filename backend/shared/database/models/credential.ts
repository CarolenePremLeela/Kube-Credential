// File: backend/shared/database/models/credential.ts
import { getPool } from '../connection';
import type { Credential } from '../../types/credential';

export const createCredential = async (c: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>) => {
  const pool = getPool();
  const [result] = await pool.query(
    'INSERT INTO credentials (name, kube_config, metadata) VALUES (?, ?, ?)',
    [c.name, c.kubeConfig, JSON.stringify(c.metadata || null)]
  );
  // @ts-ignore
  const insertId = (result as any).insertId;
  return { ...c, id: insertId } as Credential;
};

export const getCredentialById = async (id: number) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM credentials WHERE id = ?', [id]);
  // @ts-ignore
  return (rows as any[])[0] || null;
};

export const listCredentials = async (limit = 50, offset = 0) => {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM credentials ORDER BY created_at DESC LIMIT ? OFFSET ?', [Number(limit), Number(offset)]);
  // @ts-ignore
  return rows as any[];
};

export const deleteCredential = async (id: number) => {
  const pool = getPool();
  await pool.query('DELETE FROM credentials WHERE id = ?', [id]);
  return;
};



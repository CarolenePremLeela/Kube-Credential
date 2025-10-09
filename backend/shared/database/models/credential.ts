import { createDbConnection } from '../connection';

export interface Credential {
  id: string;
  email: string;
  credential_type: string;
  credential_data: any;
  worker_id: string;
  issued_at: Date;
}

export const CredentialModel = {
  async create(credentialData: Omit<Credential, 'id' | 'issued_at'>): Promise<Credential> {
    const connection = await createDbConnection();
    try {
      const id = require('crypto').randomUUID();
      
      const [result] = await connection.execute(
        `INSERT INTO credentials (id, email, credential_type, credential_data, worker_id) 
         VALUES (?, ?, ?, ?, ?)`,
        [id, credentialData.email, credentialData.credential_type, 
         JSON.stringify(credentialData.credential_data), credentialData.worker_id]
      );
      
      const [rows] = await connection.execute(
        'SELECT * FROM credentials WHERE id = ?',
        [id]
      );
      
      return (rows as any[])[0];
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Credential already issued for this email and type');
      }
      throw error;
    } finally {
      await connection.end();
    }
  },

  async findById(id: string): Promise<Credential | null> {
    const connection = await createDbConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM credentials WHERE id = ?',
        [id]
      );
      
      return (rows as any[])[0] || null;
    } finally {
      await connection.end();
    }
  },

  async findByEmailAndType(email: string, credentialType: string): Promise<Credential | null> {
    const connection = await createDbConnection();
    try {
      const [rows] = await connection.execute(
        'SELECT * FROM credentials WHERE email = ? AND credential_type = ?',
        [email, credentialType]
      );
      
      return (rows as any[])[0] || null;
    } finally {
      await connection.end();
    }
  }
};
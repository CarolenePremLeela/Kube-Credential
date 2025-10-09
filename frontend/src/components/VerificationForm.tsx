// -----------------------------
// Files: frontend/src/components/VerificationForm.tsx
// -----------------------------
import React from 'react';
import { verify } from '../services/verificationService';

export default function VerificationForm() {
  const [id, setId] = React.useState('');
  const [result, setResult] = React.useState<any>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await verify(Number(id));
      setResult(res.data);
    } catch (err: any) {
      setResult({ error: err.message });
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 600 }}>
      <label>
        Credential ID<br />
        <input value={id} onChange={(e) => setId(e.target.value)} />
      </label>
      <button type="submit">Verify</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </form>
  );
}
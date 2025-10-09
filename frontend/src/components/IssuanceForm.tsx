// -----------------------------
// Files: frontend/src/components/IssuanceForm.tsx
// -----------------------------
import React from 'react';
import { issue } from '../services/issuanceService';

export default function IssuanceForm() {
  const [name, setName] = React.useState('');
  const [kubeConfig, setKubeConfig] = React.useState('');
  const [msg, setMsg] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await issue({ name, kubeConfig });
      setMsg('Issued id: ' + (res?.data?.id ?? 'unknown'));
    } catch (err: any) {
      setMsg('Error: ' + (err.message || 'failed'));
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 800 }}>
      <label>
        Name<br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        KubeConfig<br />
        <textarea rows={10} value={kubeConfig} onChange={(e) => setKubeConfig(e.target.value)} />
      </label>
      <button type="submit">Issue</button>
      {msg && <div>{msg}</div>}
    </form>
  );
}

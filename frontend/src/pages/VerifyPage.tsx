import React, { useState } from "react";
import axios from "axios";

const VerifyPage: React.FC = () => {
  const [credentialId, setCredentialId] = useState("");
  const [resp, setResp] = useState<any>(null);
  const VERIFY_API = import.meta.env.VITE_VERIFY_API || "http://localhost:8082/verify";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const r = await axios.post(VERIFY_API, { credential_id: credentialId });
      setResp(r.data);
    } catch (err: any) {
      setResp({ error: err?.response?.data || err.message });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Verify Credential</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 400 }}>
        <input required placeholder="Credential ID" value={credentialId} onChange={e=>setCredentialId(e.target.value)} />
        <button type="submit">Verify</button>
      </form>

      <pre style={{ marginTop: 20 }}>{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
};

export default VerifyPage;

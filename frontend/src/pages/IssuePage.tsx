import React, { useState } from "react";
import axios from "axios";

const IssuePage: React.FC = () => {
  const [credentialId, setCredentialId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resp, setResp] = useState<any>(null);
  const ISSUE_API = import.meta.env.VITE_ISSUE_API || "http://localhost:8081/issue";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { credential_id: credentialId, name, email };
      const r = await axios.post(ISSUE_API, body);
      setResp(r.data);
    } catch (err: any) {
      setResp({ error: err?.response?.data || err.message });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Issue Credential</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 400 }}>
        <input required placeholder="Credential ID" value={credentialId} onChange={e=>setCredentialId(e.target.value)} />
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button type="submit">Issue</button>
      </form>

      <pre style={{ marginTop: 20 }}>{JSON.stringify(resp, null, 2)}</pre>
    </div>
  );
};

export default IssuePage;


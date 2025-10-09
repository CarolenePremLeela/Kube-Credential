// -----------------------------
// Files: frontend/src/App.tsx
// -----------------------------
import React from 'react';
import IssuancePage from './pages/IssuancePage';
import VerificationPage from './pages/VerificationPage';

export default function App() {
  const [page, setPage] = React.useState<'issuance' | 'verification'>('issuance');
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <header style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setPage('issuance')}>Issuance</button>
        <button onClick={() => setPage('verification')}>Verification</button>
      </header>
      <main>
        {page === 'issuance' ? <IssuancePage /> : <VerificationPage />}
      </main>
    </div>
  );
}

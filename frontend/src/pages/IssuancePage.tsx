// -----------------------------
// Files: frontend/src/pages/IssuancePage.tsx
// -----------------------------
import React from 'react';
import IssuanceForm from '../components/IssuanceForm';

export default function IssuancePage() {
  return (
    <div>
      <h2>Issue a Credential</h2>
      <IssuanceForm />
    </div>
  );
}
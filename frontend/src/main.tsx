import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import IssuePage from "./pages/IssuePage";
import VerifyPage from "./pages/VerifyPage";
import "./styles.css";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10, display: "flex", gap: 10 }}>
        <Link to="/">Issue</Link>
        <Link to="/verify">Verify</Link>
      </nav>
      <Routes>
        <Route path="/" element={<IssuePage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

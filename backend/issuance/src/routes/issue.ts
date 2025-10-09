import express from "express";
import { getPool } from "../db.js";
import type { RowDataPacket } from "mysql2";

const router = express.Router();

// POST /issue
router.post("/", async (req, res) => {
  const body = req.body;
  if (!body || !body.credential_id) {
    return res.status(400).json({ error: "credential_id is required in body" });
  }

  const credentialId = String(body.credential_id);
  const workerId = process.env.WORKER_ID || "worker-unknown";
  const pool = getPool();

  try {
    // Check existing
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM credentials WHERE credential_id = ?",
      [credentialId]
    );

    if (rows.length > 0 && rows[0]) {
      return res.status(200).json({
        message: `credential already issued by ${rows[0].worker_id ?? "unknown"}`,
        credential_id: credentialId,
        issued_at: rows[0].issued_at ?? null,
      });
    }

    // Insert
    await pool.query(
      "INSERT INTO credentials (credential_id, data, worker_id) VALUES (?, ?, ?)",
      [credentialId, JSON.stringify(body), workerId]
    );

    return res.status(201).json({
      message: `credential issued by ${workerId}`,
      credential_id: credentialId,
      issued_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Issue error:", err);
    return res.status(500).json({ error: "internal_server_error" });
  }
});

export default router;

import express from "express";
import { getPool } from "../db.js";
const router = express.Router();
router.post("/", async (req, res) => {
    const body = req.body;
    if (!body || !body.credential_id) {
        return res.status(400).json({ error: "credential_id is required in body" });
    }
    const credentialId = String(body.credential_id);
    const pool = getPool();
    try {
        const [rows] = await pool.query("SELECT * FROM credentials WHERE credential_id = ?", [credentialId]);
        if (rows.length === 0) {
            return res.status(404).json({ valid: false, message: "credential not found" });
        }
        const found = rows[0];
        return res.status(200).json({
            valid: true,
            /* credential_id: found.credential_id,
             worker_id: found.worker_id,
             issued_at: found.issued_at,
             data: found.data*/
        });
    }
    catch (err) {
        console.error("Verify error:", err);
        return res.status(500).json({ error: "internal_server_error" });
    }
});
export default router;
//# sourceMappingURL=verify.js.map
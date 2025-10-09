import express from "express";
import bodyParser from "body-parser";
import verifyRouter from "./routes/verify.js";
import { initDB } from "./db.js";
const PORT = process.env.PORT ? Number(process.env.PORT) : 8082;
async function start() {
    await initDB();
    const app = express();
    app.use(bodyParser.json());
    app.use("/verify", verifyRouter);
    app.get("/", (_, res) => res.send({ service: "verification", status: "ok" }));
    app.listen(PORT, () => console.log(`Verification service listening on port ${PORT}`));
}
start().catch((err) => {
    console.error("Failed to start verification service", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map
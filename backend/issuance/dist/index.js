import express from "express";
import bodyParser from "body-parser";
import issueRouter from "./routes/issue.js";
import { initDB } from "./db.js";
const PORT = process.env.PORT ? Number(process.env.PORT) : 8081;
async function start() {
    await initDB();
    const app = express();
    app.use(bodyParser.json());
    app.use("/issue", issueRouter);
    app.get("/", (_, res) => res.send({ service: "issuance", status: "ok" }));
    app.listen(PORT, () => console.log(`Issuance service listening on port ${PORT}`));
}
start().catch((err) => {
    console.error("Failed to start issuance service", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map
// server/index.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import fs from "fs";
import { execMemeVM } from "./memevm.js";
import fetch from "node-fetch";
import { callProofService } from "./proof-client.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// static public served earlier (ensure Docker copied out -> ./public)
app.use(express.static(path.join(__dirname, "public")));

// ----------------- API: MemeVM run -----------------
app.post("/api/run", async (req, res) => {
  try {
    const { code } = req.body;
    // execMemeVM returns JSON-safe result; NO eval here
    const result = await execMemeVM(code);
    res.json({ ok: true, result });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// ----------------- API: upload image -----------------
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"))
});
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ ok: false, error: "no file" });
    const fileUrl = `/uploads/${path.basename(req.file.path)}`;
    // optionally run small meme generation step (mock)
    const meta = { filename: req.file.filename, url: fileUrl, generated: true };
    // Optionally call proof service to produce mock proof
    const proof = await callProofService({ type: "image_upload", file: req.file.filename });
    res.json({ ok: true, meta, proof });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// serve uploads static
app.use("/uploads", express.static(uploadDir));

// ----------------- API: prove (direct) -----------------
app.post("/api/prove", async (req, res) => {
  try {
    const payload = req.body;
    const proof = await callProofService(payload);
    res.json(proof);
  } catch (e) {
    res.status(500).json({ ok:false, error: e.message });
  }
});

// ----------------- API: onchain feed (Solana sample) -----------------
app.get("/api/feed", async (req, res) => {
  try {
    // simple Solana RPC example: getRecentBlockhash or getSlot
    const RPC = process.env.SOLANA_RPC || "https://api.mainnet-beta.solana.com";
    const rpcRes = await fetch(RPC, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "getSlot", params: [] })
    });
    const jr = await rpcRes.json();
    const slot = jr?.result;
    const now = new Date().toISOString();
    res.json([{ time: now, text: `Solana slot: ${slot}` }]);
  } catch (e) {
    res.status(500).json([]);
  }
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`🚀 MemeOS running on port ${PORT}`));

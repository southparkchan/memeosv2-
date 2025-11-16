// proof-service/index.js
import express from "express";
const app = express();
app.use(express.json());

app.post("/prove", async (req, res) => {
  const payload = req.body;
  // simulate work
  await new Promise(r=>setTimeout(r, 600));
  // return fake proof object (replace with real snarkjs/arkworks output)
  res.json({
    ok: true,
    proof: "FAKE_ZK_PROOF_BASE64==",
    publicSignals: { hash: (Math.random()*1e9|0).toString(16) },
    payload
  });
});

app.listen(3000, ()=>console.log("Proof service listening on 3000"));

import express from "express";
const app = express();
app.use(express.json());

app.post("/prove", async (req, res) => {
  return res.json({
    proof: "mock_proof_123",
    publicSignals: { memeHash: "0x1234abcd" }
  });
});

app.listen(3000, () => console.log("Proof service running on 3000"));

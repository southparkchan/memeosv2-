// server/proof-client.js
import fetch from "node-fetch";
export async function callProofService(payload) {
  const url = process.env.PROOF_SERVICE_URL || "http://proof-service:3000/prove";
  try {
    const res = await fetch(url, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
    return await res.json();
  } catch (e) {
    // fallback mock
    return { mock: true, payload, proof: "MOCK_PROOF_123", ts: new Date().toISOString() };
  }
}

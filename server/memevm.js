// server/memevm.js
export async function execMemeVM(src) {
  // VERY simple parser: allow `return meme.power(9000);` or `meme.foo`
  // Implement as limited sandbox: parse numbers and function names
  // This is a toy executor: replace with real VM later
  const ok = { meme: { power: (n) => ({ powered: n * 2, note: "mocked" }) } };
  // naive: find number in src
  const m = src.match(/power\((\d+)\)/);
  if (m) {
    const n = Number(m[1]);
    return ok.meme.power(n);
  }
  // if code is JSON like: return {"a":1}
  const j = src.match(/return\s+({[\s\S]*})/);
  if (j) {
    try { return JSON.parse(j[1]); } catch(e){}
  }
  return { raw: src.slice(0, 200) };
}

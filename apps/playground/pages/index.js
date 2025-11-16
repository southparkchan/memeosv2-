// apps/playground/pages/index.js
import { useEffect, useState, useRef } from "react";

/** Simple styling inline to keep this file standalone; you can replace with Tailwind. */
const container = { fontFamily: "Inter, Arial, sans-serif", minHeight: "100vh", background: "#0b1020", color: "#fff" };
const main = { display: "flex", gap: 24, padding: 28 };
const card = { background: "#0f1724", padding: 18, borderRadius: 12, border: "1px solid #16202b" };

export default function Home() {
  return (
    <div style={container}>
      <Topbar />
      <div style={main}>
        <div style={{ flex: 1 }}>
          <Hero />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18 }}>
            <div style={card}><MemeVMRunner /></div>
            <div style={card}><ZKDemo /></div>
            <div style={card}><UploadMeme /></div>
            <div style={card}><LiveFeed /></div>
          </div>
        </div>

        <aside style={{ width: 340 }}>
          <div style={card}>
            <WalletConnect />
          </div>
          <div style={{ ...card, marginTop: 18 }}>
            <StatsPanel />
          </div>
        </aside>
      </div>
    </div>
  );
}

/* --- Components --- */

function Topbar() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 28px", alignItems: "center", borderBottom: "1px solid #0f1724" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img src="/sparkchan-tech.png" width={44} style={{ borderRadius: 8 }} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>MemeOS</div>
          <div style={{ fontSize: 12, opacity: 0.7 }}>Kawaii · zk · Runtime</div>
        </div>
      </div>
      <div style={{ opacity: 0.8 }}>Playground • Live</div>
    </div>
  );
}

function Hero() {
  return (
    <div style={{ marginTop: 18, padding: 20, borderRadius: 12, background: "linear-gradient(90deg,#7c3aed11,#ec489911)", border: "1px solid #2b2b34" }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>⚡ MemeOS Playground</h1>
      <p style={{ marginTop: 8, color: "#cbd5e1" }}>
        Build, test, and execute MemeVM modules — try uploading an image, run the MemeVM, and optionally generate a zk-proof (mock).
      </p>
    </div>
  );
}

/* MemeVM Runner: runs simple JS scripts via server /api/run */
function MemeVMRunner() {
  const [code, setCode] = useState(`// Example: return meme.power(9000)\nreturn meme.power(9000);`);
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setOut("");
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code })
      });
      const json = await res.json();
      setOut(JSON.stringify(json, null, 2));
    } catch (e) {
      setOut("Error: " + e.message);
    } finally { setLoading(false); }
  }

  return (
    <>
      <h3>MemeVM Sandbox</h3>
      <textarea value={code} onChange={e => setCode(e.target.value)} style={{ width: "100%", height: 120, marginTop: 8, background: "#071022", color: "#9ae6b4", padding: 10, borderRadius: 8 }} />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={run} style={{ padding: "8px 12px", background: "#7c3aed", borderRadius: 8, border: "none", cursor: "pointer" }}>{loading ? "Running..." : "Run"}</button>
        <button onClick={() => { setCode(""); setOut(""); }} style={{ padding: "8px 12px", background: "#0b1220", borderRadius: 8 }}>Clear</button>
      </div>
      <pre style={{ marginTop: 10, background: "#031124", padding: 10, borderRadius: 8, overflowX: "auto" }}>{out || "No output yet"}</pre>
    </>
  );
}

/* ZK Demo: sends a payload to /api/prove (mock) and shows proof */
function ZKDemo() {
  const [payload, setPayload] = useState("{\"meme\":\"kawaii\"}");
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  async function genProof() {
    setLoading(true); setProof(null);
    try {
      const res = await fetch("/api/prove", { method: "POST", headers: {"Content-Type":"application/json"}, body: payload });
      const json = await res.json();
      setProof(json);
    } catch (e) {
      setProof({ error: e.message });
    } finally { setLoading(false); }
  }

  return (
    <>
      <h3>zk-Demo (mock)</h3>
      <textarea value={payload} onChange={e=>setPayload(e.target.value)} style={{ width: "100%", height: 80, background: "#071022", color: "#c4b5fd", padding: 10, borderRadius: 8 }} />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button onClick={genProof} style={{ padding: "8px 12px", background: "#06b6d4", borderRadius: 8 }}>{loading ? "Generating..." : "Generate proof"}</button>
      </div>
      <pre style={{ marginTop: 10, background: "#031124", padding: 10, borderRadius: 8 }}>{proof ? JSON.stringify(proof, null, 2) : "No proof yet"}</pre>
    </>
  );
}

/* Upload image -> send to /api/upload (server stores and returns URL + runs optional meme generation) */
function UploadMeme() {
  const inputRef = useRef();
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState(false);

  async function upload() {
    const f = inputRef.current.files[0];
    if (!f) return alert("choose a file");
    setLoading(true);
    const fd = new FormData();
    fd.append("file", f);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      setResp(json);
    } catch (e) {
      setResp({ error: e.message });
    } finally { setLoading(false); }
  }

  return (
    <>
      <h3>Upload Meme Image</h3>
      <input ref={inputRef} type="file" accept="image/*" style={{ marginTop: 8 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={upload} style={{ padding: "8px 12px", background: "#ef4444", borderRadius: 8 }}>{loading ? "Uploading..." : "Upload & Generate"}</button>
      </div>
      <pre style={{ marginTop: 10, background: "#031124", padding: 10, borderRadius: 8 }}>{resp ? JSON.stringify(resp, null, 2) : "No upload yet"}</pre>
    </>
  );
}

/* Live feed: fetches /api/feed which proxies a Solana RPC endpoint to show latest block or slot */
function LiveFeed() {
  const [feed, setFeed] = useState([]);
  useEffect(()=> {
    let mounted = true;
    async function refresh(){
      try {
        const res = await fetch("/api/feed");
        const json = await res.json();
        if(mounted) setFeed(json);
      } catch(e){}
    }
    refresh();
    const iid = setInterval(refresh, 8000);
    return ()=>{ mounted=false; clearInterval(iid); }
  }, []);
  return (
    <>
      <h3>Onchain Feed (Solana)</h3>
      <div style={{ maxHeight: 220, overflowY: "auto", marginTop: 8 }}>
        {feed.length===0 ? <div style={{opacity:.6}}>No feed yet</div> : feed.map((f,i)=>(
          <div key={i} style={{ padding:8, borderBottom: "1px solid #0b1220" }}>
            <div style={{ fontSize: 12, opacity:.8 }}>{f.time}</div>
            <div style={{ fontSize: 13 }}>{f.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* Wallet connect simplified for Phantom */
function WalletConnect() {
  const [addr, setAddr] = useState(null);

  useEffect(()=>{
    if (typeof window !== "undefined" && window?.solana?.isPhantom) {
      window.solana.on("connect", () => setAddr(window.solana.publicKey.toString()));
      window.solana.on("disconnect", () => setAddr(null));
    }
  },[]);

  async function connect() {
    if (typeof window === "undefined") return alert("Open in browser");
    if (!window.solana || !window.solana.isPhantom) return alert("Install Phantom wallet");
    try {
      const res = await window.solana.connect();
      setAddr(res.publicKey.toString());
    } catch(e){ console.error(e); }
  }

  return (
    <div>
      <h4 style={{ marginTop: 0 }}>Wallet</h4>
      <div style={{ marginTop: 8 }}>
        {addr ? <div>Connected: <code style={{ color: "#9ae6b4" }}>{addr}</code></div> : <button onClick={connect} style={{ padding: "8px 12px", background: "#06b6d4", borderRadius: 8 }}>Connect Phantom</button>}
      </div>
    </div>
  );
}

function StatsPanel(){
  return (
    <div>
      <h4 style={{ margin: 0 }}>Live Stats</h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        <div style={{ background: "#081024", padding: 10, borderRadius: 8 }}>
          <div style={{ opacity: .7 }}>Runtime OPS</div>
          <div style={{ fontWeight:800 }}>14.2k</div>
        </div>
        <div style={{ background: "#081024", padding: 10, borderRadius: 8 }}>
          <div style={{ opacity: .7 }}>ZK Proofs</div>
          <div style={{ fontWeight:800 }}>128</div>
        </div>
      </div>
    </div>
  );
}

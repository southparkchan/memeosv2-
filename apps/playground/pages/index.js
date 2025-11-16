export default function Home() {
  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      background: "#0d0d0d",
      color: "#fff",
      minHeight: "100vh",
      padding: "40px"
    }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        MemeOS Dashboard 🚀
      </h1>

      <p style={{ opacity: 0.7, marginTop: "10px" }}>
        Playground UI berhasil di-load 🎉
      </p>

      <div style={{
        marginTop: "40px",
        padding: "20px",
        background: "#1a1a1a",
        borderRadius: "12px",
        border: "1px solid #333"
      }}>
        <h2 style={{ fontSize: "24px", marginBottom: "10px" }}>
          Control Center
        </h2>

        <p style={{ opacity: 0.8 }}>
          Semua modul MemeOS siap dipasang.
        </p>
      </div>
    </div>
  );
}

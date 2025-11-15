import Hello from "../components/Hello";

export default function Home() {
  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>MemeOS Playground</h1>
      <p>The playground is running successfully 🚀</p>

      <Hello />
    </div>
  );
}

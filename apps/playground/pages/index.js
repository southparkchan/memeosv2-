export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f0f0f] border-r border-[#222] p-6 sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-10">MemeOS</h1>

        <nav className="space-y-4 text-gray-300">
          <a href="#" className="block hover:text-white">Dashboard</a>
          <a href="#" className="block hover:text-white">MemeVM</a>
          <a href="#" className="block hover:text-white">ZK Tools</a>
          <a href="#" className="block hover:text-white">Playground</a>
          <a href="#" className="block hover:text-white">Explorer</a>
          <a href="#" className="block hover:text-white">Settings</a>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        
        {/* Banner */}
        <section className="p-10 bg-gradient-to-r from-purple-700/30 to-pink-600/30 rounded-xl border border-[#222] mb-12">
          <h2 className="text-4xl font-bold mb-2">⚡ MemeOS Playground</h2>
          <p className="text-gray-300 text-lg">
            Build · Test · Execute MemeVM modules directly on your browser.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          <div className="p-6 bg-[#111] border border-[#222] rounded-xl hover:bg-[#161616] transition">
            <h3 className="text-xl font-semibold mb-2">🛠 MemeVM Runtime</h3>
            <p className="text-gray-400 text-sm">
              Execute scripts, emulate computations, and inspect memetic state.
            </p>
          </div>

          <div className="p-6 bg-[#111] border border-[#222] rounded-xl hover:bg-[#161616] transition">
            <h3 className="text-xl font-semibold mb-2">🧪 ZK Verifier</h3>
            <p className="text-gray-400 text-sm">
              Generate & verify zero-knowledge proofs inside the browser.
            </p>
          </div>

          <div className="p-6 bg-[#111] border border-[#222] rounded-xl hover:bg-[#161616] transition">
            <h3 className="text-xl font-semibold mb-2">📡 Onchain Feed</h3>
            <p className="text-gray-400 text-sm">
              Real-time memetoken state stream from your selected chain.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          <StatCard label="Runtime OPS" value="14.2k" />
          <StatCard label="ZK Proofs" value="128" />
          <StatCard label="Meme Modules" value="42" />
          <StatCard label="Chain Sync" value="Online" />
        </section>

        {/* Code Sandbox */}
        <section className="p-6 bg-[#111] border border-[#222] rounded-xl mb-10">
          <h3 className="text-xl font-semibold mb-4">💻 MemeVM Sandbox</h3>
          <p className="text-gray-400 mb-3 text-sm">
            Run sample scripts directly:
          </p>

          <code className="block p-4 bg-black rounded-lg border border-[#333] text-sm">
            {"const result = MemeVM.exec(`meme.power(9000)`)"}  
          </code>
        </section>

        {/* Footer */}
        <footer className="text-gray-500 text-sm mt-10">
          MemeOS • Web3 Cultural Compute Layer • 2025
        </footer>

      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="p-6 bg-[#111] border border-[#222] rounded-xl text-center">
      <p className="text-gray-400 text-sm">{label}</p>
      <h4 className="text-2xl font-bold mt-1">{value}</h4>
    </div>
  );
}

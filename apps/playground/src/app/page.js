"use client";

import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import WalletButton from "@/components/WalletButton";

export default function Page() {
  const endpoint = "https://api.mainnet-beta.solana.com";

  const wallets = useMemo(() => [ new PhantomWalletAdapter() ], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <div style={{ textAlign: "center", marginTop: "80px" }}>
          <h1>MemeOS v2 🚀</h1>
          <p>Now with full wallet connect / disconnect</p>

          <WalletButton />
        </div>
      </WalletProvider>
    </ConnectionProvider>
  );
}

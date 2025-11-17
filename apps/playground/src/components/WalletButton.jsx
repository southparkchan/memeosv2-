"use client";

import { useWallet, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";

export default function WalletButton() {
  const { connected } = useWallet();

  return (
    <div style={{ marginTop: 20 }}>
      <WalletMultiButton />
      <p style={{ marginTop: 10 }}>
        {connected ? "Wallet connected ✔" : "Wallet disconnected ❌"}
      </p>
    </div>
  );
}

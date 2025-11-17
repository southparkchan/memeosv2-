"use client";

import { useWallet } from "@solana/wallet-adapter-react";

export default function WalletButton() {
  const { connected, connect, disconnect } = useWallet();

  return (
    <button
      onClick={() => (connected ? disconnect() : connect())}
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        background: connected ? "#ff5555" : "#4caf50",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {connected ? "Disconnect Wallet" : "Connect Wallet"}
    </button>
  );
}

let wallet = null;

async function connectWallet() {
  if (!window.solana) {
    alert("Phantom wallet not found!");
    return;
  }

  const resp = await window.solana.connect();
  wallet = resp.publicKey.toString();

  document.getElementById("wallet-address").innerText = wallet;
  document.getElementById("connect-btn").style.display = "none";
  document.getElementById("disconnect-btn").style.display = "block";
}

async function disconnectWallet() {
  if (window.solana && window.solana.isConnected) {
    await window.solana.disconnect();
  }

  wallet = null;
  document.getElementById("wallet-address").innerText = "Not Connected";
  document.getElementById("disconnect-btn").style.display = "none";
  document.getElementById("connect-btn").style.display = "block";
}

window.onload = () => {
  document.getElementById("connect-btn").onclick = connectWallet;
  document.getElementById("disconnect-btn").onclick = disconnectWallet;
}

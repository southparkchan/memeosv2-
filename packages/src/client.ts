export class MemeOSClient {
  base = process.env.MEMEOS_RUNTIME_URL || "http://localhost:8080";

  async createMeme(payload: any) {
    const res = await fetch(`${this.base}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  }
}

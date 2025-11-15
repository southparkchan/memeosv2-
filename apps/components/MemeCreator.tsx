import { MemeOS } from "@sparkchan/memeos-sdk";
import { useState } from "react";

export default function MemeCreator() {
  const [result, setResult] = useState<any>(null);

  async function run() {
    const meme = await MemeOS.create({
      text: "Sparkchan is kawaii!",
      style: "kawaii"
    });
    setResult(meme);
  }

  return (
    <div>
      <button className="px-4 py-2 bg-pink-500 text-white rounded" onClick={run}>
        Generate Meme
      </button>

      {result && (
        <pre className="bg-gray-900 text-white p-4 mt-4 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

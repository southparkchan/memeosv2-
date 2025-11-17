import WalletButton from "@/components/WalletButton";

export default function Home() {
  return (
    <div className="p-8 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-white">MemeOS Playground</h1>

      <WalletButton />

      <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-700">
        <p className="text-neutral-300">
         
        </p>
      </div>
    </div>
  );
}

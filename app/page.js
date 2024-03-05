import Chat from "@/components/Chat";
export const runtime = "edge";
export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-5 overflow-hidden">
      <h5 className="text-lg font-medium mb-3">Ai ChatBot</h5>

      <Chat />
    </main>
  );
}

import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-4 py-4">
        <div className="text-lg font-bold">
          <span className="">
            AI <span className="text-indigo-400">Headshots</span>
          </span>
        </div>
      </header>

      <Hero />
    </div>
  );
}

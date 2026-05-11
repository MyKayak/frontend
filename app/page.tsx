import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HomeStats } from "@/components/ui/home_stats";
import BlurIn from "@/components/ui/blur_in";

async function getStats() {
  const res = await fetch("https://api.mykayak.fuffo.net/stats", { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export default async function Home() {
  const statsData = await getStats();

  return (
    <main className="min-h-screen pb-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-32">
        <div className="flex flex-col items-center text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Stagione 2026 Attiva
          </div>
          
          <BlurIn>
            <h1 className="text-7xl md:text-9xl font-black bg-linear-0 from-blue-700 via-blue-400 to-cyan-200 bg-clip-text text-transparent italic uppercase tracking-tighter leading-tight mb-6 drop-shadow-2xl p-4">
              MyKayak
            </h1>
          </BlurIn>
          
          <p className="text-xl md:text-2xl text-white/60 max-w-3xl font-medium leading-relaxed mb-12">
            Il portale non ufficiale per i risultati, le classifiche e le statistiche 
            della <span className="text-white">Canoa Velocità Italiana</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/races" 
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,99,235,0.3)]"
            >
              Esplora Gare <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/rankings" 
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-lg flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              Classifiche Nazionali
            </Link>
          </div>
        </div>

        <HomeStats data={statsData} />
      </div>
    </main>
  );
}

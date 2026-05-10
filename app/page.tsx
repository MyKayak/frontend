import Link from "next/link";
import { ArrowRight, Trophy, Users, Shield, Medal, Timer } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen pb-20 relative overflow-hidden">
      <title>MyKayak - Il Portale della Canoa Velocità</title>
      
      {/* Background abstract decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-32">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Stagione 2026 Attiva
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black bg-linear-0 from-blue-700 via-blue-400 to-cyan-200 bg-clip-text text-transparent italic uppercase tracking-tighter leading-tight mb-6 drop-shadow-2xl p-4">
            MyKayak
          </h1>
          
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/medal_table" className="group">
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
                <Medal className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tighter mb-3">Medagliere</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Scopri le società più vincenti d'Italia. Filtra per stagione o visualizza il medagliere dei soli campionati italiani.
              </p>
            </div>
          </Link>

          <Link href="/rankings" className="group">
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Timer className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tighter mb-3">Ranking Atleti</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Classifiche basate sulla media dei 3 migliori tempi stagionali. Confronta i tempi per K1 e C1 su tutte le distanze.
              </p>
            </div>
          </Link>

          <Link href="/athletes" className="group">
            <div className="h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all" />
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black italic tracking-tighter mb-3">Profili Atleti</h2>
              <p className="text-white/50 text-sm leading-relaxed">
                Cerca gli atleti e visualizza la loro scheda completa: record personali, progressione cronometrica e squadra attuale.
              </p>
            </div>
          </Link>

          <Link href="/teams" className="group lg:col-span-3">
            <div className="p-8 md:p-12 rounded-3xl bg-linear-0 from-blue-900/40 to-black/40 border border-blue-500/20 hover:border-blue-500/40 transition-all relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              
              <div className="w-20 h-20 shrink-0 rounded-3xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <Shield className="w-10 h-10" />
              </div>
              
              <div className="flex-1 text-center md:text-left z-10">
                <h2 className="text-3xl font-black italic tracking-tighter mb-2">Le Società Italiane</h2>
                <p className="text-white/60 text-lg max-w-2xl">
                  Esplora l'archivio completo dei club canoistici italiani. 
                  Scopri i loro titoli vinti, gli atleti di punta e il palmarès storico.
                </p>
              </div>
              
              <div className="z-10">
                <div className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold flex items-center gap-2 group-hover:bg-white/20 transition-colors">
                  Ricerca Società <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

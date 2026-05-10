import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut, Settings, Image as ImageIcon, Trophy } from "lucide-react";
import { logoutAction } from "@/app/login/actions";
import PageHeader from "@/components/ui/page_header";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-20">
      <title>Dashboard Admin - MyKayak</title>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-6">
        <div>
          <PageHeader title="Dashboard" />
          <p className="text-white/40 font-medium uppercase tracking-widest text-sm text-center md:text-left md:ml-2 -mt-8">
            Pannello di Amministrazione
          </p>
        </div>

        <form action={logoutAction}>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all font-bold flex items-center gap-2 text-white/70"
          >
            <LogOut className="w-4 h-4" />
            Esci
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Teams Management Card */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter mb-2">Loghi Società</h2>
          <p className="text-white/50 text-sm mb-6">
            Aggiungi o modifica i loghi delle società. I loghi verranno mostrati nelle classifiche e nelle pagine di dettaglio.
          </p>
          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-bold text-sm">
            Gestisci Loghi (Presto disponibile)
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-6 group-hover:scale-110 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter mb-2">Campionati</h2>
          <p className="text-white/50 text-sm mb-6">
            Imposta quali gare sono valide come "Campionato" per i filtri del medagliere.
          </p>
          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors font-bold text-sm">
            Gestisci Gare (Presto disponibile)
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group md:col-span-2">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white/70 mb-6 group-hover:scale-110 transition-transform">
            <Settings className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black italic tracking-tighter mb-2">Impostazioni API</h2>
          <p className="text-white/50 text-sm mb-6 max-w-2xl">
            Il tuo token di accesso è attivo. Le chiamate all'API dalle pagine protette useranno automaticamente questo token per l'autenticazione.
          </p>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-white/30 break-all">
            Token: {token.value.substring(0, 10)}... (nascosto per sicurezza)
          </div>
        </div>
      </div>
    </div>
  );
}

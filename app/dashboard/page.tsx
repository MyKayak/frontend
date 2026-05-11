import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut, Settings, Image as ImageIcon, Trophy } from "lucide-react";
import { logoutAction } from "@/app/login/actions";
import PageHeader from "@/components/ui/page_header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Admin - MyKayak",
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-32 pb-20">
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

      <p className="text-center text-2xl p-40 vertical-align-middle text-white/50">Per ora la dashboard è tutta qui.<br />Sappi che il login è andato a buon fine :3</p>
    </div>
  );
}

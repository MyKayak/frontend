import { cookies } from "next/headers";
import { Team, TeamTitle } from "@/models/team";
import { Medal, Trophy, Shield } from "lucide-react";
import PageHeader from "@/components/ui/page_header";
import TeamLogoUpdater from "@/components/admin/team_logo_updater";

interface Props {
  params: Promise<{ id: string }>;
}

const categories: Record<string, string> = { M: "maschile", F: "femminile", X: "misto" };
const divisions: Record<string, string> = {
  ALA: "allievi A",
  ALB: "allievi B",
  CDA: "cadetti A",
  CDB: "cadetti B",
  RA1: "ragazzi primo anno",
  RAG: "ragazzi",
  JUN: "junior",
  U23: "under 23",
  SEN: "senior",
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has("token");

  const res = await fetch(`https://api.mykayak.fuffo.net/team/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return <div className="text-center mt-20 text-2xl">Società non trovata</div>;
  }

  const teamData: Team = await res.json();

  return (
    <div className="flex flex-col items-center pt-32 pb-20 px-4">
      <title>{teamData.name}</title>
      
      <div className="w-32 h-32 mb-8 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 backdrop-blur-sm overflow-hidden p-4">
        {teamData.logo ? (
          <img src={teamData.logo} alt={teamData.name} className="w-full h-full object-contain" />
        ) : (
          <Shield className="w-16 h-16" />
        )}
      </div>

      <PageHeader title={teamData.name} />
      <p className="text-white/30 font-mono tracking-widest uppercase mb-4">{teamData.team_id}</p>
      
      {isAdmin && (
        <div className="mb-12">
          <TeamLogoUpdater teamId={teamData.team_id} currentLogo={teamData.logo} />
        </div>
      )}
      
      {!isAdmin && <div className="mb-12" />}

      {teamData.titles && teamData.titles.length > 0 ? (
        <div className="w-full max-w-5xl">
          <div className="flex flex-row justify-center items-center gap-4 mb-12">
            <Trophy className="h-10 w-10 text-yellow-500" />
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Albo d'oro</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamData.titles.map((title: TeamTitle, index: number) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="text-blue-400 font-black text-2xl mb-2 group-hover:scale-105 transition-transform origin-left">
                  {title.boat} {title.distance}m
                </div>
                <div className="text-white/70 font-medium capitalize mb-4">
                  {divisions[title.division] ?? "Master"} {categories[title.category]}
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-end">
                  <div className="text-sm">
                    <div className="text-white/40 uppercase text-[10px] font-bold tracking-widest">Località</div>
                    <div className="text-white/80">{title.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/40 uppercase text-[10px] font-bold tracking-widest text-right">Anno</div>
                    <div className="text-white/80 font-mono">{title.date.split("-")[0]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl px-10 max-w-2xl">
          <Medal className="h-16 w-16 text-white/10 mx-auto mb-6" />
          <p className="text-white/40 text-2xl font-medium">
            Questa società non ha ancora vinto titoli, per adesso 😉
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;

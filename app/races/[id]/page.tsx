import { Race, Meet } from '@/models/meet';
import Link from 'next/link';
import MedalRow from '@/components/ui/medal_row';
import { MedalTableEntry } from '@/models/medal';
import { Trophy } from 'lucide-react';
import PageHeader from '@/components/ui/page_header';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  
  const [racesRes, medalRes, meetsRes] = await Promise.all([
    fetch(`https://api.mykayak.fuffo.net/races/${id}`, { cache: 'no-store' }),
    fetch(`https://api.mykayak.fuffo.net/medal_table?meet_id=${id}`, { cache: 'no-store' }),
    fetch(`https://api.mykayak.fuffo.net/meets`, { cache: 'no-store' })
  ]);

  if (!racesRes.ok) {
    return <div className="text-center mt-20">Gara non trovata</div>;
  }

  const races: Race[] = await racesRes.json();
  const medalData: MedalTableEntry[] = await medalRes.json();
  const allMeets: Meet[] = await meetsRes.json();
  
  const currentMeet = allMeets.find(m => m.id === id);
  const topTeams = medalData.slice(0, 5);

  return (
    <div className="flex flex-col items-center pt-32 pb-20 px-4">
      <div className="w-full max-w-6xl mt-8 mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/races" className="text-white/40 hover:text-white">Gare</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/20" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white/70">{currentMeet?.name || id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <PageHeader title={currentMeet?.name || 'Gara'} />
      <div className="flex flex-col items-center mb-16 gap-2">
        <p className="text-white/50 text-xl font-bold uppercase tracking-widest">{currentMeet?.location}</p>
        <p className="text-white/30 font-mono">{currentMeet?.date}</p>
      </div>

      {topTeams.length > 0 && (
        <div className="w-full max-w-5xl mb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Top 5 Società</h2>
          </div>
          <div className="flex flex-col gap-3">
            {topTeams.map((entry, index) => (
              <MedalRow key={entry.team_id} entry={entry} rank={index + 1} />
            ))}
            {medalData.length > 5 && (
              <Link href={`/medal_table?meet_id=${id}`} className="text-center mt-4 text-white/40 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
                Visualizza medagliere completo →
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
        {races.map((race) => (
          <Link key={race.id} href={`/heats/${race.id}?meet_id=${id}&meet_name=${encodeURIComponent(currentMeet?.name || '')}&race_label=${encodeURIComponent(`${race.boat} ${race.distance}m – ${race.category} ${race.division}`)}`} className="group">
            <div className="p-6 h-full rounded-xl bg-white/5 border border-white/10 group-hover:border-white/30 group-hover:bg-white/10 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider">
                    {race.boat}
                  </span>
                  <span className="text-white/30 text-xs font-mono">{race.code}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">{race.distance}m</h3>
                  <p className="text-white/70">{race.category} - {race.division}</p>
                  <p className="text-white/40 text-sm italic">{race.level}</p>
                </div>
              </div>
              <div className="mt-6 text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Visualizza Risultati →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;

import { Race } from '@/models/meet';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`https://api.mykayak.fuffo.net/races/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return <div className="text-center mt-20">Gara non trovata</div>;
  }

  const races: Race[] = await res.json();

  return (
    <div className="flex flex-col items-center pb-20">
      <h2 className="text-center mt-8 mb-16 text-8xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto pb-4">Programma</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl px-4">
        {races.map((race) => (
          <Link key={race.id} href={`/heats/${race.id}`} className="group">
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

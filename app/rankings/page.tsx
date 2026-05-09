import { AthleteRanking } from "@/models/athlete";
import { formatTime } from "@/utils/formatting";
import Link from "next/link";
import { Timer, TrendingUp } from "lucide-react";
import RankingFilters from "@/components/ui/ranking_filters";

interface Props {
  searchParams: Promise<{ 
    category?: string; 
    division?: string; 
    distance?: string; 
    boat?: string;
  }>;
}

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const queryParams = new URLSearchParams();
  
  queryParams.set('boat', params.boat || 'K1');
  queryParams.set('distance', params.distance || '200');
  queryParams.set('category', params.category || 'M');
  queryParams.set('division', params.division || 'SEN');

  const url = `https://api.mykayak.fuffo.net/rankings?${queryParams.toString()}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data: AthleteRanking[] = await res.json();

  return (
    <div className="max-w-6xl mx-auto px-4 pb-20">
      <title>Ranking</title>
      <h1 className="text-center mt-8 mb-8 text-8xl md:text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto leading-tight uppercase italic tracking-tighter">
        Ranking
      </h1>

      <RankingFilters />

      <div className="flex flex-col gap-4">
        {data.length === 0 ? (
          <div className="text-center py-20 text-white/30 text-2xl">
            Nessun ranking disponibile per i filtri selezionati.
          </div>
        ) : (
          data.map((rank, index) => (
            <Link key={rank.athlete_id} href={`/athlete/${rank.athlete_id}`} className="group">
              <div className="flex flex-col md:flex-row md:items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-white/10 group-hover:border-white/30 transition-all">
                <div className="flex items-center gap-6 flex-1">
                  <div className="text-4xl font-black italic text-white/10 group-hover:text-blue-500 transition-colors w-16">
                    #{index + 1}
                  </div>
                  <h3 className="text-2xl font-bold">{rank.name} {rank.surname}</h3>
                </div>

                <div className="flex gap-8 items-center justify-between md:justify-end border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest mb-1">
                      <Timer className="h-3 w-3" /> Record Personale
                    </div>
                    <span className="font-mono font-bold text-xl text-center">{formatTime(rank.best_time)}</span>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 text-blue-400/50 text-[10px] font-bold uppercase tracking-widest mb-1">
                      <TrendingUp className="h-3 w-3" /> Media Migliori 3
                    </div>
                    <span className="font-mono font-black text-2xl text-blue-400 w-full text-center">
                      {formatTime(rank.avg_best_3)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;

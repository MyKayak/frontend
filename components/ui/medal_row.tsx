import { MedalTableEntry } from "@/models/medal";
import Link from "next/link";
import { Medal } from "lucide-react";

export default function MedalRow({ entry, rank }: { entry: MedalTableEntry; rank: number }) {
  return (
    <Link href={`/team/${entry.team_id}`} className="group">
      <div className="flex items-center gap-4 p-4 md:p-6 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-white/10 group-hover:border-white/30 transition-all">
        <div className="w-12 text-3xl font-black italic text-white/20 group-hover:text-blue-500 transition-colors">
          #{rank}
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold">{entry.team_name}</h3>
        </div>

        <div className="flex gap-4 md:gap-8 items-center">
          <div className="flex flex-col items-center">
            <Medal className="h-6 w-6 text-yellow-500 mb-1" />
            <span className="font-mono font-bold text-xl">{entry.gold}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Medal className="h-6 w-6 text-gray-400 mb-1" />
            <span className="font-mono font-bold text-xl">{entry.silver}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <Medal className="h-6 w-6 text-orange-600 mb-1" />
            <span className="font-mono font-bold text-xl">{entry.bronze}</span>
          </div>

          <div className="ml-4 md:ml-8 pl-4 md:pl-8 border-l border-white/10 flex flex-col items-end">
            <span className="text-white/30 text-[10px] font-bold uppercase tracking-widest">Totale</span>
            <span className="text-2xl font-black">{entry.total_medals}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

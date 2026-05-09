"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Trophy } from "lucide-react";

const FIRST_SEASON = 2022;
const currentYear = new Date().getFullYear();
const SEASONS = Array.from(
  { length: currentYear - FIRST_SEASON + 1 },
  (_, i) => FIRST_SEASON + i
).reverse(); // most recent first

function seasonToParams(year: number) {
  return { after: `${year}-01-01`, before: `${year + 1}-01-01` };
}

function paramsToSeason(after: string, before: string): number | null {
  for (const year of SEASONS) {
    const { after: a, before: b } = seasonToParams(year);
    if (after === a && before === b) return year;
  }
  return null;
}

export default function MedalTableFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const after = searchParams.get("after") || "";
  const before = searchParams.get("before") || "";
  const onlyChampionships = searchParams.get("only_championships") === "true";

  const activeSeason = paramsToSeason(after, before);

  function setSeason(year: string) {
    const params = new URLSearchParams(searchParams);
    if (year === "") {
      params.delete("after");
      params.delete("before");
    } else {
      const { after, before } = seasonToParams(Number(year));
      params.set("after", after);
      params.set("before", before);
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  function toggleChampionships() {
    const params = new URLSearchParams(searchParams);
    if (onlyChampionships) {
      params.delete("only_championships");
    } else {
      params.set("only_championships", "true");
    }
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  const hasFilters = after || before || onlyChampionships;

  return (
    <div className={`flex flex-wrap justify-center gap-6 mb-12 transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}>

      {/* Season dropdown */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2">Stagione</span>
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
          <select
            value={activeSeason ?? ""}
            onChange={(e) => setSeason(e.target.value)}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-transparent text-white/70 focus:outline-none focus:text-white cursor-pointer appearance-none pr-8"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
          >
            <option value="" className="bg-gray-900 text-white/60">Tutti gli anni</option>
            {SEASONS.map((year) => (
              <option key={year} value={year} className="bg-gray-900 text-white">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Championships toggle */}
      <div className="flex flex-col gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2">Tipo gara</span>
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
          <button
            onClick={toggleChampionships}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              !onlyChampionships
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            Tutte
          </button>
          <button
            onClick={toggleChampionships}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              onlyChampionships
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-white/40 hover:text-white/60"
            }`}
          >
            <Trophy className="h-3 w-3" />
            Solo campionati
          </button>
        </div>
      </div>

      {/* Reset — only when a filter is active */}
      {hasFilters && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2 opacity-0 select-none">_</span>
          <div className="flex p-1">
            <button
              onClick={() => startTransition(() => router.replace(pathname))}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white/30 hover:text-white/60 transition-all border border-white/10 hover:border-white/30"
            >
              Azzera filtri
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

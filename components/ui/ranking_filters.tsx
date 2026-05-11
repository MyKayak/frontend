"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

const FIRST_SEASON = 2022;
const currentYear = new Date().getFullYear();
const SEASONS = Array.from(
  { length: currentYear - FIRST_SEASON + 1 },
  (_, i) => FIRST_SEASON + i
).reverse();

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

export default function RankingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const boat = searchParams.get("boat") || "K1";
  const distance = searchParams.get("distance") || "200";
  const category = searchParams.get("category") || "M";
  const division = searchParams.get("division") || "SEN";
  const after = searchParams.get("after") || "";
  const before = searchParams.get("before") || "";
  const activeSeason = paramsToSeason(after, before);

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

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

  const FilterGroup = ({ label, current, options, paramKey }: any) => (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-2">{label}</span>
      <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl">
        {options.map((opt: any) => (
          <button
            key={opt.value}
            onClick={() => setFilter(paramKey, opt.value)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              current === opt.value 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-white/40 hover:text-white/60"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`flex flex-wrap justify-center gap-6 mb-12 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
      <FilterGroup 
        label="Barca" 
        current={boat} 
        paramKey="boat"
        options={[{label: "K1", value: "K1"}, {label: "C1", value: "C1"}]} 
      />
      <FilterGroup 
        label="Distanza" 
        current={distance} 
        paramKey="distance"
        options={[{label: "200m", value: "200"}, {label: "500m", value: "500"}, {label: "1000m", value: "1000"}]} 
      />
      <FilterGroup 
        label="Genere" 
        current={category} 
        paramKey="category"
        options={[{label: "Uomini", value: "M"}, {label: "Donne", value: "F"}]} 
      />
      <FilterGroup 
        label="Categoria" 
        current={division} 
        paramKey="division"
        options={[
          {label: "Senior", value: "SEN"}, 
          {label: "U23", value: "U23"},
          {label: "Junior", value: "JUN"}, 
          {label: "Ragazzi", value: "RAG"},
          {label: "Ragazzi 1o", value: "RA1"}
        ]} 
      />

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
              <option key={year} value={year} className="bg-gray-900 text-white">{year}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

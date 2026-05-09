"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function RankingFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const boat = searchParams.get("boat") || "K1";
  const distance = searchParams.get("distance") || "200";
  const category = searchParams.get("category") || "M";
  const division = searchParams.get("division") || "SEN";

  function setFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
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
    </div>
  );
}

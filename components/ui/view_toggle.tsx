"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function ViewToggle({ defaultMode = 'results' }: { defaultMode?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentMode = searchParams.get('mode') || defaultMode;

  function setMode(mode: string) {
    const params = new URLSearchParams(searchParams);
    params.set('mode', mode);
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div className="flex p-1 bg-white/5 border border-white/10 rounded-full mb-12 relative overflow-hidden">
      <div 
        className={`absolute inset-y-1 w-[calc(50%-4px)] bg-blue-600 rounded-full transition-all duration-300 ease-in-out ${currentMode === 'startlist' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'}`}
      />
      <button
        onClick={() => setMode('results')}
        className={`relative z-10 px-8 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${currentMode === 'results' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
      >
        Risultati
      </button>
      <button
        onClick={() => setMode('startlist')}
        className={`relative z-10 px-8 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${currentMode === 'startlist' ? 'text-white' : 'text-white/40 hover:text-white/60'}`}
      >
        Startlist
      </button>
    </div>
  );
}

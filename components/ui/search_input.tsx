"use client"

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [text, setText] = useState(searchParams.get('q')?.toString() || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (text) {
        params.set('q', text);
      } else {
        params.delete('q');
      }

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <div className="relative w-full max-w-xl mx-auto mb-16 group">
      <div className="absolute -inset-0.5 bg-linear-0 from-blue-600 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className={`h-6 w-6 ${isPending ? 'text-blue-400 animate-spin' : 'text-white/40 group-focus-within:text-blue-400'} transition-colors`} />
        </div>
        <input
          type="text"
          className="block w-full p-5 pl-14 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl focus:border-blue-500/50 outline-none transition-all text-xl text-white placeholder-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          placeholder={pathname.includes('teams') ? "Cerca una società..." : "Cerca un atleta..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}

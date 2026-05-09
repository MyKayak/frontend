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
    <div className="relative w-full max-w-md mx-auto mb-12">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className={`h-5 w-5 ${isPending ? 'text-blue-500 animate-pulse' : 'text-white/30'}`} />
      </div>
      <input
        type="text"
        className="block w-full p-4 pl-12 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-xl"
        placeholder="Cerca un atleta..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}

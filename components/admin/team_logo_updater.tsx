"use client";

import { useState, useTransition } from "react";
import { updateTeamLogoAction } from "@/app/actions";
import { ImagePlus, Loader2, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  teamId: string;
  currentLogo: string | null;
}

export default function TeamLogoUpdater({ teamId, currentLogo }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(currentLogo || "");
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const router = useRouter();

  const handleUpdate = () => {
    if (!url.trim()) return;

    startTransition(async () => {
      setStatus("idle");
      const result = await updateTeamLogoAction(teamId, url.trim());
      if (result.success) {
        setStatus("success");
        router.refresh();
        setTimeout(() => {
          setIsOpen(false);
          setStatus("idle");
        }, 1500);
      } else {
        setStatus("error");
      }
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm font-medium text-white/70 hover:text-white"
      >
        <ImagePlus className="w-4 h-4" />
        Aggiorna Logo
      </button>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-center gap-2 w-full max-w-sm">
      <div className="flex w-full gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
          disabled={isPending}
        />
        <button
          onClick={handleUpdate}
          disabled={isPending || !url.trim()}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold transition-all flex items-center justify-center min-w-[3rem]"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
        </button>
        <button
          onClick={() => {
            setIsOpen(false);
            setUrl(currentLogo || "");
            setStatus("idle");
          }}
          disabled={isPending}
          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      {status === "error" && (
        <span className="text-red-400 text-xs font-medium">Errore durante l'aggiornamento</span>
      )}
      {status === "success" && (
        <span className="text-green-400 text-xs font-medium">Logo aggiornato con successo!</span>
      )}
    </div>
  );
}

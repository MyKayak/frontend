"use client";

import { useState, useOptimistic, useTransition } from "react";
import { setChampionshipAction } from "@/app/actions";

interface Props {
  meetId: string;
  initialValue: boolean;
}

export default function ChampionshipToggle({ meetId, initialValue }: Props) {
  const [committed, setCommitted] = useState(!!initialValue);
  const [optimistic, setOptimistic] = useOptimistic(committed);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    startTransition(async () => {
      setOptimistic(newValue);
      const ok = await setChampionshipAction(meetId, newValue);
      if (ok) setCommitted(newValue);
    });
  };

  return (
    <label
      className="championship-toggle"
      title={optimistic ? "Championship meet" : "Mark as championship"}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="checkbox"
        checked={optimistic}
        onChange={handleChange}
        disabled={isPending}
        className="sr-only"
      />
      <span
        className={`
          championship-toggle__track
          ${optimistic ? "championship-toggle__track--on" : ""}
          ${isPending ? "championship-toggle__track--pending" : ""}
        `}
      >
        <span className="championship-toggle__thumb" />
        <span className="championship-toggle__label">
          {optimistic ? "🏆 Campionato" : "Campionato"}
        </span>
      </span>
    </label>
  );
}

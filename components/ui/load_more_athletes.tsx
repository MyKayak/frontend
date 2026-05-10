"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import AthleteTile from "./athlete_tile"
import { AthletePreview } from "@/models/athlete"

import { loadMoreAthletesAction } from "@/app/actions"

interface Props {
  initialOffset: number
  query: string
}

export default function LoadMoreAthletes({ initialOffset, query }: Props) {
  const [athletes, setAthletes] = useState<AthletePreview[]>([])
  const [offset, setOffset] = useState(initialOffset)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = async () => {
    setLoading(true)
    try {
      const newAthletes = await loadMoreAthletesAction(query, offset);
      
      if (newAthletes.length < 40) {
        setHasMore(false)
      }
      
      setAthletes(prev => [...prev, ...newAthletes])
      setOffset(prev => prev + 40)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (!hasMore && athletes.length === 0) return null

  return (
    <>
      {athletes.map((athlete) => (
        <AthleteTile key={athlete.athlete_id} athlete={athlete} />
      ))}
      
      {hasMore && (
        <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center mt-8">
          <button 
            onClick={loadMore}
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white font-bold flex items-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? "Caricamento..." : "Carica Altri"}
          </button>
        </div>
      )}
    </>
  )
}

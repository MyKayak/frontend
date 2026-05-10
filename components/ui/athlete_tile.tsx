import { AthletePreview } from "@/models/athlete"
import { User } from "lucide-react"
import Link from "next/link"

interface AthleteTileProps {
    athlete: AthletePreview
}

const AthleteTile = (props: AthleteTileProps) => {
  return (
    <Link href={`/athlete/${props.athlete.athlete_id}`} className="block group h-full">
      <div className="h-full p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black italic tracking-tighter text-xl text-white/90 group-hover:text-white transition-colors truncate">
              {props.athlete.name} {props.athlete.surname}
            </h3>
            <p className="text-white/40 text-sm font-medium mt-1">
              Classe {new Date(props.athlete.birth_date).getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AthleteTile

import { AthletePreview } from "@/models/athlete"

interface AthleteTileProps {
    athlete: AthletePreview
}

const AthleteTile = (props: AthleteTileProps) => {
  return (
    <a href={`/athlete/${props.athlete.athlete_id}`} className="flex flex-row items-center justify-between p-2 border-2 border-white/5 rounded-xl hover:bg-white/20 hover:scale-95 transition-all">
        <div className="flex flex-col">
            <span>{props.athlete.name}</span>
            <span>{props.athlete.surname}</span>
        </div>
        <span>{props.athlete.birth_date}</span>
    </a>
  )
}

export default AthleteTile

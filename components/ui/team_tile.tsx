import React from 'react'
import { TeamPreview } from '@/models/team';

interface TeamTileProps {
  team: TeamPreview
}

const TeamTile = (props:TeamTileProps) => {
  return (
    <a className="flex transition-all border-white/5 border-2 hover:bg-white/20 hover:scale-95 p-2 m-2 mx-auto rounded-full items-center justify-center font-bold lg:rounded-2xl w-full h-full" href={`/team/${props.team.team_id}`}>
      <p className="whitespace-nowrap overflow-hidden text-overflow-ellipsis">{props.team.name}</p>
    </a>
  )
}

export default TeamTile
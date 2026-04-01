import React from 'react'
import { Team } from '@/models/team';

interface TeamTileProps {
  team: Team
}

const TeamTile = (props:TeamTileProps) => {
  return (
    <a className="flex flex-row bg-white/20 p-2 m-2 mx-auto rounded-full justify-center lg:w-1/2 font-bold" href={`/team/${props.team.team_id}`}>
      <p>{props.team.name}</p>
    </a>
  )
}

export default TeamTile
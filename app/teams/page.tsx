import React from 'react'
import TeamTile from '@/components/ui/team_tile';
import { Team } from '@/models/team';

const Page = async () => {
  const req = await fetch("http://localhost:8080/teams")
  const teams = await req.json();
  return (
    <div className="relative">
      <title>Società</title>
      <h1 className="text-center mt-8 mb-16 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">Società</h1>
      {teams.map((team:Team)=><TeamTile key={team.team_id} team={team}/>)}
    </div>
  )
}

export default Page
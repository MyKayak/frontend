import React from 'react'
import TeamTile from '@/components/ui/team_tile';
import { TeamPreview } from '@/models/team';

const Page = async () => {
  const req = await fetch("https://api.mykayak.fuffo.net/teams")
  const teams = await req.json();
  return (
    <div>
      <title>Società</title>
      <h1 className="text-center mt-8 mb-16 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">Società</h1>
      <div className="lg:grid grid-cols-4 gap-2">
        {teams.map((team:TeamPreview)=><TeamTile key={team.team_id} team={team}/>)}
      </div>
    </div>
  )
}

export default Page
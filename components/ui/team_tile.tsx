import React from 'react'
import { TeamPreview } from '@/models/team';
import { Shield } from 'lucide-react';
import Link from 'next/link';

interface TeamTileProps {
  team: TeamPreview
}

const TeamTile = (props:TeamTileProps) => {
  return (
    <Link href={`/team/${props.team.team_id}`} className="block group h-full">
      <div className="h-full p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.07] hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 items-center text-center justify-center">
        <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-blue-400 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors">
          {props.team.logo ? (
            <img src={props.team.logo} alt={props.team.name} className="w-10 h-10 object-contain" />
          ) : (
            <Shield className="w-8 h-8" />
          )}
        </div>
        <h3 className="font-black italic tracking-tighter text-xl text-white/90 group-hover:text-white transition-colors w-full line-clamp-2">
          {props.team.name}
        </h3>
      </div>
    </Link>
  )
}

export default TeamTile
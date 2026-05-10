import React from 'react'
import TeamTile from '@/components/ui/team_tile';
import SearchInput from '@/components/ui/search_input';
import { TeamPreview } from '@/models/team';
import PageHeader from '@/components/ui/page_header';
import LoadMoreTeams from '@/components/ui/load_more_teams';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const query = (await searchParams).q || '';
  const url = query 
    ? `https://api.mykayak.fuffo.net/teams?hint=${encodeURIComponent(query)}`
    : `https://api.mykayak.fuffo.net/teams`;

  const req = await fetch(url);
  const teams: TeamPreview[] = await req.json();

  return (
    <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
      <title>Società - MyKayak</title>
      <PageHeader title="Società" />

      <SearchInput />

      {teams.length === 0 ? (
        <div className="text-center mt-20 text-white/30 text-2xl">
          Nessuna società trovata per "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teams.map((team: TeamPreview) => (
            <TeamTile key={team.team_id} team={team} />
          ))}
          {teams.length === 40 && (
            <LoadMoreTeams initialOffset={40} query={query} />
          )}
        </div>
      )}
    </div>
  )
}

export default Page;
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ProgressChart } from '@/components/ui/progress_chart';
import { formatTime } from '@/utils/formatting';
import { Ruler, Timer, Users } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`https://api.mykayak.fuffo.net/athlete/${id}`);

  if (!res.ok) {
    return <div className="text-center mt-20 text-2xl">Atleta non trovato</div>;
  }

  const athleteData = await res.json();

  // Group personal records by boat type so single/team boats are shown in separate sections
  const soloRecords = athleteData.personal_records?.filter((r: any) => r.boat.endsWith('1')) ?? [];
  const teamRecords = athleteData.personal_records?.filter((r: any) => !r.boat.endsWith('1')) ?? [];

  return (
    <div className="flex flex-col items-center mb-2 px-4">
      <title>{athleteData.name} {athleteData.surname}</title>
      <h1 className="text-center mt-8 mb-4 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">
        {athleteData.name} {athleteData.surname}
      </h1>
      <p className="text-white/50 font-mono mb-1">{athleteData.birth_date}</p>
      {athleteData.team && (
        <Link href={`/team/${athleteData.team.team_id}`} className="text-white/40 hover:text-blue-400 transition-colors font-medium uppercase tracking-widest text-sm mb-2">
          {athleteData.team.name}
        </Link>
      )}

      {athleteData.personal_records && athleteData.personal_records.length > 0 && (
        <>
          <h2 className="pt-16 pb-8 text-4xl font-black italic tracking-tighter">Record personali</h2>

          {soloRecords.length > 0 && (
            <div className="flex flex-row flex-wrap justify-center gap-6 pb-8">
              {soloRecords.map((record: any, index: number) => (
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-center min-w-36" key={index}>
                  <div className="text-blue-400 font-black text-lg mb-3">{record.boat}</div>
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <Ruler className="h-4 w-4" />
                    <span>{record.distance}m</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono font-bold text-xl">
                    <Timer className="h-4 w-4 text-white/40" />
                    <span>{formatTime(record.time)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {teamRecords.length > 0 && (
            <>
              <div className="flex items-center gap-2 mt-4 mb-6 text-white/30">
                <Users className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Imbarcazioni di squadra</span>
              </div>
              <div className="flex flex-row flex-wrap justify-center gap-6 pb-16">
                {teamRecords.map((record: any, index: number) => (
                  <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-center min-w-36" key={index}>
                    <div className="text-white/50 font-black text-lg mb-3">{record.boat}</div>
                    <div className="flex items-center gap-2 text-white/60 mb-2">
                      <Ruler className="h-4 w-4" />
                      <span>{record.distance}m</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono font-bold text-xl">
                      <Timer className="h-4 w-4 text-white/40" />
                      <span>{formatTime(record.time)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {athleteData.time_progression && Object.keys(athleteData.time_progression).length > 0 && (
        <>
          <h2 className="pt-16 pb-8 text-4xl font-black italic tracking-tighter">Progressione</h2>
          <Accordion type="single" collapsible className="w-full max-w-7xl p-4 transition-all">
            {Object.entries(athleteData.time_progression).map(([key, value]: [string, any], index) => (
              <AccordionItem value={`item-${index}`} key={key}>
                <AccordionTrigger>{key.replaceAll('_', ' ')}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    <ProgressChart entries={value} className="h-64 lg:h-128 lg:mx-16 pr-16" />
                    {value.map((entry: any, i: number) => (
                      <div key={i} className="flex justify-between p-2 border-b border-white/10">
                        <span>{entry.date}</span>
                        <span className="font-mono">{formatTime(entry.time_ms)}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )}
    </div>
  );
};

export default Page;

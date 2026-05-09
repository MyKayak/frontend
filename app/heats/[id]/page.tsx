import { Heat } from '@/models/meet';
import { formatTime } from '@/utils/formatting';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ViewToggle from '@/components/ui/view_toggle';
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ mode?: string; meet_id?: string; meet_name?: string; race_label?: string }>;
}

const Page = async ({ params, searchParams }: Props) => {
  const { id } = await params;
  const { mode: requestedMode, meet_id, meet_name, race_label } = await searchParams;
  
  const apiUrl = `https://api.mykayak.fuffo.net/heats/${id}${requestedMode === 'startlist' ? '?startlist=true' : ''}`;
  const res = await fetch(apiUrl, { cache: 'no-store' });

  if (!res.ok) {
    return <div className="text-center mt-20 text-2xl">Gara non trovata</div>;
  }

  const heats: Heat[] = await res.json();
  const effectiveMode = requestedMode || (heats[0]?.is_result ? 'results' : 'startlist');

  return (
    <div className="flex flex-col items-center pb-20 px-4">
      {meet_id && (
        <div className="w-full max-w-5xl mt-8 mb-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/races" className="text-white/40 hover:text-white">Gare</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/20" />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/races/${meet_id}`} className="text-white/40 hover:text-white">
                  {meet_name || meet_id}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/20" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white/70">{race_label || id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}
      <h1 className="text-center mt-8 mb-16 text-8xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">
        {effectiveMode === 'startlist' ? 'Startlist' : 'Risultati'}
      </h1>

      <ViewToggle defaultMode={effectiveMode} />
      
      <div className="w-full max-w-5xl">
        <Accordion type="single" collapsible defaultValue="item-0">
          {heats.map((heat, idx) => (
            <AccordionItem key={heat.id} value={`item-${idx}`} className="border-white/10">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex justify-between w-full pr-4 items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold italic tracking-tighter uppercase">Batteria {heat.index}</span>
                    {effectiveMode === 'results' && !heat.is_result && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/40 uppercase tracking-widest">
                        In programma
                      </span>
                    )}
                    {effectiveMode === 'results' && heat.is_result && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/20 text-green-400 uppercase tracking-widest">
                        Ufficiale
                      </span>
                    )}
                  </div>
                  <span className="text-white/40 font-mono">{new Date(heat.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-white/30 text-sm uppercase tracking-wider">
                        <th className="pb-2 pl-4">{heat.is_result ? 'Pos' : '#'}</th>
                        <th className="pb-2">Corsia</th>
                        <th className="pb-2">Squadra / Atleti</th>
                        <th className="pb-2 text-right pr-4">Tempo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const sortedPerfs = [...heat.performances].sort((a, b) => {
                            if (heat.is_result) {
                                return (a.placement || 99) - (b.placement || 99);
                            }
                            return a.lane - b.lane;
                        });
                        const winnerTime = heat.is_result ? sortedPerfs[0]?.time_ms : null;
                        
                        return sortedPerfs.map((perf) => {
                          const gap = (heat.is_result && perf.time_ms && winnerTime && perf.placement !== 1) ? perf.time_ms - winnerTime : null;
                          
                          return (
                            <tr key={perf.id} className="bg-white/5 rounded-lg">
                              <td className="py-4 pl-4 font-bold text-xl rounded-l-lg italic">
                                {heat.is_result ? (perf.placement || '-') : (perf.lane)}
                              </td>
                              <td className="py-4 font-mono text-white/50">
                                {perf.lane}
                              </td>
                              <td className="py-4">
                                {perf.athletes.length === 1 ? (
                                  <>
                                    <div className="font-bold text-lg">{perf.athletes[0].name} {perf.athletes[0].surname}</div>
                                    <div className="text-white/40 text-sm italic">{perf.team_name}</div>
                                  </>
                                ) : (
                                  <>
                                    <div className="font-bold text-lg">{perf.team_name}</div>
                                    <div className="text-white/40 text-sm italic">
                                      {perf.athletes.map(a => `${a.name} ${a.surname}`).join(', ')}
                                    </div>
                                  </>
                                )}
                              </td>
                              <td className="py-4 text-right pr-4 font-mono rounded-r-lg">
                                <div className="text-xl font-bold">
                                  {heat.is_result && perf.time_ms ? formatTime(perf.time_ms) : (perf.status || '-')}
                                </div>
                                {gap !== null && (
                                  <div className="text-xs text-white/40">
                                    +{formatTime(gap)}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Page;

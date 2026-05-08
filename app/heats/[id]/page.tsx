import { Heat } from '@/models/meet';
import { formatTime } from '@/utils/formatting';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`https://api.mykayak.fuffo.net/heats/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    return <div className="text-center mt-20 text-2xl">Risultati non trovati</div>;
  }

  const heats: Heat[] = await res.json();

  return (
    <div className="flex flex-col items-center pb-20">
      <h2 className="text-center mt-8 mb-16 text-8xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">Risultati</h2>
      
      <div className="w-full max-w-5xl px-4">
        <Accordion type="single" collapsible defaultValue="item-0">
          {heats.map((heat, idx) => (
            <AccordionItem key={heat.id} value={`item-${idx}`} className="border-white/10">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex justify-between w-full pr-4 items-center">
                  <span className="text-2xl font-bold">Heat {heat.index}</span>
                  <span className="text-white/40 font-mono">{new Date(heat.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-y-2">
                    <thead>
                      <tr className="text-white/30 text-sm uppercase tracking-wider">
                        <th className="pb-2 pl-4">Pos</th>
                        <th className="pb-2">Corsia</th>
                        <th className="pb-2">Squadra / Atleti</th>
                        <th className="pb-2 text-right pr-4">Tempo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const sortedPerfs = [...heat.performances].sort((a, b) => (a.placement || 99) - (b.placement || 99));
                        const winnerTime = sortedPerfs[0]?.time_ms;
                        
                        return sortedPerfs.map((perf) => {
                          const gap = (perf.time_ms && winnerTime && perf.placement !== 1) ? perf.time_ms - winnerTime : null;
                          
                          return (
                            <tr key={perf.id} className="bg-white/5 rounded-lg">
                              <td className="py-4 pl-4 font-bold text-xl rounded-l-lg italic">
                                {perf.placement || '-'}
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
                                  {perf.time_ms ? formatTime(perf.time_ms) : (perf.status || '-')}
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

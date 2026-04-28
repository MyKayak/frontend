import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { formatTime } from '@/utils/formatting';
import { Ruler, Timer } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`https://api.mykayak.fuffo.net/athlete/${id}`);

  if (!res.ok) {
    return <div>Athlete not found</div>;
  }

  const athleteData = await res.json();

  return (
    <div className="flex flex-col items-center mb-2">
      <title>{athleteData.name} {athleteData.surname}</title>
      <h2 className="text-center mt-8 mb-16 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">{athleteData.name} {athleteData.surname}</h2>
      <p className="text-white/50">{athleteData.birth_date}</p>
      <p className="text-white/50">{athleteData.team.name}</p>
      {typeof athleteData.personal_records === "undefined" ? "" : 
        <>
          <h2 className="pt-16 pb-8 text-4xl">Record personali</h2>
          <div className="flex flex-row gap-16 pb-16">
            {athleteData.personal_records.map((record: any, index: number) => (!(record.boat.endsWith("1")) ? null : 
              <div className="p-8 rounded-lg border-2 border-white/5 hover:border-white/50 transition-all" key={index}>
                <Ruler className="inline-block align-middle mr-1"/><span className="pl-2 align-middle">{record.distance}m</span><br/>
                <div className="h-1"/><br/>
                <Timer className="inline-block align-middle mr-1"/><span className="pl-2 align-middle">{formatTime(record.time)}</span>
              </div>
            ))}
          </div>
        </>
      }
      {typeof athleteData.time_progression === "undefined" ? "" : 
        <>
          <h2 className="pt-16 pb-8 text-4xl">Progressione</h2>
          <Accordion type="single" collapsible className="w-full max-w-7xl p-4 transition-all">
            {Object.entries(athleteData.time_progression).map(([key, value]: [string, any], index) => (
              <AccordionItem value={`item-${index}`} key={key}>
                <AccordionTrigger>{key.replace(/_/g, ' ')}</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
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
      }
    </div>
  );
};

export default Page;

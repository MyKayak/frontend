import { MedalTableEntry } from "@/models/medal";
import MedalRow from "@/components/ui/medal_row";

interface Props {
  searchParams: Promise<{ meet_id?: string; after?: string; before?: string; only_championships?: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const queryParams = new URLSearchParams();
  if (params.meet_id) queryParams.set('meet_id', params.meet_id);
  if (params.after) queryParams.set('after', params.after);
  if (params.before) queryParams.set('before', params.before);
  if (params.only_championships) queryParams.set('only_championships', params.only_championships);

  const url = `https://api.mykayak.fuffo.net/medal_table?${queryParams.toString()}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data: MedalTableEntry[] = await res.json();

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <title>Medagliere</title>
      <h1 className="text-center mt-8 mb-16 text-8xl md:text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto leading-tight">
        Medagliere
      </h1>

      <div className="flex flex-col gap-3">
        {data.length === 0 ? (
          <div className="text-center py-20 text-white/30 text-2xl">
            Nessun dato disponibile per i filtri selezionati.
          </div>
        ) : (
          data.map((entry, index) => (
            <MedalRow key={entry.team_id} entry={entry} rank={index + 1} />
          ))
        )}
      </div>
    </div>
  );
};

export default Page;

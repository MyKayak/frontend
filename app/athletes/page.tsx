import AthleteTile from '@/components/ui/athlete_tile';
import SearchInput from '@/components/ui/search_input';
import { AthletePreview } from '@/models/athlete';

interface Props {
  searchParams: Promise<{ q?: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const query = (await searchParams).q || '';
  const url = query 
    ? `https://api.mykayak.fuffo.net/athletes?name_hint=${encodeURIComponent(query)}&limit=100`
    : `https://api.mykayak.fuffo.net/athletes?limit=40&offset=0`;

  const req = await fetch(url);
  const athletes: AthletePreview[] = await req.json();

  return (
    <div className="max-w-7xl mx-auto px-4 pb-20">
      <title>Atleti</title>
      <h1 className="text-center mt-8 mb-8 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">Atleti</h1>

      <SearchInput />

      {athletes.length === 0 ? (
        <div className="text-center mt-20 text-white/30 text-2xl">
          Nessun atleta trovato per "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {athletes.map((athlete: AthletePreview) => (
            <AthleteTile athlete={athlete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
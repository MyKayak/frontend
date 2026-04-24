import AthleteTile from '@/components/ui/athlete_tile';
import { AthletePreview } from '@/models/athlete';

const Page = async () => {
  const req = await fetch("https://api.mykayak.fuffo.net/athletes?limit=40&offset=0")
  const athletes = await req.json();
  console.log(athletes);
  return (
    <div>
      <title>Atleti</title>
      <h1 className="text-center mt-8 mb-16 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">Atleti</h1>
      <div className="lg:grid grid-cols-4 gap-2">
        {athletes.map((athlete:AthletePreview)=><AthleteTile key={athlete.athlete_id} athlete={athlete}/>)}
      </div>
    </div>
  )
}

export default Page
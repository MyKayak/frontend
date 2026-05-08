import { Meet } from '@/models/meet';
import Link from 'next/link';

const Page = async () => {
  const req = await fetch("https://api.mykayak.fuffo.net/meets", { cache: 'no-store' });
  const meets: Meet[] = await req.json();

  return (
    <div className="flex flex-col items-center">
      <title>Gare</title>
      <h1 className="text-center mt-8 mb-16 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">Gare</h1>
      <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
        {meets.map((meet) => (
          <Link key={meet.id} href={`/races/${meet.id}`} className="w-full">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all flex justify-between items-center group">
              <div>
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{meet.name}</h3>
                <p className="text-white/50">{meet.location}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-mono">{meet.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;

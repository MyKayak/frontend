import { cookies } from 'next/headers';
import { Meet } from '@/models/meet';
import Link from 'next/link';
import PageHeader from '@/components/ui/page_header';
import ChampionshipToggle from '@/components/admin/championship_toggle';
import { Metadata } from 'next';
import FadeIn from '@/components/ui/fade_in';

export const metadata: Metadata = {
  title: "Gare - MyKayak",
};

const Page = async () => {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.has('token');

  const req = await fetch("https://api.mykayak.fuffo.net/meets", { cache: 'no-store' });
  const meets: Meet[] = await req.json();

  return (
    <div className="flex flex-col items-center w-full pt-32 pb-20">
      <PageHeader title="Gare" />
      <div className="flex flex-col gap-4 w-full max-w-4xl px-4">
        {meets.map((meet, index) => (
          <FadeIn key={meet.id} className="relative w-full" index={index}>
            <Link href={`/races/${meet.id}`} className="w-full block">
              <div className={`p-6 rounded-xl bg-white/5 border transition-all flex justify-between items-center group
                ${meet.is_championship
                  ? 'border-amber-500/40 hover:border-amber-400/70 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                  : 'border-white/10 hover:border-white/30'
                }`}>
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">{meet.name}</h3>
                  <p className="text-white/50">{meet.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  {isAdmin && (
                    <ChampionshipToggle meetId={meet.id} initialValue={meet.is_championship} />
                  )}
                  <p className="text-xl font-mono">{meet.date}</p>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default Page;

import { Medal, Trophy } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const categories = { M: "maschile", F: "femminile", X: "misto" };
const divisions = {
  ALA: "allievi A",
  ALB: "allievi B",
  CDA: "cadetti A",
  CDB: "cadetti B",
  RA1: "ragazzi primo anno",
  RAG: "ragazzi",
  JUN: "junior",
  U23: "under 23",
  SEN: "senior",
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:8080/team/${id}`);

  if (!res.ok) {
    return <div>Team not found</div>;
  }

  const teamData = await res.json();

  console.log(teamData);

  return (
    <div className="flex flex-col items-center">
      <title>{teamData.name}</title>
      <h2 className="text-center mt-8 mb-16 text-9xl font-black bg-linear-0 from-blue-700 to-blue-200 bg-clip-text text-transparent w-fit mx-auto">{teamData.name}</h2>
      <p className="text-white/50">{teamData.team_id}</p>
      {typeof teamData.titles != "undefined" ? (
        <div className="rounded-[25px] px-[25px] py-[20px] bg-white/10 w-fit mx-auto mt-24">
          <div className="flex flex-row justify-center content-center items-center">
            <Trophy className="my-auto" />
            <h2 className="text-3xl font-bold m-2 inline">Titoli</h2>
          </div>
          <div className=" flex flex-col gap-2 lg:grid grid-cols-3">
            {teamData.titles.map((title) =>
              <div
                key={title.date}
                className="py-2 px-4 bg-white/10 rounded-[10px]"
              >
                <p className="text-center">{`${title.boat} ${title.distance}m ${divisions[title.division] ?? "master" /* TODO: handle master correctly */} ${categories[title.category]}`}</p>
                <p className="text-center">{`${title.location} ${title.date.split("-")[0]}`}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-center py-8 text-2xl">Questa società non ha ancora vinto titoli, per adesso 😉</p>
      )}
    </div>
  );
};

export default Page;

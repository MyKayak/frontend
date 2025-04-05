import React from "react";
import {useSearchParams} from "next/navigation";

export interface Competitor{
    b: number;
    PlaLane: number;
    TeamDescrIta: string;
    PlaSurname: string;
    PlaName: string;
    PlaBirth: string;
    Players: any[];
}

interface ResultsTableProps {
    competitors: Competitor[][];
}
function hasQuery(performance: Competitor, queries: string[]) {
    if (queries.length === 0 || queries[0].length == 0) return true;

    for (let query of queries) {
        try {
            query = query.replaceAll("\"", "");
            for (const value of Object.values(performance)) {
                if (String(value).toLowerCase().includes(query.toLowerCase())) {
                    return true;
                }
            }

            if(query == performance.PlaSurname.toLowerCase() + " " + performance.PlaName.toLowerCase() || query == performance.PlaName.toLowerCase() + " " + performance.PlaSurname.toLowerCase()){
                return true;
            }

            try{
                if(query.split(" ")[0] == performance.PlaSurname.toLowerCase() || query.split(" ")[0] == performance.PlaName.toLowerCase()){
                    if(query.split(" ")[1] == performance.PlaSurname.toLowerCase() || query.split(" ")[1] == performance.PlaSurname.toLowerCase()){
                        return true;
                    }
                }
            }catch{}

            try{
                for (const player of performance.Players){
                    if(query == player.PlaSurname.toLowerCase() + " " + player.PlaName.toLowerCase() || query == player.PlaName.toLowerCase() + " " + player.PlaSurname.toLowerCase()){
                        return true;
                    }
                }
                if(performance.Players.some(player => (player.PlaSurname.toLowerCase() + " " + player.PlaName.toLowerCase()).includes(query) || (player.PlaName.toLowerCase() + " " + player.PlaSurname.toLowerCase()).includes(query))){
                    return true;
                }
            }catch{}
        }catch{}
    }
    return false;
}
/**
 * Rappresenta una tabella con dei competitori di una batteria
 * @param competitors un'array contente tutti i competitori della batteria da rappresentare
 * @constructor
 */
const StartlistTable: React.FC<ResultsTableProps> = ({ competitors }) => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    let key = 0;

    // Ensure competitors is an array
    if (!Array.isArray(competitors)) {
        return <p>ERRORE</p>;
    }

    return (
        <div className="mx-auto self-center w-full m-1 overflow-x-hidden">
            <div className="overflow-x-scroll">
                {competitors.map((heat, index) => (
                    <table key={`heat-${index}`} className="table table-zebra mx-auto">
                        <thead>
                        <tr>
                            <th className="px-2">Acqua</th>
                            <th className="px-2">Concorrente</th>
                            <th className="px-2">Società</th>
                        </tr>
                        </thead>
                        <tbody>
                        {heat.map((athlete) => (
                            <tr key={key++}>
                                <th className={"px-2" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>
                                    ({athlete.PlaLane})
                                </th>
                                <th className={"scroll px-2 flex flex-col"}>
                                    {
                                        athlete.PlaName.length > 0
                                            ? (
                                                <p className={"py-1" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>
                                                    {athlete.PlaSurname} {athlete.PlaName}<br/>
                                                    {athlete.PlaBirth}
                                                </p>
                                            )
                                            : athlete.Players.map((player) => (
                                                <p key={player.PlaName + player.PlaSurname} className={"py-1" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>
                                                    {player.PlaSurname} {player.PlaName} {player.PlaBirth}
                                                </p>
                                            ))
                                    }
                                </th>
                                <th className={"scroll px-2" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>{athlete.TeamDescrIta}</th>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
};

export default StartlistTable;
import React from "react";
import {useSearchParams} from "next/navigation";

export interface Competitor{
    b: number;
    PlaCls: number;
    PlaLane: number;
    TeamDescrIta: string;
    PlaSurname: string;
    PlaName: string;
    PlaBirth: string;
    MemPrest: string;
    MemQual: string;
    Gap: string;
    Players: any[];
}

interface ResultsTableProps {
    competitors: Competitor[][];
}

function hasQuery(performance: Competitor, queries: string[]) {
    if (queries.length === 0 || queries[0].length == 0) return false;

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
const ResultsTable: React.FC<ResultsTableProps> = ({ competitors }) => {
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
                    <table key={`heat-${index}`} className={"table table-zebra mx-auto"}>
                        <thead>
                            <tr>
                                <th className="px-2">Pos <br></br>(acqua)</th>
                                <th className="px-2">Concorrente</th>
                                <th className="px-2">Società</th>
                                <th className="px-2">Tempo <br></br>(distacco)</th>
                                {heat[0].MemQual != "" ? <th>Esito</th> : ""}
                            </tr>
                        </thead>
                        <tbody>
                            {heat.map((athlete) => (
                                <tr key={key++}>
                                    <th className="px-2">
                                        <div className=" flex items-center justify-center flex-col self-center">
                                            <span   className={"mx-auto text-center content-center items-center justify-center " + (athlete.MemQual == "" ? "  border-4 rounded-full aspect-square items-center justify-center w-16 " + (athlete.PlaCls == 1 ? "bg-amber-200 border-amber-400 text-amber-400" : (athlete.PlaCls == 2 ? "bg-neutral-200 border-neutral-400 text-gray-400" : (athlete.PlaCls == 3 ? "bg-yellow-800 border-yellow-950 text-yellow-950" : ""))) : "")}>{athlete.PlaCls}</span>
                                            <br></br>
                                            <span className="flex self-center mx-auto w-fit text-center">({athlete.PlaLane})</span>
                                        </div>
                                    </th>
                                    <th className={"scroll px-2 items-center h-full"}>
                                        {
                                            athlete.PlaName.length > 0
                                                ? (
                                                    <p className={"py-1 self-center my-auto" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>
                                                        {athlete.PlaSurname} {athlete.PlaName}<br/>
                                                        {athlete.PlaBirth}
                                                    </p>
                                                )
                                                : (
                                                    <div>
                                                        {
                                                            athlete.Players.map((player) => (
                                                                <p key={player.PlaName + player.PlaSurname} className={"py-1" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>
                                                                    {player.PlaSurname} {player.PlaName} {player.PlaBirth}
                                                                </p>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                        }
                                    </th>
                                    <th className={"px-2" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>{athlete.TeamDescrIta}</th>
                                    <th className={"px-2" + (hasQuery(athlete, query.split("+")) ? " text-info font-extrabold" : "")}>
                                        {athlete.MemPrest}
                                        <br></br>
                                        ({athlete.Gap.length > 1 ? "+" + athlete.Gap + "" : "-"})
                                    </th>
                                    {athlete.MemQual != "" ? <th className={``}>
                                        <span className={`flex items-center justify-center text text-center w-12 items-center justify-center rounded-full aspect-square text-base-100 ${athlete.MemQual.startsWith("F") || athlete.MemQual.startsWith("Q") ? "bg-success" : (athlete.MemQual == "X" ? "bg-error" : "bg-warning")}`}>
                                            <span className="my-auto">
                                                {athlete.MemQual}
                                            </span>
                                        </span>
                                    </th> : ""}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
};

export default ResultsTable;
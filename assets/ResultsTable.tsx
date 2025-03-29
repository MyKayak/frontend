import React from "react";

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

/**
 * Rappresenta una tabella con dei competitori di una batteria
 * @param competitors un'array contente tutti i competitori della batteria da rappresentare
 * @constructor
 */
const ResultsTable: React.FC<ResultsTableProps> = ({ competitors }) => {
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
                                        {athlete.PlaCls}
                                        <br></br>
                                        ({athlete.PlaLane})
                                    </th>
                                    <th className={"scroll px-2 flex flex-col"}>
                                        {
                                            athlete.PlaName.length > 0
                                                ? (
                                                    <p className="py-1">
                                                        {athlete.PlaSurname} {athlete.PlaName}<br/>
                                                        {athlete.PlaBirth}
                                                    </p>
                                                )
                                                : athlete.Players.map((player) => (
                                                    <p key={player.PlaName + player.PlaSurname} className="py-1">
                                                        {player.PlaSurname} {player.PlaName} {player.PlaBirth}
                                                    </p>
                                                ))
                                        }
                                    </th>
                                    <th className={"scroll px-2"}>{athlete.TeamDescrIta}</th>
                                    <th className="px-2">
                                        {athlete.MemPrest}
                                        <br></br>
                                        ({athlete.Gap.length > 1 ? "+" + athlete.Gap + "" : "-"})
                                    </th>
                                    {athlete.MemQual != "" ? <th className="px-2">{athlete.MemQual}</th> : ""}
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
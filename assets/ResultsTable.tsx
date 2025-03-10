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
    console.log('ResultsTable received:', competitors);
    
    // Ensure competitors is an array
    if (!Array.isArray(competitors)) {
        return <div>No data available</div>;
    }

    return (
        <div className="mx-auto w-10/12 overflow-x-scroll">
            <div className="overflow-x-scroll">
                {competitors.map((heat, index) => (
                    <table key={`heat-${index}`} className="table table-zebra mx-auto">
                        <thead>
                            <tr>
                                <th>Pos <br></br>(acqua)</th>
                                <th>Concorrente</th>
                                <th>Società</th>
                                <th>Tempo <br></br>(distacco)</th>
                                <th>Esito</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heat.map((athlete) => (
                                <tr key={key++}>
                                    <th>
                                        {athlete.PlaCls}
                                        <br></br>
                                        ({athlete.PlaLane})
                                    </th>
                                    <th className={"scroll"}>
                                        {athlete.PlaSurname} {athlete.PlaName}
                                        <br></br>
                                        {athlete.PlaBirth}
                                    </th>
                                    <th className={"scroll"}>{athlete.TeamDescrIta}</th>
                                    <th>
                                        {athlete.MemPrest}
                                        <br></br>
                                        ({athlete.Gap.length > 1 ? "+" + athlete.Gap + "" : "-"})
                                    </th>
                                    <th>{athlete.MemQual}</th>
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
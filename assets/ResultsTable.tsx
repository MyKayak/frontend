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
        <div style={{padding: "50px"}} className="mx-auto">
            <div className="overflow-x-auto">
                {competitors.map((heat, index) => (
                    <table key={`heat-${index}`} className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Acqua</th>
                                <th>Concorrente</th>
                                <th>Anno</th>
                                <th>Società</th>
                                <th>Tempo</th>
                                <th>Distacco</th>
                                <th>Esito</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heat.map((athlete) => (
                                <tr key={key++}>
                                    <th>{athlete.PlaCls}</th>
                                    <th>{athlete.PlaLane}</th>
                                    <th>{athlete.PlaSurname} {athlete.PlaName}</th>
                                    <th>{athlete.PlaBirth}</th>
                                    <th>{athlete.TeamDescrIta}</th>
                                    <th>{athlete.MemPrest}</th>
                                    <th>{athlete.Gap}</th>
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
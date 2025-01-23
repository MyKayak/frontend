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

/**
 * Rappresenta una tabella con dei competitori di una batteria
 * @param competitors un'array contente tutti i competitori della batteria da rappresentare
 * @constructor
 */
const ResultsTable = (competitors) => {
    let key = 0;
    return (
        <div style={{padding: "50px"}} className="mx-auto">
            <div className="overflow-x-auto">
                {
                    competitors.competitors.map((heat) => (
                        <table className="table table-zebra">
                            {/* head */}
                            <thead key={key++}>
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
                        )
                    )
                }

            </div>
        </div>
    )
};

export default ResultsTable;
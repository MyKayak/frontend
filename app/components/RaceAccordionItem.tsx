'use client';

import { useState } from 'react';

function processHeatsData(data: Competitor[]): Competitor[][] {
    const heats: Competitor[][] = [];

    for (const athlete of data) {
        if (heats[athlete.b - 1] === undefined) {
            heats[athlete.b - 1] = [];
        }
        heats[athlete.b - 1].push(athlete);
    }

    return heats;
}


export default function RaceAccordionItem({ race }: RaceAccordionItemProps) {
    const [results, setResults] = useState<Competitor[][] | null>(null);
    const [startlist, setStartlist] = useState<Competitor[][] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const fetchRaceData = async () => {
        setLoading(true);
        try {
            const racesResponse = await fetch(
                `/api/race-results?${new URLSearchParams(race.params)}`
            );
            const racesResponseData = await racesResponse.json();
            setResults(racesResponseData);

            const startlistResponse = await fetch(
                `https://apicanoavelocita.ficr.it/CAV/mpcache-10/get/startlist/${race.params.id}/KY/${race.params.c0}/${race.params.c1}/${race.params.c2}/${race.params.c3}`
            );
            console.log(`https://apicanoavelocita.ficr.it/CAV/mpcache-10/get/startlist/${race.params.id}/KY/${race.params.c0}/${race.params.c1}/${race.params.c2}/${race.params.c3}`)
            const startlistResponseData = processHeatsData((await startlistResponse.json()).data.data);
            setStartlist(startlistResponseData);

            console.log(startlistResponseData)
        } catch (error) {
            console.error('Error fetching race data:', error instanceof Error ? error.message : error);
        }
        setLoading(false);
    };

    return (
            <div className="w-full my-4 collapse collapse-arrow bg-base-200">
                <input
                    type="radio"
                    name="my-accordion-2"
                    onChange={(e) => {
                        if (e.target.checked && !startlist) {
                            void fetchRaceData();
                        }
                    }}
                />
                <div className="collapse-title text-xl font-medium">
                    {race.raceName}
                </div>
                <div className="collapse-content overflow-x-hidden">
                    {loading ? (
                        <div className="skeleton mx-auto self-center w-full m-1 overflow-x-hidden h-20"></div>
                    ) : startlist ? (
                        <div className="tabs tabs-border">
                            <input type="radio" name="my_tabs_2" className="tab" aria-label="Startlist" />
                            <div className="tab-content border-base-300 bg-base-100 p-4 rounded-2xl overflow-x-scroll"><StartlistTable competitors={startlist} /></div>

                            <input type="radio" name="my_tabs_2" className="tab" aria-label="Risultati" defaultChecked />
                            <div className="tab-content border-base-300 bg-base-100 p-4 rounded-2xl overflow-x-scroll"><ResultsTable competitors={results} /></div>
                        </div>
                    ) : null}
                </div>
            </div>
);
}

import ResultsTable from "@/assets/ResultsTable";

import { Competitor } from '@/app/race/[id]/page';
import StartlistTable from "@/assets/StartlistTable";

interface RaceAccordionItemProps {
    race: {
        raceName: string;
        params: {
            id: string;
            c0: string;
            c1: string;
            c2: string;
            c3: string;
            query: string;
        };
        data: unknown;
    };
    index: number;
}

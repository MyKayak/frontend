'use client';

import { useState } from 'react';
import ResultsTable from "@/assets/ResultsTable";
import { Competitor } from '@/app/race/[id]/page';

interface RaceProps {
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
}

export default function RaceAccordion({ race }: RaceProps) {
    const [data, setData] = useState<Competitor[][] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchRaceData = async () => {
        setLoading(true);
        try {
            console.log("test")
            const response = await fetch(
                `/api/race-results?${new URLSearchParams(race.params)}`
            );
            const responseData = await response.json() as Competitor[][];
            setData(responseData);
        } catch (error) {
            console.error('Error fetching race data:', error instanceof Error ? error.message : error);
        }
        setLoading(false);
    };

    return (
        <div className="collapse collapse-arrow bg-base-200 w-full">
            <input 
                type="radio" 
                name="my-accordion-2"
                onChange={(e) => {
                    if (e.target.checked && !data) {
                        void fetchRaceData();
                    }
                }}
            />
            <div className="collapse-title text-xl font-medium">
                {race.raceName}
            </div>
            <div className="collapse-content">
                {loading ? (
                    <div>Loading...</div>
                ) : data ? (
                    <ResultsTable competitors={data} />
                ) : null}
            </div>
        </div>
    );
} 
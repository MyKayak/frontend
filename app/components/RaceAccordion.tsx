'use client';

import { useState } from 'react';
import ResultsTable from "@/assets/ResultsTable";

export default function RaceAccordion({ race }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchRaceData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `/api/race-results?` + new URLSearchParams(race.params)
            );
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching race data:', error);
        }
        setLoading(false);
    };

    return (
        <div className="collapse collapse-arrow bg-base-200">
            <input 
                type="radio" 
                name="my-accordion-2"
                onChange={(e) => {
                    if (e.target.checked && !data) {
                        fetchRaceData();
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
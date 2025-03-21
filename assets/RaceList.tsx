"use client";

import RaceAccordionItem from "../app/components/RaceAccordionItem";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface Competitor {
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

interface Race {
    raceName: string;
    params: {
        id: string;
        c0: string;
        c1: string;
        c2: string;
        c3: string;
        query: string;
    };
    data: null;
}

interface RaceListProps {
    races: Race[];
}

async function filterRaces(races: Race[], query: string) {
    if (query.length == 0) return races; // siccome per cercare qualcosa scarica tutte le gare e ci mette un po' di tempo, se non c'e` nulla da cercare skippa sta parte

    const filteredRaces: Race[] = [];
    for (const race of races) {
        const response = await fetch(`/api/race-results?${new URLSearchParams(race.params)}`);
        const heat = await response.json();
        if (hasQuery(heat, query)) {
            filteredRaces.push(race);
        }
    }
    return filteredRaces;
}

function hasQuery(heatsData: Competitor[][], query: string) {
    console.log(heatsData);
    if (query.length === 0) return true;
    for (const heat of heatsData) {
        for (const performance of heat) {
            for (const value of Object.values(performance)) {
                if (String(value).toLowerCase().includes(query.toLowerCase())) {
                    return true;
                }
            }
        }
    }
    return false;
}

export default function RaceList({ races }: RaceListProps) {
    const [data, setData] = useState<Race[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        const getRaces = async () => {
            setLoading(true);
            try {
                const filteredRaces = await filterRaces(races, query);
                setData(filteredRaces);
            } catch (error) {
                console.error('Error fetching race data:', error instanceof Error ? error.message : error);
            }
            setLoading(false);
        };

        console.log(getRaces()); // non serve a nulla stamparlo ma l'ide mi fa storie e pur di non dover sbattere la testa contro ESLint preferisco che sia cosi`
    }, [query, races]);

    return (
        <div className="w-11/12 mx-auto">
            {loading ? (
                <div>Loading...</div>
            ) : data ? (
                data.map((race: Race, index: number) => (
                    <RaceAccordionItem key={race.raceName} race={race} index={index} />
                ))
            ) : null}
        </div>
    );
}
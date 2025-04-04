"use client";

import RaceAccordionItem from "../app/components/RaceAccordionItem";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
    Players: any[]
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

async function filterRaces(races: Race[], queries: string[], onProgress: (progress: number) => void) {
    if (queries.length === 0 || queries[0].length == 0) return races;

    const filteredRaces: Race[] = [];
    const totalRaces = races.length;

    for (const [index, race] of races.entries()) {
        try{
            const response = await fetch(`https://apicanoavelocita.ficr.it/CAV/mpcache-10/get/startlist/${race.params.id}/KY/${race.params.c0}/${race.params.c1}/${race.params.c2}/${race.params.c3}`);
            const heat = processHeatsData((await response.json()).data.data);

            const progress = Math.round(((index + 1) / totalRaces) * 100);
            onProgress(progress);

            // Check race name
            if (queries.some(query => race.raceName.toLowerCase().includes(query))) {
                filteredRaces.push(race);
                continue;
            }

            // Check heat data
            if (hasQuery(heat, queries)) {
                filteredRaces.push(race);
            }
        } catch {
            // Così dovrebbe andare in entrambi i casi
            const progress = Math.round(((index + 1) / totalRaces) * 100);
            onProgress(progress);
        }
    }

    // Ensure progress reaches 100% at the end
    onProgress(100);
    return filteredRaces;
}

function hasQuery(heatsData: Competitor[][], queries: string[]) {
    if (queries.length === 0 || queries[0].length == 0) return true;

    for (let query of queries) {
        try {
            for (const heat of heatsData) {
                for (const performance of heat) {
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
                }
            }
        }catch{}
    }
    return false;
}

export default function RaceList({ races }: RaceListProps) {
    const placeholders = [];
    placeholders.push({raceName: "Eliminatorie K1 1000m Maschile"})
    placeholders.push({raceName: "Eliminatorie K1 1000m Femminile"})
    placeholders.push({raceName: "Eliminatorie K2 1000m Maschile"})
    placeholders.push({raceName: "Eliminatorie K2 1000m Femminile"})
    placeholders.push({raceName: "Eliminatorie K4 1000m Maschile"})
    placeholders.push({raceName: "Eliminatorie K4 1000m Femminile"})
    placeholders.push({raceName: "Eliminatorie K1 500m Maschile"})
    placeholders.push({raceName: "Eliminatorie K1 500m Femminile"})
    placeholders.push({raceName: "Eliminatorie K2 500m Maschile"})
    placeholders.push({raceName: "Eliminatorie K2 500m Femminile"})
    placeholders.push({raceName: "Eliminatorie K4 500m Maschile"})
    placeholders.push({raceName: "Eliminatorie K4 500m Femminile"})

    const [progress, setProgress] = useState<number>(0);
    const [data, setData] = useState<Race[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        const getRaces = async () => {
            setLoading(true);
            setProgress(0); // Reset progress at start

            try {
                const filteredRaces = await filterRaces(races, query.split("+"), setProgress);
                setData(filteredRaces);
            } catch (error) {
                console.error('Error fetching race data:', error instanceof Error ? error.message : error);
                setProgress(0); // Reset progress on error
            }

            setLoading(false);
        };

        getRaces();
    }, [query, races]);

    return (
        <div className="w-11/12 mx-auto mt-32">
            {loading ? (
                <div>
                    <div>
                        {placeholders.map((race: Race, index: number) => (
                            <RaceAccordionItem key={race.raceName} race={race} index={index} />
                        ))}
                    </div>
                    <div className="w-full h-screen flex items-center justify-items-center content-center justify-content-center flex-col absolute top-0 left-0 backdrop-blur-sm shadow-2xl">
                        <div
                            className="radial-progress text-primary transition-all m-auto animate-spin"
                            style={{ "--value": progress } as React.CSSProperties}
                            aria-valuenow={progress + "%"}
                            role="progressbar">
                            <p className="animate-spin-reverse">{progress}%</p>
                        </div>
                        {/*
                        <p className="mx-auto">Potrebbe volerci un pochino</p>
                        <p className="mx-auto mb-auto">soprattutto se c&#39;è una <Link href="/search" className="link">ricerca</Link></p>*/}
                    </div>
                </div>
            ) : data ? (
                data.map((race: Race, index: number) => (
                    <RaceAccordionItem key={race.raceName} race={race} index={index} />
                ))
            ) : null}
        </div>
    );
}
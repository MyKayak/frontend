"use client"
import React from "react";
import {useSearchParams} from "next/navigation";

function parseQuery(query:string):string[]{
    let queries:string[] = [];
    for (let i = 0; i < query.split("\"").length; i++){
        if(i % 2 == 0){
            queries = queries.concat(query.split("\"")[i].split(" "));
        } else {
            queries.push(query.split("\"")[i])
        }
    }

    for (let i = 0; i < queries.length; i++){
        if(queries[i].length == 0){
            queries.splice(i, 1);
        }
    }

    return queries;
}

function ResultsTable(){
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    return (
        <div>
            <div className="flex flex-row self-center justify-self-center mx-auto gap-4 items-center justify-items-center content-center">
                <label className="input flex items-center gap-4">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" className="grow" placeholder="Search" />
                </label>
                <button className="btn" onClick={() => (window.location.href = window.location.href.split("?")[0] + "?query=" + document.getElementsByTagName("input")[0].value.replace(" ", "+").toLowerCase())}>
                    Cerca
                </button>
            </div>
            <div className="flex flex-row gap-2 mt-4 items-center">
                <div className="h-full rounded-md font-bold">Filtri :</div>
                {parseQuery(query).map(query  => (
                    <button key={query} className="btn disabled">{query}</button>
                ))}
            </div>
        </div>

        );
}

export default ResultsTable;
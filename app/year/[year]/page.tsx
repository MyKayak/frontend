import React from 'react'
import YearSelector from "@/assets/YearSelector";

interface Race{
    CodicePub:string,
    Description:string,
    Place:string,
    Data:string
}

async function getData(year:number):Promise<Race[]>{
    const response = await fetch(`https://apimanvarie.ficr.it/VAR/mpcache-30/get/schedule/${year}/*/19`);
    const data = await response.json();
    return data.data;
}


export default async function Page({params}: {params: Promise<{year: string}>}){
    const year = (await params).year;
    const data = await getData(Number(year));
    return (
        <div className="flex items-center flex-col">
            <YearSelector defaultYear={Number(year)}></YearSelector>
            <br></br>
            {data.map(race => (
                <a href={"/race/" + race.CodicePub} key={race.CodicePub} className="w-10/12  justify-self-center self-center items-center flex flex-col">
                    <button className="m-4 btn btn-soft btn w-full p-4 h-fit">
                        <div className="flex w-full flex-row justify-between items-center gap-4">
                            <p>{race.Description}</p>
                            <p>{race.Place}<br></br>{race.Data}</p>
                        </div>
                    </button>
                </a>
            ))}
        </div>
    );
}

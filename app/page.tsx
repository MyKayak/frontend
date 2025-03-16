import Image from "next/image";
import {useState} from "react";
import YearSelector from "@/assets/YearSelector";

interface Race{
  CodicePub:string,
  Description:string,
  Place:string,
  Data:string
}

async function getData(year:number):Race[]{
  const response = await fetch(`https://apimanvarie.ficr.it/VAR/mpcache-30/get/schedule/${year}/*/19`);
  const data = await response.json();
  return data.data;
}


export default async function Home() {
  const data = await getData(2024);
  return (
    <div>
      <YearSelector defaultYear={new Date().getFullYear()}></YearSelector>
      {data.map(race => (
        <a key={race.CodicePub} href={"/race/" + race.CodicePub} className="block m-10">{race.Description}</a>
      ))}
    </div>
  );
}

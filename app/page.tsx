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
    <div className="flex items-center flex-col">
      <YearSelector defaultYear={new Date().getFullYear()}></YearSelector>
      <br></br>
      {data.map(race => (
          <a href={"/race/" + race.CodicePub} key={race.CodicePub} className="w-10/12  justify-self-center self-center items-center flex flex-col"><button className="m-10 btn btn-soft btn-primary">{race.Description}</button></a>

      ))}
    </div>
  );
}

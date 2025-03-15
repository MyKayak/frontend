import Image from "next/image";
import {useState} from "react";

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

async function getYears(){
  const response = await fetch(`https://apimanvarie.ficr.it/VAR/mpcache-60/get/comboanni`);
  const data = await response.json();
  return data.data;
}

export default async function Home() {
  const data = await getData(2024);
  const years = await getYears();
  return (
    <div>
      <select defaultValue={new Date().getFullYear()} className="select">
        <option disabled={true}>Scegli l'anno</option>
        {years.map(year => (
            <option key={year.ma_Anno}>{year.ma_Anno}</option>
        ))}
      </select>
      {data.map(race => (
        <a href={"/race/" + race.CodicePub} className="block m-10">{race.Description}</a>
      ))}
    </div>
  );
}

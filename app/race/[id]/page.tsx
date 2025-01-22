import ResultsTable from "@/assets/ResultsTable";
import * as diagnostics_channel from "node:diagnostics_channel";
import resultsTable from "@/assets/ResultsTable";

async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

export interface Competitor{
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


export default async function Page({ params }) {
    const id = (await params).id;

    try {
        const url_data = await fetchData(baseURL + id);
        console.log(url_data);
        console.log('https://apicanoavelocita.ficr.it/CAV/mpcache-10/get/result/' + id + '/KY/' + url_data.data[0].e[0].c0 + "/" + url_data.data[0].e[0].c1 + "/" + url_data.data[0].e[0].c2.substring(1) + "/" + url_data.data[0].e[0].c3); // Adesso funziona meglio, preso l'ID della gara da automaticamente la prima.
        const data = await fetchData('https://apicanoavelocita.ficr.it/CAV/mpcache-10/get/result/' + id + '/KY/' + url_data.data[0].e[0].c0 + "/" + url_data.data[0].e[0].c1 + "/" + url_data.data[0].e[0].c2.substring(1) + "/" + url_data.data[0].e[0].c3); // prima parte fissa, poi result o startlist, poi ... , poi KY (fisso per kayak), c0, c1, c2 (troncato) e c3.
        const heats = processHeatsData(data.data.data); // Assuming a separate function to process heats data

        return (
            <div>
                {heats.map((heat) => (
                    <ResultsTable key={heat[0].b} competitors={heat} /> // Assuming ResultsTable handles key prop
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors by displaying an error message or using a loading state
        return <div>Error fetching data</div>; // Example error handling
    }
}

/**
 * Prende i dati della ficr e lo trasforma in un formato utilizzablile
 * @param data l'oggetto restituito
 */
function processHeatsData(data) {
    let heats: Competitor[][] = [];

    for (let athlete of data){
        if (heats[athlete.b] === undefined){
            heats[athlete.b] = [];
        }
        heats[athlete.b].push(athlete);
    }

    return heats;
}
//https://apicanoavelocita.ficr.it/CAV/mpcache-20/get/startlist/CanoaPADOVA27102024_79/KY/SEM/0404/05/001
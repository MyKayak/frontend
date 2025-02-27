import ResultsTable from "@/assets/ResultsTable";
import RaceAccordionItem from "../../components/RaceAccordionItem";

const baseURL = "https://apicanoavelocita.ficr.it/CAV/mpcache-30/get/programdate/"

/**
 * chiama l'api e restituisce la risposta
 * @param url l'url dell'API da chiamare per ottenere i dati di una specifica batteria.
 */
async function fetchData(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
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
        let races = [];

        // Prepare race metadata without fetching results
        for (let foo of url_data.data) {
            for (let bar of foo.e) {
                races.push({
                    raceName: bar.d1_it + " " + bar.d3_it + " " + bar.d_it,
                    params: {
                        id,
                        c0: bar.c0,
                        c1: bar.c1,
                        c2: bar.c2.substring(1),
                        c3: bar.c3
                    },
                    data: null
                });
            }
        }

        return (
            <div>
                {races.map((race, index) => (
                    <RaceAccordionItem key={index} race={race} index={index} />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }
}

/**
 * Prende i dati della ficr e lo trasforma in un formato utilizzablile
 * @param data l'oggetto restituito
 */
function processHeatsData(data) {
    let heats: Competitor[][] = [];

    for (let athlete of data){
        if (heats[athlete.b - 1] === undefined){
            heats[athlete.b - 1] = [];
        }
        heats[athlete.b - 1].push(athlete);
    }

    return heats;
}
//https://apicanoavelocita.ficr.it/CAV/mpcache-20/get/startlist/CanoaPADOVA27102024_79/KY/SEM/0404/05/001
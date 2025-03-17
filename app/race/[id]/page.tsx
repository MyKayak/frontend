import RaceFilter from "@/assets/RaceFilter";
import RaceList from "@/assets/RaceList";

const baseURL = "https://apicanoavelocita.ficr.it/CAV/mpcache-30/get/programdate/";

interface ApiResponse {
    data: {
        e: {
            d1_it: string;
            d3_it: string;
            d_it: string;
            c0: string;
            c1: string;
            c2: string;
            c3: string;
        }[];
    }[];
}

async function fetchData(url: string): Promise<ApiResponse> {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;
    }
}

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


export default async function Page({ params }: {params: { id: string }; }) {
    const id = params.id;
    const races: Race[] = [];
    try {
        const url_data = await fetchData(baseURL + id);

        for (const foo of url_data.data) {
            for (const bar of foo.e) {
                races.push({
                    raceName: `${bar.d1_it} ${bar.d3_it} ${bar.d_it}`,
                    params: {
                        id,
                        c0: bar.c0,
                        c1: bar.c1,
                        c2: bar.c2.substring(1),
                        c3: bar.c3,
                        query: ""
                    },
                    data: null
                });
            }
        }

        return (
            <div className="w-11/12 mx-auto">
                <RaceFilter></RaceFilter>
                <RaceList races={races}></RaceList>
            </div>
        );
    } catch (error) {
        console.error('Error fetching data:', error);
        return <div>Error fetching data</div>;
    }
}

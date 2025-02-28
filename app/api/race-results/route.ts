import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

interface Competitor {
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

interface ApiResponse {
    data: {
        data: Competitor[];
    };
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

export async function GET(request: NextRequest): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const c0 = searchParams.get('c0');
    const c1 = searchParams.get('c1');
    const c2 = searchParams.get('c2');
    const c3 = searchParams.get('c3');

    const url = `https://apicanoavelocita.ficr.it/CAV/mpcache-10/get/result/${id}/KY/${c0}/${c1}/${c2}/${c3}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json() as ApiResponse;
        return NextResponse.json(processHeatsData(data.data.data));
    } catch (error) {
        console.error('API Error:', error instanceof Error ? error.message : error);
        return NextResponse.json({ error: 'Failed to fetch race data' }, { status: 500 });
    }
} 
import { NextResponse } from 'next/server';

function processHeatsData(data) {
    const heats = [];
    
    for (const athlete of data) {
        if (heats[athlete.b - 1] === undefined) {
            heats[athlete.b - 1] = [];
        }
        heats[athlete.b - 1].push(athlete);
    }
    
    return heats;
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const c0 = searchParams.get('c0');
    const c1 = searchParams.get('c1');
    const c2 = searchParams.get('c2');
    const c3 = searchParams.get('c3');

    const url = `https://apicanoavelocita.ficr.it/CAV/mpcache-10/get/result/${id}/KY/${c0}/${c1}/${c2}/${c3}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(processHeatsData(data.data.data));
    } catch (_error) {
        return NextResponse.json({ error: 'Failed to fetch race data' }, { status: 500 });
    }
} 
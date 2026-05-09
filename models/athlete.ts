export interface AthletePreview {
    athlete_id:string,
    name:string,
    surname:string,
    birth_date:string
}

export interface AthleteRanking {
    athlete_id: number;
    name: string;
    surname: string;
    birth_date: string;
    distance: number;
    boat: string;
    category: string;
    division: string;
    best_time: number;
    avg_best_3: number;
}

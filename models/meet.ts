export interface Meet {
    id: string;
    name: string;
    location: string;
    date: string;
}

export interface Race {
    id: number;
    code: string;
    distance: number;
    division: string;
    category: string;
    boat: string;
    level: string;
}

export interface Heat {
    id: number;
    index: number;
    start_time: string;
    is_result: boolean;
    performances: Performance[];
}

export interface Performance {
    id: number;
    team_id: string;
    team_name: string;
    lane: number;
    placement: number | null;
    time_ms: number | null;
    status: string | null;
    points: number;
    athletes: {
        id: number;
        name: string;
        surname: string;
    }[];
}

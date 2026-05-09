export interface TeamPreview {
  team_id: string;
  name: string;
  logo: string | null;
}

export interface TeamTitle {
  time: number;
  date: string;
  distance: number;
  category: string;
  division: string;
  boat: string;
  location: string;
}

export interface Team extends TeamPreview {
  titles: TeamTitle[];
}

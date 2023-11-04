export interface CreateAOIBody {
  catalogId: string;
  id: string;
  name: string;
  description: string;
  coordinates: {
    latNE: number;
    lonNE: number;
    latSW: number;
    lonSW: number;
  };
}

export type Order = 'asc' | 'desc';

export interface Catalog {
  id: string;
  date: string;
  name: string;
  description: string;
  numberOfAOI: number;
}

export type Theme = 'light' | 'dark';

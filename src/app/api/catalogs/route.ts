import { NextResponse } from 'next/server';
import { Catalog } from '@/app/utils/types';

function createData(id: string, date: string, name: string, description: string, numberOfAOI: number): Catalog {
  return { id, date, name, description, numberOfAOI };
}

const rows = [
  createData('1', '1 Jan, 2019', 'UK', 'Places in UK', 20),
  createData('2', '12 Feb, 1999', 'PL', 'Places in Poland', 1),
  createData('3', '5 Mar, 2021', 'US', 'Places in United States', 2),
  createData('4', '20 Mar, 1997', 'DE', 'Places in Germany', 3),
  createData('5', '8 Aug, 2005', 'FR', 'Places in France', 15),
  createData('6', '30 Sep, 2010', 'IT', 'Places in Italy', 8),
  createData('7', '17 Jul, 2002', 'ES', 'Places in Spain', 12),
  createData('8', '19 Nov, 2015', 'CA', 'Places in Canada', 7),
  createData('9', '3 Apr, 1988', 'AU', 'Places in Australia', 9),
  createData('10', '14 Jun, 2008', 'JP', 'Places in Japan', 10),
  createData('11', '25 Dec, 2020', 'IN', 'Places in India', 18),
  createData('12', '9 May, 1975', 'BR', 'Places in Brazil', 6),
  createData('13', '7 Oct, 1982', 'MX', 'Places in Mexico', 4),
];

export async function GET(request: Request) {
  return NextResponse.json(rows);
}

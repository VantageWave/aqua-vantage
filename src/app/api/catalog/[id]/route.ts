import type { NextApiRequest, NextApiResponse } from 'next';
// import { DefaultAzureCredential } from "@azure/identity";
// import { CosmosClient } from "@azure/cosmos";
import { NextResponse } from 'next/server';

const endpoint = process.env.COSMOS_ENDPOINT;
const databaseName = `water-catalogs`;

// Authenticate to Azure Cosmos DB
// const cosmosClient = new CosmosClient({
//   endpoint,
//   aadCredentials: new DefaultAzureCredential(),
// });

// type AOIData = {
//   id: string;
//   name: string;
//   description: string;
//   coordinates: {
//     latNW: number;
//     lonNW: number;
//     latSE: number;
//     lonSE: number;
//   };
// };

// export async function POST(req: NextApiRequest) {
//   const { id, name, description, coordinates, catalogId } = await req.json();
//   const geojson = {
//     id: id.toString(),
//     name: name,
//     description: description,
//     coordinates: {
//       type: "Polygon",
//       coordinates: [
//         [coordinates.lonNE, coordinates.latNE],
//         [coordinates.lonSW, coordinates.latNW],
//         [coordinates.lonSW, coordinates.latSW],
//         [coordinates.lonNE, coordinates.latSW],
//         [coordinates.lonNE, coordinates.latNE],
//       ],
//     },
//     type: "Feature",
//   };
//   const container = cosmosClient.database(databaseName).container(catalogId);
//   const { resource } = await container.items.create(geojson);
//   console.log(`'${resource?.name}' inserted`);
// }

function createData(id: string, name: string, description: string, long: string, lat: string) {
  return { id, name, description, long, lat };
}

const catalogData = {
  '1': [createData('0', 'London', 'UK', '51.505', '-0.09'), createData('1', 'Manchester', 'UK', '53.4830', '-2.2440')],
  '2': [
    createData('0', 'Warsaw', 'Poland', '52.2297', '21.0122'),
    createData('1', 'Krakow', 'Poland', '50.0647', '19.9450'),
  ],
  '3': [
    createData('0', 'Węgrzce Wielkie', 'Poland', '40.7128', '-74.0060'),
    createData('1', 'Los Angeles', 'USA', '34.0522', '-118.2437'),
  ],
  '4': [
    createData('0', 'Cape Town', 'South Africa', '-33.9249', '18.4241'),
    createData('1', 'Johannesburg', 'South Africa', '-26.2041', '28.0473'),
  ],
  '5': [
    createData('0', 'Paris', 'France', '48.8566', '2.3522'),
    createData('1', 'Marseille', 'France', '43.2965', '5.3698'),
  ],
  '6': [
    createData('0', 'Berlin', 'Germany', '52.5200', '13.4050'),
    createData('1', 'Munich', 'Germany', '48.1351', '11.5820'),
  ],
  '7': [createData('0', 'Rome', 'Italy', '41.9028', '12.4964'), createData('1', 'Milan', 'Italy', '45.4642', '9.1900')],
  '8': [
    createData('0', 'Madrid', 'Spain', '40.4168', '-3.7038'),
    createData('1', 'Barcelona', 'Spain', '41.3851', '2.1734'),
  ],
  '9': [
    createData('0', 'Sydney', 'Australia', '-33.8688', '151.2093'),
    createData('1', 'Melbourne', 'Australia', '-37.8136', '144.9631'),
  ],
  '10': [
    createData('0', 'Tokyo', 'Japan', '35.682839', '139.759455'),
    createData('1', 'Osaka', 'Japan', '34.6937', '135.5023'),
  ],
  '11': [
    createData('0', 'Mumbai', 'India', '19.0760', '72.8777'),
    createData('1', 'New Delhi', 'India', '28.6139', '77.2090'),
  ],
  '12': [
    createData('0', 'Sao Paulo', 'Brazil', '-23.5505', '-46.6333'),
    createData('1', 'Rio de Janeiro', 'Brazil', '-22.9068', '-43.1729'),
  ],
  '13': [
    createData('0', 'Mexico City', 'Mexico', '19.4326', '-99.1332'),
    createData('1', 'Guadalajara', 'Mexico', '20.6597', '-103.3496'),
  ],
};

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: keyof typeof catalogData };
  }
) {
  return NextResponse.json({ data: catalogData[params.id] });
}

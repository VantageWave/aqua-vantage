// Calls the Next.js API route /api/catalog to create new AOI in the database
// The code below is a snippet from the src/app/api/catalog/route.ts file. The POST function is called when the user clicks the Save button on the AOI form. The function calls the Next.js API route /api/catalog to create new AOI in the database. The callPostCatalog function is called from the src/app/components/aoi/AOIForm.tsx file.

import Area from '@/data/Area';
import { CreateAOIBody } from '@/app/utils/types';

function callPostCatalog(requestBody: CreateAOIBody) {
  const apiUrl = '/api/catalog';

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
}

export async function createNewAOIInCatalog(aois: Area[], catalogId: string) {
  const newAOIRequests = aois.map((aoi) => {
    const requestBody = {
      catalogId: catalogId,
      id: aoi.id,
      name: aoi.name,
      description: aoi.description,
      coordinates: {
        latNE: aoi.northeast.lat,
        lonNE: aoi.northeast.lng,
        latSW: aoi.southwest.lat,
        lonSW: aoi.southwest.lng,
      },
    };
    return requestBody;
  });

  try {
    const responses = await Promise.all(newAOIRequests.map((requestBody: any) => callPostCatalog(requestBody)));
    // Check if any of the responses failed
    const failedResponse = responses.find((response) => !response.ok);
    if (failedResponse) {
      throw new Error(`API request failed with status ${failedResponse.status}`);
    }
    console.log('API call was successful! New AOIs were created in the catalog.');
  } catch (error) {
    console.error('Error calling the Next.js API route:', error);
  }
}

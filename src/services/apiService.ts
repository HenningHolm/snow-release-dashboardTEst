import axios from 'axios';
import { Version, VersionProcessDocument, VersionProcessStatus } from '../types/commonTypes';

const API_BASE_URL = 'http://localhost:7071/api';

export const getVersions = async () => {
  const response = await axios.get(`${API_BASE_URL}/listContainers`);
  console.log("response.data", response.data);

  // Hent status for hver container
  const versions: Version[] = await Promise.all(
    response.data.containers.map(async (container: any): Promise<Version> => {
      let releaseProcessData: VersionProcessDocument | null = null;
      // Hent releaseProcess.json for hver container
      let status = 'Ukjent'; // Standardstatus hvis ikke funnet
      try {
        const releaseProcessResponse = await axios.get(
          `${API_BASE_URL}/getBlobContent`,
          {
            params: {
              containerName: container.containerName,
              blobName: 'releaseProcess.json',
            },
          }
        );
        releaseProcessData = releaseProcessResponse.data;
        if (releaseProcessData) {
          status = releaseProcessData.status;
        }
      } catch (error) {
        console.error(`Feil ved henting av releaseProcess.json for ${container.containerName}:`, error);
      }

      return {
        id: container.containerName,
        blobs: container.blobs,
        state: status as VersionProcessStatus,
        processData: releaseProcessData
        
      };
    })
  );

  return versions;
};


export const createNewVersion = async (versionName: number): Promise<{ containerName: number | undefined }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/createReleaseContainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ containerName: versionName }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Feil ved opprettelse av release:", errorData.error);
      throw new Error(`Feil ved opprettelse av release: ${errorData.error}`);
    }
  
    console.log("response api service", response);  
    const data = await response.json();
    console.log("data api service", data);
    return {
      containerName: data.containerName
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return { containerName: undefined };
  }
};

// export const getProcessData = async (containerName: number) : Promise<VersionProcessDocument> => {
//   const response = await axios.get(`${API_BASE_URL}/getContainerData/${containerName}&blobName=releaseProcess.json`);
//   return response.data;
// }

export const getBlobContent = async (containerName : number, blobName : string) => {
  const response = await fetch(`${API_BASE_URL}/getBlobContent?containerName=${containerName}&blobName=${blobName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Feil ved henting av JSON-fil: ${response.statusText}`);
  }
  console.log("response", response);

  return await response.json();
};





// export const getReleaseData = async (releaseId: string) => {
//   const response = await axios.get(`${API_BASE_URL}/getContainerData/${releaseId}`);
//   return response.data;
// };
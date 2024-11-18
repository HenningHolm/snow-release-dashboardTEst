import axios from 'axios';

const API_BASE_URL = 'http://localhost:7071/api';

export const getReleases = async () => {
  const response = await axios.get(`${API_BASE_URL}/listContainers`);
  console.log("response.data", response.data);
  return response.data.containers.map((container: any) => ({
    versionName: container.containerName,
    id: container.containerName,
    blobs: container.blobs,
  }));
};

export const createRelease = async (versionName: string) : Promise<{containerName: string | undefined }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/createContainer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ containerName: versionName }),
    });
  
    if (!response.ok) {
      console.error("Feil ved opprettelse av release:", response.statusText);
      throw new Error(`Feil ved opprettelse av release: ${response.statusText}`);
    }
  
    console.log("response api service", response);  
    const data = await response.json();
    console.log("data api service", data);
    return {
      containerName: data.containerName
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {containerName: undefined};
  }
}


export const getBlobContent = async (containerName : string, blobName : string) => {
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
import axios from 'axios';

const API_BASE_URL = 'http://localhost:7071/api';

export const getReleases = async () => {
  const response = await axios.get(`${API_BASE_URL}/listContainers`);
  // Tilpass responsen basert på API-et ditt
  return response.data.containers.map((container: any) => ({
    id: container.containerName,
    versionName: container.containerName,
    // Legg til andre nødvendige felt
  }));
};

export const createRelease = async (versionName: string) => {
  const response = await axios.post(`${API_BASE_URL}/createContainer`, { versionName });
  // Tilpass responsen basert på API-et ditt
  return {
    id: response.data.containerName,
    versionName: response.data.containerName,
    // Legg til andre nødvendige felt
  };
};

// Legg til flere funksjoner etter behov (f.eks. getRelease, triggerActions, etc.)

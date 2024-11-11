import axios from 'axios';

const API_BASE_URL = 'http://localhost:7071/api';

export const getReleases = async () => {
  const response = await axios.get(`${API_BASE_URL}/listContainers`);
  return response.data.containers.map((container: any) => ({
    id: container.containerName,
    versionName: container.containerName,
  }));
};

export const createRelease = async (versionName: string) => {
  const response = await axios.post(`${API_BASE_URL}/createContainer`, { versionName });
  return {
    id: response.data.containerName,
    versionName: response.data.containerName,
  };
};

export const getReleaseData = async (releaseId: string) => {
  const response = await axios.get(`${API_BASE_URL}/getContainerData/${releaseId}`);
  return response.data;
};
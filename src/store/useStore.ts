import { useEffect, useState } from 'react';
import { createNewVersion, getVersions, uploadNorskEkstensjon as uploadNorskEkstensjon } from '../services/apiService';
import { Version, StoreActions, StoreState, NorskEkstensjon } from '../types/commonTypes';


export const useStore = (): [StoreState, StoreActions] => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<Version | undefined>(undefined);
  
  const loadVersions = async () => {
    const data = await getVersions();
    const sortedData = data.sort((a: Version, b: Version) => b.id - a.id);
    setVersions(sortedData);
    if (sortedData.length > 0 && !selectedVersion) {
       setSelectedVersion(sortedData[0]);
    }
    return sortedData;
  };

  const selectVersion = (versionId: number) => {
    const selectVersion = versions.find((version) => version.id === versionId);
    if (selectVersion) {
      setSelectedVersion(selectVersion);
    }
  };

  const createRelease = async (versionName: number) => {
    try {
      const response = await createNewVersion(versionName);
      if (response.containerName) {
        const versionsArray = await loadVersions();
        setSelectedVersion(versionsArray.find((version) => Number(version.id) === Number(response.containerName)));
      } else {
        console.error('Feil ved opprettelse av release');
      }
    } catch (error) {
      console.error('Feil ved opprettelse av release:', error);
    }
  };

  const addNorskEkstensjon = async (file : File) => {

    const formData = new FormData();
    formData.append('file', file);
    if (!selectedVersion) {
      console.error('Ingen versjon valgt');
      return;
    }
    const response = await uploadNorskEkstensjon(formData, selectedVersion?.id.toString());
    const norskEkstensjon : NorskEkstensjon = {
      id: response.id, // generer en unik id for hver ekstensjon, litt usikker hva er best her.
      fileName: response.fileName,
      logfile: "",
      selected: true
    } 
    selectedVersion?.processData?.norskEkstensjon.push(norskEkstensjon);
  };

  useEffect(() => {
    loadVersions();
  }, []);


  // Legg til andre handlinger, for eksempel oppdatere status, laste opp filer, osv.

  const state: StoreState = {
    versions,
    selectedVersion

  };

  const actions: StoreActions = {
    loadVersion: loadVersions,
    selectVersion: selectVersion,
    createVersion: createRelease,
    addNorskEkstensjon: addNorskEkstensjon
  };

  return [state, actions];
};
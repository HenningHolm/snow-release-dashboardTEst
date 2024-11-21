import { useEffect, useState } from 'react';
import { createNewVersion, getVersions, uploadNorskEkstensjon as uploadNorskEkstensjon } from '../services/apiService';
import { Version, StoreActions, StoreState, NorskEkstensjon } from '../types/commonTypes';


export const useStore = (): [StoreState, StoreActions] => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedVersionId, setSelectedVersionId] = useState<number | undefined>(undefined);
  
  const loadVersions = async () => {
    const data = await getVersions();
    const sortedData = data.sort((a: Version, b: Version) => b.id - a.id);
    setVersions(sortedData);
    if (sortedData.length > 0 && !selectedVersionId) {
       setSelectedVersionId(sortedData[0].id);
    }
    return sortedData;
  };

  const selectVersion = (versionId: number) => {
    const selectVersion = versions.find((version) => version.id === versionId);
    if (selectVersion) {
      setSelectedVersionId(versionId);
    }
  };

  const createRelease = async (versionName: number) => {
    try {
      const response = await createNewVersion(versionName);
      if (response.containerName) {
        await loadVersions();
        setSelectedVersionId(versionName);
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
    if (!selectedVersionId) {
      console.error('Ingen versjon valgt');
      return;
    }
    const response = await uploadNorskEkstensjon(formData, selectedVersionId?.toString());
    const norskEkstensjon : NorskEkstensjon = {
      id: response.id, // generer en unik id for hver ekstensjon, litt usikker hva er best her.
      fileName: response.fileName,
      logfile: "",
      selected: true
    } 
    versions.find((version) => version.id === selectedVersionId)?.processData?.norskEkstensjon.push(norskEkstensjon);
  };

  useEffect(() => {
    loadVersions();
  }, []);


  // Legg til andre handlinger, for eksempel oppdatere status, laste opp filer, osv.

  const state: StoreState = {
    versions,
    selectedVersionId

  };

  const actions: StoreActions = {
    loadVersion: loadVersions,
    selectVersion: selectVersion,
    createVersion: createRelease,
    addNorskEkstensjon: addNorskEkstensjon
  };

  return [state, actions];
};
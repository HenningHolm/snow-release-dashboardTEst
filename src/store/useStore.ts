import { useEffect, useState } from 'react';
import { createNewVersion, getVersions, uploadNorskEkstensjon as uploadNorskEkstensjon } from '../services/apiService';
import { Version, StoreActions, StoreState, NorskEkstensjon } from '../types/commonTypes';
import { ProcessDataUpdate, updateProcessData } from '../utils/processDataUtils';


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
    else {
      console.error(`Versjon med id ${versionId} ble ikke funnet.`);
      alert(`Versjon med id ${versionId} ble ikke funnet.`);
    }
  };

  const createRelease = async (versionName: number) => {
    try {
      const response = await createNewVersion(versionName);
      if (response.containerName) {
        await loadVersions();
        setSelectedVersionId(Number(response.containerName));
      } else {
        console.error('Feil ved opprettelse av release');
        alert('Feil ved opprettelse av release. Vennligst prøv igjen.');
      }
    } catch (error) {
      console.error('Feil ved opprettelse av release:', error);
      alert('Feil ved opprettelse av release. Vennligst prøv igjen.');
    }
  };
  const addNorskEkstensjon = async (file: File) => {
    if (!selectedVersionId) {
      console.error('Ingen versjon valgt');
      alert('Ingen versjon valgt. Vennligst velg en versjon før du laster opp.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('containerName', selectedVersionId.toString());

    try {
      const response = await uploadNorskEkstensjon(formData);

      // Valider responsen
      if (!response || !response.id || !response.fileName) {
        throw new Error('Ugyldig respons fra serveren.');
      }

      const norskEkstensjon: NorskEkstensjon = {
        id: response.id, // Sørg for at ID-en er unik
        fileName: response.fileName,
        logfile: "",
        selected: true,
      };

      // Finn den aktuelle versjonen
      const currentVersion = versions.find((version) => version.id === selectedVersionId);
      if (currentVersion) {
        const updatedVersion = updateProcessData(currentVersion, { norskEkstensjon: [norskEkstensjon] } as ProcessDataUpdate);
        setVersions((prevVersions) =>
          prevVersions.map((version) =>
            version.id === selectedVersionId ? updatedVersion : version
          )
        );
      }

      // Tilbakemelding til brukeren
      alert('Norsk ekstensjon lastet opp suksessfullt!');
    } catch (error) {
      console.error('Feil under lasting av norsk ekstensjon:', error);
      alert('Feil under opplasting av norsk ekstensjon. Vennligst prøv igjen.');
    }
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
import { useEffect, useState } from 'react';
import { createNewVersion, getVersions } from '../services/apiService';
import { Version, VersionProcessDocument, StoreActions, StoreState } from '../types/commonTypes';

export const useStore = (): [StoreState, StoreActions] => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [releaseProcessDoc, setReleaseProcessDoc] = useState<VersionProcessDocument | undefined>(undefined);
  const [selectedVersionId, setSelectedVersionId] = useState<number | undefined>(undefined);


  const loadVersions = async () => {
    const data = await getVersions();
    const versions = data;
    versions.sort((a: Version, b: Version) => b.id - a.id);

    setVersions(versions);
    if (versions.length > 0) {
      await selectVersion(versions[0].id);
    }
  };

  const selectVersion = async (versionId: number) => {
    setSelectedVersionId(versionId);
    const selectVersion = versions.find((version) => version.id == versionId);
    setReleaseProcessDoc(selectVersion?.processData);
  };


  const createRelease = async (versionName: number) => {
    try {
      const response = await createNewVersion(versionName);
      if (response.containerName) {
        await loadVersions();
        setSelectedVersionId(response.containerName);
        console.log('Release opprettet', 'setting selectedVersionId to', response.containerName);
      } else {
        console.error('Feil ved opprettelse av release');
      }
    } catch (error) {
      console.error('Feil ved opprettelse av release:', error);
    }
  };

  useEffect(() => {
    loadVersions();
  }, []);


  // Legg til andre handlinger, for eksempel oppdatere status, laste opp filer, osv.

  const state: StoreState = {
    versions: versions,
    selectedVersionId,
    versionProcessDoc: releaseProcessDoc,

  };

  const actions: StoreActions = {
    loadVersion: loadVersions,
    selectVersion: selectVersion,
    createVersion: createRelease,
  };

  return [state, actions];
};
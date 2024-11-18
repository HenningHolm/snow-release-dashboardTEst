import React, { useState, useEffect } from 'react';
import HistoryList from './components/HistoryList/HistoryList';
import { createRelease, getReleases } from './services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReleaseStepView from './components/ReleaseStepView/ReleaseStepView';
import { Release } from './types/commonTypes';


const App: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedReleaseId, setSelectedReleaseId] = useState<number | undefined>(undefined);

  // const fetchData = async () => {
  //   const data = await getReleases();

  //   const releasesWithState = await Promise.all(
  //     data.map(async (release: any) => {
  //       try {
  //         const stateData = await getBlobContent(release.versionName, 'state.json');
  //         console.log("stateData", stateData);
  //         return {
  //           ...release,
  //           state: stateData.releaseState || 'Ukjent',
  //         };
  //       } catch (error) {
  //         console.error(`Feil ved henting av state.json for ${release.versionName}:`, error);
  //         return {
  //           ...release,
  //           state: 'Ukjent',
  //         };
  //       }
  //     })
  //   );

    const fetchData = async () => {
    const data = await getReleases();
    const releasesWithState = data;
    releasesWithState.sort((a: Release, b: Release) => b.id - a.id);

    setReleases(releasesWithState);
    if (releasesWithState.length > 0) {
      setSelectedReleaseId(releasesWithState[0].id);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReleaseSelect = (release: Release) => {
    setSelectedReleaseId(release.id);
  };

  const handleReleaseCreate = async (versionName: string) => {
    const newRelease = await createRelease(versionName);
    if (newRelease !== undefined) {
      await fetchData();
      setSelectedReleaseId(newRelease.id);
    }
  };

  return (
    <div className="container bg-light">
    <div className="row bg-dark g-3 p-3">
        <div className="col-md-3">
          <HistoryList
            releases={releases}
            onSelectRelease={handleReleaseSelect}
            selectedReleaseId={selectedReleaseId}
          />
        </div>
        <div className="col-md-9">
          <ReleaseStepView
            releaseId={selectedReleaseId}
            onCreateRelease={handleReleaseCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default App;

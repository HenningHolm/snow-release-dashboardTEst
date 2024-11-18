import React, { useState, useEffect } from 'react';
import HistoryList from './components/HistoryList/HistoryList';
import NewReleaseForm from './components/NewReleaseForm';
import { createRelease, getBlobContent, getReleases } from './services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReleaseOverview from './components/ReleaseOverview/ReleaseOverview';
import ReleaseStepView from './components/ReleaseStepView/ReleaseStepView';

interface Release {
  id: string;
  versionName: string;
  blobs: string[];
  state: string;
  // Andre relevante felter
}

const App: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedReleaseId, setSelectedReleaseId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'releaseDetail' | 'newRelease'>('releaseDetail');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReleases();
    console.log("data", data);
      // Hent state.json for hver release
      const releasesWithState = await Promise.all(data.map(async (release: any) => {
        try {
          const stateData = await getBlobContent(release.versionName, "state.json");
          return {
            ...release,
            state: stateData.releaseState || 'Ukjent' // Setter standard hvis releaseState mangler
          };
        } catch (error) {
          console.error(`Feil ved henting av state.json for ${release.versionName}:`, error);
          return {
            ...release,
            state: 'Ukjent'
          };
        }
      }));

      setReleases(releasesWithState.reverse());
      if (releasesWithState.length > 0) {
        setSelectedReleaseId(releasesWithState[0].id);
      }
    };

    fetchData();
  }, [currentView]);

  const handleReleaseSelect = (release: Release) => {
    setSelectedReleaseId(release.id);
    setCurrentView('releaseDetail');
  };

  const handleNewReleaseClick = () => {
    setSelectedReleaseId(null);
    setCurrentView('newRelease');
  };

  const handleReleaseCreate = async (versionName: string) => {
    const newRelease = await createRelease(versionName);
    if (newRelease !== undefined) {
      setCurrentView('releaseDetail');
      return;
    }
  };

  const handleBackToList = () => {
    setCurrentView('releaseDetail');
    if (releases.length > 0) {
      setSelectedReleaseId(releases[0].id);
    }
  };

  return (
    <div className="container bg-light">
      <div className="row">
        <div className="col-md-3">
          <HistoryList
            releases={releases}
            onSelectRelease={handleReleaseSelect}
            onNewRelease={handleNewReleaseClick}
            selectedReleaseId={selectedReleaseId}
            currentView={currentView}
          />
        </div>
        <div className='col-md-9'>
        <ReleaseStepView releaseId={selectedReleaseId}/>
        </div>
        {/* <div className="col-md-9">
          {currentView === 'releaseDetail' && selectedReleaseId && (
            <ReleaseOverview releaseId={selectedReleaseId} />
          )}
          {currentView === 'newRelease' && (
            <NewReleaseForm onCreateRelease={handleReleaseCreate} onCancel={handleBackToList} />
          )}
        </div> */}
      
      </div>
    </div>
  );
};

export default App;

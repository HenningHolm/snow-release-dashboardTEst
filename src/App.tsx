// App.tsx
import React, { useState, useEffect } from 'react';
import HistoyList from './components/HistoryList/HistoryList';
import NewReleaseForm from './components/NewReleaseForm';
import { createRelease, getBlobContent, getReleases } from './services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReleaseOverview from './components/ReleaseOverview/ReleaseOverview';
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
      setReleases(data.reverse());
      if (data.length > 0) {
        setSelectedReleaseId(data[0].id);
      }
    };
    fetchData();

    const fetchState = async () => {
      try {
        const stateData = await getBlobContent("20241015", "state.json");
        console.log("State data:", stateData);
      } catch (error) {
        console.error("Feil ved henting av state.json:", error);
      }
    };

  }, [ currentView]);

  const handleReleaseSelect = (release: Release) => {
    setSelectedReleaseId(release.id);
    setCurrentView('releaseDetail');
  };

  const handleNewReleaseClick = () => {
    setSelectedReleaseId(null); // Fjern markering av valgt release
    setCurrentView('newRelease');
  };

  const handleReleaseCreate = async (versionName: string) => {
    const newRelease = await createRelease(versionName);
    if (newRelease !== undefined) {
      setCurrentView('releaseDetail');
      return
    }
  };

  const handleBackToList = () => {
    setCurrentView('releaseDetail');
    if (releases.length > 0) {
      setSelectedReleaseId(releases[0].id);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Venstre side (Liste) */}
        <div className="col-md-3">
          <HistoyList
            releases={releases}
            onSelectRelease={handleReleaseSelect}
            onNewRelease={handleNewReleaseClick}
            selectedReleaseId={selectedReleaseId}
            currentView={currentView}
          />
        </div>
        {/* Høyre side (Detaljer eller Ny Release) */}
        <div className="col-md-9">
          {currentView === 'releaseDetail' && selectedReleaseId && (
            <ReleaseOverview releaseId={selectedReleaseId} />
          )}
          {currentView === 'newRelease' && (
            <NewReleaseForm onCreateRelease={handleReleaseCreate} onCancel={handleBackToList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

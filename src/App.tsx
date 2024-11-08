// App.tsx
import React, { useState, useEffect } from 'react';
import ReleaseList from './components/HistoryList/HistoryList';
import ReleaseDetail from './components/ReleaseOverview/ReleaseDetail';
import NewReleaseForm from './components/NewReleaseForm';
import { getReleases, createRelease } from './services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReleaseOverview from './components/ReleaseOverview/ReleaseOverview';
interface Release {
  id: string;
  versionName: string;
  // Andre relevante felter
}

const App: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [currentView, setCurrentView] = useState<'releaseDetail' | 'newRelease'>('releaseDetail');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReleases();
      setReleases(data);
      if (data.length > 0) {
        setSelectedRelease(data[0]);
      }
    };
    fetchData();
  }, []);

  const handleReleaseSelect = (release: Release) => {
    setSelectedRelease(release);
    setCurrentView('releaseDetail');
  };

  const handleNewReleaseClick = () => {
    setSelectedRelease(null); // Fjern markering av valgt release
    setCurrentView('newRelease');
  };

  const handleReleaseCreate = async (versionName: string) => {
    // ... (opprettelse av ny release)
  };

  const handleBackToList = () => {
    setCurrentView('releaseDetail');
    if (releases.length > 0) {
      setSelectedRelease(releases[0]);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        {/* Venstre side (Liste) */}
        <div className="col-md-3">
          <ReleaseList
            releases={releases}
            onSelectRelease={handleReleaseSelect}
            onNewRelease={handleNewReleaseClick}
            selectedRelease={selectedRelease}
            currentView={currentView}
          />
        </div>
        {/* Høyre side (Detaljer eller Ny Release) */}
        <div className="col-md-9">
          {currentView === 'releaseDetail' && selectedRelease && (
            <ReleaseOverview release={selectedRelease} />
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

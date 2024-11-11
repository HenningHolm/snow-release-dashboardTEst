// App.tsx
import React, { useState, useEffect } from 'react';
import HistoyList from './components/HistoryList/HistoryList';
import NewReleaseForm from './components/NewReleaseForm';
import { createRelease, getReleases } from './services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReleaseOverview from './components/ReleaseOverview/ReleaseOverview';
interface Release {
  id: string;
  versionName: string;
  // Andre relevante felter
}

const App: React.FC = () => {
  const [releases, setReleases] = useState<Release[]>([]);
  const [selectedReleaseId, setSelectedReleaseId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'releaseDetail' | 'newRelease'>('releaseDetail');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReleases();
      setReleases(data);
      if (data.length > 0) {
        setSelectedReleaseId(data[0].id);
      }
    };
    fetchData();
  }, []);

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
    setReleases([...releases, newRelease]); // Legg til ny release i listen
    setSelectedReleaseId(newRelease.id); // Velg ny release
    setCurrentView('releaseDetail'); // Bytt til detaljvisning
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

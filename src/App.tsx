import React, { useState, useEffect } from 'react';
import ReleaseStatus from './components/ReleaseStatus';
import ReleaseList from './components/ReleaseList';
import NewReleaseForm from './components/NewReleaseForm';
import ReleaseDetail from './components/ReleaseDetail';
import { getReleases, createRelease } from './services/apiService';

interface Release {
  id: string;
  versionName: string;
  // Andre relevante felter
}

const App: React.FC = () => {

  const [data, setData] = useState(''); // For API-melding

  const [currentView, setCurrentView] = useState<'home' | 'newRelease' | 'releaseDetail'>('home');
  const [releases, setReleases] = useState<Release[]>([{ id: '1', versionName: '1.0.0' }]);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:7071/api/message`);
      console.log("response", response);
      const { text } = await response.json(); // Forventer et 'text'-felt fra API-et
      setData(text);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Hent liste over releases ved oppstart
    fetchData();
    getReleases().then(data => setReleases(data));
  }, []);

  const handleNewReleaseClick = () => {
    setCurrentView('newRelease');
  };

  const handleReleaseSelect = (release: Release) => {
    setSelectedRelease(release);
    setCurrentView('releaseDetail');
  };

  const handleReleaseCreate = (versionName: string) => {
    createRelease(versionName).then(newRelease => {
      setReleases([newRelease, ...releases]);
      setSelectedRelease(newRelease);
      setCurrentView('releaseDetail');
    });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedRelease(null);
  };

  return (
    <div className="app-container">
      <h1>Release Manager {data}</h1>
      {currentView === 'home' && (
        <>
          <ReleaseStatus latestRelease={releases[0]} />
          <button onClick={handleNewReleaseClick}>New Release</button>
          <ReleaseList releases={releases} onSelectRelease={handleReleaseSelect} />
        </>
      )}
      {currentView === 'newRelease' && (
        <NewReleaseForm onCreateRelease={handleReleaseCreate} onCancel={handleBackToHome} />
      )}
      {currentView === 'releaseDetail' && selectedRelease && (
        <ReleaseDetail release={selectedRelease} onBack={handleBackToHome} />
      )}
    </div>
  );
};

export default App;
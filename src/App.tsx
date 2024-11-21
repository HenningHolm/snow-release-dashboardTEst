import React, { useState } from 'react';
import { StoreProvider } from './store/versionStore';
import HistoryList from './components/HistoryList/HistoryList';
import 'bootstrap/dist/css/bootstrap.min.css';
import VersionStepView from './components/VersioningStepView/VersionStepView';
import { useStoreContext } from './store/versionStore';
import NewReleaseForm from './components/VersioningStepView/Steps/Step1/NewVersionForm';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
};

const MainContent: React.FC = () => {
  const { state, actions } = useStoreContext();
  const { versions, selectedVersion } = state;
  const { selectVersion, createVersion } = actions;
  const [currentView, setCurrentView] = useState<'releaseDetail' | 'newRelease'>('releaseDetail');

  const handleVersionSelect = (versionId: number) => {
    selectVersion(versionId);
  };


  const handleVersionCreate = async (versionName: number) => {
    await createVersion(versionName);
    setCurrentView('releaseDetail');
  };

  return (
    <div className="container bg-light">
      <div className="row bg-dark g-3 p-3">
        <div className="col-md-3">
          <HistoryList
            versions={versions}
            selectedVersionId={selectedVersion?.id}
            onNewVersion={() => setCurrentView('newRelease')}
            onSelectVersion={handleVersionSelect}
          />
        </div>
        <div className="col-md-9">
          <h3 className='text-white'>Valgt versjon: {selectedVersion?.id.toString()}</h3>
         {currentView === 'releaseDetail' && selectedVersion?.id && (
          <VersionStepView
            versionId={selectedVersion.id}
          />   )} 
           {currentView === 'newRelease' && ( 
            <NewReleaseForm onCreateVersion={handleVersionCreate} onCancel={()=> {setCurrentView("releaseDetail")}} />
          )}
            
        </div>
      </div>
    </div>
  );
};

export default App;
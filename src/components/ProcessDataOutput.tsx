
import React from 'react';
import { useStoreContext } from '../store/versionStore';


const ProcessDataOutput: React.FC = () => {
  const { state } = useStoreContext();
  const { versions, selectedVersionId } = state;

  // Finn den valgte versjonen
  const selectedVersion = versions.find(version => version.id === selectedVersionId);

  if (!selectedVersion) {
    return <div className="alert alert-warning">Ingen versjon valgt.</div>;
  }

  const { processData } = selectedVersion;

  if (!processData) {
    return <div className="alert alert-info">Ingen processData tilgjengelig for denne versjonen.</div>;
  }

  return (
    <div>
      <h4>Process Data Output</h4>
      <pre style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', maxHeight: '400px', overflowY: 'auto' }}>
        {JSON.stringify(processData, null, 2)}
      </pre>
    </div>
  );
};

export default ProcessDataOutput;
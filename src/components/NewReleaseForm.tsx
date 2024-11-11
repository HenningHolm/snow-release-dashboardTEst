import React, { useState } from 'react';
import { createRelease } from '../services/apiService';

interface NewReleaseFormProps {
  onCreateRelease: (versionName: string) => void;
  onCancel: () => void;
}

const NewReleaseForm: React.FC<NewReleaseFormProps> = ({ onCreateRelease, onCancel }) => {
  const [versionName, setVersionName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCreateRelease(versionName); // Kall funksjonen som faktisk oppretter release
    setVersionName(''); // Tilbakestill inputfeltet etter opprettelse
  };

  return (
    <div className='card p-3 h-100'>
    <form onSubmit={handleSubmit}>
      <h2>Opprett Ny Release</h2>
      <div>
        <label>Versjonsnavn:</label>
        <input
          type="text"
          value={versionName}
          onChange={e => setVersionName(e.target.value)}
          required
        />
      </div>
      <button type="submit">Opprett</button>
      <button type="button" onClick={onCancel}>Avbryt</button>
    </form>
    </div>
  );
};

export default NewReleaseForm;

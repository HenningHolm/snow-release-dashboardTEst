import React, { useState } from 'react';

interface NewReleaseFormProps {
  onCreateRelease: (versionName: string) => void;
  onCancel: () => void;
}

const NewReleaseForm: React.FC<NewReleaseFormProps> = ({ onCreateRelease, onCancel }) => {
  const [versionName, setVersionName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateRelease(versionName);
  };

  return (
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
  );
};

export default NewReleaseForm;

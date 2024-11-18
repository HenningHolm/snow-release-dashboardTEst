import React, { useState } from 'react';

interface NewReleaseFormProps {
  onCreateRelease: (versionName: string) => void;
  onCancel: () => void;
}

const NewReleaseForm: React.FC<NewReleaseFormProps> = ({ onCreateRelease, onCancel }) => {
  const [versionName, setVersionName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await onCreateRelease(versionName); // Kall funksjonen som faktisk oppretter release
    console.log("response data comp", response) ;
    setVersionName(''); // Tilbakestill inputfeltet etter opprettelse
  };

  return (
    <div className='card p-3 h-100'>
    <form onSubmit={handleSubmit}>
      <h2>Opprett Ny Release</h2>
      <div className='d-flex gap-2 flex-row align-items-center'>
        <label>Versjonsnavn:</label>
        <input
          type="text"
          value={versionName}
          onChange={e => setVersionName(e.target.value)}
          required
        />
      <button className='btn btn-success' type="submit">Opprett</button>
      <button type="button" className="btn btn-danger" onClick={onCancel}>Avbryt</button>
      </div>
    </form>
    </div>
  );
};

export default NewReleaseForm;

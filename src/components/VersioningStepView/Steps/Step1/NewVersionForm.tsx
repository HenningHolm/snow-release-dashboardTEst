import React, { useState } from 'react';

interface NewVersionFormProps {
  onCreateVersion: (versionName: number) => void;
  onCancel: () => void;
}

const NewReleaseForm: React.FC<NewVersionFormProps> = ({ onCreateVersion, onCancel }) => {
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!inputValue) return
    await onCreateVersion(inputValue); 
  };

  return (
    <div className='card p-3 h-100'>
    <form onSubmit={handleSubmit}>
      <h3>Opprett Ny Release</h3>
      <div className='d-flex gap-2 flex-row align-items-center'>
        <label>Versjonsnavn:</label>
        <input
          type="text"
          value={inputValue || ""} 
          placeholder="YYYYMMDD"
          onChange={(e) => setInputValue(Number(e.target.value))}
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

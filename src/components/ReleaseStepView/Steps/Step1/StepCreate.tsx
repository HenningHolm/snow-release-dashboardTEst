import React, { useState } from 'react';

interface StepCreateProps {
  onCreateRelease: (versionId: number) => void;
}

const StepCreate: React.FC<StepCreateProps> = ({ onCreateRelease }) => {
  const [versionId, setVersionId] = useState<number | undefined>(undefined);
  const [inputValue, setInputValue] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === undefined || isNaN(inputValue)) {
      alert('Vennligst skriv inn et gyldig versjonsnummer');
      return;
    }
    await onCreateRelease(inputValue);
    setVersionId(inputValue);
  };

  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="false"
          aria-controls="collapseOne"
        >
          {versionId === undefined ? '⬜ Steg 1 - Initialiser ny versjon' : '✅ Steg 1 - Initialiser ny versjon'}
        </button>
      </h2>
      <div
        id="collapseOne"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <p className="fw-bold">Sett en dato for ny versjon</p>
          <form onSubmit={handleSubmit} className="input-group mb-3">
            <input
              disabled={versionId !== undefined}
              type="number"
              className="form-control"
              placeholder="YYYYMMDD"
              aria-label="Release name"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              required
            />
            <button
              disabled={versionId !== undefined}
              className="btn btn-dark"
              type="submit"
              id="button-addon2"
            >
              Opprett
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StepCreate;

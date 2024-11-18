import React from 'react';
import FileCategoryContainer from './FileCategoryContainer';

const derivativePackets = ['LM', 'INC', 'FD'];

const StepDerivate: React.FC<ReleaseIdProps> = ({ releaseId }) => {
  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseFour"
          aria-expanded="false"
          aria-controls="collapseFour"
        >
          ⬜ Steg 4 - Generer derivat
        </button>
      </h2>
      <div
        id="collapseFour"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body d-flex flex-row gap-3">
          {derivativePackets.map((packet) => (
            <FileCategoryContainer key={packet} fileCategory={packet} derivat={true} />
          ))}
        </div>
      </div>
    </>
  );
}

export default StepDerivate;
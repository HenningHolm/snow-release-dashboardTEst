import React from 'react';
import FileCategoryContainer from './FileCategoryContainer';

const derivativePackets = ['LM', 'INC', 'FD'];

function Step3() {
  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseThree"
          aria-expanded="false"
          aria-controls="collapseThree"
        >
          ⬜ Steg 3 - Generer derivat
        </button>
      </h2>
      <div
        id="collapseThree"
        className="accordion-collapse collapse show"
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

export default Step3;
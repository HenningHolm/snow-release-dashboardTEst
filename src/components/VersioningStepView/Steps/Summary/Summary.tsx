import React from 'react';

const Summary: React.FC = () => {

  return (
    <>
        <div className="accordion" id="accordionReleaseSteps">
    <div className='accordion-item'>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseSix"
          aria-expanded="false"
          aria-controls="collapseSix"
        >
         Se Sammendrag
        </button>
      </h2>
      <div
        id="collapseSix"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <label htmlFor="formFile" className="form-label fw-bold">
          </label>
          <div className="card"></div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
};

export default Summary;

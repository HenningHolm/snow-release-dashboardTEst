import React from 'react';

function Step1() {
  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          ⬜ Steg 1 - Opprett ny versjon
        </button>
      </h2>
      <div
        id="collapseOne"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <p className="fw-bold">Sett en navn for ny versjon</p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="YYYYMMDD"
              aria-label="Release name"
              aria-describedby="button-addon2"
            />
            <button
              className="btn btn-dark"
              type="button"
              id="button-addon2"
            >
              Opprett
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Step1;

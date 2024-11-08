import React, { useState } from "react";
import RequestOptionsContainer from "./RequestOptionsContainer";
import ReleaseLogContainer from "./ReleaseLogContainer";

interface ReleaseJobContainerProps {
  environment: string;
}

const ReleaseJobContainer: React.FC<ReleaseJobContainerProps> = ({ environment }) => {
  const [isHistorical, setIsHistorical] = useState(false);

  return (
    <div className=" p-3 bg-dark text-white border border-1 container">
      <div className="row mb-3">
        <div className="col-4">
          <h4>Release - {environment}</h4>
        </div>
        <div className="col-4"></div>
        <div className="col-4">
          <button
            className={`btn ${isHistorical ? "btn-primary" : "btn-outline-light"} me-2`}
            onClick={() => setIsHistorical(true)}
          >
            Historiske jobber
          </button>
          <button
            className={`btn ${isHistorical ? "btn-outline-light" : "btn-primary"}`}
            onClick={() => setIsHistorical(false)}
          >
            + Ny jobb
          </button>
        </div>
      </div>
        <div className="row">
          <div className="col-8">
            <RequestOptionsContainer isHistorical={isHistorical} />
          </div>
          <div className="col-4">
            <ReleaseLogContainer />
          </div>
        </div>
      </div>
  );
};

export default ReleaseJobContainer;

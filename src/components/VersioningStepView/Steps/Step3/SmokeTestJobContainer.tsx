import React, { useState } from "react";
import RequestOptionsContainer from "./RequestOptionsContainer";

interface SmokeTestJobContainerProps {
  // environment: string;
  versionId: number | undefined;
}



const SmokeTestJobContainer: React.FC<SmokeTestJobContainerProps> = ({ versionId: releaseId }) => {
  const [isHistorical] = useState(false);

  return (
    <div className=" p-3 bg-light border border-1 container">
      <div className="row mb-3">
        <div className="col-10">
          <h4>Smoketest - Demo</h4>
        </div>
        <div className="col-2">
          {/* <button
            className={`btn ${isHistorical ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setIsHistorical(false)}
          >
            + Ny jobb
          </button> */}
        </div>
      </div>
        <div className="row">
          <div className="col-6">
            <RequestOptionsContainer releaseId={releaseId} isHistorical={isHistorical} />
          </div>
          <div className="col-6">
          <div>
        <div className="mb-3">
      </div>
        <button className="btn btn-outline-dark w-100 mt-2" disabled={isHistorical}>Se logg</button>
    </div>
          </div>
        </div>
      </div>
  );
};

export default SmokeTestJobContainer;

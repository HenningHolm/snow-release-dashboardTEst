import React, { useState } from "react";

import RequestOptionsContainer from "./RequestOptionsContainer";

interface ReleaseJobContainerProps {
  environment: string;
  versionId: number;
}



const ReleaseJobContainer: React.FC<ReleaseJobContainerProps> = ({ environment, versionId }) => {
  const [isHistorical, setIsHistorical] = useState(false);

  return (
    <div className=" p-3 bg-light border border-1 container">
      <div className="row mb-3">
        <div className="col-10">
          <h4>Smoketest - {environment} {isHistorical ? "(Historisk)" : ""}</h4>
        </div>
        <div className="col-2">
          <button
            className={`btn ${isHistorical ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setIsHistorical(false)}
          >
            + Ny jobb
          </button>
        </div>
      </div>
        <div className="row">
          <div className="col-12">
            <RequestOptionsContainer versionId={versionId} isHistorical={isHistorical} />
          </div>
        </div>
      </div>
  );
};

export default ReleaseJobContainer;

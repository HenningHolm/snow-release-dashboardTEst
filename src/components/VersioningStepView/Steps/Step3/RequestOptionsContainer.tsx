import React from "react";

interface RequestOptionsProps {
  isHistorical: boolean;
  releaseId: number | undefined;
}

const RequestOptionsContainer: React.FC<RequestOptionsProps> = ({ isHistorical }) => {
  return (
    <div>
        <div className="mb-3">
      </div>
        <button className="btn btn-success w-100 mt-2" disabled={isHistorical}>Utfør Smoketest</button>
    </div>
  );
};

export default RequestOptionsContainer;

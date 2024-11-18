import React from "react";

interface RequestOptionsProps {
  isHistorical: boolean;
  releaseId: string;
}

const RequestOptionsContainer: React.FC<RequestOptionsProps> = ({ isHistorical, releaseId }) => {
  return (
    <div>
        <div className="mb-3">
            <h5>Inputs</h5> 
            <div className="p-3 card container">
                <div className="row">
            <div className="mb-3 col-6">
                <label className="text-dark">Branch</label>
                <input type="text" className="form-control" disabled value={"MAIN/SNOMEDCT-NO"}/>
            </div>
            <div className="mb-3 col-6">
                <label className="text-dark">Shortname</label>
                <input type="text" className="form-control" disabled value={"SNOMEDCT-NO"} />
            </div>
            </div>
            <div className="row">
            <div className="mb-3 col-6">
                <label className="text-dark">Versjon</label>
                <input type="text" className="form-control" disabled value={releaseId} />
            </div>
            <div className="mb-3 col-6">
                <label className="text-dark">Jobbnavn</label>
                <input type="text" className="form-control" disabled={isHistorical} />
            </div>
            </div>
        </div>
      </div>
      <div className="mb-3">
        <h5>Valgte pakker</h5>
        <div className="form-check bg-dark container p-2 card"> 
            <div className="row">
                <div className="col-6 mb-2">
                    <div className="form-check">
                        <input checked className="form-check-input" type="checkbox" disabled={isHistorical} />
                        <label className="form-check-label text-white">Norske ekstensjon</label>
                    </div>
                </div>
                <div className="col-6 mb-2">
                    <div className="form-check">
                        <input checked className="form-check-input" type="checkbox" disabled={isHistorical} />
                        <label className="form-check-label text-white">LM - derivat</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 mb-1">
                    <div className="form-check">
                        <input checked className="form-check-input" type="checkbox" disabled={isHistorical} />
                        <label className="form-check-label text-white">INC - derivat</label>
                    </div>
                </div>
                <div className="col-6 mb-1">
                    <div className="form-check">
                        <input checked className="form-check-input" type="checkbox" disabled={isHistorical} />
                        <label className="form-check-label text-white">FD - derivat</label>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <button className="btn btn-success w-100 mt-2" disabled={isHistorical}>Kjør release</button>
    </div>
  );
};

export default RequestOptionsContainer;

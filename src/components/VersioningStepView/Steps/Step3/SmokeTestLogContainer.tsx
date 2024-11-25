import React from "react";

const SmokeTestLogContainer: React.FC = () => {
  return (
    <div>
        <h5>Logs</h5>
        <div className="p-3 text-dark flex-grow-1 card container">
            <div className="row h-100">
                {/* TODO fix this */}
                <div style={{ height: "350px" }}>

                  {/* //make a list of logs */}
                  <div className="bg-light mb-2">
                    <div className="card-body">
                      <h6 className="card-title">Smoketest 1:</h6>
                      <p className="card-text mb-0">- Jobb ble startet</p>
                      <p className="card-text">- Import av refset ble startet</p>
                      <p className="card-text">...</p>
                      <p className="card-text">- Jobb ble avsluttet</p>

                    </div>
                  </div>
                </div>
            </div>
        </div>

    </div>
  );
};

export default SmokeTestLogContainer;

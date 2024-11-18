import React, { useState } from "react";
import ReleaseJobContainer from "./ReleaseJobContainer/ReleaseJobContainer";
import { ReleaseIdProps } from "../../../types/commonTypes";

const environment = [
  "DailyBuild",
  "Demo",
  "SLV-Prod",
  "SLV-Test",
  "Prod"
];

const ReleaseEnvironmentFolder: React.FC<ReleaseIdProps> = ({ releaseId }) => {
  // Holder styr på hvilket miljø som er aktivt
  const [activeEnv, setActiveEnv] = useState(environment[0]);


  return (
    <div className="container text-white p-3 bg-dark rounded">
      <h4 className="mb-4 ">Miljø</h4>
    <div className="container my-1 p-0 rounded text-black">
      <ul className="nav nav-tabs ">
        {environment.map((env) => (
          <li className="nav-item secondary" key={env}>
            <a
              className={`nav-link ${activeEnv === env ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveEnv(env);
              }}
            >
              {env}
            </a>
          </li>
        ))}
      </ul>
      {/* Passerer valgt miljø til ReleaseJobContainer */}
      <ReleaseJobContainer releaseId={releaseId} environment={activeEnv} />
    </div>
    </div>
  );
};

export default ReleaseEnvironmentFolder;
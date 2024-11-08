import React, { useState } from "react";
import ReleaseJobContainer from "./ReleaseJobContainer/ReleaseJobContainer";

const environment = [
  "DailyBuild",
  "Demo",
  "SLV-Prod",
  "SLV-Test",
  "Prod"
];

const ReleaseEnvironmentFolder: React.FC = () => {
  // Holder styr på hvilket miljø som er aktivt
  const [activeEnv, setActiveEnv] = useState(environment[0]);

  return (
    <div className="container my-1 p-0 rounded">
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
      <ReleaseJobContainer environment={activeEnv} />
    </div>
  );
};

export default ReleaseEnvironmentFolder;
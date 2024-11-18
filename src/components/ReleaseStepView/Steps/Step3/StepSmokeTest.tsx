import { useState } from "react";
import ReleaseJobContainer from "./ReleaseJobContainer";
import { ReleaseIdProps } from "../../../../types/commonTypes";

const StepSmokeTest: React.FC<ReleaseIdProps> = ({ releaseId }) => {

    const environment = [
        "DailyBuild",
        "Demo",
        "SLV-Prod",
        "SLV-Test",
        "Prod"
      ];

      const [activeEnv, setActiveEnv] = useState(environment[0]);
      
    return (
        <>
            <h2 className="accordion-header">
                <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                >
                    ⬜ Steg 3 - Smoke test
                </button>
            </h2>
            <div
        id="collapseThree"
        className="accordion-collapse collapse show"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body d-flex flex-row gap-3">
            <div className="container p-3 rounded">
      <label className="form-label fw-bold">Test miljø</label>
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
        </div>
      </div>

        </>
    );
}   

export default StepSmokeTest;
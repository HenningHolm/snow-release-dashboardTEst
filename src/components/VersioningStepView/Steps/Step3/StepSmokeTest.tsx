import SmokeTestJobContainer from "./SmokeTestJobContainer";
import { VersionIdProps } from "../../../../types/commonTypes";

const StepSmokeTest: React.FC<VersionIdProps> = ({ versionId }) => {

    // const environment = [
    //     "DailyBuild",
    //     "Demo",
    //     "SLV-Prod",
    //     "SLV-Test",
    //     "Prod"
    //   ];

    //   const [activeEnv, setActiveEnv] = useState(environment[0]);
      
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
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body d-flex flex-row gap-3">
            <div className="container p-3 rounded">

      <SmokeTestJobContainer versionId={versionId}/>
    </div>
    </div>
        </div>

        </>
    );
}   

export default StepSmokeTest;
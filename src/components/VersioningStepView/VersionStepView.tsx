import React from 'react';
import { VersionIdProps } from '../../types/commonTypes';
import StepCreate from './Steps/Step1/StepCreate';
import StepUploadNorskEks from './Steps/Step2/StepUploadNorskEks';
import StepDerivate from './Steps/Step4/StepDerivate';
import StepSmokeTest from './Steps/Step3/StepSmokeTest';
import StepFinaleRelease from './Steps/Step5/StepFinalRelease';
import Summary from './Steps/Summary/Summary';




const ReleaseStepView: React.FC<VersionIdProps> = ({ versionId: releaseId }) => {
  return (
    <div>
    <div className="accordion" id="accordionReleaseSteps">
      <div className="accordion-item">
        <StepCreate/>
      </div>
      <div className="accordion-item">
        <StepUploadNorskEks versionId={releaseId} />
      </div>
      <div className="accordion-item">
        <StepSmokeTest versionId={releaseId} />
      </div>
    <div className="accordion-item">
        <StepDerivate versionId={releaseId} />
    </div>
    <div className='accordion-item'>
        <StepFinaleRelease versionId={releaseId} />
    </div>
    </div>
    <br />
    <Summary/>
    </div>
  );
};

export default ReleaseStepView;

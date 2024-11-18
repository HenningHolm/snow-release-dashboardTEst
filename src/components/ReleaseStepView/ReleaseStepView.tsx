import React from 'react';
import { ReleaseIdProps } from '../../types/commonTypes';
import StepCreate from './Steps/Step1/StepCreate';
import StepUploadNorskEks from './Steps/Step2/StepUploadNorskEks';
import StepDerivate from './Steps/Step4/StepDerivate';
import StepSmokeTest from './Steps/Step3/StepSmokeTest';
import StepFinaleRelease from './Steps/Step5/StepFinalRelease';

interface ReleaseStepViewProps extends ReleaseIdProps {
  onCreateRelease: (releaseId: number) => void;
  // Add other props if needed
}

const ReleaseStepView: React.FC<ReleaseStepViewProps> = ({ releaseId, onCreateRelease }) => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <StepCreate onCreateRelease={onCreateRelease} />
      </div>
      <div className="accordion-item">
        <StepUploadNorskEks releaseId={releaseId} />
      </div>
      <div className="accordion-item">
        <StepSmokeTest releaseId={releaseId} />
      </div>
    <div className="accordion-item">
        <StepDerivate releaseId={releaseId} />
    </div>
    <div className='accordion-item'>
        <StepFinaleRelease releaseId={releaseId} />
    </div>
    </div>
  );
};

export default ReleaseStepView;

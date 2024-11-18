
import { ReleaseIdProps } from '../../types/commonTypes';
import StepCreate from './Steps/Step1/StepCreate';
import StepUploadNorskEks from './Steps/Step2/StepUploadNorskEks';
import StepDerivate from './Steps/Step3/StepDerivate';


const ReleaseStepView: React.FC<ReleaseIdProps> = ({ releaseId }) => {

    return (

         <div className="accordion" id="accordionExample">
         <div className="accordion-item">
         <StepCreate />
         </div>
         <div className="accordion-item">
         <StepUploadNorskEks />
         </div>
         <div className="accordion-item">
         <StepDerivate />
         </div>
         <div className="accordion-item">
         </div>
         <div className="accordion-item">
         </div>
       </div>
    );
};

export default ReleaseStepView;
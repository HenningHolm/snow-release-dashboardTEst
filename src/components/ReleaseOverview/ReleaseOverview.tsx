import ReleaseFilesFolder from './ReleaseFileContainer/ReleaseFilesFolder';
import ReleaseEnvironmentFolder from './ReleaseEnvironmentFolder/ReleaseEnvironmentFolder';
import { ReleaseIdProps } from '../../types/commonTypes';


const ReleaseOverview: React.FC<ReleaseIdProps> = ({ releaseId }) => {

  return (
    <div className="container bg-white card p-4">
      <h3>Release {releaseId}</h3>
      <ReleaseEnvironmentFolder releaseId={releaseId} />
      <ReleaseFilesFolder releaseId={releaseId} />
    </div>
  );
};

export default ReleaseOverview;

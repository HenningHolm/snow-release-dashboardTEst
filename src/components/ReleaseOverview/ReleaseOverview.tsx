import React, { useState} from 'react';
import ReleaseFilesContainer from './ReleaseFileContainer/ReleaseFilesContainer';
import ReleaseEnvironmentFolder from './ReleaseEnvironmentFolder/ReleaseEnvironmentFolder';

interface ReleaseData {
  date: string;
  branch: string;
  shortName: string;
  baseUrl: string;
  version: number;
}

const initialReleaseData: ReleaseData = {
  date: '20240915',
  branch: 'MAIN/SNOMEDCT-NO',
  shortName: 'SNOMEDCT-NO',
  baseUrl: 'https://demo.snowstorm.testafd.com/snowstorm/snomed-ct',
  version: 20241115,
};

const environments = [
  { name: 'DailyBuild', url: 'http://localhost/snowstorm/snomed-ct' },
  { name: 'Demo', url: 'https://demo.no' },
  { name: 'SLV-Prod', url: 'https://slv-prod.no' },
  { name: 'SLV-Test', url: 'https://slv-test.no' },
  { name: 'Prod', url: 'https://prod.no' },
];

const branches = [
  { name: 'MAIN/SNOMEDCT-NO', shortName: 'SNOMEDCT-NO' },
  { name: 'MAIN/SNOMEDCT-SE', shortName: 'SNOMEDCT-SE' },
  { name: 'MAIN/SNOMEDCT-DK', shortName: 'SNOMEDCT-DK' },
];

interface Run {
  timestamp: string;
  action: string;
  status: string;
}
interface Release {
  id: string;
  versionName: string;
  // Andre relevante felter
}

interface ReleaseOverviewProps {
  release: Release;
}

const ReleaseOverview: React.FC<ReleaseOverviewProps> = ({ release}) => {
  const [releaseData, setReleaseData] = useState<ReleaseData>(initialReleaseData);
  const [runs, setRuns] = useState<Run[]>([]);


  const runTest = (environmentName: string, type: 'full' | 'smoke') => {
    const timestamp = new Date().toISOString();
    setRuns([{ timestamp, action: `${type} test on ${environmentName}`, status: 'Running' }, ...runs]);
    // Legg til logikk for å kjøre test
  };

  return (
      <div className="container bg-white card p-4">
        <h3>Release {release.versionName}</h3>
    <ReleaseEnvironmentFolder/>


    <ReleaseFilesContainer release={release} />


    </div>
  );
};

export default ReleaseOverview;
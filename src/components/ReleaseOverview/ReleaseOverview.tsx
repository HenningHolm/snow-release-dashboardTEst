import React, { useState} from 'react';
import ReleaseFileContainer from './ReleaseFileContainer/ReleaseFileContainer';

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

interface ReleaseDetailProps {
  release: Release;
}

const ReleaseDetail: React.FC<ReleaseDetailProps> = ({ release}) => {
  const [releaseData, setReleaseData] = useState<ReleaseData>(initialReleaseData);
  const [runs, setRuns] = useState<Run[]>([]);


  const runTest = (environmentName: string, type: 'full' | 'smoke') => {
    const timestamp = new Date().toISOString();
    setRuns([{ timestamp, action: `${type} test on ${environmentName}`, status: 'Running' }, ...runs]);
    // Legg til logikk for å kjøre test
  };

  return (
    <div className="container card p-4">

      <h3>Release {release.versionName}</h3>

    <ReleaseFileContainer release={release} />

      <div className="inputs-section">
        <h3>Inputs</h3>
        <div className="input-grid">
          <div className="input-group">
            <label htmlFor="date">Versjon</label>
            <input
              type="text"
              id="date"
              value={releaseData.date}
              onChange={(e) => setReleaseData({ ...releaseData, date: e.target.value })}
              placeholder="YYYYMMDD"
            />
          </div>
          <div className="input-group">
            <label htmlFor="branch">Velg SNOMEDCT-NO pakke</label>
            <select
              id="branch"
              value={releaseData.branch}
              onChange={(e) => setReleaseData({ ...releaseData, branch: e.target.value })}
            >
              {branches.map((branch) => (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="environments-section">
        <div className="environments-grid">
          {environments.map((env) => (
            <div key={env.name} className="environment-box">
              <h3>{env.name}</h3>
              <div className="environment-buttons">
                <button onClick={() => runTest(env.name, 'full')} className="small">
                  Full
                </button>
                <button onClick={() => runTest(env.name, 'smoke')} className="small secondary">
                  Smoke
                </button>
              </div>
            </div>
          ))}
        </div>
        <br />
        <button className="start-release" >Start Release</button>
      </div>

      <div className="runs-section">
        <h3>Runs</h3>
        <div className="runs-list">
          {runs.map((run, index) => (
            <div key={index} className="run-item">
              <span className="timestamp">{new Date(run.timestamp).toLocaleString()}</span>
              <span className="action">{run.action}</span>
              <span className="status">{run.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleaseDetail;
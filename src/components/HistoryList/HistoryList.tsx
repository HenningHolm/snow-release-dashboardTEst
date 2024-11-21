// HistoryList.tsx
import React from 'react';
import { Version } from '../../types/commonTypes';

interface VersionListProps {
  versions: Version[];
  onSelectVersion: (versionId: number) => void;
  onNewVersion: () => void;
  selectedVersionId: number | undefined;
}

const HistoryList: React.FC<VersionListProps> = ({
  versions,
  onSelectVersion,
  onNewVersion: onNewVersion,
  selectedVersionId: selectedVersionId
}) => {
  return (
    <div className='card p-3 d-flex flex-column justify-content-between'>
      <div className="list-group">
        <h5>Releaseversjoner:</h5>
        {versions.map((version) => (
          <button
            key={version.id}
            type="button"
            className={`list-group-item list-group-item-action ${
              selectedVersionId == version.id ? 'active' : ''
            }`}
            onClick={() => onSelectVersion(version.id)}
          >
            {version.id} - {version.state}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={"btn btn-success mt-3 btn-block"}
        onClick={onNewVersion}
      >
        Ny release
      </button>
    </div>
  );
};

export default HistoryList;

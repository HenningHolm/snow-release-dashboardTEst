// ReleaseList.tsx
import React from 'react';

interface Release {
  id: string;
  versionName: string;
  // Andre relevante felter
}

interface ReleaseListProps {
  releases: Release[];
  onSelectRelease: (release: Release) => void;
  onNewRelease: () => void;
  selectedRelease: Release | null;
  currentView: 'releaseDetail' | 'newRelease';
}

const ReleaseList: React.FC<ReleaseListProps> = ({
  releases,
  onSelectRelease,
  onNewRelease,
  selectedRelease,
  currentView,
}) => {
  return (
    <div className='card p-3 d-flex flex-column justify-content-between'>

      <div className="list-group">
      <h5>Releaseversjoner:</h5>
        {releases.map((release, i) => (
          <button
            key={release.id}
            type="button"
            className={`list-group-item list-group-item-action ${
              selectedRelease && selectedRelease.id === release.id ? 'active' : ''
            }`}
            onClick={() => onSelectRelease(release)}
          >
            {release.versionName} { i === 0 ? ' - Gyldig' : '- Utgått' }
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`btn btn-success mt-3 btn-block ${
          currentView === 'newRelease' ? 'active' : ''
        }`}
        onClick={onNewRelease}
      >
        Opprett ny release
      </button>
    </div>
  );
};

export default ReleaseList;

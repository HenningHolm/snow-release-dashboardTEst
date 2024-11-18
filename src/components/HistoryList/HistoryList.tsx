// HistoryList.tsx
import React from 'react';

interface Release {
  id: number;
  state: string;
}

interface ReleaseListProps {
  releases: Release[];
  onSelectRelease: (release: Release) => void;
  onNewRelease: () => void;
  selectedReleaseId: number | null;
  currentView: 'releaseDetail' | 'newRelease';
}

const HistoryList: React.FC<ReleaseListProps> = ({
  releases,
  onSelectRelease,
  onNewRelease,
  selectedReleaseId,
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
              selectedReleaseId === release.id ? 'active' : ''
            }`}
            onClick={() => onSelectRelease(release)}
          >
            {release.id} {i === 0 ? ' - Publisert' : '- Utgått'}
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
        Ny release
      </button>
    </div>
  );
};

export default HistoryList;

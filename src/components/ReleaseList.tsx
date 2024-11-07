import React from 'react';

interface Release {
  id: string;
  versionName: string;
  // Andre relevante felter
}

interface ReleaseListProps {
  releases: Release[];
  onSelectRelease: (release: Release) => void;
}

const ReleaseList: React.FC<ReleaseListProps> = ({ releases, onSelectRelease }) => {
  return (
    <div className="release-list">
      <h2>Alle Releases</h2>
      <ul>
        {releases.map(release => (
          <li key={release.id}>
            <button onClick={() => onSelectRelease(release)}>{release.versionName}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReleaseList;

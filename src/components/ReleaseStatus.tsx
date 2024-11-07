import React from 'react';

interface Release {
  id: string;
  versionName: string;
  // Andre relevante felter
}

interface ReleaseStatusProps {
  latestRelease: Release;
}

const ReleaseStatus: React.FC<ReleaseStatusProps> = ({ latestRelease }) => {
  return (
    <div className="release-status">
      <h2>Siste Release</h2>
      <p>Versjon: {latestRelease.versionName}</p>
      {/* Legg til annen relevant statusinformasjon */}
    </div>
  );
};

export default ReleaseStatus;


import { useEffect, useState } from "react";
import FileCategoryContainer from "./FileCategoryContainer";

const FileArray = [
  "Norsk Ekstensjon",
  "LM",
  "INC",
  "FD"
];

const ReleaseFilesContainer = () => {
  const [loadingBlobs, setLoadingBlobs] = useState<boolean>(true);

  useEffect(() => {
    // Simulert API-kall
    setLoadingBlobs(false);
  }, []);

  return (
    <div className="container my-4 p-3 bg-dark rounded">
      <h4 className="mb-4 text-white">Filpakker</h4>
      {loadingBlobs ? (
        <p>Laster inn filer...</p>
      ) : (
        <div className="d-flex flex-row justify-content-between">
          {/* 'Norsk Ekstensjon' er plassert alene */}
          <div className="flex-grow-1 me-4">
            <FileCategoryContainer derivat={false} fileCategory="Norsk Ekstensjon" />
          </div>

          {/* Resten av filkategoriene i en separat flexbox */}
          <div className="d-flex flex-row flex-wrap gap-3">
            {FileArray.slice(1).map((blobName) => (
              <FileCategoryContainer key={blobName} derivat={true} fileCategory={blobName} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReleaseFilesContainer;

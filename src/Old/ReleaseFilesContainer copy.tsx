import axios from "axios";
import { useEffect, useState } from "react";
import FileCategoryContainer from "./FileCategoryContainer";

interface Release {
    id: string;
    versionName: string;
    // Andre relevante felter
  }
  
  interface ReleaseFilesProps {
    release: Release;
  }

  interface ReleaseData {
    date: string;
    branch: string;
    shortName: string;
    baseUrl: string;
    version: number;
  }

  const FileArray = [
    "Norsk Ekstensjon",
    "LM",
    "ICN",
    "FD"
  ]
  
  const initialReleaseData: ReleaseData = {
    date: '20240915',
    branch: 'MAIN/SNOMEDCT-NO',
    shortName: 'SNOMEDCT-NO',
    baseUrl: 'https://demo.snowstorm.testafd.com/snowstorm/snomed-ct',
    version: 20241115,
  };
  
const ReleaseFilesContainer: React.FC<ReleaseFilesProps> = ({ release}) => {
const [releaseData, setReleaseData] = useState<ReleaseData>(initialReleaseData);
const [blobs, setBlobs] = useState<string[]>([]);
const [loadingBlobs, setLoadingBlobs] = useState<boolean>(true);

useEffect(() => {
    // Hent blobs for den valgte containeren (release)
    const fetchBlobs = async () => {
      try {
        const response = await axios.get('http://localhost:7071/api/listBlobsInContainer', {
          params: {
            containerName: release.versionName,
          },
        });
        setBlobs(response.data.blobs);
      } catch (error) {
        console.error('Feil ved henting av blobs:', error);
      } finally {
        setLoadingBlobs(false);
      }
    };
    fetchBlobs();
  }, [release.versionName]);



  const generateDerivatives = () => {
    const timestamp = new Date().toISOString();
    // Legg til logikk for å generere derivater
  };

  const deletePackages = () => {
    const timestamp = new Date().toISOString();
    // Legg til logikk for å slette pakker
  };
  return (
<div className="card p-3">
<h5>Filer i denne releasen</h5>
{loadingBlobs ? (
  <p>Laster inn filer...</p>
) : (
  <div className="d-flex row justify-content-evenly">
    {FileArray.map((blobName) => (
      <>
      <FileCategoryContainer key={blobName} fileCategory={blobName} />
      <div key={blobName} className="col-md-5 m-3 bg-secondary rounded">
        <h5 className="m-3 text-white">{blobName}</h5>
        <div className="status-indicator" />
      </div>
      </>
    ))}
    {/* {blobs.map((blobName) => (
      <div key={blobName} className="col-md-5 m-3 bg-secondary rounded">
        <h5 className="m-3 text-white">{blobName}</h5>
        <div className="status-indicator" />
      </div>
    ))} */}
  </div>
)}
<div className="action-buttons">
  <button onClick={generateDerivatives}>
    Generer derivater for {releaseData.date}
  </button>
  <button onClick={deletePackages} className="secondary">
    Slett pakke(r)
  </button>
</div>
</div>
)}

export default ReleaseFilesContainer;
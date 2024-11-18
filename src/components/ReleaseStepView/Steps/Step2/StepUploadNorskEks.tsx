import React, { useState, ChangeEvent } from 'react';
import { ReleaseIdProps } from '../../../../types/commonTypes';

const StepUploadNorskEks: React.FC<ReleaseIdProps> = ({ releaseId }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Function to handle file change
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Function to upload file
  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Vennligst velg en fil før du laster opp!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Filen ble lastet opp!');
      } else {
        alert('Noe gikk galt under opplastningen.');
      }
    } catch (error) {
      console.error('Feil ved opplastning:', error);
      alert('Kunne ikke laste opp filen.');
    }
  };

  return (
    <>
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseTwo"
          aria-expanded="false"
          aria-controls="collapseTwo"
        >
          ⬜ Steg 2 - Last opp norsk ekstensjon
        </button>
      </h2>
      <div
        id="collapseTwo"
        className="accordion-collapse collapse"
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">
          <label htmlFor="formFile" className="form-label fw-bold">
            Norsk ekstensjon
          </label>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="formFile"
              onChange={handleFileChange}
            />
            <button
              className="btn btn-dark"
              type="button"
              onClick={uploadFile}
              disabled={!selectedFile}
            >
              Last opp
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default StepUploadNorskEks;

import React, { useState, ChangeEvent } from 'react';
import { VersionIdProps } from '../../../../types/commonTypes';
import { useStoreContext } from '../../../../store/versionStore';

const StepUploadNorskEks: React.FC<VersionIdProps> = () => {
  const { actions } = useStoreContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { addNorskEkstensjon } = actions;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const uploadFile = async () => {
    if (!selectedFile) {
      alert('Vennligst velg en fil før du laster opp!');
      return;
    }
    setIsUploading(true);
    try {
      await addNorskEkstensjon(selectedFile);
      alert('Fil lastet opp suksessfullt!');
      setSelectedFile(null);
    } catch (error) {
      console.error('Feil under lasting av norsk ekstensjon:', error);
      alert('Feil under opplasting av fil.');
    } finally {
      setIsUploading(false);
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
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? 'Laster opp...' : 'Last opp'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepUploadNorskEks;

import React from "react";

interface FileCategoryProps {
  fileCategory: string;
  derivat: boolean;
}

const FileCategoryContainer: React.FC<FileCategoryProps> = ({ fileCategory, derivat }) => {
  return (
    <div className="card p-3 container">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-title mb-0">
              {fileCategory} {derivat ? " - derivat" : ""}
            </h6>
            <span className="status-indicator bg-success rounded-circle" style={{ width: "10px", height: "10px" }} />
          </div>
          <div className="mt-3">
            <button className="btn btn-dark w-100 mb-2">Generer</button>
            <button className="btn btn-dark w-100 mb-2">Last ned</button>
            <button className="btn btn-dark w-100">Slett</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCategoryContainer;

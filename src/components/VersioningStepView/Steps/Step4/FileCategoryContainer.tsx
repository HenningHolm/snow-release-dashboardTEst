import React from "react";

interface FileCategoryProps {
  fileCategory: string;
}

const FileCategoryContainer: React.FC<FileCategoryProps> = ({ fileCategory }) => {
  return (
    <div className="card p-3 container">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-title mb-0">
              {fileCategory}
            </h6>
            <span className="status-indicator bg-dark rounded-circle" style={{ width: "12px", height: "12px" }} />
          </div>
          <div className="mt-3">
            <button disabled className="btn btn-outline-dark w-100 mb-2">Last ned</button>
            <button disabled className="btn btn-outline-dark w-100 mb-2">Se logg</button>
            <button className="btn btn-outline-dark w-100">Generer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCategoryContainer;

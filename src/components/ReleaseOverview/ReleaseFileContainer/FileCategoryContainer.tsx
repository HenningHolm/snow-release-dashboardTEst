import React from "react";

interface FileCategoryProps {
  fileCategory: string;
}

const FileCategoryContainer: React.FC<FileCategoryProps> = ({ fileCategory }) => {
  return (
    <div className="card p-3" style={{ width: "200px" }}>
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="card-title mb-0">{fileCategory}</h6>
        <span className="status-indicator bg-success rounded-circle" style={{ width: "10px", height: "10px" }} />
      </div>
      <div className="mt-3">
        <button className="btn btn-dark w-100 mb-2">Generer</button>
        <button className="btn btn-dark w-100 mb-2">Se logg</button>
        <button className="btn btn-dark w-100 mb-2">Last ned</button>
        <button className="btn btn-dark w-100">Slett</button>
      </div>
    </div>
  );
};

export default FileCategoryContainer;

import React, { useState } from "react";
import FileCategoryContainer from "./FileCategoryContainer";
import { ReleaseIdProps } from "../../../types/commonTypes";

const fileCategories = [
  "Norsk Ekstensjon",
  "LM",
  "INC",
  "FD"
];

const ReleaseFilesFolder: React.FC<ReleaseIdProps> = ({ releaseId }) => {
  const [activeFileCategory, setActiveFileCategory] = useState(fileCategories[0]);

  return (
    <div className="container my-4 p-3 bg-dark rounded">
      <h4 className="mb-4 text-white">Filpakker</h4>
      <ul className="nav nav-tabs">
        {fileCategories.map((category) => (
          <li className="nav-item" key={category}>
            <a
              className={`nav-link ${activeFileCategory === category ? "active" : ""}`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setActiveFileCategory(category);
              }}
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-3">

        <FileCategoryContainer fileCategory={activeFileCategory} derivat={activeFileCategory !== "Norsk Ekstensjon"} />
      </div>
    </div>
  );
};

export default ReleaseFilesFolder;
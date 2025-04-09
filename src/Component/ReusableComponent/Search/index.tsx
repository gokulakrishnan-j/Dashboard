import React, { useState } from "react";
import { SearchProps } from "./interface";
import "./style.css";

const Search: React.FC<SearchProps> = ({ placeholder, onClick }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="inputContainer">
      <div className="childContainer">
        <div className="fieldContainer">
          <input
            id={placeholder}
            className="SearchInput"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
          />
          <svg
            onClick={() => onClick(value)}
            xmlns="http://www.w3.org/2000/svg"
            style={{
              backgroundColor: "#000",
              padding: "7.5px",
              border: "1px solid black",
            }}
            width="20"
            height="20"
            fill="#fff"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Search;

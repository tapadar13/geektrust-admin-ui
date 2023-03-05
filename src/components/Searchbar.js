import React, { useRef } from "react";
import "../styles/searchbar.css";

const Searchbar = ({ term, searchKeyword }) => {
  const inputElem = useRef("");

  const getSearchTerm = () => {
    searchKeyword(inputElem.current.value);
  };

  return (
    <div>
      <input
        ref={inputElem}
        type="text"
        placeholder="Search by name, email or role"
        value={term}
        onChange={getSearchTerm}
        className="search-bar"
      />
    </div>
  );
};

export default Searchbar;

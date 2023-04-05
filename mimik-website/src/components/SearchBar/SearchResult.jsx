import React from 'react'
import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You have selected ${result} voice!`)}
    >
      {result}
    </div>
  );
};

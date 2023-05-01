import React from 'react'
import "./SearchResult.css";

export const SearchResult = ({ result, callback }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => callback(false)}
    >
      {result}
    </div>
  );
};

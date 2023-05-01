import React from 'react'
import { SearchResult } from './SearchResult';
import "./searchresultlist.css";

export const SearchResultsList = ({ results, setModalActive }) => {
    return (
      <div className="results-list">
        {results.map((result, id) => {
          return <SearchResult result={result.name} callback={setModalActive} key={id} />;
        })}
      </div>
    );
  };
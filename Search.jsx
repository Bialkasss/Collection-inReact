import React from "react";

function Search({ search, onSearch }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search books"
        value={search}
        onChange={onSearch}
      />
    </div>
  );
}

export default Search;

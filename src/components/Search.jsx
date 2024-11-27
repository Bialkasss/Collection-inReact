import React from "react";

function Search({ search, onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search for a book..."
      value={search}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default Search;

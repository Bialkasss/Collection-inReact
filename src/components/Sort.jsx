import React from "react";

function Sort({ books, criteria, direction, onSortChange }) {
  const toggleDirection = (current) => (current === "asc" ? "desc" : "asc");

  const handleSort = (newCriteria) => {
    const newDirection = newCriteria === criteria ? toggleDirection(direction) : "asc";
    onSortChange(newCriteria, newDirection);
  };

  return (
    <div className="sort-buttons">
      <button onClick={() => handleSort("name")}>
        Sort by Name {criteria === "name" && (direction === "asc" ? "▲" : "▼")}
      </button>
      <button onClick={() => handleSort("rating")}>
        Sort by Rating {criteria === "rating" && (direction === "asc" ? "▲" : "▼")}
      </button>
    </div>
  );
}

export default Sort;

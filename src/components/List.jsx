import React from "react";
import Book from "./Book";

function List({ books, onDelete, onRatingChange }) {
  return (
    <div className="book-container">
      {books.map((book) => (
        <Book
          key={book.id}
          book={book}
          onDelete={() => onDelete(book.id)}
          onRatingChange={(id, newRating) => {
            onRatingChange(book.id, newRating);
          }}
        />
      ))}
    </div>
  );
}

export default List;

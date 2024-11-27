import React from "react";
import Book from "./Book";

function List({ books, onDelete, onRatingChange, search }) {
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(search)
  );

  return (
    <div className="book-container">
      {filteredBooks.map((book) => (
        <Book
          key={book.id}
          book={book}
          onDelete={() => onDelete(book.id)}
          onRatingChange={(id, rating) => onRatingChange(book.id, rating)}
        />
      ))}
    </div>
  );
}

export default List;

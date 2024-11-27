import React, { useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
import Search from "./components/Search";
import Sort from "./components/Sort";
import booksData from "./assets/books.json";

function App() {
  const [books, setBooks] = useState(booksData);
  const [newBook, setNewBook] = useState({
    name: "",
    description: "",
    rating: 1,
    image: { src: "", alt: "" },
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSearch = (term) => setSearchTerm(term);

  const handleAddBook = () => {
    if (newBook.name && newBook.description && newBook.image.src) {
      setBooks((prevBooks) => [
        ...prevBooks,
        { ...newBook, id: Date.now() },
      ]);
      setNewBook({ name: "", description: "", rating: 1, image: { src: "", alt: "" } });
      setIsFormVisible(false);
    }
  };

  const handleChange = (updater) => setNewBook(updater);

  const handleDelete = (id) => setBooks(books.filter((book) => book.id !== id));

  const handleSortChange = (criteria, direction) => {
    setSortCriteria(criteria);
    setSortDirection(direction);
  };

  const handleRatingChange = (id, newRating) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, rating: newRating } : book
      )
    );
  };

  // Filter books before passing to the List component
  const filteredBooks = books.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === "asc"
        ? a.rating - b.rating
        : b.rating - a.rating;
    }
  });

  return (
    <div className="container">
      <header>
        <h1>Book Collection</h1>
        <Search search={searchTerm} onSearch={handleSearch} />
      </header>

      <button className={`add-book-button ${isFormVisible ? "cancel" : ""}`} onClick={() => setIsFormVisible((prev) => !prev)}>
        {isFormVisible ? "Cancel" : "Add New Book"}
      </button>

      {isFormVisible && (
        <Form newBook={newBook} onChange={handleChange} onAddBook={handleAddBook} />
      )}

      <Sort
        books={filteredBooks}
        criteria={sortCriteria}
        direction={sortDirection}
        onSortChange={handleSortChange}
      />

      <List
        books={sortedBooks}
        onDelete={handleDelete}
        onRatingChange={handleRatingChange}
      />
    </div>
  );
}

export default App;

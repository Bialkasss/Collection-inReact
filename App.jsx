import React, { useState } from "react";
import List from "./components/List";
import Form from "./components/Form";
import Search from "./components/Search";
import booksData from "./assets/books.json"; // Import books data

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
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleAddBook = () => {
    if (newBook.name && newBook.description && newBook.image.src) {
      setBooks((prevBooks) => [...prevBooks, { ...newBook, id: Date.now() }]);
      setNewBook({ name: "", description: "", rating: 1, image: { src: "", alt: "" } });
      setIsFormVisible(false); // Hide form after adding book
      setIsButtonClicked(false); // Reset button color
    }
  };

  const handleChange = (updater) => {
    setNewBook(updater);
  };

  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleRatingChange = (id, rating) => {
    setBooks((prevBooks) => 
      prevBooks.map((book) =>
        book.id === id ? { ...book, rating: parseInt(rating) } : book
      )
    );
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setIsButtonClicked(!isButtonClicked);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const sortedBooks = [...books].sort((a, b) => {
    if (sortCriteria === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      return sortDirection === "asc" ? a.rating - b.rating : b.rating - a.rating;
    }
  });

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src="../public/book-icon.webp" alt="Book Icon" />
          <h1>Book Collection</h1>
        </div>
        <input
          type="text"
          placeholder="Search for a book..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </header>

      <button
        className={`add-book-button ${isButtonClicked ? "clicked" : ""}`}
        onClick={toggleFormVisibility}
      >
        {isFormVisible ? "Cancel" : "Add New Book"}
      </button>

      {isFormVisible && (
        <Form
          newBook={newBook}
          onChange={handleChange}
          onAddBook={handleAddBook}
        />
      )}

      <div className="sort-buttons">
        <button onClick={() => handleSortChange("name")}>
          Sort by Name {sortCriteria === "name" && (sortDirection === "asc" ? "▲" : "▼")}
        </button>
        <button onClick={() => handleSortChange("rating")}>
          Sort by Rating {sortCriteria === "rating" && (sortDirection === "asc" ? "▲" : "▼")}
        </button>
      </div>

      <List
        books={sortedBooks}
        onDelete={handleDelete}
        onRatingChange={handleRatingChange}
        search={searchTerm}
      />
    </div>
  );
}

export default App;

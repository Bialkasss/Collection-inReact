import React from "react";

function Form({ newBook, onChange, onAddBook }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("image.")) {
      const imageField = name.split(".")[1];
      onChange((prevBook) => ({
        ...prevBook,
        image: {
          ...prevBook.image,
          [imageField]: value,
        },
      }));
    } else {
      onChange((prevBook) => ({
        ...prevBook,
        [name]: value,
      }));
    }
  };

  return (
    <div className="add-book-form">
      <h2>Add a New Book</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onAddBook();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Book Title"
          value={newBook.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image.src"
          placeholder="Image URL"
          value={newBook.image.src}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image.alt"
          placeholder="Image Alt Text"
          value={newBook.image.alt}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Book Description"
          value={newBook.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={newBook.rating}
          onChange={handleChange}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default Form;

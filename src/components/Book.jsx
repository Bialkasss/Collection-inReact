import React, { useState } from "react";

function Book({ book, onDelete, onRatingChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(book.rating);

  React.useEffect(() => {
    setRating(book.rating); 
  }, [book.rating]);

  const handleRatingClick = () => {
    setIsEditing(true);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleRatingBlur = () => {
    if (rating >= 1 && rating <= 5) {
      setIsEditing(false);
      onRatingChange(book.id, rating); 
    } else {
      alert("Rating must be between 1 and 5.");
      setRating(book.rating); 
    }
  };

  const handleRatingKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRatingBlur(); 
    }
  };

  return (
    <div className="book-block">
      <div className="book-image-container">
        <img src={book.image.src} alt={book.image.alt} className="book-image" />
      </div>
      <h3 className="book-title">{book.name}</h3>
      <div className="book-rating">
        {isEditing ? (
          <input
            type="number"
            value={rating}
            onChange={handleRatingChange}
            onBlur={handleRatingBlur}
            onKeyPress={handleRatingKeyPress}
            min="1"
            max="5"
            className="rating-input"
            autoFocus
          />
        ) : (
          <span onClick={handleRatingClick}>{book.rating}</span>
        )}
      </div>
      <p className="book-description">{book.description}</p>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export default Book;

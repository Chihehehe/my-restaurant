import React, { useState } from 'react';
import styles from './FeedbackForm.module.css';
import StarFilled from '@ant-design/icons/StarFilled';

const FeedbackForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    onSubmit({ feedbackText });
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarFilled
          key={i}
          className={i <= rating ? styles.starActive : styles.starInactive}
          onClick={() => handleRatingChange(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div className={styles.feedbackFormContainer}>
      <form className={styles.feedbackForm} onSubmit={handleSubmit}>
        <h2>Send Feedback</h2>
        <div className={styles.starContainer}>{renderStars()}</div>
        <textarea
          className={styles.feedbackInput}
          value={feedbackText}
          onChange={handleFeedbackTextChange}
          placeholder="Enter your feedback..."
          rows={5}
        ></textarea>
        <button type="submit" className={styles.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";

const Feedback = () => {
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !description) {
      alert("Please select a rating and write a description.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  alert("User not logged in.");
  return;
}

const userId = user._id;

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/submitFeedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, rating, description }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Feedback Sent Successfully!");
        setRating("");
        setDescription("");
      } else {
        alert(data.msg || "Failed to send feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Please make sure your backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      <Header />

      <h2 className="desc-title">We Value Your Feedback</h2>

      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="rating-box">
          <label className="rate-label">Rate your experience ⭐⭐⭐⭐⭐</label>
        </div>

        <div className="options">
          <label>
            <input
              type="radio"
              value="Excellent"
              name="rate"
              checked={rating === "Excellent"}
              onChange={(e) => setRating(e.target.value)}
            />{" "}
            Excellent
          </label>
          <label>
            <input
              type="radio"
              value="Good"
              name="rate"
              checked={rating === "Good"}
              onChange={(e) => setRating(e.target.value)}
            />{" "}
            Good
          </label>
          <label>
            <input
              type="radio"
              value="Average"
              name="rate"
              checked={rating === "Average"}
              onChange={(e) => setRating(e.target.value)}
            />{" "}
            Average
          </label>
          <label>
            <input
              type="radio"
              value="Poor"
              name="rate"
              checked={rating === "Poor"}
              onChange={(e) => setRating(e.target.value)}
            />{" "}
            Poor
          </label>
        </div>

        <h3 className="desc-title">Description:</h3>

        <textarea
          className="desc-input"
          placeholder="Please share your thoughts about our LifeFit platform. Your feedback helps us improve our services and provide a better experience."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className="send-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Feedback"}
        </button>
      </form>

      <Footer />
    </div>
  );
};

export default Feedback;

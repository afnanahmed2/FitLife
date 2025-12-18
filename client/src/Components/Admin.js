import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Header from "./Header";
import Footer from "./Footer";
import "./styles.css";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [feedbacks, setFeedbacks] = useState([]);
  const [bookedClasses, setBookedClasses] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true);

  useEffect(() => {
    // Fetch feedbacks
    fetch(`${process.env.REACT_APP_SERVER_URL}/getAllFeedback`)
      .then(res => res.json())
      .then(data => {
        console.log("Feedback data from server:", data);
        setFeedbacks(data.feedbacks || []);
      })
      .catch(err => {
        console.error("Feedback fetch error:", err);
        setFeedbacks([]);
      })
      .finally(() => setLoadingFeedback(false));

    // Fetch booked classes
    fetch(`${process.env.REACT_APP_SERVER_URL}/getAllUsersBookedClasses`)
      .then(res => res.json())
      .then(data => setBookedClasses(data.users || []))
      .catch(err => {
        console.error("Booked classes fetch error:", err);
        setBookedClasses([]);
      })
      .finally(() => setLoadingClasses(false));
  }, []);

  return (
    <>
      <Header />
      <Container className="admin-page">
        <h2 className="admin-title">Admin Dashboard</h2>
        <p className="admin-text">Welcome {user?.name || "Admin"} 👋</p>

        {/* ==================== FEEDBACK BOX ==================== */}
        <div className="admin-box">
          <h3 className="box-title">All Feedbacks</h3>
          {loadingFeedback ? (
            <p>Loading feedbacks...</p>
          ) : feedbacks.length > 0 ? (
            <div className="feedback-cards">
              {feedbacks.map(fb => (
                <div key={fb._id} className="feedback-card-admin">
                <p>
                   <strong>User ID:</strong> {fb.userId}
                </p>
                  <p><strong>Rating:</strong> {fb.rating}</p>
                  <p><strong>Description:</strong> {fb.description}</p>
                  <p className="feedback-date">{new Date(fb.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "red" }}>No feedback available</p>
          )}
        </div>

        {/* ==================== BOOKED CLASSES BOX ==================== */}
        <div className="admin-box">
          <h3 className="box-title">All Booked Classes</h3>
          {loadingClasses ? (
            <p>Loading booked classes...</p>
          ) : bookedClasses.length > 0 ? (
            <div className="booked-classes-cards">
              {bookedClasses.map(u => (
                <div key={u._id} className="user-booked-section">
                  <h5 className="user-name">{u.name}</h5>
                  {u.bookedClasses.length > 0 ? (
                    <div className="classes-cards">
                      {u.bookedClasses.map((c, idx) => (
                        <div key={idx} className="class-card-admin">
                          <p><strong>Class:</strong> {c.className}</p>
                          <p><strong>Date:</strong> {c.date}</p>
                          <p><strong>Time:</strong> {c.time}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No booked classes.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Admin;

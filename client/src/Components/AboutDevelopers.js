import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import "./styles.css";

const AboutDevelopers = () => {
  const navigate = useNavigate();

  const developers = [
    {
      name: "AlZina Al-Kamyani",
      role: "Front-end Developer",
      contribution: "Designed and implemented the UI/UX of the project using React.",
    },
    {
      name: "Afnan & AlZina",
      role: "Database Designer",
      contribution: "Designed the database schema and handled data storage with MongoDB.",
    },
    {
      name: "Afnan Al-Subhi",
      role: "Server-side Developer",
      contribution: "Implemented server logic and APIs using Node.js and Express.",
    },
  ];

  const references = [
    "React Documentation - https://reactjs.org/docs/getting-started.html",
    "Redux Toolkit Documentation - https://redux-toolkit.js.org/",
    "Yup Validation Library - https://github.com/jquense/yup",
    "MDN Web Docs - https://developer.mozilla.org/",
    "Learning JavaScript Design Patterns by Addy Osmani",
    "Node.js Documentation - https://nodejs.org/en/docs/",
  ];

  return (
    <Container fluid style={{ backgroundColor: "#007f88", minHeight: "100vh", paddingBottom: "50px" }}>
      {/* navigation*/}
      <div
        className="back-arrow"
        style={{
          cursor: "pointer",
          margin: "20px",
          display: "flex",
          alignItems: "center",
          color: "#ffffffff",
          fontWeight: "bold",
        }}
        onClick={() => navigate("/Home")}
      >
        <FaArrowLeft size={24} />
        <span style={{ marginLeft: "8px" }}>Back to Home</span>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#ffffff" }}>
        About the Developers
      </h2>

      <Row style={{ justifyContent: "center", marginBottom: "30px" }}>
        {developers.map((dev, index) => (
          <Col lg="4" md="6" sm="12" key={index} style={{ marginBottom: "20px" }}>
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: "#ffffff",
                textAlign: "center",
              }}
            >
              <FaUserCircle size={50} style={{ marginBottom: "10px", color: "#007f88" }} />
              <h4 style={{ marginBottom: "5px", color: "#004d50" }}>{dev.name}</h4>
              <p style={{ fontWeight: "bold", marginBottom: "5px", color: "#004d50" }}>{dev.role}</p>
              <p style={{ fontSize: "14px", color: "#555" }}>{dev.contribution}</p>
            </div>
          </Col>
        ))}
      </Row>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3 style={{ marginBottom: "15px", textAlign: "center", color: "#007f88" }}>References Used</h3>
        <ul style={{ paddingLeft: "20px", color: "#004d50" }}>
          {references.map((ref, index) => (
            <li key={index} style={{ marginBottom: "8px" }}>
              {ref}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
};

export default AboutDevelopers;

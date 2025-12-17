import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import logo from "../images/logo.png";

function Welcome() {
  return (
    <div className="welcome-container">

      <div className="welcome-card">
        <img src={logo} alt="FitLife Logo" className="logo" />

        <h2 className="title">
          Welcome to <br /> FitLife Gym!
        </h2>
        
        <p className="subtitle">
          Your journey to strength, health, and confidence starts here!
        </p>
      </div>

      <div className="start-btn-container">
        <Link to="/login">
          <Button className="start-btn">start</Button>
        </Link>
      </div>

    </div>
  );
}

export default Welcome;

import React from "react";
import logo from "../images/logo.png";
import "./styles.css";
import {Link} from "react-router-dom";
function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <img src={logo} alt="FitLife Logo" className="header-logo" />
        <div className="header-text">
          <p className="header-line1">Push your limits and discover your strength.</p>
          <p className="header-line2">Train with passion and transform your body and mind.</p>
        </div>
      </div>

      <div className="header-right">
        <Link to="/Profile">Profile</Link>
        <Link to="/Feedback">Feedback</Link>
        <Link to="/aboutDevelopers">A Bout Developer</Link>
      </div>
    </header>
  );
}

export default Header;

import React from "react";
import "./styles.css";

function Footer() {
  return (
    <footer className="main-footer">
      <p>© 2025 FitLife Gym | All Rights Reserved To UTAS-Nizwa</p>
      <p>Software Engineering Students (AlZina - Afnan  )</p>

      <div className="footer-links">
        <a href="/home">🏠 Home</a> | 
        <a href="/MyClasses">💪 Classes</a> | 
        <a href="/MemberShip">🪪 Membership</a> |
        <a href="/CaloriesCalculater">🍎 Calorie Calculator</a>

      </div>
    </footer>
  );
}

export default Footer;

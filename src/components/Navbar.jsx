import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Style specyficzne dla paska nawigacji

const Navbar = ({ toggleDarkMode, darkMode }) => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
        <h1>
          Coin <span className="purple">Search</span>
        </h1>
      </Link>
      {/* Przycisk Dark Mode */}
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default Navbar;

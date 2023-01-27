import React from "react";
import './Header.css';

const Header = ({resourceType, onResourceTypeChange}) => (
  <header className="header">
    <nav className="menu">
      <button className={`menu__button ${(resourceType === "news" ? "active" : "")}`}
              onClick={() => onResourceTypeChange("news")}>
        news
      </button>
      <button className={`menu__button ${(resourceType === "show" ? "active" : "")}`}
              onClick={() => onResourceTypeChange("show")}>
        show
      </button>
      <button className={`menu__button ${(resourceType === "jobs" ? "active" : "")}`}
              onClick={() => onResourceTypeChange("jobs")}>
        jobs
      </button>
    </nav>
  </header>
);

export default Header;

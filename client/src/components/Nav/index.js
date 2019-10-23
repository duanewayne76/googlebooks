import React from "react";
import "./style.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Google Books
      </a>

      <a className="nav-link" href="/">Search</a>
      <a className="nav-link" href="/Saved">Saved</a>
    </nav>
  );
}

export default Nav;

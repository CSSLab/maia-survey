import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

const Header = () => {
  return (
    <div className="header-container">
      <h2>MAIA CHESS</h2>
      <div className="header-menu">
        <Link to="/turing">TURING</Link>
        <Link to="/recall">RECALL</Link>
        <Link to="/">LOGOUT</Link>
      </div>
    </div>
  );
};

export default Header;

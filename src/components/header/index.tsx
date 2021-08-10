import React from "react";
import { Link } from "react-router-dom";
import { UseAuthControllerHook } from "../../hooks/auth";

import "./styles.scss";

interface Props {
  authController: ReturnType<UseAuthControllerHook>;
}

const Header = ({
  authController: [userName, [login, authenticateWithLichess], logout],
}: Props) => {
  return (
    <div className="header-container">
      <h2>
        <Link to="/">MAIA CHESS</Link>
      </h2>
      <div className="header-menu">
        <Link to="/turing">TURING</Link>
        <Link to="/recall">RECALL</Link>
        <div className="auth-container">
          {userName ? (
            <p>
              LOGGED IN AS <span>{userName}</span>
            </p>
          ) : (
            <button onClick={login}>LOGIN AS GUEST</button>
          )}
          <div className="dropdown-menu">
            {userName && (
              <Link to="/" onClick={logout}>
                LOGOUT
              </Link>
            )}
            <button onClick={authenticateWithLichess}>
              AUTHENTICATE WITH LICHESS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

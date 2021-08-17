import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useInnerWidth } from "../../api";
import { UseAuthControllerHook } from "../../hooks/auth";

import "./styles.scss";

interface Props {
  authController: ReturnType<UseAuthControllerHook>;
}

const Header = ({
  authController: [userName, [login, authenticateWithLichess], logout],
}: Props) => {
  const width = useInnerWidth();
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);

  return width <= 750 ? (
    <div className="header-container">
      <h2>
        <Link to="/">MAIA CHESS</Link>
      </h2>
      <div className="auth-container">
        <button onClick={toggleMenu}>=</button>
        <div className={showMenu ? "dropdown-menu-open " : "dropdown-menu"}>
          <Link to="/turing">TURING</Link>
          <Link to="/recall">RECALL</Link>
          {userName ? (
            <Link to="/" onClick={logout}>
              LOGOUT
            </Link>
          ) : (
            <Link to="/" onClick={login}>
              LOGIN
            </Link>
          )}
          <button onClick={authenticateWithLichess}>
            AUTHENTICATE WITH LICHESS
          </button>
        </div>
      </div>
    </div>
  ) : (
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

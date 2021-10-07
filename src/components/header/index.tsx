import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useInnerWidth } from "../../hooks";
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = useCallback(() => setShowMenu(!showMenu), [showMenu]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return width <= 750 ? (
    <div className="header-container">
      <h2>
        <Link to="/">MAIA CHESS</Link>
      </h2>
      <div className="auth-container">
        <button ref={buttonRef} onClick={toggleMenu}>
          <svg viewBox="0 0 100 50" width="20" height="20" fill="#cfe4e4">
            <rect width="100" height="7" rx="5" />
            <rect y="30" width="100" height="7" rx="5" />
            <rect y="60" width="100" height="7" rx="5" />
          </svg>
        </button>
        <div
          className={showMenu ? "dropdown-menu-open" : "dropdown-menu-closed"}
        >
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

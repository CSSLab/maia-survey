import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AUTH_STATUS_LOGGED_OUT, JWT_AUTH_STATUS } from "./api";
import "./App.css";
import { Footer, Header, TuringInstructions } from "./components";
import useAuthController from "./hooks/auth";
import { Turing, Home } from "./routes";

import "./styles/foundation/_base.scss";

import footerContent from "./content/footer";
import { SHOW_TURING_INSTRUCTIONS, useModalController } from "./hooks";

function App() {
  const authController = useAuthController();
  const [userName, [login]] = authController;
  const turingModalController = useModalController(SHOW_TURING_INSTRUCTIONS);

  useEffect(() => {
    if (localStorage.getItem(JWT_AUTH_STATUS) !== AUTH_STATUS_LOGGED_OUT)
      login();
  }, [login]);

  return (
    <Router>
      <div className="base">
        <Header authController={authController} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/turing" exact>
            {(!userName || turingModalController[0][0]) && (
              <TuringInstructions
                authController={authController}
                modalController={turingModalController}
              />
            )}
            <Turing modalController={turingModalController} />
          </Route>
        </Switch>
        <Footer>{footerContent}</Footer>
      </div>
    </Router>
  );
}

export default App;

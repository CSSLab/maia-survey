import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components";
import { Turing } from "./routes";

import "./styles/foundation/_base.scss";

function App() {
  return (
    <Router>
      <div className="base">
        <Header />
        <Switch>
          <Route path="/" exact>
            <h1>Maia Survey</h1>
          </Route>
          <Route path="/turing" exact>
            <Turing />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

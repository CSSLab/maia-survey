import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <h1>About</h1>
          </Route>
          <Route path="/">
            <h1>Maia Survey</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

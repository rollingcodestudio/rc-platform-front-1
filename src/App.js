import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";

const App = () => {
  return(
    <>
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <Login />
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
    </>
  )
};

export default App;

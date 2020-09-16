import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Regpassword from "./resetpass/Regpassword";

const App = () => {
  return(
    <>
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <Login />
          </Route>
          <Route exact path={"/dashboard"}>
            <Dashboard />
          </Route>
          <Route exact path={"/regpass"}>
            <Regpassword />
          </Route>
        </Switch>
      </Router>
    </>
  )
};

export default App;

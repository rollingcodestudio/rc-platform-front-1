import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from './firebase';
import "./App.css";
import Authentication from "./pages/authentication/Authentication";
import Dashboard from "./pages/dashboard/Dashboard";
import Regpassword from "./pages/regeneratePassword/Regpassword";
import RCSpinner from "./components/Spinner/RCSpinner";

const App = () => {

  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {

    auth.onAuthStateChanged(user => {
      if (user) {
        setTimeout(() => {
          setFirebaseUser(user);
        }, 2000);

      } else {
        setTimeout(() => {
          setFirebaseUser(null);
        }, 2000);
      }
    })

  }, []);

  return firebaseUser !== false ? (
    <>
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <Authentication />
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

    :

    <RCSpinner />
}

export default App;






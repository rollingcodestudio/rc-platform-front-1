import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { auth } from './firebase';
import "./App.css";
import Login from "./pages/authentication/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Regpassword from "./pages/resetpass/Regpassword";
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

    :

    <RCSpinner />
}

export default App;






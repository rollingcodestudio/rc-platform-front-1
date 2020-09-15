import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import { auth } from "./firebase";

const App = () => {


  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(() => {

    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    })

  }, []);

  

  return firebaseUser !== false ?  (
    <>
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={"/"}>
            <Login />
          </Route>
          <Route exact path={"/admin-dashboard"}>
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
    </>
  )

  :
  <p>Cargando</p>
};

export default App;

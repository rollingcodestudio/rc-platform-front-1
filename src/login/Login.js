import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from "../firebase";
import Alert from '../components/Alert/Alert';
import logo from '../image/logorolling.png';
import RCSpinner from '../components/Spinner/RCSpinner';
import './login.css';
import cerrar from '../image/cerrar.png';

const Login = (props) => {

  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [regpass, setRegPass] = useState("");
  const [alertRegPassVisible, setAlertRegPassVisible] = useState(false);
  const [alertRegPassIsError, setAlertRegPassIsError] = useState(false);
  const [alertRegPassErrorMsg, setAlertRegPassErrorMsg] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const inputRef = useRef(null);

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  const handleChangeRegpass = (e) => {
    setRegPass(e.target.value);
  }

  useEffect(() => {

    inputRef.current.focus();

  }, []);

  const handleRegPass = async (e) => {

    setSpinner(true);
    e.preventDefault();
    
    try {
        await auth.sendPasswordResetEmail(regpass);
        setAlertRegPassErrorMsg("We send you an email so you can choose your new password");
        setAlertRegPassIsError(false);
        setAlertRegPassVisible(true);
        setSpinner(false);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setAlertRegPassErrorMsg("There is no user record corresponding to this identifier.");
        setAlertRegPassIsError(true);
        setAlertRegPassVisible(true);
        setSpinner(false);
        return;
      }
    }
  }

  const handleAuth = async (e) => {

    setSpinner(true);

    e.preventDefault();

    try {
      const resplogin = await auth.signInWithEmailAndPassword(login.email.trim(), login.password.trim())
      setLogin({
        email: "",
        password: ""
      });
      if (resplogin.user.uid) {
        props.history.push("/dashboard");
      }
      setSpinner(false);
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-password" || error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
        setErrorMsg("Verifique la información e intente nuevamente.");
        setIsError(true);
        setAlertVisible(true);
      }
    }
    setLogin({
      loginemail: "",
      loginpassword: ""
    });
    setSpinner(false);
  }

  const handleModal = () =>{
    setModal(true)
  }

  const handleClosemodal = () =>{
    setModal(false)
  } 

  return (
    <>
      {spinner ? <RCSpinner /> : ""}
      <div className="containerlogin">
        <div className="d-flex justify-content-around colorcont">
          <div className="login">
            <h4 className="text-white mb-4">Login</h4>
            <form onSubmit={handleAuth}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" ref={inputRef} className="form-control" autoComplete="off" value={login.email} name="email" id="loginemail" onChange={handleChange} aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" autoComplete="off" value={login.password} name="password" onChange={handleChange} id="loginpassword" />
              </div>
              <div>
                <a href="/#" onClick={handleModal} className="text-decoration-none" data-toggle="modal" data-target="#regpassModal"><p className="tamanorememberpass">¿Olvidaste tu contraseña?</p></a>
              </div>
              {<Alert isVisible={alertVisible} isError={isError} errorMsg={errorMsg} />}
              <button type="submit" className="mt-4 btn btn-outline-light btn-block">Login</button>
            </form>
            <div className="modal fade" data-backdrop="static" id="regpassModal" aria-hidden="true">
              {spinner ? <RCSpinner /> : ""}
              <a href="/#" data-dismiss="modal">
                <div onClick={handleClosemodal}>
                  <img src={cerrar} alt="" className="cerraricon" />
                </div>
              </a>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <h6>Enter your email to regenerate your password.</h6>
                    <form onSubmit={handleRegPass}>
                      <div className="form-group mt-4">
                        <label>Email</label>
                        <input value={regpass} type="email" className="form-control" autoComplete="off" onChange={handleChangeRegpass} />
                      </div>
                      {<Alert isVisible={alertRegPassVisible} isError={alertRegPassIsError} errorMsg={alertRegPassErrorMsg} />}
                      <button type="submit" className="mt-4 btn btn-outline-light btn-block">Enviar</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {spinner || modal ? <div></div> : <div className="barra"></div>}
          <div className="logocontainer">
            <div className="d-flex justify-content-center mb-4">
              <img src={logo} alt="" className="logo" />
            </div>
            <div className="d-flex justify-content-center">
              <h3>CAMPUS ROLLING CODE</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app'
import { auth } from "../../firebase";
import Alert from '../../components/Alert/Alert';
import logo from '../../image/logorolling.png';
import RCSpinner from '../../components/Spinner/RCSpinner';
import './login.css';
import cerrar from '../../image/cerrar.png';
import face from '../../image/facebook.png';


const Login = (props) => {

  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [regpass, setRegPass] = useState("");
  const [alertRegPassVisible, setAlertRegPassVisible] = useState(false);
  const [alertRegPassIsError, setAlertRegPassIsError] = useState(false);
  const inputEmailRef = useRef(null);
  const [alertRegPassErrorMsg, setAlertRegPassErrorMsg] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
 


  useEffect(() => {

    inputEmailRef.current.focus();

  }, []);


  const handleChangeAuth = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }


  const handleChangeRegpass = (e) => {
    setRegPass(e.target.value);
  }


  const handleRegPass = async (e) => {

    setSpinner(true);
    e.preventDefault();

    try {
      await auth.sendPasswordResetEmail(regpass);
      setAlertRegPassErrorMsg("Te enviamos un correo electrónico para que restablezcas tu contraseña.");
      setAlertRegPassIsError(false);
      setAlertRegPassVisible(true);
      setSpinner(false);
    } catch (error) {
      console.log(error)
      if (error.code === "auth/user-not-found") {
        setAlertRegPassErrorMsg("No encontramos ningún usuario con el correo electrónico ingresado.");
        setAlertRegPassIsError(true);
        setAlertRegPassVisible(true);
        setSpinner(false);
        return;
      }
      if (error.code === "auth/too-many-requests") {
        setAlertRegPassErrorMsg("Debido a reiterados intentos, por su seguridad hemos bloqueado tu solicitud. Inténtalo nuevamente mas tarde.");
        setAlertRegPassIsError(true);
        setAlertRegPassVisible(true);
        setSpinner(false);
        return;
      }
    }
  }


  const handleAuth = async (e) => {

    e.preventDefault();
    setSpinner(true);

    if(!login.email.trim() || !login.email.trim()){
      setErrorMsg("Verifique la información e intente nuevamente.");
      setIsError(true);
      setAlertVisible(true);
      scrollDown();
      setSpinner(false);
      return
    }

    try {
      const resplogin = await auth.signInWithEmailAndPassword(login.email.trim(), login.password.trim())
      setLogin({
        email: "",
        password: ""
      });
      if (resplogin.user.uid) {
        props.history.push("/dashboard");
        setLogin({
          email: "",
          password: ""
        });
      }
      setSpinner(false);
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-password" || error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
        setErrorMsg("Verifique la información e intente nuevamente.");
        setIsError(true);
        setAlertVisible(true);
        scrollDown();
      }
    }
    setSpinner(false);
  }


  const handleModal = () => {
    setModal(true)
  }


  const handleClosemodal = () => {
    setModal(false)
  }

  const scrollDown = (h = window.pageYOffset) => {
    let i = h || 0;
    if (i < 50) {
      setTimeout(() => {
        window.scrollTo(0, i);
        scrollDown(i + 1);
      }, 3);
    }
  }


  const handleSigninwithface = async (e) => {
    e.preventDefault()
    var provider = new firebase.auth.FacebookAuthProvider();
    console.log(provider)
    
    try {
      const resplogin = await auth.signInWithPopup(provider)
      console.log(resplogin)
      if (resplogin.user.uid) {
        props.history.push("/dashboard");
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <div className="containerlogin">
        <div className="colorcont d-block d-md-flex">
        { spinner ? <RCSpinner /> : "" }
          <div className="logocontainer">
            <div className="d-flex justify-content-center mb-4">
              <img src={logo} alt="" className="logo" />
            </div>
            <div className="d-flex justify-content-center">
              <h4 className="text-center">Bienvenidx a Campus <br /> Rolling Code</h4>
            </div>
          </div>
          { spinner || modal ? <div></div> : <div className="barra"></div> }
          <div className="login ">
            <h5 className="text-white mb-4 textiniciar">Iniciar sesión</h5>
            <form onSubmit={ handleAuth }>
              <div className="form-group">
                <label>Email</label>
                <input type="email" ref={inputEmailRef} className="form-control" autoComplete="off" value={login.email} name="email" onChange={handleChangeAuth} aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" autoComplete="off" value={login.password} name="password" onChange={handleChangeAuth} />
              </div>
              <div>
                <a href="/#" onClick={handleModal} className="text-decoration-none" data-toggle="modal" data-target="#regpassModal"><p className="tamanorememberpass">¿Olvidaste tu contraseña?</p></a>
              </div>
              { <Alert isVisible={alertVisible} isError={isError} errorMsg={errorMsg} /> }
              <button type="submit" className="mt-4 btn btn-outline-light btn-block">Iniciar sesión</button>
              <button type="button" onClick={handleSigninwithface} className="mt-3 btn btn-info btn-block"><img className="positionface" src={face} alt=""/> Iniciar sesión con Facebook</button>
            </form>
            <div className="modal fade" data-backdrop="static" id="regpassModal" aria-hidden="true">
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
                      { <Alert isVisible={alertRegPassVisible} isError={alertRegPassIsError} errorMsg={alertRegPassErrorMsg } />}
                      <button type="submit" className="mt-4 btn btn-outline-light btn-block">Enviar</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
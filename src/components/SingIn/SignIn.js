import React, { useState } from 'react';
import firebase from 'firebase/app'
import cerrar from '../../image/cerrar.png';
import face from '../../image/facebook.png';
import Alert from '../Alert/Alert';
import './signin.css';
import { auth } from "../../firebase";
import { withRouter } from 'react-router-dom';


const SignIn = (props) => {

  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertRegPassVisible, setAlertRegPassVisible] = useState(false);
  const [alertRegPassIsError, setAlertRegPassIsError] = useState(false);
  const [alertRegPassErrorMsg, setAlertRegPassErrorMsg] = useState("");
  const [regpass, setRegPass] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const handleChangeAuth = ({ target }) => setLogin({ ...login, [target.name]: target.value, });

  const handleSubmitAuth = async (e) => {

    e.preventDefault();
    handleSpinner(true);

    if (!login.email.trim() || !login.email.trim()) {
      handleAuthAlert("Verifique la información e intente nuevamente.", true, true)
      handleSpinner(false);
      return
    }

    try {
      const resp = await auth.signInWithEmailAndPassword(login.email.trim(), login.password.trim())
      if (resp.user.uid) {
        props.history.push("/dashboard");
        clearAuthState();
      }
      handleSpinner(false);
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-password" || error.code === "auth/user-not-found" || error.code === "auth/invalid-email") {
        handleAuthAlert("Verifique la información e intente nuevamente.", true, true);
        clearAuthState();
      }
    }
    handleSpinner(false);
  }


  const handleChangeRegpass = ({ target }) => setRegPass(target.value);

  const handleSubmitRegPass = async (e) => {

    e.preventDefault();
    handleSpinner(true);

    if(!regpass){
      handleRegPassAlert("Ingresá tu correo electrónico.", true, true);
      handleSpinner(false);
      return
    }

    try {
      await auth.sendPasswordResetEmail(regpass);
      handleRegPassAlert("Te enviamos un correo electrónico para que restablezcas tu contraseña.", false, true);
      handleSpinner(false);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        handleRegPassAlert("No encontramos ningún usuario con el correo electrónico ingresado.", true, true)
        handleSpinner(false);
        return;
      }
      if (error.code === "auth/too-many-requests") {
        handleRegPassAlert("Debido a reiterados intentos, por su seguridad hemos bloqueado tu solicitud. Inténtalo nuevamente mas tarde.", true, true);
        handleSpinner(false);
        return;
      }
    }
  }

  const handleHiddenDivider = () => {
    if (props.modalState) {
      props.handleHiddenDivider(false);
      return
    }
    props.handleHiddenDivider(true);
  }

  const handleAuthentication = (e) => {
    e.preventDefault();
    props.handleSwitchAuth(true);
  }

  const handleSignInWhitFacebook = async (e) => {

    e.preventDefault()
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const resp = await auth.signInWithPopup(provider);
      if (resp.user.uid) {
        props.history.push("/dashboard");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSpinner = (isActive) => props.handleSpinner(isActive);

  const handleAuthAlert = (message, isError, alertVisible) => {
    setErrorMsg(message);
    setIsError(isError);
    setAlertVisible(alertVisible);
  }

  const handleRegPassAlert = (message, isError, alertVisible) => {
    setAlertRegPassErrorMsg(message);
    setAlertRegPassIsError(isError);
    setAlertRegPassVisible(alertVisible);
  }

  const clearAuthState = () => {
    setLogin({
      email: "",
      password: ""
    });
  }


  return (
    <>
      <div className="login col-lg-4 col-md-6 col-sm-12">
        <h5 className="text-white mb-4 textiniciar">Iniciar sesión</h5>
        <form onSubmit={handleSubmitAuth}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" autoComplete="off" value={login.email} name="email" onChange={handleChangeAuth} aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" className="form-control" autoComplete="off" value={login.password} name="password" onChange={handleChangeAuth} />
          </div>
          <div>
            <a href="/#" onClick={handleHiddenDivider} className="text-decoration-none" data-toggle="modal" data-target="#regpassModal"><p className="tamanorememberpass">¿Olvidaste tu contraseña?</p></a>
          </div>
          {<Alert isVisible={alertVisible} isError={isError} errorMsg={errorMsg} />}
          <button type="submit" className="mt-4 btn btn-outline-light btn-block">Iniciar sesión</button>
          <button type="button" onClick={handleSignInWhitFacebook} className="mt-3 btn btn-info btn-block"><img className="positionface" src={face} alt="" /> Iniciar sesión con Facebook</button>
          <div>
            <a href="/#" type="submit" onClick={handleAuthentication} className="text-decoration-none"><p className="tamanorememberpass">¿Necesitas una cuenta? Regístrate ahora</p></a>
          </div>
        </form>
        <div className="modal fade" data-backdrop="static" id="regpassModal" aria-hidden="true">
          <a href="/#" data-dismiss="modal">
            <div onClick={handleHiddenDivider}>
              <img src={cerrar} alt="" className="cerraricon" />
            </div>
          </a>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <h6>Enter your email to regenerate your password.</h6>
                <form onSubmit={handleSubmitRegPass}>
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
    </>
  );
};

export default withRouter(SignIn);
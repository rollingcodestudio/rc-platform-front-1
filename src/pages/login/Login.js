import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app'
import { auth } from "../../firebase";
import Alert from '../../components/Alert/Alert';
import RCSpinner from '../../components/Spinner/RCSpinner';
import './login.css';
import cerrar from '../../image/cerrar.png';
import face from '../../image/facebook.png';
import logo from '../../image/logorolling.png';


const Login = (props) => {

  const [modal, setModal] = useState(false);
  const [registerClass, setRegisterClass] = useState('register');
  const [isSucces, setIsSucces] = useState(false);
  const [isVisibleRegister, setIsVisibleRegister] = useState(false);
  const [isErrorReg, setIsErrorReg] = useState(false);
  const [errorMsgReg, setErrorMsgReg] = useState("");
  const [spinner, setSpinner] = useState(false); 
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [regpass, setRegPass] = useState("");
  const [alertRegPassVisible, setAlertRegPassVisible] = useState(false);
  const [alertRegPassIsError, setAlertRegPassIsError] = useState(false);
  const [isregister, setIsregister] = useState(true);
  const inputEmailRef = useRef(null);
  const [alertRegPassErrorMsg, setAlertRegPassErrorMsg] = useState("");
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
    const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  });

  /*
  useEffect(() => {

    inputEmailRef.current.focus();

  }, []);
  */

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

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleReg = async (e) => {

    e.preventDefault()

    if (!data.email || !data.password || !data.confirmpassword) {
      setIsSucces(false)
      setIsVisibleRegister(true);
      setErrorMsgReg("It is necessary to complete all the fields.");
      setIsErrorReg(true);
      return
    }

    if (data.confirmpassword !== data.password) {
      setIsSucces(false);
      setIsVisibleRegister(true);
      setErrorMsgReg("Passwords do not match.");
      setIsErrorReg(true);
      return;
    }

    try {
      const resp = await auth.createUserWithEmailAndPassword(data.email, data.password);
      if (resp) {
        setIsSucces(true);
        // addAdmin();
        setErrorMsg('You registered successfully, you can now log in.')
        setIsError(false);
        setIsVisibleRegister(false);
        setData({
          email: "",
          password: "",
          confirmpassword: ""
        });
        setLogin({
          loginemail: "",
          loginpassword: ""
        });
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setIsSucces(false);
        setIsVisibleRegister(true);
        setErrorMsgReg("The email address is already in use by another account.");
        setIsErrorReg(true);
      }
      if (error.code === "auth/invalid-email") {
        setIsSucces(false);
        setIsVisibleRegister(true);
        setErrorMsgReg("The email format is not correct.");
        setIsErrorReg(true);
      }
      if (error.code === "auth/invalid-password") {
        setIsSucces(false);
        setIsVisibleRegister(true);
        setErrorMsgReg("Invalid password.");
        setIsErrorReg(true);
      }
      if (error.code === "auth/weak-password") {
        setIsSucces(false);
        setIsVisibleRegister(true);
        setErrorMsgReg("Password should be at least 6 characters.");
        setIsErrorReg(true);
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
    const provider = new firebase.auth.FacebookAuthProvider();
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

  const handleSignup = () =>{
    setIsregister(false)
  }

  const handleSignin = () =>{
    setIsregister(true)
  }


  return (
    <>
      <div className="containerlogin">
        <div className="colorcont d-block d-md-flex">
        { spinner ? <RCSpinner /> : "" }
          <div className="d-flex justify-content-center col-lg-4 col-md-6 col-sm-12">
            <img src={logo} alt="" className="h-25 positionlogo"/>
          </div>
          { spinner || modal ? <div></div> : <div className="barra"></div> }
          { isregister ? 
          <div className="login col-lg-4 col-md-6 col-sm-12">
            <h5 className="text-white mb-4 textiniciar">Iniciar sesión</h5>
            <form onSubmit={ handleAuth }>
              <div className="form-group">
                <label>Email</label>
                <input type="email" ref={inputEmailRef} className="form-control" autoComplete="off" value={login.email} name="email" onChange={handleChangeAuth} aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" className="form-control" autoComplete="off" value={login.password} name="password" onChange={handleChangeAuth} />
              </div>
              <div>
                <a href="/#" onClick={handleModal} className="text-decoration-none" data-toggle="modal" data-target="#regpassModal"><p className="tamanorememberpass">¿Olvidaste tu contraseña?</p></a>
              </div>
              { <Alert isVisible={alertVisible} isError={isError} errorMsg={errorMsg} /> }
              <button type="submit" className="mt-4 btn btn-outline-light btn-block">Iniciar sesión</button>
              <button type="button" onClick={handleSigninwithface} className="mt-3 btn btn-info btn-block"><img className="positionface" src={face} alt=""/> Iniciar sesión con Facebook</button>
              <div>
                <a href="/#" onClick={handleSignup} className="text-decoration-none"><p className="tamanorememberpass">¿Necesitas una cuenta? Regístrate ahora</p></a>
              </div>
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
          : 
          <div className="col-lg-4 col-md-6 col-sm-12 register">
            <h5 className="text-white mb-4">Registro</h5>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email</label>
                <input type="email" value={data.email} className="form-control" autoComplete="off" onChange={handleChange} name="email" id="email" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Contraseña</label>
                <input type="password" value={data.password} className="form-control" autoComplete="off" onChange={handleChange} name="password" id="password" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Confirmar contraseña</label>
                <input type="password" value={data.confirmpassword} className="form-control" autoComplete="off" onChange={handleChange} name="confirmpassword" id="confirmpassword" />
              </div>
              {isSucces ? '' : <Alert isVisible={isVisibleRegister} isError={isErrorReg} errorMsg={errorMsgReg} />}
              <button type="button" className="mt-4 btn btn-outline-light btn-block" onClick={handleReg}>Registrarme</button>
              <div>
                <a href="/#" onClick={handleSignin} className="text-decoration-none"><p className="tamanorememberpass">¿Ya tenes tu cuenta? Inicia sesión.</p></a>
              </div>
            </form>
          </div>
          }
        </div>
      </div>
    </>
  );
};

export default withRouter(Login);
import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from "../firebase";
import Alert from '../components/Alert/Alert';
import logo from '../image/logorolling.png';
import './login.css';
import cerrar from '../image/cerrar.png';

const Login = (props) => {
  const [regpass, setRegPass] = useState("");
  const [loginClass, setLoginClass] = useState('login');
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorDanger, setIsErrorDanger] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [isErrorSuccess, setIsErrorSuccess] = useState(false);
  const [isVisibleLogin, setIsVisibleLogin] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmpassword: ""
  });
  const [login, setLogin] = useState({
    loginemail: "",
    loginpassword: ""
  });
  const inputRef = useRef(null);

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
    setRegPass({
      [e.target.name]: e.target.value,
  })
  console.log(regpass)
  }


  useEffect(() => {

    if (isEditing) {
      inputRef.current.focus();
    }     
  }, [isEditing]);


  const handleRegPass = async (e) => {
    try {
        const respregpass = await auth.sendPasswordResetEmail(regpass.regpass)
        if(respregpass === undefined){             
            setIsErrorSuccess(true);
            setIsErrorDanger(false);
        }
        console.log(regpass)
        console.log(respregpass)
    } catch (error) {
        if(error.code === "auth/user-not-found"){
            setErrorMsg("There is no user record corresponding to this identifier.");                
            setIsErrorDanger(true);
            setIsErrorSuccess(false);
        }
        console.log(error)
    }
}


  const handleClick = async (e) => {
    try {
      const resplogin = await auth.signInWithEmailAndPassword(login.loginemail.trim(), login.loginpassword.trim())
      setLogin({
        loginemail: "",
        loginpassword: ""
      })

      if (resplogin.user.uid) {
        props.history.push("/admin-dashboard")
      }

    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setIsVisibleLogin(true)
        setIsSucces(false);
        setErrorMsg("The password is invalid or the user does not have a password.");
        setIsError(true);
      }
      if (error.code === "auth/invalid-password") {
        setIsVisibleLogin(true)
        setIsSucces(false);
        setErrorMsg("Invalid password.");
        setIsError(true);
      }
      if (error.code === "auth/user-not-found") {
        setIsVisibleLogin(true)
        setIsSucces(false);
        setErrorMsg("Invalid user.");
        setIsError(true);
      }
      if (error.code === "auth/user-not-found") {
        setIsVisibleLogin(true)
        setIsSucces(false);
        setErrorMsg("Invalid user.");
        setIsError(true);
      }
      if (error.code === "auth/invalid-email") {
        setIsVisibleLogin(true)
        setIsSucces(false);
        setErrorMsg("Invalid user.");
        setIsError(true);
      }

    }
    setLogin({
      loginemail: "",
      loginpassword: ""
    });
  }

  const handleShowSignUp = () => {

    setLoginClass('login traslationLoginReverse');
    setShowSignUp(false);
    setLogin({
      loginemail: "",
      loginpassword: ""
    });
    setIsVisibleLogin(false);
  }


  return (
    <div className="containerlogin">
      <div className="d-flex justify-content-around colorcont">
        <div className={loginClass}>
          <h4 className="text-white mb-4">Login</h4>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" ref={inputRef} autoComplete="off" value={login.loginemail} name="loginemail" id="loginemail" onChange={handleChange} aria-describedby="emailHelp" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" autoComplete="off" value={login.loginpassword} name="loginpassword" onChange={handleChange} id="loginpassword" />
            </div>
            <div>
            <a href="" className="text-decoration-none" data-toggle="modal" data-target="#exampleModal"><p className="tamanorememberpass">¿Olvidaste tu contraseña?</p></a>
            </div>
            {<Alert isVisible={isVisibleLogin} isError={isError} errorMsg={errorMsg} />}
            <button type="button" onClick={handleClick} class="mt-4 btn btn-outline-light btn-block">Login</button>
            {
              showSignUp ? <button type="button" onClick={handleShowSignUp} class="mt-3 btn btn-outline-light btn-block">Sign Up</button> : ''
            }

          </form>
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="" data-dismiss="modal">
              <img src={cerrar} alt="" className="cerraricon" />
            </div>
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body">
                  <h6>Enter your email to regenerate your password.</h6>
                  <form>
                    <div class="form-group mt-4">
                      <label for="exampleInputEmail1">Email</label>
                      <input value={regpass.regpass} type="email" class="form-control" name="regpass" id="regpass" onChange={handleChange} aria-describedby="emailHelp" />
                    </div>
                    {isErrorDanger ? <p className="text-danger fontmsg">{errorMsg}</p> : ""}
                    {isErrorSuccess ? <p className="text-success fontmsg">We send you an email so you can choose your new password</p> : ""}
                    <button type="button" onClick={handleRegPass} class="mt-4 btn btn-outline-light btn-block">Enviar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="barra"></div>
        <div className="logocontainer">
          <div className="d-flex justify-content-center mb-4">
            <img src={logo} alt="" className="logo"/>
          </div>
          <div className="d-flex justify-content-center">
            <h3>CAMBIÁ TU FUTURO</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
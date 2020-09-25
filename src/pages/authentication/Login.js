import React, { useState } from 'react';
import RCSpinner from '../../components/Spinner/RCSpinner';
import './login.css';
import logo from '../../image/logorolling.png';
import SignIn from '../../components/SingIn/SignIn';
import SignUp from '../../components/SignUp/SignUp';


const Login = () => {

  const [modal, setModal] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [isregister, setIsregister] = useState(false);

  const handleHiddenDivider = (isActive) => {
    setModal(isActive)
  }

  const handleAuthentication = (isRegister) => {
    setIsregister(isRegister)
  }

  const handleSpinner = (isSpinner) => {
    setSpinner(isSpinner)
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
          <SignUp handleAuthentication={handleAuthentication} handleSpinner={handleSpinner}/>
          : 
          <SignIn handleAuthentication={handleAuthentication} handleSpinner={handleSpinner} handleHiddenDivider={handleHiddenDivider} modalState={modal}/>
          }
        </div>
      </div>
    </>
  );
};

export default Login;
import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import RCSpinner from '../../components/Spinner/RCSpinner';
import './regpassword.css';
import cerrar from '../../image/cerrar.png';
import Alert from '../../components/Alert/Alert';


const Regpassword = () => {

  const [code, setCode] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [isError, setIsError] = useState(false);
  const [changepassword, setChangepassword] = useState({
    password: "",
    confirmpassword: ""
  });


  useEffect(() => {

    const currentURL = window.location.href;
    const arraySrt = currentURL.split("&");
    const code = arraySrt[1].slice(8);
    setCode(code);

  }, []);

  const handleChangeRegPassword = (e) => {
    setChangepassword({
      ...changepassword,
      [e.target.name]: e.target.value,
    });
  }

  const handleRegpass = async (e) => {

    setSpinner(true);
    e.preventDefault();

    try {
      await auth.confirmPasswordReset(code, changepassword.password)
      setSpinner(false);
    } catch (error) {
      console.log(error)
      if (error.code === "auth/weak-password") {
        handleRegPassAlert("Su clave debe tener al menos 6 dígitos.", true, true);
        setSpinner(false);
      }
      if (error.code === "auth/invalid-action-code") {
        handleRegPassAlert("Solicitud de clave expirada. Realice una nueva solicitud.", true, true);
        setSpinner(false);
      }
    }
  }

  const handleRegPassAlert = (menssage, isError, IsVisible) => {
    setErrorMsg(menssage);
    setIsError(isError);
    setAlertVisible(IsVisible);
  }


  return (
    <>
      {spinner ? <RCSpinner /> : ""}
      <div className="containerregpass">
        <div className="colorcontregpass">
          <a href="/">
            <div>
              <img src={cerrar} alt="" className="cerraricon" />
            </div>
          </a>
          <div className="centerpage">
            <h6>Ingrese su nueva contraseña.</h6>
            <form onSubmit={handleRegpass}>
              <div className="form-group mt-4">
                <label>Contraseña:</label>
                <input type="password" name="password" value={changepassword.password} onChange={handleChangeRegPassword} className="form-control" autoComplete="off" />
              </div>
              <div className="form-group mt-4">
                <label>Confirmar contraseña:</label>
                <input type="password" name="confirmpassword" value={changepassword.confirmpassword} onChange={handleChangeRegPassword} className="form-control" autoComplete="off" />
              </div>
              {<Alert isVisible={alertVisible} isError={isError} errorMsg={errorMsg} />}
              <button type="submit" onClick={handleRegpass} className="mt-4 btn btn-outline-light btn-block">Restablecer contraseña</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Regpassword;
import React, {useState} from 'react';
import { auth } from "../../firebase";
import Alert from '../Alert/Alert';
import './signup.css';


const SignUp = (props) => {
    
    const [isVisibleRegister, setIsVisibleRegister] = useState(false);
    const [isErrorReg, setIsErrorReg] = useState(false);
    const [errorMsgReg, setErrorMsgReg] = useState("");
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    });

    const handleChangeRegister = ({target}) =>  setData({...data, [target.name]: target.value,});
    
    const handleSubmitRegister = async (e) => {

        e.preventDefault();
        handleSpinner(true);
    
        if (!data.email || !data.password || !data.confirmpassword) {
            handleRegisterAlert("Todos los campos son necesarios para completar el registro", true, true);
            handleSpinner(false);
            return
        }
    
        if (data.confirmpassword !== data.password) {
            handleRegisterAlert("Las contraseñas ingresadas no coinciden", true, true);
            handleSpinner(false);
            return;
        }
    
        try {
            const resp = await auth.createUserWithEmailAndPassword(data.email, data.password);
            if (resp) {
                handleRegisterAlert("El registró se realizó exitósamente ya puedes ingresar", false, true);
                clearRegisterState();
                handleSpinner(false);
            }
        } catch (error) {
            console.log(error)
            if (error.code === "auth/email-already-in-use") {
                handleRegisterAlert("El email proporcionado ya está siendo usado", true, true);;
                handleSpinner(false);
            }
            if (error.code === "auth/invalid-email") {
                handleRegisterAlert("El formato del email no es correcto", true, true);
                handleSpinner(false);
            }
            if (error.code === "auth/invalid-password") {
                handleRegisterAlert("El nombre de usuario y/o contraseña es incorrecto", true, true);
                handleSpinner(false);
            }
            if (error.code === "auth/weak-password") {
                handleRegisterAlert("El password debe tener un mínimo de 6 caracteres", true, true)
                handleSpinner(false);
            }
        }
    }

    const handleAuthentication = (e) => {
        e.preventDefault();
        props.handleSwitchAuth(false);
    }
    
    const handleSpinner = (isActive) => props.handleSpinner(isActive);

    const handleRegisterAlert = (message, isError, alertVisible) => {
        setErrorMsgReg(message);
        setIsErrorReg(isError);
        setIsVisibleRegister(alertVisible);
    }

    const clearRegisterState = () => {
        setData({
            email: "",
            password: "",
            confirmpassword: ""
        });
    }
    

    return (
        <>
            <div className="col-lg-4 col-md-6 col-sm-12 register">
            <h5 className="text-white mb-4">Registro</h5>
            <form onSubmit={handleSubmitRegister}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={data.email} className="form-control" autoComplete="off" onChange={handleChangeRegister} name="email" id="email" aria-describedby="emailHelp" />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" value={data.password} className="form-control" autoComplete="off" onChange={handleChangeRegister} name="password" id="password" />
              </div>
              <div className="form-group">
                <label>Confirmar contraseña</label>
                <input type="password" value={data.confirmpassword} className="form-control" autoComplete="off" onChange={handleChangeRegister} name="confirmpassword" id="confirmpassword" />
              </div>
              { <Alert isVisible={isVisibleRegister} isError={isErrorReg} errorMsg={errorMsgReg} /> }
              <button type="submit" className="mt-4 btn btn-outline-light btn-block">Registrarme</button>
              <div>
                <a href="/#" type="submit" onClick={handleAuthentication} className="text-decoration-none"><p className="tamanorememberpass">¿Ya tenes tu cuenta? Inicia sesión.</p></a>
              </div>
            </form>
          </div>
        </>
    );
};

export default SignUp;
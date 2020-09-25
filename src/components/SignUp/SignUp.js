import React, {useState} from 'react';
import { auth } from "../../firebase";
import Alert from '../Alert/Alert';
import './signup.css';


const SignUp = (props) => {
    
    const [isVisibleRegister, setIsVisibleRegister] = useState(false);
    const [isSucces, setIsSucces] = useState(false);
    const [isErrorReg, setIsErrorReg] = useState(false);
    const [errorMsgReg, setErrorMsgReg] = useState("");
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmpassword: ""
    });

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleReg = async (e) => {

        e.preventDefault()

        handleSpinner(true);
    
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
                setErrorMsgReg('You registered successfully, you can now log in.')
                setIsErrorReg(false);
                setIsVisibleRegister(true);
                setData({
                    email: "",
                    password: "",
                    confirmpassword: ""
                });
                handleSpinner(false);
            }
        } catch (error) {
            console.log(error)
            if (error.code === "auth/email-already-in-use") {
                setIsSucces(false);
                setIsVisibleRegister(true);
                setErrorMsgReg("The email address is already in use by another account.");
                setIsErrorReg(true);
                handleSpinner(false);
            }
            if (error.code === "auth/invalid-email") {
                setIsSucces(false);
                setIsVisibleRegister(true);
                setErrorMsgReg("The email format is not correct.");
                setIsErrorReg(true);
                handleSpinner(false);
            }
            if (error.code === "auth/invalid-password") {
                setIsSucces(false);
                setIsVisibleRegister(true);
                setErrorMsgReg("Invalid password.");
                setIsErrorReg(true);
                handleSpinner(false);
            }
            if (error.code === "auth/weak-password") {
                setIsSucces(false);
                setIsVisibleRegister(true);
                setErrorMsgReg("Password should be at least 6 characters.");
                setIsErrorReg(true);
                handleSpinner(false);
            }
        }
    }

    const handleAuthentication = () =>{
        props.handleAuthentication(false)
    }

    const handleSpinner = (isActive) => {
        props.handleSpinner(isActive)
    }

    return (
        <>
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
              {isSucces ? <Alert isVisible={isVisibleRegister} isError={isErrorReg} errorMsg={errorMsgReg} /> : ''}
              <button type="button" className="mt-4 btn btn-outline-light btn-block" onClick={handleReg}>Registrarme</button>
              <div>
                <a href="/#" onClick={handleAuthentication} className="text-decoration-none"><p className="tamanorememberpass">¿Ya tenes tu cuenta? Inicia sesión.</p></a>
              </div>
            </form>
          </div>
        </>
    );
};

export default SignUp;
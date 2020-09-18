import React, {useState,useEffect} from 'react';
import { auth } from "../firebase";
import RCSpinner from '../components/Spinner/RCSpinner';
import './regpassword.css';
import cerrar from '../image/cerrar.png';


const Regpassword = () => {

    const [code, setCode] = useState('');
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {

        const currentURL = window.location.href;
        const arraySrt = currentURL.split("&");
        const code = arraySrt[1].slice(8);
        setCode(code);

    }, []);

    const [changepassword, setChangepassword] = useState({
        password: "",
        confirmpassword: ""
    });

    const handleChange = e => {
        setChangepassword({
            ...changepassword,
            [e.target.name]: e.target.value,
        });
        console.log(changepassword)
    }

    const handleRegpass = async (e) => {

        setSpinner(true);

        e.preventDefault();

        try {
            await auth.confirmPasswordReset( code , changepassword.password)
            setSpinner(false);
        } catch (error) {
            console.log(error)
            setSpinner(false);
        }
    }

    return (
        <>
            {spinner ? <RCSpinner/> : ""}
            <div className="containerregpass">
                <div className="colorcont">
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
                                <input type="password" name="password" value={changepassword.password} onChange={handleChange} id="password" className="form-control" autoComplete="off" />
                            </div>
                            <div className="form-group mt-4">
                                <label>Confirmar contraseña:</label>
                                <input type="password" name="confirmpassword" value={changepassword.confirmpassword} onChange={handleChange} id="confirmpassword" className="form-control" autoComplete="off" />
                            </div>
                            <button type="submit" onClick={handleRegpass} className="mt-4 btn btn-outline-light btn-block">Restablecer contraseña</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Regpassword;
import React from 'react';
import './regpassword.css';

const Regpassword = () => {
    return (
        <div className="containerregpass">
            <div className="colorcont">
                <div className="centerpage">
                    <h6>Ingrese su nueva contraseña.</h6>
                    <form>
                        <div className="form-group mt-4">
                            <label>Contraseña:</label>
                            <input type="password" className="form-control" autoComplete="off" />
                        </div>
                        <div className="form-group mt-4">
                            <label>Confirmar contraseña:</label>
                            <input type="password" className="form-control" autoComplete="off" />
                        </div>
                        <button type="submit" className="mt-4 btn btn-outline-light btn-block">Restablecer contraseña</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Regpassword;
import React from 'react';
import { Link } from 'react-router-dom';
import './RegisterActions.css';

const RegisterActions = ({ handleSubmit }) => {
    return (
        <div className="register-actions">
            <button type="button" className="register-button" onClick={handleSubmit}>REGISTRARSE</button>
            <div className="login-redirect">
                <p>¿Ya te encuentras registrado?</p>
                <Link to="/login">
                    <button type="button" className="register-button">INICIAR SESIÓN</button>
                </Link>
            </div>
        </div>
    );
};

export default RegisterActions;
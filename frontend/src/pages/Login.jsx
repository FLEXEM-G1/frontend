import React from 'react';
import './Login.css';
import logo from '../assets/black-and-white-logo.png';
import { useNavigate } from 'react-router-dom'; // Ensure the path to your image file is correct

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login logic here (e.g., authentication)
        onLogin();
        navigate('/menu');
    };

    return (
        <div className="login">
            <div className="login-section">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="user">USUARIO:</label>
                        <input type="text" id="user" name="user" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">CONTRASEÑA:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">INICIAR SESIÓN</button>
                </form>
            </div>
            <div className="logo-section">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        </div>
    );
};

export default Login;
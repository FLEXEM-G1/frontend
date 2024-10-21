// frontend/src/pages/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/black-and-white-logo.png';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../services/userService';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signIn({ email, password });
            onLogin();
            navigate('/menu');
        } catch (error) {
            console.error('Error during login:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="login">
            <div className="login-section">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
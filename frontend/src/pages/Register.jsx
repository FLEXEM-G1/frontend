// frontend/src/pages/Register.jsx
import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/userService';

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            // Handle password mismatch (e.g., show error message)
            return;
        }
        try {
            await signUp({ email, password, name, phone, address });
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className="home">
            <div className="register-section">
                <h2>REGISTRAR USUARIO</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="user">Usuario:</label>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label htmlFor="confirm-password">Confirmar Contraseña:</label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Dirección:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">REGISTRARSE</button>
                </form>
                <div className="login-redirect">
                    <p>¿Ya te encuentras registrado?</p>
                    <Link to="/login">
                        <button type="button">INICIAR SESIÓN</button>
                    </Link>
                </div>
            </div>
            <div className="profile-section">
                <div className="profile-circle"></div>
            </div>
        </div>
    );
};

export default Register;
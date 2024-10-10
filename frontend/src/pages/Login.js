import React from 'react';
import './Login.css';

const Login = () => {
    return (
        <div className="login">
            <h2>Iniciar Sesión</h2>
            <form>
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
    );
};

export default Login;
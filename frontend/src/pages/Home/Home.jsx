import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Bienvenido a FLEXEM </h1>
            <p>Flexem es una aplicación de gestión de tareas que te permite organizar tu tiempo de forma eficiente.</p>
            <p>Por favor, elige una de las siguientes opciones para continuar:</p>
            <div className="button-container">
                <Link to="/register">
                    <button className="home-button">Crear una Cuenta Nueva</button>
                </Link>
                <Link to="/login">
                    <button className="home-button">Iniciar Sesión</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
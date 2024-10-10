import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <Link to="/register">
                <button>Registrar</button>
            </Link>
            <Link to="/login">
                <button>Iniciar Sesión</button>
            </Link>
        </div>
    );
};

export default Home;


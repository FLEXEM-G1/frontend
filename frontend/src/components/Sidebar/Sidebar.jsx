import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {

    let user = { name: localStorage.getItem('name') };
    return (
        <div className="sidebar">
            <div className="greeting-container">
                <p>Hola {user.name}!</p>
                <Link to="/ver-perfil">Ver perfil</Link>
            </div>
            <Link to="/mis-registros">Mis Registros</Link>
            <Link to="/generar-letras-facturas">Generar Letras/Facturas</Link>
            <Link to="/ver-cartera">Ver Cartera</Link>
            <Link to="/faq">FAQ</Link>
        </div>
    );
};

export default Sidebar;
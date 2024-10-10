import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/mis-registros">Mis Registros</Link>
            <Link to="/generar-letras-facturas">Generar Letras/Facturas</Link>
            <Link to="/ver-cartera">Ver Cartera</Link>
        </div>
    );
};

export default Sidebar;
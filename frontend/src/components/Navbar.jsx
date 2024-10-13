import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure the path to your image file is correct
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        onLogout();
        navigate('/home');
    };

    const hideLogoutButton = ['/home', '/login', '/register'].includes(location.pathname) || !isAuthenticated;

    return (
        <nav className="navbar">
            {isAuthenticated ? (
                <Link to="/menu">
                    <img src={logo} alt="Logo" className="navbar-logo" />
                </Link>
            ) : (
                <img src={logo} alt="Logo" className="navbar-logo" />
            )}
            {
                !hideLogoutButton && (
                    <button onClick={handleLogout} className="button">
                        Cerrar Sesión
                    </button>
                )
            }
        </nav>
    );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure the path to your image file is correct

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo-title">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        </nav>
    );
};

export default Navbar;
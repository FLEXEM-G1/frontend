import React, { useState, useEffect } from 'react';
import './VerPerfil.css';

const VerPerfil = () => {
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        setUser({ name, email });
    }, []);

    return (
        <div className="perfil-container">
            <h1>Perfil</h1>
            <p>Nombre: {user.name}</p>
            <p>Correo Electrónico: {user.email}</p>
        </div>
    );
};

export default VerPerfil;
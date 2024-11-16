import React, { useState, useEffect } from 'react';
import './VerPerfil.css';

const VerPerfil = () => {
    const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });

    useEffect(() => {
        const name = localStorage.getItem('name');
        const email = localStorage.getItem('email');
        const phone = localStorage.getItem('phone');
        const address = localStorage.getItem('address');
        setUser({ name, email, phone, address });
    }, []);

    return (
        <div className="perfil-container">
            <h1>Perfil</h1>
            <p>Nombre: {user.name}</p>
            <p>Correo Electrónico: {user.email}</p>
            <p>Teléfono: {user.phone}</p>
            <p>Dirección: {user.address}</p>
        </div>
    );
};

export default VerPerfil;
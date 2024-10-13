import React from 'react';
import './VerPerfil.css';

const VerPerfil = () => {
    const user = {
        name: 'Usuario',
        email: 'usuario@example.com'
    };

    return (
        <div className="perfil-container">
            <h1>Perfil</h1>
            <p>Nombre: {user.name}</p>
            <p>Correo Electrónico: {user.email}</p>
        </div>
    );
};

export default VerPerfil;
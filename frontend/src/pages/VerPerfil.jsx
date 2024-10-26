// frontend/src/pages/VerPerfil.jsx
import React, { useState, useEffect } from 'react';
import './VerPerfil.css';
import { getUserById } from '../services/userService';

const VerPerfil = () => {
    const [user, setUser] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem('id');
                if (userId) {
                    const response = await getUserById(userId);
                    setUser(response.data);
                } else {
                    console.error('User ID is null');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData().then(r => r).catch(e => e);
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
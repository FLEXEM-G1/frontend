import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { getUserById, updateUserById } from '../../services/userService.js';
import './VerPerfil.css';
import { FaPen} from 'react-icons/fa';


const VerPerfil = () => {
    const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ name: '', email: '', phone: '', address: '' });

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('id');
            const response = await getUserById(userId);
            setUser(response.data);
            setEditedUser(response.data);
        };
        fetchUser().then(r => r).catch(e => e);
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSaveClick = async () => {
        const userId = localStorage.getItem('id');
        await updateUserById(userId, editedUser);
        setUser(editedUser);
        setIsEditing(false);
    };

    return (
        <Container className="perfil-container">
            <h1>Perfil</h1>
            {isEditing ? (
                <Form>
                    <Form.Group as={Row} controlId="formName">
                        <Form.Label column sm="2">Nombre:</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formEmail">
                        <Form.Label column sm="2">Correo Electrónico:</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="email"
                                name="email"
                                value={editedUser.email}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPhone">
                        <Form.Label column sm="2">Teléfono:</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="phone"
                                value={editedUser.phone}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formAddress">
                        <Form.Label column sm="2">Dirección:</Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="address"
                                value={editedUser.address}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>
                    <Button variant="primary" onClick={handleSaveClick}>Guardar</Button>
                </Form>
            ) : (
                <div>
                    <p>Nombre: {user.name}</p>
                    <p>Correo Electrónico: {user.email}</p>
                    <p>Teléfono: {user.phone}</p>
                    <p>Dirección: {user.address}</p>
                    <Button variant="secondary" onClick={handleEditClick}>
                        <img src={FaPen} alt="Editar" style={{ width: '20px', marginRight: '8px' }} />
                        Editar
                    </Button>
                </div>
            )}
        </Container>
    );
};

export default VerPerfil;
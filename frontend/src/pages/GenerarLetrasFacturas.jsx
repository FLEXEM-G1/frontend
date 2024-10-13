import React, { useState } from 'react';
import './GenerarLetrasFacturas.css';

const GenerarLetrasFacturas = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        monto: '',
        fechaEmision: '',
        fechaExpiracion: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="generar-letras-facturas">
            <button className="button" onClick={() => setShowForm(true)}>
                Generar Factura
            </button>
            {showForm && (
                <div className="modal" onClick={() => setShowForm(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            <div className="form-field">
                                <label>Monto:</label>
                                <input
                                    type="number"
                                    name="monto"
                                    value={formData.monto}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Fecha de Emisión:</label>
                                <input
                                    type="date"
                                    name="fechaEmision"
                                    value={formData.fechaEmision}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-field">
                                <label>Fecha de Expiración:</label>
                                <input
                                    type="date"
                                    name="fechaExpiracion"
                                    value={formData.fechaExpiracion}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit">Generar</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GenerarLetrasFacturas;
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import './GenerarLetrasFacturas.css';
import { useNavigate } from 'react-router-dom';

const GenerarLetrasFacturas = ({ addInvoice }) => {
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('Letra');
    const [fechaEmision, setFechaEmision] = useState(new Date().toISOString().split('T')[0]);
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const newInvoice = { id: Date.now(), monto, tipo, fechaEmision, fechaVencimiento, status: 'Pendiente' };
        localStorage.setItem('invoices', JSON.stringify([...JSON.parse(localStorage.getItem('invoices') || '[]'), newInvoice]));
        navigate('/mis-registros');
    };

    return (
        <div className="generar-letras-facturas-container">
            <Sidebar />
            <div className="generar-letras-facturas">
                <button className="button" onClick={() => setShowForm(true)}>
                    Generar Factura
                </button>
                {showForm && (
                    <div className="modal" onClick={() => setShowForm(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <form onSubmit={handleSubmit} className="invoice-form">
                                <input type="text" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="Monto" required />
                                <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                    <option value="Letra">Letra</option>
                                    <option value="Factura">Factura</option>
                                </select>
                                <input type="date" value={fechaEmision} onChange={(e) => setFechaEmision(e.target.value)} required />
                                <input type="date" value={fechaVencimiento} onChange={(e) => setFechaVencimiento(e.target.value)} required />
                                <button type="submit">Generar Factura</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerarLetrasFacturas;
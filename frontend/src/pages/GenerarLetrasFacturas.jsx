import React, { useState } from 'react';
import { createInvoiceBill } from '../services/invoiceBillService';
import Modal from '../components/Modal';
import './GenerarLetrasFacturas.css';

const GenerarLetrasFacturas = ({ addInvoice }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newInvoiceBill, setNewInvoiceBill] = useState({
        portfolioId: '',
        invoiceBillNumber: '',
        type: '',
        amount: '',
        currency: '',
        issueDate: '',
        expirationDate: '',
        state: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewInvoiceBill({ ...newInvoiceBill, [name]: value });
    };

    const handleCreateInvoiceBill = async (e) => {
        e.preventDefault();
        try {
            const response = await createInvoiceBill(newInvoiceBill);
            addInvoice(response.data); // Add the new invoice to the global state
            setNewInvoiceBill({
                portfolioId: '',
                invoiceBillNumber: '',
                type: '',
                amount: '',
                currency: '',
                issueDate: '',
                expirationDate: '',
                state: '',
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating invoice bill:', error);
        }
    };

    return (
        <div className="generar-letras-facturas">
            <h1>Generar Letras Facturas</h1>
            <button onClick={() => setIsModalOpen(true)}>Create Invoice Bill</button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form className="form-container" onSubmit={handleCreateInvoiceBill}>
                    <div>
                        <label htmlFor="portfolioId">Portfolio ID</label>
                        <input
                            type="text"
                            name="portfolioId"
                            value={newInvoiceBill.portfolioId}
                            onChange={handleChange}
                            placeholder="Portfolio ID"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="invoiceBillNumber">Invoice Bill Number</label>
                        <input
                            type="text"
                            name="invoiceBillNumber"
                            value={newInvoiceBill.invoiceBillNumber}
                            onChange={handleChange}
                            placeholder="Invoice Bill Number"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="type">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={newInvoiceBill.type}
                            onChange={handleChange}
                            placeholder="Type"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={newInvoiceBill.amount}
                            onChange={handleChange}
                            placeholder="Amount"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="currency">Currency</label>
                        <input
                            type="text"
                            name="currency"
                            value={newInvoiceBill.currency}
                            onChange={handleChange}
                            placeholder="Currency"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="issueDate">Issue Date</label>
                        <input
                            type="date"
                            name="issueDate"
                            value={newInvoiceBill.issueDate}
                            onChange={handleChange}
                            placeholder="Issue Date"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="expirationDate">Expiration Date</label>
                        <input
                            type="date"
                            name="expirationDate"
                            value={newInvoiceBill.expirationDate}
                            onChange={handleChange}
                            placeholder="Expiration Date"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <input
                            type="text"
                            name="state"
                            value={newInvoiceBill.state}
                            onChange={handleChange}
                            placeholder="State"
                            required
                        />
                    </div>
                    <button type="submit">Create Invoice Bill</button>
                </form>
            </Modal>
        </div>
    );
};

export default GenerarLetrasFacturas;
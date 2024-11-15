import React, { useState, useEffect } from 'react';
import { createInvoiceBill } from '../../services/invoiceBillService.js';
import { getAllPortfolios } from '../../services/portfolioService.js';
import Modal from '../../components/Modal/Modal.jsx';
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { Dropdown } from 'primereact/dropdown';
import './GenerarLetrasFacturas.css';

const GenerarLetrasFacturas = ({ addInvoice }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [portfolios, setPortfolios] = useState([]);
    const [newInvoiceBill, setNewInvoiceBill] = useState({
        portfolioId: '',
        invoiceBillNumber: '',
        rucDni: '',
        razSocNam: '',
        type: '',
        amount: '',
        currency: '',
        issueDate: '',
        expirationDate: '',
    });

    const invoiceTypes = [
        { name: 'Factura', code: 'Invoice' },
        { name: 'Letra', code: 'Bill' }
    ];

    useEffect(() => {
        const fetchPortfolios = async () => {
            const response = await getAllPortfolios();
            setPortfolios(response.data);
        };
        fetchPortfolios().then(r => r).catch(e => e);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewInvoiceBill({ ...newInvoiceBill, [name]: value });
    };

    const handlePortfolioChange = (e) => {
        const selectedPortfolio = portfolios.find(portfolio => portfolio._id === e.value._id);
        setNewInvoiceBill({
            ...newInvoiceBill,
            portfolioId: selectedPortfolio ? selectedPortfolio._id : '',
            currency: selectedPortfolio ? selectedPortfolio.currency : '',
            rucDni: selectedPortfolio ? selectedPortfolio.rucDni : '',
            razSocNam: selectedPortfolio ? selectedPortfolio.razSocNam : ''
        });
    };

    const handleTypeChange = (e) => {
        setNewInvoiceBill({ ...newInvoiceBill, type: e.value ? e.value.code : '' });
    };

    const handleCreateInvoiceBill = async (e) => {
        e.preventDefault();
        try {
            const response = await createInvoiceBill(newInvoiceBill);
            addInvoice(response.data); // Add the new invoice to the global state
            setNewInvoiceBill({
                portfolioId: '',
                invoiceBillNumber: '',
                rucDni: '',
                razSocNam: '',
                type: '',
                amount: '',
                currency: '',
                issueDate: '',
                expirationDate: '',
                state: 'Not Capitalized',
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating invoice bill:', error);
        }
    };

    return (
        <div className="generar-letras-facturas-container">
            <Sidebar />
            <div className="content">
                <h1>Generar Letras Facturas</h1>
                <button onClick={() => setIsModalOpen(true)}>Crear letra/factura</button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form className="form-container" onSubmit={handleCreateInvoiceBill}>
                        <div className="form-group">
                            <label htmlFor="portfolioId">Portafolio</label>
                            <Dropdown
                                id="portfolioId"
                                value={portfolios.find(portfolio => portfolio._id === newInvoiceBill.portfolioId) || null}
                                onChange={handlePortfolioChange}
                                options={portfolios}
                                optionLabel="name"
                                placeholder="Selecciona un portafolio"
                                className="w-full md:w-14rem"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="invoiceBillNumber">Número de letra/factura</label>
                            <input
                                type="number"
                                name="invoiceBillNumber"
                                value={newInvoiceBill.invoiceBillNumber || ''}
                                onChange={handleChange}
                                placeholder="Invoice Bill Number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="type">Tipo</label>
                            <Dropdown
                                id="type"
                                value={invoiceTypes.find(type => type.code === newInvoiceBill.type) || null}
                                onChange={handleTypeChange}
                                options={invoiceTypes}
                                optionLabel="name"
                                showClear
                                placeholder="Selecciona el tipo"
                                className="w-full md:w-14rem"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rucDni">RUC/DNI</label>
                            <input
                                type="text"
                                name="rucDni"
                                value={newInvoiceBill.rucDni || ''}
                                onChange={handleChange}
                                placeholder="RUC/DNI"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="razSocNam">Razón Social/Nombres</label>
                            <input
                                type="text"
                                name="razSocNam"
                                value={newInvoiceBill.razSocNam || ''}
                                onChange={handleChange}
                                placeholder="Razón Social/Nombres"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Cantidad</label>
                            <input
                                type="number"
                                name="amount"
                                value={newInvoiceBill.amount || ''}
                                onChange={handleChange}
                                placeholder="Amount"
                                min="1"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currency">Moneda</label>
                            <input
                                type="text"
                                name="currency"
                                value={newInvoiceBill.currency || ''}
                                onChange={handleChange}
                                placeholder="Currency"
                                readOnly
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="issueDate">Fecha de emisión</label>
                            <input
                                type="date"
                                name="issueDate"
                                value={newInvoiceBill.issueDate || ''}
                                onChange={handleChange}
                                placeholder="Issue Date"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expirationDate">Fecha de expiración</label>
                            <input
                                type="date"
                                name="expirationDate"
                                value={newInvoiceBill.expirationDate || ''}
                                onChange={handleChange}
                                placeholder="Expiration Date"
                                required
                            />
                        </div>
                        <button type="submit">Crear factura/letra</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default GenerarLetrasFacturas;
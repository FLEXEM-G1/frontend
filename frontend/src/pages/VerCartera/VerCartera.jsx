import React, { useState, useEffect } from 'react';
import { createPortfolio, getAllPortfolios, calculateTceaForPortfolio } from '../../services/portfolioService.js';
import { getAllBanks } from '../../services/bankService.js';
import {ToastContainer, toast} from "react-toastify";
import Portfolio from '../../components/Portfolio/Portfolio.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { Dropdown } from 'primereact/dropdown';
import './VerCartera.css';
import 'react-toastify/dist/ReactToastify.css';

const VerCartera = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [newPortfolio, setNewPortfolio] = useState({ name: '', currency: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTceaModalOpen, setIsTceaModalOpen] = useState(false);
    const [selectedPortfolio, setSelectedPortfolio] = useState(null);
    const [tceaDetails, setTceaDetails] = useState({ bankId: '', dateTcea: '' });
    const [banks, setBanks] = useState([]);
    const [tceaResults, setTceaResults] = useState({});
    const [netDiscountedAmount, setNetDiscountedAmount] = useState({});
    const currencies = [
        { name: 'USD', code: 'USD' },
        { name: 'PEN', code: 'PEN' },
    ];


    useEffect(() => {
        const fetchPortfolios = async () => {
            const response = await getAllPortfolios();
            setPortfolios(response.data);
        };
        fetchPortfolios().then(r => r).catch(e => e);

        const fetchBanks = async () => {
            const response = await getAllBanks();
            setBanks(response);
        };
        fetchBanks().then(r => r).catch(e => e);
    }, []);

    const handleCurrencyChange = (e) => {
        setNewPortfolio({ ...newPortfolio, currency: e.value.code });
    };

    const handleCreatePortfolio = async (e) => {
        e.preventDefault();
        try {
            const response = await createPortfolio(newPortfolio);
            setPortfolios([...portfolios, response]);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating portfolio:', error);
        }
    };

    const handleCalculateTcea = async () => {
        try {
            const response = await calculateTceaForPortfolio(selectedPortfolio._id, tceaDetails);
            setTceaResults({ tceaResults, [selectedPortfolio._id]: response.tcea });
            setNetDiscountedAmount({ netDiscountedAmount, [selectedPortfolio._id]: response.netDiscountedAmount });
            setIsTceaModalOpen(true);
            toast.success(`TCEA: ${response.tcea}, Monto Neto Descontado: ${response.netDiscountedAmount}`);
        } catch (error) {
            console.error('Error calculating TCEA:', error);
            toast.error('No se pudo calcular el TCEA. No se encontraron facturas o letras asociadas al portafolio');
        }
    };

    const openTceaModal = (portfolioId) => {
        const portfolio = portfolios.find(p => p._id === portfolioId);
        setSelectedPortfolio(portfolio);
        setIsTceaModalOpen(true);
    };

    return (
        <div className="ver-cartera-container">
            <Sidebar />
            <div className="content">
                <div className="header-container">
                    <h1>Ver Cartera</h1>
                    <button className="create-portfolio-button" onClick={() => setIsModalOpen(true)}>Crear Portafolio</button>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleCreatePortfolio}>
                        <div className="form-group-portfolio">
                            <label htmlFor="name">Nombre: </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newPortfolio.name}
                                onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group-portfolio">
                            <Dropdown
                                id="currency"
                                name="currency"
                                value={currencies.find(currency => currency.code === newPortfolio.currency)}
                                onChange={handleCurrencyChange}
                                options={currencies}
                                optionLabel="name"
                                placeholder="Selecciona la moneda"
                                className="w-full md:w-14rem"
                                required
                            />
                        </div>
                        <button type="submit">Crear Portafolio</button>
                    </form>
                </Modal>
                <Modal isOpen={isTceaModalOpen} onClose={() => setIsTceaModalOpen(false)}>
                    <div>
                        <h2>Simulador de TCEA</h2>
                        <div className="form-group">
                            <label htmlFor="bankId">Banco</label>
                            <Dropdown
                                id="bankId"
                                value={banks.find(bank => bank._id === tceaDetails.bankId)}
                                onChange={(e) => setTceaDetails({...tceaDetails, bankId: e.value._id})}
                                options={banks}
                                optionLabel="name"
                                placeholder="Selecciona un banco"
                                className="w-full md:w-14rem"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateTcea">Fecha de pago</label>
                            <input
                                type="date"
                                id="dateTcea"
                                name="dateTcea"
                                value={tceaDetails.dateTcea}
                                onChange={(e) => setTceaDetails({...tceaDetails, dateTcea: e.target.value})}
                                required
                            />
                        </div>
                        <button onClick={handleCalculateTcea}>Calcular TCEA</button>
                    </div>
                </Modal>
                <div className="wallets-container">
                    {portfolios && portfolios.length > 0 ? (
                        portfolios.map((portfolio) => (
                            portfolio && portfolio._id ? (
                                <div key={portfolio._id}>
                                    <div key={portfolio._id}>
                                        <Portfolio
                                            bankName={portfolio.name}
                                            bankCurrency={portfolio.currency}
                                            portfolioId={portfolio._id}
                                            openTceaModal={openTceaModal}
                                            onDelete={(deletedPortfolioId) => setPortfolios(portfolios.filter(p => p._id !== deletedPortfolioId))}
                                            tcea={tceaResults[portfolio._id]}
                                            netDiscountedAmount={netDiscountedAmount[portfolio._id]}
                                        />
                                    </div>

                                </div>
                            ) : (
                                <p key={portfolio._id || Math.random()}>Información inválida del portafolio</p>
                            )
                        ))
                    ) : (
                        <p>No hay portafolios disponibles</p>
                    )}
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default VerCartera;


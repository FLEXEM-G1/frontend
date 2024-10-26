import React, { useState, useEffect } from 'react';
import { createPortfolio, getAllPortfolios, calculateTceaForPortfolio } from '../services/portfolioService';
import { getAllBanks } from '../services/bankService';
import Portfolio from '../components/Portfolio.jsx';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import { Dropdown } from 'primereact/dropdown';
import './VerCartera.css';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPortfolio({ ...newPortfolio, [name]: value });
    };

    const handleCurrencyChange = (e) => {
        setNewPortfolio({ ...newPortfolio, currency: e.value.code });
    };

    const handleTceaChange = (e) => {
        const { name, value } = e.target;
        setTceaDetails({ ...tceaDetails, [name]: value });
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
            console.log('Calculating TCEA for portfolio:', selectedPortfolio._id, tceaDetails);
            const response = await calculateTceaForPortfolio(selectedPortfolio._id, tceaDetails);
            console.log('TCEA response:', response);
            setTceaResults({ ...tceaResults, [selectedPortfolio._id]: response.tcea });
            setNetDiscountedAmount({ ...netDiscountedAmount, [selectedPortfolio._id]: response.netDiscountedAmount });
            setIsTceaModalOpen(false);
        } catch (error) {
            console.error('Error calculating TCEA:', error);
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
                    <button className="create-portfolio-button" onClick={() => setIsModalOpen(true)}>Create Portfolio</button>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleCreatePortfolio}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={newPortfolio.name}
                                onChange={(e) => setNewPortfolio({...newPortfolio, name: e.target.value})}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currency">Currency</label>
                            <Dropdown
                                id="currency"
                                name="currency"
                                value={currencies.find(currency => currency.code === newPortfolio.currency)}
                                onChange={handleCurrencyChange}
                                options={currencies}
                                optionLabel="name"
                                placeholder="Select Currency"
                                className="w-full md:w-14rem"
                                required
                            />
                        </div>
                        <button type="submit">Create Portfolio</button>
                    </form>
                </Modal>
                <Modal isOpen={isTceaModalOpen} onClose={() => setIsTceaModalOpen(false)}>
                    <div>
                        <h2>Calculate TCEA</h2>
                        <div className="form-group">
                            <label htmlFor="bankId">Bank</label>
                            <select
                                id="bankId"
                                name="bankId"
                                value={tceaDetails.bankId}
                                onChange={(e) => setTceaDetails({...tceaDetails, bankId: e.target.value})}
                                required
                            >
                                <option value="">Select Bank</option>
                                {banks.map((bank) => (
                                    <option key={bank._id} value={bank._id}>
                                    {bank.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dateTcea">Payment Date</label>
                            <input
                                type="date"
                                id="dateTcea"
                                name="dateTcea"
                                value={tceaDetails.dateTcea}
                                onChange={(e) => setTceaDetails({ ...tceaDetails, dateTcea: e.target.value })}
                                required
                            />
                        </div>
                        <button onClick={handleCalculateTcea}>Calculate TCEA</button>
                    </div>
                </Modal>
                <div className="wallets-container">
                    {portfolios && portfolios.length > 0 ? (
                        portfolios.map((portfolio) => (
                            portfolio && portfolio._id ? (
                                <div key={portfolio._id}>
                                    <Portfolio
                                        bankName={portfolio.name}
                                        bankCurrency={portfolio.currency}
                                        portfolioId={portfolio._id}
                                        openTceaModal={openTceaModal}
                                    />
                                    {tceaResults[portfolio._id] && (
                                        <p>TCEA: {tceaResults[portfolio._id]}</p>
                                    )}
                                    {netDiscountedAmount[portfolio._id] && (
                                        <p>Monto Neto Descontado: {netDiscountedAmount[portfolio._id]}</p>
                                    )}
                                </div>
                            ) : (
                                <p key={portfolio._id || Math.random()}>Invalid portfolio data</p>
                            )
                        ))
                    ) : (
                        <p>No portfolios available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerCartera;
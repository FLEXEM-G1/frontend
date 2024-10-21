// frontend/src/pages/VerCartera.jsx
import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import { createPortfolio, getAllPortfolios } from '../services/portfolioService';
import Wallet from '../components/Cartera.jsx';
import Sidebar from "../components/Sidebar.jsx";
import './VerCartera.css';

const VerCartera = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPortfolio, setNewPortfolio] = useState({
        name: '',
        state: '',
    });

    useEffect(() => {
        const fetchPortfolios = async () => {
            const response = await getAllPortfolios();
            setPortfolios(response.data);
        };
        fetchPortfolios();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPortfolio({ ...newPortfolio, [name]: value });
    };

    const handleCreatePortfolio = async (e) => {
        e.preventDefault();
        try {
            const response = await createPortfolio(newPortfolio);
            setPortfolios([...portfolios, response]);
            setNewPortfolio({ name: '', state: '' });
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error creating portfolio:', error);
        }
    };

    return (
        <div className="ver-cartera-container">
            <Sidebar />
            <div className="content">
                <div className="header-container">
                    <h1>Ver Cartera</h1>
                    <button onClick={() => setIsModalOpen(true)}>Create Portfolio</button>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form onSubmit={handleCreatePortfolio}>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={newPortfolio.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                name="state"
                                value={newPortfolio.state}
                                onChange={handleChange}
                                placeholder="State"
                                required
                            />
                        </div>
                        <button type="submit">Create Portfolio</button>
                    </form>
                </Modal>
                <div className="wallets-container">
                    {portfolios.map((portfolio) => (
                        <Wallet key={portfolio.id} bankName={portfolio.name} portfolioId={portfolio.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerCartera;
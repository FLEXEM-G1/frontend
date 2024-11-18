import React, { useState, useEffect } from 'react';
import {
    getAllPortfolios,
    deletePortfolio,
    createPortfolio,
    calculateTceaForPortfolio,
} from '../../services/portfolioService.js';
import { ToastContainer, toast } from "react-toastify";
import PortfolioList from '../../components/Portfolio/PortfolioList.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { Dropdown } from 'primereact/dropdown';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip';
import './VerCartera.css';
import 'react-toastify/dist/ReactToastify.css';
import { getAllBanks, getBankById } from '../../services/bankService.js';
import { deleteInvoicesByPortfolioId } from '../../services/invoiceBillService.js';

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
    const [isDeleting, setIsDeleting] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [portfolioToDelete, setPortfolioToDelete] = useState(null);
    const [openPortfolioId, setOpenPortfolioId] = useState(null);
    const [bankInfo, setBankInfo] = useState(null);
    const currencies = [
        { name: 'USD', code: 'USD' },
        { name: 'PEN', code: 'PEN' },
    ];

    useEffect(() => {
        const fetchPortfolios = async () => {
            try {
                const response = await getAllPortfolios();
                setPortfolios(response.data);
            } catch (error) {
                console.error('Error fetching portfolios:', error);
            }
        };

        const fetchBanks = async () => {
            try {
                const response = await getAllBanks();
                setBanks(response);
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        };

        fetchPortfolios();
        fetchBanks();
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

    const handleDeletePortfolio = async (deletedPortfolioId) => {
        setIsDeleting(true);
        try {
            try {
                await deleteInvoicesByPortfolioId(deletedPortfolioId);
            } catch (error) {
                console.warn('No invoices found for this portfolio or error deleting invoices:', error);
            }

            const response = await deletePortfolio(deletedPortfolioId);
            setPortfolios((prev) => prev.filter((portfolio) => portfolio._id !== deletedPortfolioId));
            toast.success(response.message || "Portafolio eliminado exitosamente.");
        } catch (error) {
            console.error("Error eliminando el portafolio:", error);
            toast.error(error.response?.data?.message || "No se pudo eliminar el portafolio.");
        } finally {
            setIsDeleting(false);
            setIsWarningModalOpen(false);
        }
    };

    const openWarningModal = (portfolioId) => {
        setPortfolioToDelete(portfolioId);
        setIsWarningModalOpen(true);
    };

    const confirmDelete = () => {
        handleDeletePortfolio(portfolioToDelete);
    };

    const togglePortfolio = (portfolioId) => {
        setOpenPortfolioId(openPortfolioId === portfolioId ? null : portfolioId);
    };

    const fetchBankInfo = async (bankId) => {
        try {
            const response = await getBankById(bankId);
            setBankInfo(response.data);
        } catch (error) {
            console.error('Error fetching bank info:', error);
            toast.error('No se pudo obtener la información del banco');
        }
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
                                value={banks.length > 0 ? banks.find(bank => bank._id === tceaDetails.bankId) : null}
                                onChange={(e) => {
                                    setTceaDetails({...tceaDetails, bankId: e.value._id});
                                    fetchBankInfo(e.value._id).then(r => r);
                                }}
                                options={banks}
                                optionLabel="name"
                                placeholder="Selecciona un banco"
                                className="w-full md:w-14rem"
                                required
                            />
                            <div className="info-icon" data-tooltip-id="bankInfoTooltip" style={{cursor: 'pointer'}}>
                                i
                            </div>

                            <Tooltip id="bankInfoTooltip" place="top" effect="solid" type="dark" autoPlace offset={10}>
                                {bankInfo ? (
                                    <div>
                                        <p><strong>Tasa:</strong> {bankInfo.rate}% ({bankInfo.rateType})</p>
                                        <p><strong>Comisiones:</strong></p>
                                        <ul>
                                            {bankInfo.commissions.map((commission, index) => (
                                                <li key={index}>
                                                    {commission.name}: {commission.amount} ({commission.type})
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p>Cargando información del banco...</p>
                                )}
                            </Tooltip>
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
                <Modal isOpen={isWarningModalOpen} onClose={() => setIsWarningModalOpen(false)}>
                    <div>
                        <h2>Advertencia</h2>
                        <p>¿Estás seguro de que deseas eliminar este portafolio? Esta acción no se puede deshacer.</p>
                        <button onClick={confirmDelete} disabled={isDeleting}>
                            {isDeleting ? 'Eliminando...' : 'Confirmar'}
                        </button>
                        <button onClick={() => setIsWarningModalOpen(false)}>Cancelar</button>
                    </div>
                </Modal>
                <PortfolioList
                    portfolios={portfolios}
                    openTceaModal={openTceaModal}
                    onDelete={openWarningModal}
                    tceaResults={tceaResults}
                    netDiscountedAmount={netDiscountedAmount}
                    openPortfolioId={openPortfolioId}
                    togglePortfolio={togglePortfolio}
                />
            </div>
            <ToastContainer/>
        </div>
    );
};

export default VerCartera;
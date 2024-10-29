import React, { useState, useEffect, CSSProperties } from 'react';
import { deletePortfolio } from '../services/portfolioService';
import Invoice from './Invoice';
import Modal from './Modal';
import { getInvoiceBillsByPortfolioId } from '../services/invoiceBillService.js';
import jsPDF from 'jspdf';

const Portfolio = ({ bankName, bankCurrency, portfolioId, openTceaModal, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);

    const toggleDetails = async () => {
        setIsOpen(!isOpen);
    };

    const openInvoicesModal = async () => {
        try {
            const response = await getInvoiceBillsByPortfolioId(portfolioId);
            setInvoices(response.data);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    };

    const handleDeletePortfolio = async () => {
        try {
            await deletePortfolio(portfolioId);
            onDelete(portfolioId);
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    const handleDownloadPDF = async () => {
        try{
            const response = await getInvoiceBillsByPortfolioId(portfolioId);
            const invoices = response.data;

            const doc = new jsPDF();
            doc.text('Invoices', 10, 10);

            invoices.forEach((invoice, index) => {
                doc.text(`Invoice ${index + 1}`, 10, 20 + index * 10);
                doc.text(`Amount: ${invoice.amount}`, 10, 30 + index * 10);
                doc.text(`State: ${invoice.state}`, 10, 40 + index * 10);
                doc.text(`Due date: ${invoice.dateTcea}`, 10, 50 + index * 10);
                doc.text(`Portfolio ID: ${invoice.portfolioId}`, 10, 70 + index * 10);
            });

            doc.save('invoices.pdf');
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <div style={styles.walletContainer}>
            <div style={styles.walletHeader} onClick={toggleDetails}>
                <div style={styles.bankName}>{bankName}</div>
                <div style={styles.bankCurrency}>{bankCurrency}</div>
                <div style={styles.arrow}>{isOpen ? '▲' : '▼'}</div>
            </div>
            {isOpen && (
                <div style={styles.walletContent}>
                    <button onClick={() => openTceaModal(portfolioId)}>Calcular TCEA</button>
                    <button onClick={openInvoicesModal}>Ver letras/facturas</button>
                    <button onClick={handleDownloadPDF}>Download PDF</button>
                    <button onClick={handleDeletePortfolio}>Delete Portfolio</button>
                </div>
            )}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={styles.invoicesContent}>
                    <h2>Invoices for {bankName}</h2>
                    {invoices.length > 0 ? (
                        invoices.map((invoice) => (
                            <Invoice key={invoice._id} record={invoice} />
                        ))
                    ) : (
                        <p>No invoices available</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
    walletContainer: {
        border: '1px solid #000',
        borderRadius: '10px',
        width: '100%',
        maxHeight: '425px',
        overflow: 'auto',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#a52a3c',
        color: '#fff',
        scrollbarWidth: 'none'
    },
    walletHeader: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        paddingBottom: '10px',
    },
    bankName: {
        fontSize: '18px',
    },
    bankCurrency: {
        fontSize: '18px',
    },
    arrow: {
        fontSize: '18px',
    },
    walletContent: {
        marginTop: '10px',
        backgroundColor: '#f0f0f0',
        color: '#000',
        padding: '10px',
        borderRadius: '5px',
    },
    invoicesContent: {
        padding: '20px',
        color: '#000',
    },
};

export default Portfolio;
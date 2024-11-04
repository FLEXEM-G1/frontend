import React, { useState, useEffect, CSSProperties } from 'react';
import { calculateTceaForPortfolio, deletePortfolio } from '../services/portfolioService';
import Invoice from './Invoice';
import Modal from './Modal';
import { deleteInvoiceBill, getInvoiceBillsByPortfolioId } from '../services/invoiceBillService.js';
import JsPDF from 'jspdf';
import 'jspdf-autotable';

const Portfolio = ({ bankName, bankCurrency, portfolioId, openTceaModal, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [tcea, setTcea] = useState(null);
    const [netDiscountedAmount, setNetDiscountedAmount] = useState(null);
    const [isTceaModalOpen, setIsTceaModalOpen] = useState(false);
    const tableColumn = ["Factura", "Cantidad", "Fecha de vencimiento", "RUC/DNI", "TCEA", "Monto descontado"];
    const tableRows = [];

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

    const showTCEAcalculated = async () => {
        try {
            const response = await calculateTceaForPortfolio(portfolioId);
            setTcea(response.data.tcea);
            setNetDiscountedAmount(response.data.netDiscountedAmount);
            setIsTceaModalOpen(true);
        } catch (error) {
            console.error('Error calculating TCEA:', error);
        }
    };

    const handleDeletePortfolio = async () => {
        for (const invoice of invoices) {
            try {
                await deleteInvoiceBill(invoice._id);
            } catch (error) {
                console.error('Error deleting invoice:', error);
            }
        }
        try {
            await deletePortfolio(portfolioId);
            onDelete(portfolioId);
            window.location.reload();
        } catch (error) {
            console.error('Error deleting portfolio:', error);
        }
    };

    const handleDownloadPDF = async () => {
        try {
            const response = await getInvoiceBillsByPortfolioId(portfolioId);

            const invoices = response.data;

            const doc = new JsPDF();
            doc.text('Invoices', 10, 10);

            invoices.forEach((invoice, index) => {
                const invoiceData = [
                    index + 1,
                    invoice.amount,
                    invoice.dateTcea,
                    invoice.rucDni,
                    invoice.tcea.toFixed(3),
                    invoice.netDiscountedAmount.toFixed(3)
                ];
                tableRows.push(invoiceData);
            });

            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 20,
                theme: 'grid',
                headStyles: { fillColor: [211, 29, 84] },
                styles: { halign: 'center' }
            });

            doc.text(`Total Net Discounted Amount: ${netDiscountedAmount !== null ? (bankCurrency === 'USD' ? `$${netDiscountedAmount}` : `S/.${netDiscountedAmount}`) : 'N/A'}`, 10, doc.autoTable.previous.finalY + 10);
            doc.text(`Total TCEA: ${tceaResults !== null ? tceaResults : 'N/A'}`, 10, doc.autoTable.previous.finalY + 20);
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
                    <button onClick={handleDownloadPDF}>Descargar PDF</button>
                    <button onClick={handleDeletePortfolio}>Borrar Portafolio</button>
                    <button onClick={showTCEAcalculated}>TCEA calculada</button>
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
                        <p>No letras/facturas disponibles</p>
                    )}
                </div>
            </Modal>
            <Modal isOpen={isTceaModalOpen} onClose={() => setIsTceaModalOpen(false)}>
                <div style={styles.tceaContent}>
                    <h2>TCEA Calculada</h2>
                    {tcea !== null && (
                        <p>TCEA: {tcea}</p>
                    )}
                    {netDiscountedAmount !== null && (
                        <p>
                            Monto Neto Descontado:
                            {bankCurrency === 'USD' ? `$${netDiscountedAmount}` : `S/.${netDiscountedAmount}`}
                        </p>
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
    tceaContent: {
        padding: '20px',
        color: '#000',
    },
};

export default Portfolio;
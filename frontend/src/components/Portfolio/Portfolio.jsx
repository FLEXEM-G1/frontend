import React, { useState, CSSProperties } from 'react';
import { deletePortfolio } from '../../services/portfolioService.js';
import Invoice from '../Invoice/Invoice.jsx';
import Modal from '../Modal/Modal.jsx';
import { deleteInvoiceBill, getInvoiceBillsByPortfolioId } from '../../services/invoiceBillService.js';
import { toast } from "react-toastify";
import JsPDF from 'jspdf';
import 'jspdf-autotable';
import 'react-toastify/dist/ReactToastify.css';

const Portfolio = ({ bankName, bankCurrency, portfolioId, openTceaModal, onDelete, tcea, netDiscountedAmount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false); // Nuevo estado para controlar la eliminación
    const [invoices, setInvoices] = useState([]);
    const [isTceaModalOpen, setIsTceaModalOpen] = useState(false);
    const tableColumn = ["Factura", "Cantidad", "Fecha de vencimiento", "RUC/DNI", "Tipo", "TCEA", "Moneda", "Monto descontado"];
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
            toast.error('No existen letras o facturas asignadas al portafolio');
        }
    };

    const handleDeletePortfolio = async () => {
        try {
            const response = await getInvoiceBillsByPortfolioId(portfolioId);
            setInvoices(response.data);
            setIsWarningModalOpen(true);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // No invoices found, proceed with deletion
                setInvoices([]);
                setIsWarningModalOpen(true);
            } else {
                console.error('Error fetching invoices:', error);
                toast.error('Error al obtener las facturas del portafolio');
            }
        }
    };

    const confirmDeletePortfolio = async () => {
        try {
            if (invoices.length > 0) {
                await Promise.all(invoices.map(invoice => deleteInvoiceBill(invoice._id)));
            }
            await deletePortfolio(portfolioId);
            setIsDeleted(true);
            onDelete(portfolioId);
            setIsWarningModalOpen(false);
            toast.success('El portafolio y sus facturas han sido eliminados');
        } catch (error) {
            console.error('Error deleting portfolio:', error);
            toast.error('Error al eliminar el portafolio y sus facturas');
        }
    };



    const handleDownloadPDF = async () => {
        try {
            const response = await getInvoiceBillsByPortfolioId(portfolioId);
            const invoices = response.data;

            const doc = new JsPDF();
            doc.text('Letras/facturas', 10, 10);

            invoices.forEach((invoice, index) => {
                const invoiceType = invoice.type === 'Invoice' ? 'Factura' : 'Letra';
                const currencySymbol = bankCurrency === 'USD' ? '$' : 'S/.';
                const invoiceData = [
                    index + 1,
                    invoice.amount,
                    invoice.dateTcea,
                    invoice.rucDni,
                    invoiceType,
                    invoice.tcea.toFixed(3),
                    currencySymbol,
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

            const totalNetDiscountedAmount = netDiscountedAmount !== null && netDiscountedAmount !== undefined ? (bankCurrency === 'USD' ? `$${netDiscountedAmount.toFixed(3)}` : `S/.${netDiscountedAmount.toFixed(3)}`) : 'N/A';
            const totalTcea = tcea !== null && tcea !== undefined ? tcea.toFixed(3) : 'N/A';

            doc.text(`Cantidad neta descontada: ${totalNetDiscountedAmount}`, 10, doc.autoTable.previous.finalY + 10);
            doc.text(`TCEA General: ${totalTcea}%`, 10, doc.autoTable.previous.finalY + 20);
            doc.save('invoices.pdf');
        } catch (error) {
            toast.error('No se pudieron descargar las facturas');
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
                    <button onClick={() => openTceaModal(portfolioId)}>Simulador de TCEA</button>
                    <button onClick={openInvoicesModal}>Ver letras/facturas</button>
                    <button onClick={handleDownloadPDF}>Descargar PDF</button>
                    <button onClick={handleDeletePortfolio}>Borrar Portafolio</button>
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
                        <p>No hay letras o facturas creadas asignadas al portafolio</p>
                    )}
                </div>
            </Modal>
            <Modal isOpen={isWarningModalOpen} onClose={() => setIsWarningModalOpen(false)}>
                <div style={styles.warningContent}>
                    {invoices.length > 0 ? (
                        <>
                            <h2>Advertencia</h2>
                            <p>Este portafolio tiene facturas asociadas. Al eliminar el portafolio, también se eliminarán las facturas. ¿Desea continuar?</p>
                            <button onClick={confirmDeletePortfolio}>Aceptar</button>
                            <button onClick={() => setIsWarningModalOpen(false)}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            <h2>Advertencia</h2>
                            <p>¿Está seguro que desea eliminar el portafolio?</p>
                            <button onClick={confirmDeletePortfolio}>Aceptar</button>
                            <button onClick={() => setIsWarningModalOpen(false)}>Cancelar</button>
                        </>
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
    warningContent: {
        padding: '20px',
        color: '#000',
    },
};

export default Portfolio;
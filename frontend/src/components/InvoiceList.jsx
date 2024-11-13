import React, { useEffect, useState } from 'react';
import Invoice from './Invoice';
import Modal from './Modal';

const InvoiceList = ({ invoices }) => {
    const [filter, setFilter] = useState('Todos');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        console.log('InvoiceList - invoices:', invoices);
    }, [invoices]);

    const filteredInvoices = invoices.filter((invoice) => {
        if (filter === 'Todos') return true;
        return invoice.state === filter;
    });

    const getColor = (status) => {
        switch (status) {
            case 'Not Capitalized':
                return '#46D73D';
            case 'Capitalized':
                return '#45B0E4';
            default:
                return '#ccc';
        }
    };

    const handleInvoiceClick = (invoice) => {
        setSelectedInvoice(invoice);
        setIsModalOpen(true);
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h3>Filtro</h3>
                <button onClick={() => setFilter('Todos')}>
                    <span style={{ ...styles.colorBox, backgroundColor: getColor('Todos') }}></span> Todos
                </button>
                <button onClick={() => setFilter('Not Capitalized')}>
                    <span style={{ ...styles.colorBox, backgroundColor: getColor('Not Capitalized') }}></span> No Capitalizado
                </button>
                <button onClick={() => setFilter('Capitalized')}>
                    <span style={{ ...styles.colorBox, backgroundColor: getColor('Capitalized') }}></span> Capitalizado
                </button>
            </div>

            <div style={styles.invoiceList}>
                {filteredInvoices.map((invoice) => (
                    <div key={invoice._id} style={styles.invoice} onClick={() => handleInvoiceClick(invoice)}>
                        <p>Factura: {invoice.invoiceBillNumber || 'N/A'}</p>
                        <p>Monto: {invoice.amount || 'N/A'} {invoice.currency || ''}</p>
                        <p>Tipo: {invoice.type || 'N/A'}</p>
                    </div>
                ))}
            </div>

            {selectedInvoice && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <Invoice record={selectedInvoice} />
                </Modal>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    sidebar: {
        width: '200px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        marginTop: '10px',
    },
    invoiceList: {
        marginLeft: '20px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        marginTop: '10px',
        maxHeight: '400px',
        overflowY: 'auto',
    },
    invoice: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        cursor: 'pointer',
        backgroundColor: '#fff',
    },
    colorBox: {
        display: 'inline-block',
        width: '10px',
        height: '10px',
        marginRight: '5px',
        padding: '5px',
    },
};

export default InvoiceList;
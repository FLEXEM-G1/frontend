import React, { useState } from 'react';
import Invoice from './Invoice'; // Import the Invoice component

const InvoiceList = () => {
    const [filter, setFilter] = useState('Todos'); // State for the filter

    // List of invoices with status
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');

    // Filter invoices based on the selected filter
    const filteredInvoices = invoices.filter((invoice) => {
        if (filter === 'Todos') return true;
        return invoice.status === filter;
    });

    const getColor = (status) => {
        switch (status) {
            case 'Pendiente':
                return '#46D73D';
            case 'Pagado':
                return '#45B0E4';
            case 'Vencido':
                return '#E84949';
            default:
                return '#ccc';
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h3>Filtro</h3>
                <button onClick={() => setFilter('Todos')}>
                    <span style={{ ...styles.colorBox, backgroundColor: getColor('Todos') }}></span> Todos
                </button>
                <button onClick={() => setFilter('Pendiente')}>
                    <span style={{ ...styles.colorBox, backgroundColor: getColor('Pendiente') }}></span> Pendiente
                </button>
                <button onClick={() => setFilter('Vencido')}>
                    <span style={{ ...styles.colorBox, backgroundColor: getColor('Vencido') }}></span> Vencido
                </button>
                <button onClick={() => setFilter('Pagado')}>
                    <span style={{ ...styles.colorBox, backgroundColor: getColor('Pagado') }}></span> Pagado
                </button>
            </div>

            {/* Invoice list */}
            <div style={styles.invoiceList}>
                {filteredInvoices.map((invoice) => (
                    <Invoice key={invoice.id} record={invoice} />
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
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
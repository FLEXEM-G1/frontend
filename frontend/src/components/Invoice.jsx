// frontend/src/components/Invoice.jsx
import React from 'react';

const Invoice = ({ record }) => {
    const getBackgroundColor = (status) => {
        switch (status) {
            case 'Pending':
                return '#46D73D';
            case 'Payte':
                return '#45B0E4';
            case 'Expired':
                return '#E84949';
            default:
                return '#fff';
        }
    };

    return (
        <div style={{ ...styles.invoice, backgroundColor: getBackgroundColor(record.state), color: "black" }}>
            <p>Factura {record.invoiceBillNumber}</p>
            <p>Monto: {record.amount} {record.currency}</p>
            <p>Tipo: {record.type}</p>
            <p>Fecha de Emisión: {new Date(record.issueDate).toLocaleDateString()}</p>
            <p>Fecha de Expiración: {new Date(record.expirationDate).toLocaleDateString()}</p>
            <p>Estado: {record.state}</p>
        </div>
    );
};

const styles = {
    invoice: {
        border: '2px solid #ccc', // Keep a neutral border color
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        color: '#fff', // Ensure text is readable on colored backgrounds
    },
};

export default Invoice;
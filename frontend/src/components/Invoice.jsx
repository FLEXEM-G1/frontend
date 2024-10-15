import React from 'react';

const Invoice = ({ record }) => {
    const getBorderColor = (status) => {
        switch (status) {
            case 'Pendiente':
                return '#46D73D';
            case 'Pagado':
                return '#45B0E4';
            case 'Vencido':
                return '#E84949';
            default:
                return '#fff';
        }
    };

    return (
        <div style={{ ...styles.invoice, borderColor: getBorderColor(record.status), color: "black" }}>
            <p>Factura {record.id}</p>
            <p>Monto: {record.monto}</p>
            <p>Tipo: {record.tipo}</p>
            <p>Fecha de Emisión: {record.fechaEmision}</p>
            <p>Fecha de Expiración: {record.fechaVencimiento}</p>
            <p>Estado: {record.status}</p>
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
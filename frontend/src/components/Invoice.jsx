import React, { useState, useEffect } from 'react';
import { getPortfolioById } from '../services/portfolioService';

const Invoice = ({ record }) => {
    const [portfolio, setPortfolio] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await getPortfolioById(record.portfolioId);
                setPortfolio(response);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        if (record && record.portfolioId) {
            fetchPortfolio().then(r => r).catch(e => e);
        }
    }, [record]);

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

    if (!record) {
        return <div style={styles.invoice}>Invalid invoice data</div>;
    }

    return (
        <div style={{ ...styles.invoice, backgroundColor: getBackgroundColor(record.state), color: "black" }}>
            <p>Factura {record.invoiceBillNumber || 'N/A'}</p>
            <p>Monto: {record.amount || 'N/A'} {record.currency || ''}</p>
            <p>Tipo: {record.type || 'N/A'}</p>
            <p>Fecha de Emisión: {record.issueDate ? new Date(record.issueDate).toLocaleDateString() : 'N/A'}</p>
            <p>Fecha de Expiración: {record.expirationDate ? new Date(record.expirationDate).toLocaleDateString() : 'N/A'}</p>
            <p>Estado: {record.state || 'N/A'}</p>
            <p>TCEA: {record.tcea}</p>
        </div>
    );
};

const styles = {
    invoice: {
        border: '2px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        color: '#fff',
    },
};

export default Invoice;
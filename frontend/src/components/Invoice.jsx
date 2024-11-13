import React, { useState, useEffect } from 'react';
import { getPortfolioById } from '../services/portfolioService';

const Invoice = ({ record }) => {
    const [setPortfolio] = useState(null);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await getPortfolioById(record.portfolioId);
                setPortfolio(response.data);
            } catch (error) {
                console.error('Error fetching portfolio:', error);
            }
        };
        fetchPortfolio().then(r => r).catch(e => e);
    }, [record, setPortfolio]);

    const getBackgroundColor = (status) => {
        switch (status) {
            case 'Not Capitalized':
                return '#46D73D';
            case 'Capitalized':
                return '#45B0E4';
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
            <p>RUC/DNI: {record.rucDni || 'N/A'}</p>
            <p>Razón Social: {record.razSocNam || 'N/A'}</p>
            <p>TCEA: {record.tcea !== undefined ? record.tcea.toFixed(2) : 'N/A'}</p>
            <p>Monto descontado: {record.netDiscountedAmount !== undefined ? record.netDiscountedAmount.toFixed(2) : 'N/A'}</p>
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
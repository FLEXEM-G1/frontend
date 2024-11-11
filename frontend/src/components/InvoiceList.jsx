import React, { useEffect, useState } from 'react';
import Invoice from './Invoice';
import { deleteInvoiceBill, updateInvoiceBill } from '../services/invoiceBillService.js';

const InvoiceList = ({ invoices }) => {
    const [filter, setFilter] = useState('Todos');

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

    function setInvoices(updatedInvoices) {
        updatedInvoices.forEach(invoice => {
            updateInvoiceBill(invoice._id, invoice).then(response => {
                console.log('Invoice updated:', response.data);
            }).catch(error => {
                console.error('Error updating invoice:', error);
            });
        });
    }

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
                {filteredInvoices.map((invoice) => {
                    console.log('Portfolio id', invoice.portfolioId);
                    return <Invoice key={invoice._id} record={invoice} />;
                })}
            </div>

            <button onClick={() => {
                const updatedInvoices = filteredInvoices.map(invoice => {
                    const newState = invoice.state === 'Not Capitalized' ? 'Capitalized' : 'Not Capitalized';
                    return { ...invoice, state: newState };
                });
                setInvoices(updatedInvoices);
            }}>Actualizar Estados
            </button>
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
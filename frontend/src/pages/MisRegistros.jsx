// frontend/src/pages/MisRegistros.jsx
import React, { useEffect, useState } from 'react';
import InvoiceList from '../components/InvoiceList';
import { getAllInvoiceBills } from '../services/invoiceBillService';
import Sidebar from '../components/Sidebar';
import './MisRegistros.css';

const MisRegistros = () => {
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getAllInvoiceBills();
                if (response.data && response.data.length > 0) {
                    setInvoices(response.data);
                } else {
                    console.warn('No invoices found');
                }
            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices();
    }, []);

    return (
        <div className="mis-registros-container">
            <Sidebar />
            <div className="content">
                <div className="records-container">
                    <h1>Mis Registros</h1>
                    <InvoiceList invoices={invoices} />
                </div>
            </div>
        </div>
    );
};

export default MisRegistros;
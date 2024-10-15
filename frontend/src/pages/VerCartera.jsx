import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import './VerCartera.css';
import Wallet from "../components/Cartera";

const VerCartera = () => {
    const [isWalletOpen, setIsWalletOpen] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        setInvoices(storedInvoices);
    }, []);

    const toggleWallet = () => {
        setIsWalletOpen(!isWalletOpen);
    };

    const openInvoiceModal = (invoice) => {
        setSelectedInvoice(invoice);
    };

    const closeInvoiceModal = () => {
        setSelectedInvoice(null);
    };

    const downloadInvoice = () => {
        // Implement download logic here
        alert('Download invoice');
    };

    const printInvoice = () => {
        // Implement print logic here
        alert('Print invoice');
    };

    return (
        <div className="ver-cartera-container">
            <Sidebar />
            <div className="wallet-container">
                <Wallet bankName="BCP" records={invoices} />
            </div>
        </div>
    );
};

export default VerCartera;
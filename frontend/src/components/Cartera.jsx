import React, { useState } from 'react';
import Invoice from './Invoice';

const Wallet = ({ bankName, records }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleWallet = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={styles.walletContainer}>
            <div style={styles.walletHeader} onClick={toggleWallet}>
                <div style={styles.bankName}>{bankName}</div>
                <div style={styles.arrow}>{isOpen ? '▲' : '▼'}</div>
            </div>
            {isOpen && (
                <div style={styles.walletContent}>
                    <div>Letras/facturas: </div>
                    {records.map((record) => (
                        <Invoice key={record.id} record={record} />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    walletContainer: {
        border: '1px solid #000',
        borderRadius: '10px',
        width: '200px',
        maxHeight: '425px',
        overflow: 'auto',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#a52a3c',
        color: '#fff',
        scrollbarWidth: 'none',
    },
    walletHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        paddingBottom: '10px',
    },
    bankName: {
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
};

export default Wallet;
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';
import MisRegistros from '../../pages/MisRegistros/MisRegistros.jsx';
import GenerarLetrasFacturas from '../../pages/GenerarLetrasFacturas/GenerarLetrasFacturas.jsx';
import VerCartera from '../../pages/VerCartera/VerCartera.jsx';
import PieChart from '../PieChart.jsx';
import './Menu.css';
import VerPerfil from "../../pages/VerPerfil/VerPerfil.jsx";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAllInvoiceBills } from '../../services/invoiceBillService.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Menu = () => {
    const [pieChartData, setPieChartData] = useState({
        labels: ['Not Capitalized', 'Capitalized'],
        datasets: [
            {
                label: '# of Invoices',
                data: [0, 0],
                backgroundColor: ['#46D73D', '#45B0E4'],
            },
        ],
    });
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [notCapitalizedInvoices, setNotCapitalizedInvoices] = useState(0);
    const [tceaAverage, setTceaAverage] = useState(0);
    const [netGeneralAmount, setNetGeneralAmount] = useState(0);
    const [currency, setCurrency] = useState('USD');

    const exchangeRate = 3.5;

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getAllInvoiceBills();
                const invoices = response.data;
                const statusCounts = { 'Not Capitalized': 0, 'Capitalized': 0 };
                let totalNetAmount = 0;
                let totalAmount = 0;

                invoices.forEach(invoice => {
                    if (statusCounts[invoice.state] !== undefined) {
                        statusCounts[invoice.state]++;
                    }
                    totalNetAmount += invoice.netAmount;
                    totalAmount += invoice.amount;
                });

                setPieChartData({
                    labels: ['No capitalizados', 'Capitalizados'],
                    datasets: [
                        {
                            label: '# of Invoices',
                            data: [statusCounts['Not Capitalized'], statusCounts['Capitalized']],
                            backgroundColor: ['#46D73D', '#45B0E4'],
                        },
                    ],
                });

                setTotalInvoices(invoices.length);
                setNotCapitalizedInvoices(statusCounts['Not Capitalized']);
                setTceaAverage(invoices.reduce((acc, invoice) => acc + invoice.tcea, 0) / invoices.length);
                setNetGeneralAmount(totalAmount); // Update the netGeneralAmount with the total amount

            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices().then(r => console.log('Invoices fetched'));
    }, []);

    const location = useLocation();

    const toggleCurrency = () => {
        setCurrency(prevCurrency => (prevCurrency === 'USD' ? 'PEN' : 'USD'));
    };

    const convertedAmount = currency === 'USD' ? netGeneralAmount : netGeneralAmount * exchangeRate;

    return (
        <div className="menu">
            <Sidebar/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/mis-registros" element={<MisRegistros />} />
                    <Route path="/generar-letras-facturas" element={<GenerarLetrasFacturas />} />
                    <Route path="/ver-cartera" element={<VerCartera setTceaAverage={setTceaAverage} />} />
                    <Route path="/ver-perfil" element={<VerPerfil />} />
                </Routes>
                {location.pathname === '/menu' && (
                    <div className="main-container">
                        <div className="text-container">
                            <div className="rectangleText">Total Letras/Facturas: {totalInvoices}</div>
                            <div className="rectangleText">No Capitalizadas: {notCapitalizedInvoices}</div>
                            <div className="rectangleText">TCEA Promedio: {tceaAverage.toFixed(3)}</div>
                            <div className="rectangleText">
                                Monto Neto General: {convertedAmount.toFixed(2)} {currency}
                                <button onClick={toggleCurrency} style={{ marginLeft: '10px' }}>
                                    Ver en {currency === 'USD' ? 'Soles' : 'Dólares'}
                                </button>
                            </div>
                        </div>
                        <div className="chart-container">
                            <PieChart data={pieChartData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
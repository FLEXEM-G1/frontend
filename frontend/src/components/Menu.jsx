import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MisRegistros from '../pages/MisRegistros';
import GenerarLetrasFacturas from '../pages/GenerarLetrasFacturas';
import VerCartera from '../pages/VerCartera';
import PieChart from './PieChart';
import './Menu.css';
import VerPerfil from "../pages/VerPerfil";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getAllInvoiceBills } from '../services/invoiceBillService';

ChartJS.register(ArcElement, Tooltip, Legend);

const Menu = () => {
    const [pieChartData, setPieChartData] = useState({
        labels: ['Pending', 'Payte', 'Expired'],
        datasets: [
            {
                label: '# of Invoices',
                data: [0, 0, 0],
                backgroundColor: ['#46D73D', '#45B0E4', '#E84949'],
            },
        ],
    });
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [pendingInvoices, setPendingInvoices] = useState(0);
    const [tceaAverage, setTceaAverage] = useState(0);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getAllInvoiceBills();
                const invoices = response.data;
                const statusCounts = { Pending: 0, Payte: 0, Expired: 0 };

                invoices.forEach(invoice => {
                    if (statusCounts[invoice.state] !== undefined) {
                        statusCounts[invoice.state]++;
                    }
                });

                setPieChartData({
                    labels: ['Pending', 'Payte', 'Expired'],
                    datasets: [
                        {
                            label: '# of Invoices',
                            data: [statusCounts.Pending, statusCounts.Payte, statusCounts.Expired],
                            backgroundColor: ['#46D73D', '#45B0E4', '#E84949'],
                        },
                    ],
                });

                setTotalInvoices(invoices.length);
                setPendingInvoices(statusCounts.Pending);

            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices().then(r => console.log('Invoices fetched'));
    }, []);

    const values = pieChartData.datasets[0].data;
    const location = useLocation();

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
                            <div className="rectangleText">Letras a vencer: {pendingInvoices}</div>
                            <div className="rectangleText">TCEA Promedio: {tceaAverage.toFixed(2)}</div>
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
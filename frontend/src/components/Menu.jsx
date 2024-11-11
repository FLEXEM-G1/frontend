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

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getAllInvoiceBills();
                const invoices = response.data;
                const statusCounts = { 'Not Capitalized': 0, 'Capitalized': 0 };

                invoices.forEach(invoice => {
                    if (statusCounts[invoice.state] !== undefined) {
                        statusCounts[invoice.state]++;
                    }
                });

                setPieChartData({
                    labels: ['Not Capitalized', 'Capitalized'],
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

            } catch (error) {
                console.error('Error fetching invoices:', error);
            }
        };

        fetchInvoices().then(r => console.log('Invoices fetched'));
    }, []);

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
                            <div className="rectangleText">No Capitalizadas: {notCapitalizedInvoices}</div>
                            <div className="rectangleText">TCEA Promedio: {tceaAverage.toFixed(3)}</div>
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
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

ChartJS.register(ArcElement, Tooltip, Legend);

const Menu = () => {
    const [pieChartData, setPieChartData] = useState({
        labels: ['Vencido', 'Pagado', 'Pendiente'],
        datasets: [
            {
                label: '# of Invoices',
                data: [0, 0, 0],
                backgroundColor: ['#E84949', '#45B0E4', '#46D73D'],
            },
        ],
    });

    useEffect(() => {
        const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        const statusCounts = { Vencido: 0, Pagado: 0, Pendiente: 0 };

        invoices.forEach(invoice => {
            if (statusCounts[invoice.status] !== undefined) {
                statusCounts[invoice.status]++;
            }
        });

        setPieChartData({
            labels: ['Vencido', 'Pagado', 'Pendiente'],
            datasets: [
                {
                    label: '# of Invoices',
                    data: [statusCounts.Vencido, statusCounts.Pagado, statusCounts.Pendiente],
                    backgroundColor: ['#E84949', '#45B0E4', '#46D73D'],
                },
            ],
        });
    }, []);

    const values = pieChartData.datasets[0].data;
    const location = useLocation();

    return (
        <div className="menu">
            <Sidebar />
            <div className="content">
                <Routes>
                    <Route path="/" element={<Menu />} />
                    <Route path="/mis-registros" element={<MisRegistros />} />
                    <Route path="/generar-letras-facturas" element={<GenerarLetrasFacturas />} />
                    <Route path="/ver-cartera" element={<VerCartera />} />
                    <Route path="/ver-perfil" element={<VerPerfil />} />
                </Routes>
                {location.pathname === '/menu' && (
                    <div className="main-container">
                        <div className="text-container">
                            <div className="rectangleText">Total Letras/Facturas: {values[0] + values[1] + values[2]}</div>
                            <div className="rectangleText">Letras a vencer: {values[2]}</div>
                            <div className="rectangleText">TCEA Promedio: </div>
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
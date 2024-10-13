import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MisRegistros from '../pages/MisRegistros';
import GenerarLetrasFacturas from '../pages/GenerarLetrasFacturas';
import VerCartera from '../pages/VerCartera';
import { pieChartData } from './PieChart';
import PieChart from './PieChart';
import './Menu.css';
import VerPerfil from "../pages/VerPerfil";

const Menu = () => {
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
                            <PieChart />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Menu from './components/Menu.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import VerCartera from './pages/VerCartera.jsx';
import GenerarLetrasFacturas from './pages/GenerarLetrasFacturas.jsx';
import MisRegistros from './pages/MisRegistros.jsx';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [invoices, setInvoices] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const addInvoice = (invoice) => {
    setInvoices([...invoices, invoice]);
  };

  return (
      <Router>
        <div className="App">
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/ver-cartera" element={<VerCartera />} />
            <Route path="/generar-letras-facturas" element={<GenerarLetrasFacturas addInvoice={addInvoice} />} />
            <Route path="/mis-registros" element={<MisRegistros invoices={invoices} />} />
            <Route path="/*" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
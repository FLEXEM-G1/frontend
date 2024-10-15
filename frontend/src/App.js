// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import VerCartera from './pages/VerCartera';
import GenerarLetrasFacturas from './pages/GenerarLetrasFacturas';
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
            <Route path="/ver-cartera" element={<VerCartera invoices={invoices} />} />
            <Route path="/generar-letras-facturas" element={<GenerarLetrasFacturas addInvoice={addInvoice} />} />
            <Route path="/*" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
      <Router>
        <div className="App">
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/*" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
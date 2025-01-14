import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './styles/Index.css';

const LandingPage = () => (
  <div className="app-container">
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-8 textPrincipal">Sistema de Gestión de Hoteles</h1>
      <Link
        to="/home"
        className="custom-button"
      >
        Iniciar Sistema
      </Link>
    </div>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;

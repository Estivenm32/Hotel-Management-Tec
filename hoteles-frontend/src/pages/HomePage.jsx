import React from 'react';
import HotelList from '../components/HotelList';
import '../styles/Index.css';

const HomePage = () => {
  return (
    <div className="home-page-container">
      {/* Barra de encabezado */}
      <header className="header-bar">
        <h1 className="header-title">Bienvenido al Sistema de Gestión Hotelaria</h1>
      </header>

      {/* Contenido principal */}
      <div className="p-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <HotelList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
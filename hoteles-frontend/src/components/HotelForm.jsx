import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import api from '../services/api';
import '../styles/Hotel.css';

const HotelForm = ({ onAdd }) => {
  const [hotel, setHotel] = useState({
    name: '',
    address: '',
    city: '',
    nit: '',
    max_rooms: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/hotels', hotel);
      alert('Hotel creado exitosamente!');
      onAdd(); // Llamar a la función de callback para recargar la lista de hoteles
      setHotel({ name: '', address: '', city: '', nit: '', max_rooms: 0 });
      setIsModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      if (error.response?.status === 422) {
        alert(error.response.data.error || 'Hubo un problema al crear el hotel.');
      }
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="hotel-form-container">
      <div className="header">
        {/* Botón para volver a la página de inicio*/}
        <Link to="/" className="back-home-btn">
          <FaHome className="icon-home" /> Volver al Inicio
        </Link>

        {/* Botón "Nuevo Hotel" */}
        <button className="add-hotel-btn" onClick={toggleModal}>
          <span>+</span> Nuevo Hotel
        </button>
      </div>
      {/* En el modal estan los campos para crear un hotel" */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agrega un nuevo hotel</h2>
            <hr />
            <br />
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                value={hotel.name}
                onChange={(e) => setHotel({ ...hotel, name: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Dirección"
                value={hotel.address}
                onChange={(e) => setHotel({ ...hotel, address: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Ciudad"
                value={hotel.city}
                onChange={(e) => setHotel({ ...hotel, city: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="NIT"
                value={hotel.nit}
                onChange={(e) => setHotel({ ...hotel, nit: e.target.value })}
                required
              />
              <input
                type="number"
                placeholder="Max Rooms"
                value={hotel.max_rooms}
                onChange={(e) =>
                  setHotel({ ...hotel, max_rooms: parseInt(e.target.value, 10) })
                }
                required
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn-Form">
                  Guardar
                </button>
                <button type="button" className="close-btn-Form" onClick={toggleModal}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelForm;
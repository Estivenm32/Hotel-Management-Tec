import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/style.css';
import RoomForm from './RoomForm';
import HotelForm from './HotelForm';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // Hotel seleccionado para asignar habitación
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [hotelsPerPage] = useState(5); // Número de hoteles por página

  // Obtener la lista de hoteles desde la API
  const fetchHotels = async () => {
    try {
      const response = await api.get('/hotels');
      setHotels(response.data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Manejar la asignación de habitaciones
  const handleAddRoom = (updatedHotel) => {
    setHotels((prevHotels) =>
      prevHotels.map((hotel) =>
        hotel.id === updatedHotel.id ? updatedHotel : hotel
      )
    );
    closeModal();
  };

  // Abrir el modal para un hotel específico
  const openModal = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setSelectedHotel(null);
    setIsModalOpen(false);
  };

  // Calcular las tarjetas de hoteles a mostrar para la página actual
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Crear un array de números de página
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(hotels.length / hotelsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <h2 className="titleHotel">HOTELES</h2>
      <HotelForm onAdd={fetchHotels} />
      <div className="hotels-container">
        {currentHotels.length > 0 ? (
          currentHotels.map((hotel) => (
            <div key={hotel.id} className="hotel-card">
              <h3>{hotel.name}</h3>
              <p>Dirección: {hotel.address} - {hotel.city}</p>
              <p>NIT: {hotel.nit}</p>
              <p>Total de Habitaciones: {hotel.max_rooms}</p>
              <h4>Alojamiento Asignado:</h4>
              <ul>
                {hotel.rooms && hotel.rooms.length > 0 ? (
                  hotel.rooms.map((room) => (
                    <li key={room.id}>
                      {room.type} - {room.accommodation} ({room.quantity})
                    </li>
                  ))
                ) : (
                  <li>No rooms available</li>
                )}
              </ul>
              <div className="button-container">
                <button
                  className="btn assign-btn"
                  onClick={() => openModal(hotel)}
                >
                  Asignar Habitación
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hotels found.</p>
        )}
      </div>

      {/* Paginación */}
      {hotels.length > hotelsPerPage && (
        <div className="pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={number === currentPage ? 'active' : ''}
            >
              {number}
            </button>
          ))}
        </div>
      )}

      {/* Modal para asignar habitación */}
      {isModalOpen && selectedHotel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Asignar Habitación</h2>
            <hr />
            {/* Información del hotel seleccionado */}
            <table className="hotel-info-table">
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Total de Habitaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedHotel.name}</td>
                  <td>
                    {selectedHotel.rooms
                      ? selectedHotel.rooms.reduce(
                          (total, room) => total + room.quantity,
                          0
                        )
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Formulario para asignar habitación */}
            <RoomForm onAdd={handleAddRoom} hotel={selectedHotel} />
            <button className="btn close-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelList;

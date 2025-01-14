import React, { useState } from 'react';
import api from '../services/api';
import '../styles/Room.css';

const RoomForm = ({ onAdd, hotel }) => {
  const [room, setRoom] = useState({
    type: 'Estándar',
    accommodation: 'Sencilla',
    quantity: 1,
  });
  const [selectedRooms, setSelectedRooms] = useState([]); // Estado para rastrear las habitaciones seleccionadas

  const handleAddRoom = () => {
    // Validar cantidad máxima de habitaciones
    const totalRooms = selectedRooms.reduce((sum, r) => sum + r.quantity, 0) + room.quantity;
    if (totalRooms > hotel.max_rooms) {
      alert('La cantidad de habitaciones que desea supera el máximo permitido para este hotel.');
      return;
    }
  
    setSelectedRooms((prev) => {
      // Verificar duplicados
      const existingRoom = prev.find(
        (r) => r.type === room.type && r.accommodation === room.accommodation
      );
  
      if (existingRoom) {
        alert('Ya existe una habitación con este tipo y acomodación.'); 
        // Actualizar cantidad si ya existe
        return prev.map((r) =>
          r.type === room.type && r.accommodation === room.accommodation
            ? { ...r, quantity: r.quantity + room.quantity }
            : r
        );
      } else {
        // Agregar una nueva habitación
        return [...prev, room];
      }
    });
  
    // Reiniciar el formulario
    setRoom({ type: 'Estándar', accommodation: 'Sencilla', quantity: 1 });
  };
  

  const handleSaveRooms = async (e) => {
    e.preventDefault();
    if (!hotel || !hotel.id) {
      console.error('No hotel selected');
      return;
    }

    try {
      const response = await api.post(`/hotels/${hotel.id}/rooms`, {
        rooms: selectedRooms, // Enviar todas las habitaciones seleccionadas
      });
      onAdd(response.data); // Notificar al componente padre del cambio
      setSelectedRooms([]); // Limpiar las habitaciones seleccionadas después de guardar
    } catch (error) {
      console.error(error.response?.data || 'Error saving rooms');
    }
  };

  return (
    <div>
      <form onSubmit={handleSaveRooms}>
        <br />
        <select
          value={room.type}
          onChange={(e) => setRoom({ ...room, type: e.target.value })}
        >
          <option value="Estándar">Estándar</option>
          <option value="Junior">Junior</option>
          <option value="Suite">Suite</option>
        </select>
        <select
          value={room.accommodation}
          onChange={(e) => setRoom({ ...room, accommodation: e.target.value })}
        >
          {room.type === 'Estándar' && (
            <>
              <option value="Sencilla">Sencilla</option>
              <option value="Doble">Doble</option>
            </>
          )}
          {room.type === 'Junior' && (
            <>
              <option value="Triple">Triple</option>
              <option value="Cuádruple">Cuádruple</option>
            </>
          )}
          {room.type === 'Suite' && (
            <>
              <option value="Sencilla">Sencilla</option>
              <option value="Doble">Doble</option>
              <option value="Triple">Triple</option>
            </>
          )}
        </select>
        <input
          type="number"
          min="1"
          value={room.quantity}
          onChange={(e) =>
            setRoom({ ...room, quantity: parseInt(e.target.value, 10) })
          }
        />
        <button type="button" onClick={handleAddRoom}>
          Agregar
        </button>
        <button type="submit" className="add-room-btn">
          Guardar
        </button>
      </form>

      {/* Mostrar las habitaciones seleccionadas en una tabla */} 
      <div className="selected-rooms">
        <h3>Habitaciones Seleccionadas</h3>
        <hr />
        {selectedRooms.length > 0 ? (
          <table className="hotel-info-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Acomodación</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {selectedRooms.map((selectedRoom, index) => (
                <tr key={index}>
                  <td>{selectedRoom.type}</td>
                  <td>{selectedRoom.accommodation}</td>
                  <td>{selectedRoom.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se han agregado habitaciones.</p>
        )}
      </div>
    </div>
  );
};

export default RoomForm;
 
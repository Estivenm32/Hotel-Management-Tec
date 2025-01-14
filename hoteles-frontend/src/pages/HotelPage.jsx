import React, { useState } from 'react';
import HotelForm from '../components/HotelForm';
import RoomForm from '../components/RoomForm';
import HotelList from '../components/HotelList';

const HomePage = () => {
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  return (
    <div>
      <h1>Hotel Management</h1>
      <HotelForm onAdd={(hotel) => console.log('Hotel added:', hotel)} />
      {selectedHotelId && (
        <RoomForm
          hotelId={selectedHotelId}
          onAdd={(updatedHotel) => console.log('Rooms updated:', updatedHotel)}
        />
      )}
      <HotelList onSelect={(id) => setSelectedHotelId(id)} />
    </div>
  );
};

export default HomePage;



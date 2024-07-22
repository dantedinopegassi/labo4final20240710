import React, { useState, useEffect } from 'react';
import api from './Api';

const Carreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [newCarrera, setNewCarrera] = useState('');

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    try {
      const response = await api.get('/carreras');
      setCarreras(response.data);
    } catch (error) {
      console.error('Error fetching carreras:', error);
    }
  };

  const addCarrera = async () => {
    try {
      await api.post('/carreras', { nombre: newCarrera });
      setNewCarrera('');
      fetchCarreras();
    } catch (error) {
      console.error('Error adding carrera:', error);
    }
  };

  return (
    <div>
      <h2>Carreras</h2>
      <ul>
        {carreras.map(carrera => (
          <li key={carrera.id}>{carrera.nombre}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newCarrera}
        onChange={(e) => setNewCarrera(e.target.value)}
      />
      <button onClick={addCarrera}>Add Carrera</button>
    </div>
  );
};

export default Carreras;

import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Carreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [newCarrera, setNewCarrera] = useState('');

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    try {
      const response = await axios.get('/carreras');
      setCarreras(response.data);
    } catch (error) {
      console.error('Error fetching carreras:', error);
    }
  };

  const addCarrera = async () => {
    try {
      await axios.post('/carreras', { nombre: newCarrera });
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

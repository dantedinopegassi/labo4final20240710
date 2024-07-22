import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    const response = await api.get('/materias');
    setMaterias(response.data);
  };

  const addMateria = async () => {
    await api.post('/materias', { nombre, carrera });
    fetchMaterias();
  };

  return (
    <div>
      <h2>Materias</h2>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Carrera" 
        value={carrera} 
        onChange={(e) => setCarrera(e.target.value)} 
      />
      <button onClick={addMateria}>Agregar Materia</button>
      <ul>
        {materias.map((materia) => (
          <li key={materia.id}>{materia.nombre} - {materia.carrera}</li>
        ))}
      </ul>
    </div>
  );
};

export default Materias;

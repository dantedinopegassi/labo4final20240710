import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = async () => {
    const response = await api.get('/aulas');
    setAulas(response.data);
  };

  const addAula = async () => {
    await api.post('/aulas', { nombre });
    fetchAulas();
  };

  return (
    <div>
      <h2>Aulas</h2>
      <input 
        type="text" 
        placeholder="Nombre" 
        value={nombre} 
        onChange={(e) => setNombre(e.target.value)} 
      />
      <button onClick={addAula}>Agregar Aula</button>
      <ul>
        {aulas.map((aula) => (
          <li key={aula.id}>{aula.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Aulas;

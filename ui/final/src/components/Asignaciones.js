import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Asignaciones = () => {
  const [aulas, setAulas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [aulaId, setAulaId] = useState('');
  const [materiaId, setMateriaId] = useState('');
  const [dia, setDia] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFin, setHoraFin] = useState('');

  useEffect(() => {
    fetchAulas();
    fetchMaterias();
  }, []);

  const fetchAulas = async () => {
    const response = await api.get('/aulas');
    setAulas(response.data);
  };

  const fetchMaterias = async () => {
    const response = await api.get('/materias');
    setMaterias(response.data);
  };

  const addAsignacion = async () => {
    await api.post('/asignaciones', { aulaId, materiaId, dia, horaInicio, horaFin });
  };

  return (
    <div>
      <h2>Asignar Aula a Materia</h2>
      <select onChange={(e) => setAulaId(e.target.value)} value={aulaId}>
        <option value="">Seleccione un Aula</option>
        {aulas.map((aula) => (
          <option key={aula.id} value={aula.id}>{aula.nombre}</option>
        ))}
      </select>
      <select onChange={(e) => setMateriaId(e.target.value)} value={materiaId}>
        <option value="">Seleccione una Materia</option>
        {materias.map((materia) => (
          <option key={materia.id} value={materia.id}>{materia.nombre}</option>
        ))}
      </select>
      <input 
        type="text" 
        placeholder="Día" 
        value={dia} 
        onChange={(e) => setDia(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Hora de Inicio" 
        value={horaInicio} 
        onChange={(e) => setHoraInicio(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Hora de Fin" 
        value={horaFin} 
        onChange={(e) => setHoraFin(e.target.value)} 
      />
      <button onClick={addAsignacion}>Asignar</button>
    </div>
  );
};

export default Asignaciones;

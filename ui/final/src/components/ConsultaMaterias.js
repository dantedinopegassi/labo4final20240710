import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ConsultaMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [materiaId, setMateriaId] = useState('');
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    const response = await api.get('/materias');
    setMaterias(response.data);
  };

  const fetchAsignaciones = async () => {
    const response = await api.get(`/asignaciones/materia/${materiaId}`);
    setAsignaciones(response.data);
  };

  return (
    <div>
      <h2>Consulta por Materia</h2>
      <select onChange={(e) => setMateriaId(e.target.value)} value={materiaId}>
        <option value="">Seleccione una Materia</option>
        {materias.map((materia) => (
          <option key={materia.id} value={materia.id}>{materia.nombre}</option>
        ))}
      </select>
      <button onClick={fetchAsignaciones}>Consultar</button>
      <ul>
        {asignaciones.map((asignacion) => (
          <li key={asignacion.id}>{asignacion.dia}, {asignacion.aula.nombre}, de {asignacion.horaInicio} a {asignacion.horaFin}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultaMaterias;

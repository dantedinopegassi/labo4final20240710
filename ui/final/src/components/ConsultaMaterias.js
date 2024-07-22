// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const ConsultaMaterias = () => {
//   const [materias, setMaterias] = useState([]);
//   const [materiaId, setMateriaId] = useState('');
//   const [asignaciones, setAsignaciones] = useState([]);

//   useEffect(() => {
//     fetchMaterias();
//   }, []);

//   const fetchMaterias = async () => {
//     const response = await api.get('/materias');
//     setMaterias(response.data);
//   };

//   const fetchAsignaciones = async () => {
//     const response = await api.get(`/asignaciones/materia/${materiaId}`);
//     setAsignaciones(response.data);
//   };

//   return (
//     <div>
//       <h2>Consulta por Materia</h2>
//       <select onChange={(e) => setMateriaId(e.target.value)} value={materiaId}>
//         <option value="">Seleccione una Materia</option>
//         {materias.map((materia) => (
//           <option key={materia.id} value={materia.id}>{materia.nombre}</option>
//         ))}
//       </select>
//       <button onClick={fetchAsignaciones}>Consultar</button>
//       <ul>
//         {asignaciones.map((asignacion) => (
//           <li key={asignacion.id}>{asignacion.dia}, {asignacion.aula.nombre}, de {asignacion.horaInicio} a {asignacion.horaFin}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ConsultaMaterias;

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Form } from 'react-bootstrap';

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
      <Form>
        <Form.Group controlId="materia">
          <Form.Label>Materia</Form.Label>
          <Form.Control as="select" value={materiaId} onChange={(e) => setMateriaId(e.target.value)}>
            <option value="">Seleccione una Materia</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>{materia.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button onClick={fetchAsignaciones}>Consultar</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Día</th>
            <th>Aula</th>
            <th>Hora de Inicio</th>
            <th>Hora de Fin</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={asignacion.id}>
              <td>{asignacion.dia}</td>
              <td>{asignacion.aula.nombre}</td>
              <td>{asignacion.horaInicio}</td>
              <td>{asignacion.horaFin}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ConsultaMaterias;

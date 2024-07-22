// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const Materias = () => {
//   const [materias, setMaterias] = useState([]);
//   const [nombre, setNombre] = useState('');
//   const [carrera, setCarrera] = useState('');

//   useEffect(() => {
//     fetchMaterias();
//   }, []);

//   const fetchMaterias = async () => {
//     const response = await api.get('/materias');
//     setMaterias(response.data);
//   };

//   const addMateria = async () => {
//     await api.post('/materias', { nombre, carrera });
//     fetchMaterias();
//   };

//   return (
//     <div>
//       <h2>Materias</h2>
//       <input 
//         type="text" 
//         placeholder="Nombre" 
//         value={nombre} 
//         onChange={(e) => setNombre(e.target.value)} 
//       />
//       <input 
//         type="text" 
//         placeholder="Carrera" 
//         value={carrera} 
//         onChange={(e) => setCarrera(e.target.value)} 
//       />
//       <button onClick={addMateria}>Agregar Materia</button>
//       <ul>
//         {materias.map((materia) => (
//           <li key={materia.id}>{materia.nombre} - {materia.carrera}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Materias;

import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Form } from 'react-bootstrap';

const Materias = () => {
  const [materias, setMaterias] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [nombre, setNombre] = useState('');
  const [carreraId, setCarreraId] = useState('');

  useEffect(() => {
    fetchMaterias();
    fetchCarreras();
  }, []);

  const fetchMaterias = async () => {
    const response = await api.get('/materias');
    setMaterias(response.data);
  };

  const fetchCarreras = async () => {
    const response = await api.get('/carreras');
    setCarreras(response.data);
  };

  const addMateria = async () => {
    await api.post('/materias', { nombre, carrera_id: carreraId });
    fetchMaterias();
  };

  return (
    <div>
      <h2>Materias</h2>
      <Form>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="carrera">
          <Form.Label>Carrera</Form.Label>
          <Form.Control as="select" value={carreraId} onChange={(e) => setCarreraId(e.target.value)}>
            <option value="">Seleccione una Carrera</option>
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button onClick={addMateria}>Agregar Materia</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Carrera</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.id}>
              <td>{materia.id}</td>
              <td>{materia.nombre}</td>
              <td>{materia.carrera.nombre}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Materias;

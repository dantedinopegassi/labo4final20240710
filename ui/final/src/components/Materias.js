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
  const [editMateria, setEditMateria] = useState(null);

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

  const updateMateria = async () => {
    await api.put(`/materias/${editMateria.id}`, {
      nombre: editMateria.nombre,
      carrera_id: editMateria.carrera_id,
    });
    fetchMaterias();
    setEditMateria(null);
  };

  const handleEditChange = (e) => {
    setEditMateria({
      ...editMateria,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/materias/${id}`);
      fetchMaterias();
    } catch (error) {
      alert("Error borrando materia");
      console.error("Error borrando materia:", error);
    }
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materias.map((materia) => (
            <tr key={materia.id}>
              {editMateria && editMateria.id === materia.id ? (
                <>
                  <td>{materia.id}</td>
                  <td>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={editMateria.nombre}
                      onChange={handleEditChange}
                    />
                  </td>
                  <td>
                    <Form.Control
                      as="select"
                      name="carrera_id"
                      value={editMateria.carrera_id}
                      onChange={handleEditChange}
                    >
                      <option value="">Seleccione una Carrera</option>
                      {carreras.map((carrera) => (
                        <option key={carrera.id} value={carrera.id}>
                          {carrera.nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Button onClick={updateMateria}>Guardar</Button>
                    <Button onClick={() => setEditMateria(null)}>Cancelar</Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{materia.id}</td>
                  <td>{materia.nombre}</td>
                  <td>{materia.carrera.nombre}</td>
                  <td>
                    <Button onClick={() => setEditMateria(materia)}>Editar</Button>
                    <Button onClick={() => handleDelete(materia.id)}>Eliminar</Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Materias;

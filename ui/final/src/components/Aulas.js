// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const Aulas = () => {
//   const [aulas, setAulas] = useState([]);
//   const [nombre, setNombre] = useState('');

//   useEffect(() => {
//     fetchAulas();
//   }, []);

//   const fetchAulas = async () => {
//     const response = await api.get('/aulas');
//     setAulas(response.data);
//   };

//   const addAula = async () => {
//     await api.post('/aulas', { nombre });
//     fetchAulas();
//   };

//   return (
//     <div>
//       <h2>Aulas</h2>
//       <input
//         type="text"
//         placeholder="Nombre"
//         value={nombre}
//         onChange={(e) => setNombre(e.target.value)}
//       />
//       <button onClick={addAula}>Agregar Aula</button>
//       <ul>
//         {aulas.map((aula) => (
//           <li key={aula.id}>{aula.nombre}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Aulas;

import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Table, Button, Form } from "react-bootstrap";

const Aulas = () => {
  const [aulas, setAulas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editAula, setEditAula] = useState(null);

  useEffect(() => {
    fetchAulas();
  }, []);

  const fetchAulas = async () => {
    const response = await api.get("/aulas");
    setAulas(response.data);
  };

  const addAula = async () => {
    try {
      await api.post("/aulas", { nombre });
      fetchAulas();
    } catch (error) {
      alert("Error aniadiendo aula");
      console.error("Error aniadiendo aula:", error);
    }
  };

  const updateAula = async () => {
    try {
      await api.put(`/aulas/${editAula.id}`, {
        nombre: editAula.nombre,
      });
      fetchAulas();
      setEditAula(null);
    } catch (error) {
      alert("Error modificando aula");
      console.error("Error modificando aula:", error);
    }
  };

  const handleEditChange = (e) => {
    setEditAula({
      ...editAula,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/aulas/${id}`);
      fetchAulas();
    } catch (error) {
      alert("Error borrando aula");
      console.error("Error borrando aula:", error);
    }
  };

  return (
    <div>
      <h2>Aulas</h2>
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
        <Button onClick={addAula}>Agregar Aula</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((aula) => (
            <tr key={aula.id}>
              <td>{aula.id}</td>
              <td>{aula.nombre}</td>
              <td>
                <Button onClick={() => setEditAula(aula)}>Editar</Button>
                <Button onClick={() => handleDelete(aula.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Aulas;

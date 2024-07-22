import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Table, Button, Form } from 'react-bootstrap';

const Carreras = () => {
  const [carreras, setCarreras] = useState([]);
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    fetchCarreras();
  }, []);

  const fetchCarreras = async () => {
    const response = await api.get('/carreras');
    setCarreras(response.data);
  };

  const addCarrera = async () => {
    await api.post('/carreras', { nombre });
    fetchCarreras();
  };

  return (
    <div>
      <h2>Carreras</h2>
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
        <Button onClick={addCarrera}>Agregar Carrera</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.id}>
              <td>{carrera.id}</td>
              <td>{carrera.nombre}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Carreras;

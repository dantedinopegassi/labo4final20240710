import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Table, Button, Form } from "react-bootstrap";
import dias from "../services/days_of_week";

const Asignaciones = () => {
  const [aulas, setAulas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [aulaId, setAulaId] = useState("");
  const [materiaId, setMateriaId] = useState("");
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");

  useEffect(() => {
    fetchAulas();
    fetchMaterias();
    fetchAsignaciones();
  }, []);

  const fetchAulas = async () => {
    const response = await api.get("/aulas");
    setAulas(response.data);
  };

  const fetchMaterias = async () => {
    const response = await api.get("/materias");
    setMaterias(response.data);
  };

  const fetchAsignaciones = async () => {
    const response = await api.get("/asignaciones");
    setAsignaciones(response.data);
  };

  const addAsignacion = async () => {
    try {
      await api.post("/asignaciones", {
        aula_id: aulaId,
        materia_id: materiaId,
        dia_semana: dia,
        hora_inicio: horaInicio,
        hora_fin: horaFin,
      });
      fetchAsignaciones();
    } catch (error) {
      alert("Error aniadiendo asignacion");
      console.error("Error aniadiendo asignacion:", error);
    }
  };

  return (
    <div>
      <h2>Asignar Aula a Materia</h2>
      <Form>
        <Form.Group controlId="aula">
          <Form.Label>Aula</Form.Label>
          <Form.Control
            as="select"
            value={aulaId}
            onChange={(e) => setAulaId(e.target.value)}
          >
            <option value="">Seleccione un Aula</option>
            {aulas.map((aula) => (
              <option key={aula.id} value={aula.id}>
                {aula.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="materia">
          <Form.Label>Materia</Form.Label>
          <Form.Control
            as="select"
            value={materiaId}
            onChange={(e) => setMateriaId(e.target.value)}
          >
            <option value="">Seleccione una Materia</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="dia">
          <Form.Label>Día</Form.Label>
          <Form.Control
            as="select"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
          >
            <option value="">Seleccione un Dia</option>
            {dias.map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="horaInicio">
          <Form.Label>Hora de Inicio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Hora de Inicio"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="horaFin">
          <Form.Label>Hora de Fin</Form.Label>
          <Form.Control
            type="text"
            placeholder="Hora de Fin"
            value={horaFin}
            onChange={(e) => setHoraFin(e.target.value)}
          />
        </Form.Group>
        <Button onClick={addAsignacion}>Asignar</Button>
      </Form>
      <h2>Asignaciones</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Aula</th>
            <th>Materia</th>
            <th>Día</th>
            <th>Hora de Inicio</th>
            <th>Hora de Fin</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={asignacion.id}>
              <td>{asignacion.id}</td>
              <td>{asignacion.aula.nombre}</td>
              <td>{asignacion.materia.nombre}</td>
              <td>{asignacion.dia_semana}</td>
              <td>{asignacion.hora_inicio}</td>
              <td>{asignacion.hora_fin}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Asignaciones;

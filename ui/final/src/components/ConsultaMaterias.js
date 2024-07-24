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

import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Table, Button, Form } from "react-bootstrap";
import dias from "../services/days_of_week";

const ConsultaMaterias = () => {
  const [materias, setMaterias] = useState([]);
  const [materiaId, setMateriaId] = useState("");
  const [aulas, setAulas] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [asignacionIdEdit, setAsignacionIdEdit] = useState([]);
  const [asignacionDataEdit, setAsignacionDataEdit] = useState({
    dia_semana: "",
    aula_id: "",
    hora_inicio: "",
    hora_fin: "",
  });

  useEffect(() => {
    fetchMaterias();
  }, []);

  const fetchMaterias = async () => {
    const response = await api.get("/materias");
    setMaterias(response.data);
  };

  const fetchAulas = async () => {
    const response = await api.get("/aulas");
    setAulas(response.data);
  };

  const fetchAsignaciones = async () => {
    const response = await api.get(`/asignaciones/materia/${materiaId}`);
    setAsignaciones(response.data);
  };

  const handleEdit = (asignacion) => {
    setAsignacionIdEdit(asignacion.id);
    setAsignacionDataEdit({
      materia_id: materiaId,
      dia_semana: asignacion.dia_semana,
      aula_id: asignacion.aula.id,
      hora_inicio: asignacion.hora_inicio,
      hora_fin: asignacion.hora_fin,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/asignaciones/${id}`);
      fetchAsignaciones();
    } catch (error) {
      alert("Error borrando asignacion");
      console.error("Error borrando asignacion:", error);
    }
  };

  const handleSave = async (id) => {
    try {
      await api.put(`/asignaciones/${id}`, asignacionDataEdit);
      setAsignacionIdEdit(null);
      fetchAsignaciones();
    } catch (error) {
      alert("Error al cambiar asignacion");
      console.error("Error al cambiar asignacion:", error);
    }
  };

  const handleCancel = () => {
    setAsignacionIdEdit(null);
  };

  useEffect(() => {
    if (materiaId) {
      fetchAsignaciones();
      fetchAulas();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materiaId]);

  return (
    <div>
      <h2>Consulta por Materia</h2>
      <Form>
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
        <Button onClick={fetchAsignaciones}>Consultar</Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Día</th>
            <th>Aula</th>
            <th>Hora de Inicio</th>
            <th>Hora de Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {asignaciones.map((asignacion) => (
            <tr key={asignacion.id}>
              {asignacionIdEdit === asignacion.id ? (
                <>
                  <td>
                    <Form.Control
                      as="select"
                      value={asignacionDataEdit.dia_semana}
                      onChange={(e) =>
                        setAsignacionDataEdit({
                          ...asignacionDataEdit,
                          dia_semana: e.target.value,
                        })
                      }
                    >
                      <option value="">Selecciona un dia</option>
                      {dias.map((dia) => (
                        <option key={dia} value={dia}>
                          {dia}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <Form.Control
                      as="select"
                      value={asignacionDataEdit.aula_id}
                      onChange={(e) =>
                        setAsignacionDataEdit({
                          ...asignacionDataEdit,
                          aula_id: e.target.value,
                        })
                      }
                    >
                      <option value="">Seleccione un Aula</option>
                      {aulas.map((aula) => (
                        <option key={aula.id} value={aula.id}>
                          {aula.nombre}
                        </option>
                      ))}
                    </Form.Control>
                  </td>
                  <td>
                    <input
                      value={asignacionDataEdit.hora_inicio}
                      onChange={(e) =>
                        setAsignacionDataEdit({
                          ...asignacionDataEdit,
                          hora_inicio: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={asignacionDataEdit.hora_fin}
                      onChange={(e) =>
                        setAsignacionDataEdit({
                          ...asignacionDataEdit,
                          hora_fin: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <Button onClick={() => handleSave(asignacion.id)}>
                      Guardar
                    </Button>
                    <Button onClick={handleCancel}>Cancelar</Button>
                  </td>
                </>
              ) : (
                <>
                  <td>{asignacion.dia_semana}</td>
                  <td>{asignacion.aula.nombre}</td>
                  <td>{asignacion.hora_inicio}</td>
                  <td>{asignacion.hora_fin}</td>
                  <td>
                    <Button onClick={() => handleEdit(asignacion)}>
                      Editar
                    </Button>
                    <Button onClick={() => handleDelete(asignacion.id)}>
                      Eliminar
                    </Button>
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

export default ConsultaMaterias;

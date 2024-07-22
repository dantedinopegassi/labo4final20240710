import React, { useState, useEffect } from "react";
import api from "./componentes/Api";


function EstudiantesAdmin() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [editando, setEditando] = useState(null);
  const [nuevoEstudiante, setNuevoEstudiante] = useState({});

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    const response = await api.get("http://127.0.0.1:8000/estudiantes/");
    setEstudiantes(response.data);
  };

  const handleEliminar = async (id) => {
    await api.delete(`http://127.0.0.1:8000/estudiantes/${id}`);
    fetchEstudiantes();
  };

  const handleEditar = async (id, datos) => {
    await api.put(`http://127.0.0.1:8000/estudiantes/${id}`, datos);
    fetchEstudiantes();
  };

  const handleGuardar = async () => {
    if (editando) {
      handleEditar(editando, nuevoEstudiante);
    }
    setEditando(null);
    setNuevoEstudiante({});
  };

  const handleFiltro = (e) => {
    setFiltro(e.target.value);
  };

  const handleFiltroTipo = (e) => {
    setFiltroTipo(e.target.value);
  };

  const estudiantesFiltrados = estudiantes.filter((estudiante) => {
    if (filtroTipo === "legajo") {
      return estudiante.legajo.toString().includes(filtro);
    } else if (filtroTipo === "apellido") {
      return estudiante.apellido.toLowerCase().includes(filtro.toLowerCase());
    } else {
      return true;
    }
  });

  return (
    <div>
      <h1>Administrar Estudiantes</h1>
      <div>
        <label>
          Filtrar por:
          <select value={filtroTipo} onChange={handleFiltroTipo}>
            <option value="todos">Todos</option>
            <option value="legajo">Legajo</option>
            <option value="apellido">Apellido</option>
          </select>
        </label>
        <input type="text" value={filtro} onChange={handleFiltro} placeholder="Buscar..." />
      </div>
      <table>
        <thead>
          <tr>
            <th>Legajo</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesFiltrados.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.legajo}</td>
              <td>{estudiante.nombre}</td>
              <td>{estudiante.apellido}</td>
              <td>
                <button onClick={() => setEditando(estudiante.id)}>Editar</button>
                <button onClick={() => handleEliminar(estudiante.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editando && (
        <div>
          <h2>Editar Estudiante</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoEstudiante.nombre || ""}
            onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={nuevoEstudiante.apellido || ""}
            onChange={(e) => setNuevoEstudiante({ ...nuevoEstudiante, apellido: e.target.value })}
          />
          <button onClick={handleGuardar}>Guardar</button>
          <button onClick={() => setEditando(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default EstudiantesAdmin;

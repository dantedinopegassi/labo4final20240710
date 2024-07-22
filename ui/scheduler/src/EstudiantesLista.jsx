import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tabla from "./Components/Table";
import ModalConfirmacion from "./Components/ModalConfirmacion";
import FiltroConSwitch from "./Components/FiltroConSwitch";

const btn1 = "bg-transparent hover:bg-pink-900 text-pink-300 hover:text-white py-2 px-4 rounded font-bold border border-pink-600 hover:border-transparent ";
const btn2 = "bg-transparent hover:bg-red-700 text-red-500 hover:text-white py-2 px-4 rounded font-bold border border-red-900 hover:border-transparent hover:";

const columnas = [
  { header: "Legajo", accessor: "legajo" },
  { header: "Apellido", accessor: "apellido" },
  { header: "Nombre", accessor: "nombre" },
  { header: "Carrera", accessor: "carrera" },
  { header: "Email", accessor: "email" },
  { header: "Ver/Editar", accessor: "ver" },
  { header: "Eliminar", accessor: "eliminar" },
];

const filtros = [
  { value: "legajo", label: "Legajo" },
  { value: "apellido", label: "Apellido" },
  { value: "nombre", label: "Nombre" },
  { value: "carrera", label: "Carrera" },
];

const fetchEstudiantes = async () => {
  const response = await fetch('http://127.0.0.1:8000/estudiantes/'); // Ajusta la URL según tu API
  const data = await response.json();
  return data;
};

export default function EstudiantesLista() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLegajo, setSelectedLegajo] = useState(null);
  const [filteredEstudiantes, setFilteredEstudiantes] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(filtros[0].value);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchEstudiantes()
      .then(data => {
        setEstudiantes(data);
        setFilteredEstudiantes(data);
      })
      .catch(error => {
        console.error(error);
        setEstudiantes(null);
      });
  }, []);

  // useEffect(() => {
  //   fetchEstudiantes()
  //   .then(setEstudiantes)
  //   .catch(error =>
  //     console.error(error),
  //     setEstudiantes(null)
  //   );
  // }, []);

  // Simulación de actualización de datos cada 5 segundos
  // useEffect(() => {
  //   const intervalo = setInterval(() => {
  //     // Simulación de actualización de datos
  //     fetchEstudiantes().then(setEstudiantes);
  //   }, 5000);

  //   return () => clearInterval(intervalo);
  // }, [estudiantes]);
  
  if (!estudiantes) return <div>No recibí estudiantes</div>;
  if (estudiantes.length === 0) return <div>No hay estudiantes</div>;

  const handleOptionChange = (option) => {
    setSelectedFilter(option);
    applyFilter(option, filterValue);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
    applyFilter(selectedFilter, value);
  };

  const applyFilter = (filterBy, value) => {
    if (!value) {
      setFilteredEstudiantes(estudiantes);
      return;
    }
    const filtered = estudiantes.filter((estudiante) => {
      const fieldValue = estudiante[filterBy].toLowerCase();
      return fieldValue.includes(value.toLowerCase());
    });
    setFilteredEstudiantes(filtered);
  };

  const handleEliminarClick = (legajo) => {
    setSelectedLegajo(legajo);
    setIsModalOpen(!isModalOpen);
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/estudiantes/${selectedLegajo}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error al eliminar el estudiante");
      }
      setEstudiantes(prev => prev.filter(estudiante => estudiante.legajo !== selectedLegajo));
      setFilteredEstudiantes(prev => prev.filter(estudiante => estudiante.legajo !== selectedLegajo));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al eliminar el estudiante:", error);
    }
  };

  const datos = filteredEstudiantes.map((estudiante) => ({
    ...estudiante,
    ver: (
      <Link to={`/estudiantes/${estudiante.legajo}`} className={btn1}>
        Ver
      </Link>
    ),
    eliminar: (
      <button
        onClick={() => handleEliminarClick(estudiante.legajo)}
        className={`${btn2} hover:shadow-lg hover:shadow-red-600`}
      >
        Eliminar
      </button>
    ),
  }));

  return (
    <div className="min-h-screen bg-zinc-900 p-4 rounded-xl">
      <FiltroConSwitch
        options={filtros}
        onChange={(value) => {
          if (filtros.some((filtro) => filtro.value === value)) {
            handleOptionChange(value);
          } else {
            handleFilterChange(value);
          }
        }}
      />
      <Tabla title={"Estudiantes"} columnas={columnas} datos={datos} />
      <ModalConfirmacion
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        identifier={selectedLegajo}
        entityName="Estudiante"
      />
    </div>
  );
}

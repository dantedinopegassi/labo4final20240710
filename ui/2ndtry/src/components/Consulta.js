import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Consulta = () => {
    const [materias, setMaterias] = useState([]);
    const [asignaciones, setAsignaciones] = useState([]);
    const [selectedMateria, setSelectedMateria] = useState('');

    useEffect(() => {
        fetchMaterias();
    }, []);

    const fetchMaterias = async () => {
        const response = await axios.get('/api/materias');
        setMaterias(response.data);
    };

    const handleMateriaChange = async (e) => {
        setSelectedMateria(e.target.value);
        if (e.target.value) {
            const response = await axios.get(`/api/asignaciones?materia=${e.target.value}`);
            setAsignaciones(response.data);
        } else {
            setAsignaciones([]);
        }
    };

    return (
        <div>
            <h2>Consulta por Materia</h2>
            <select value={selectedMateria} onChange={handleMateriaChange}>
                <option value="">Selecciona una materia</option>
                {materias.map(materia => (
                    <option key={materia.id} value={materia.nombre}>
                        {materia.nombre}
                    </option>
                ))}
            </select>
            <ul>
                {asignaciones.map(asignacion => (
                    <li key={asignacion.id}>
                        {asignacion.dia}, {asignacion.aula}, de {asignacion.horaInicio} a {asignacion.horaFin}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Consulta;
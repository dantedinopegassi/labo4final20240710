import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Materias = () => {
    const [materias, setMaterias] = useState([]);
    const [newMateria, setNewMateria] = useState({ nombre: '', carrera: '' });

    useEffect(() => {
        fetchMaterias();
    }, []);

    const fetchMaterias = async () => {
        const response = await axios.get('/api/materias');
        setMaterias(response.data);
    };

    const handleAddMateria = async () => {
        await axios.post('/api/materias', newMateria);
        fetchMaterias();
    };

    const handleDeleteMateria = async (id) => {
        await axios.delete(`/api/materias/${id}`);
        fetchMaterias();
    };

    return (
        <div>
            <h2>Materias</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={newMateria.nombre}
                onChange={(e) => setNewMateria({ ...newMateria, nombre: e.target.value })}
            />
            <input
                type="text"
                placeholder="Carrera"
                value={newMateria.carrera}
                onChange={(e) => setNewMateria({ ...newMateria, carrera: e.target.value })}
            />
            <button onClick={handleAddMateria}>Agregar Materia</button>
            <ul>
                {materias.map(materia => (
                    <li key={materia.id}>
                        {materia.nombre} ({materia.carrera})
                        <button onClick={() => handleDeleteMateria(materia.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Materias;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Aulas = () => {
    const [aulas, setAulas] = useState([]);
    const [newAula, setNewAula] = useState('');

    useEffect(() => {
        fetchAulas();
    }, []);

    const fetchAulas = async () => {
        const response = await axios.get('/api/aulas');
        setAulas(response.data);
    };

    const handleAddAula = async () => {
        await axios.post('/api/aulas', { nombre: newAula });
        fetchAulas();
    };

    const handleDeleteAula = async (id) => {
        await axios.delete(`/api/aulas/${id}`);
        fetchAulas();
    };

    return (
        <div>
            <h2>Aulas</h2>
            <input
                type="text"
                placeholder="Nombre"
                value={newAula}
                onChange={(e) => setNewAula(e.target.value)}
            />
            <button onClick={handleAddAula}>Agregar Aula</button>
            <ul>
                {aulas.map(aula => (
                    <li key={aula.id}>
                        {aula.nombre}
                        <button onClick={() => handleDeleteAula(aula.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Aulas;
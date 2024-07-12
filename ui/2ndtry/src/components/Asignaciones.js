import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Asignaciones = () => {
    const [asignaciones, setAsignaciones] = useState([]);
    const [newAsignacion, setNewAsignacion] = useState({
        aula: '', materia: '', dia: '', horaInicio: '', horaFin: ''
    });

    useEffect(() => {
        fetchAsignaciones();
    }, []);

    const fetchAsignaciones = async () => {
        const response = await axios.get('/api/asignaciones');
        setAsignaciones(response.data);
    };

    const handleAddAsignacion = async () => {
        await axios.post('/api/asignaciones', newAsignacion);
        fetchAsignaciones();
    };

    const handleDeleteAsignacion = async (id) => {
        await axios.delete(`/api/asignaciones/${id}`);
        fetchAsignaciones();
    };

    return (
        <div>
            <h2>Asignaciones</h2>
            <input
                type="text"
                placeholder="Aula"
                value={newAsignacion.aula}
                onChange={(e) => setNewAsignacion({ ...newAsignacion, aula: e.target.value })}
            />
            <input
                type="text"
                placeholder="Materia"
                value={newAsignacion.materia}
                onChange={(e) => setNewAsignacion({ ...newAsignacion, materia: e.target.value })}
            />
            <input
                type="text"
                placeholder="Día"
                value={newAsignacion.dia}
                onChange={(e) => setNewAsignacion({ ...newAsignacion, dia: e.target.value })}
            />
            <input
                type="text"
                placeholder="Hora Inicio"
                value={newAsignacion.horaInicio}
                onChange={(e) => setNewAsignacion({ ...newAsignacion, horaInicio: e.target.value })}
            />
            <input
                type="text"
                placeholder="Hora Fin"
                value={newAsignacion.horaFin}
                onChange={(e) => setNewAsignacion({ ...newAsignacion, horaFin: e.target.value })}
            />
            <button onClick={handleAddAsignacion}>Agregar Asignación</button>
            <ul>
                {asignaciones.map(asignacion => (
                    <li key={asignacion.id}>
                        {asignacion.aula}, {asignacion.materia}, {asignacion.dia}, de {asignacion.horaInicio} a {asignacion.horaFin}
                        <button onClick={() => handleDeleteAsignacion(asignacion.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Asignaciones;
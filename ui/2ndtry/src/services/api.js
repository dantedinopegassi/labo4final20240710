import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Asegúrate de que esto coincide con la URL de tu backend

export const getMaterias = () => axios.get(`${API_URL}/materias`);
export const addMateria = (materia) => axios.post(`${API_URL}/materias`, materia);
export const deleteMateria = (id) => axios.delete(`${API_URL}/materias/${id}`);

export const getAulas = () => axios.get(`${API_URL}/aulas`);
export const addAula = (aula) => axios.post(`${API_URL}/aulas`, aula);
export const deleteAula = (id) => axios.delete(`${API_URL}/aulas/${id}`);

export const getAsignaciones = () => axios.get(`${API_URL}/asignaciones`);
export const addAsignacion = (asignacion) => axios.post(`${API_URL}/asignaciones`, asignacion);
export const deleteAsignacion = (id) => axios.delete(`${API_URL}/asignaciones/${id}`);

export const getAsignacionesPorMateria = (materia) => axios.get(`${API_URL}/asignaciones?materia=${materia}`);
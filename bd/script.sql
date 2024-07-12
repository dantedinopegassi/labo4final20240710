-- Crear la base de datos
CREATE DATABASE sistema_asignacion;

-- Crear la tabla de Materias
CREATE TABLE materias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    carrera VARCHAR(255) NOT NULL
);

-- Crear la tabla de Aulas
CREATE TABLE aulas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Crear la tabla de Asignaciones
CREATE TABLE asignaciones (
    id SERIAL PRIMARY KEY,
    materia_id INT NOT NULL REFERENCES materias(id),
    aula_id INT NOT NULL REFERENCES aulas(id),
    dia_semana VARCHAR(50) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL
);

-- Crear restriccion de duplicados
ALTER TABLE asignaciones
ADD CONSTRAINT unique_asignacion
UNIQUE (aula_id, dia_semana, hora_inicio, hora_fin);
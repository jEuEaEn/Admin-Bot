CREATE DATABASE IF NOT EXISTS adminbot;
USE adminbot;

CREATE TABLE estudiantes (
    id CHAR(36) PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    fecha_nacimiento DATE,
    genero VARCHAR(20)
);

CREATE TABLE profesores (
    id CHAR(36) PRIMARY KEY,
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    especialidad VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE cursos (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100),
    grado VARCHAR(50),
    id_profesor CHAR(36),
    FOREIGN KEY (id_profesor) REFERENCES profesores(id)
        ON DELETE SET NULL
);

CREATE TABLE materias (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100),
    id_curso CHAR(36),
    FOREIGN KEY (id_curso) REFERENCES cursos(id)
        ON DELETE CASCADE
);

CREATE TABLE acudientes (
    id CHAR(36) PRIMARY KEY,
    id_estudiante CHAR(36),
    nombres VARCHAR(100),
    apellidos VARCHAR(100),
    telefono VARCHAR(20),
    direccion VARCHAR(150),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id)
        ON DELETE CASCADE
);

CREATE TABLE matriculas (
    id CHAR(36) PRIMARY KEY,
    id_estudiante CHAR(36),
    id_curso CHAR(36),
    fecha DATE,
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_curso) REFERENCES cursos(id)
        ON DELETE CASCADE
);

CREATE TABLE notas (
    id CHAR(36) PRIMARY KEY,
    id_estudiante CHAR(36),
    id_materia CHAR(36),
    nota DECIMAL(5,2),
    FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_materia) REFERENCES materias(id)
        ON DELETE CASCADE
);

CREATE TABLE usuarios (
  id CHAR(36) PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(30) NOT NULL DEFAULT 'admin',
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE DATABASE IF NOT EXISTS adminbot;
USE adminbot;
CREATE TABLE usuarios (
  id INT auto_increment PRIMARY KEY,
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

CREATE TABLE acudientes (
  id INT auto_increment PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  correo VARCHAR(120),
  direccion TEXT,
  whatsapp_activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE estudiantes (
  id INT auto_increment PRIMARY KEY,
  codigo_estudiante VARCHAR(30) NOT NULL UNIQUE,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  tipo_documento VARCHAR(20),
  numero_documento VARCHAR(30) UNIQUE,
  fecha_nacimiento DATE,
  grado VARCHAR(30),
  anio_lectivo INT,
  estado VARCHAR(20) NOT NULL DEFAULT 'activo',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE estudiante_acudiente (
  id INT auto_increment PRIMARY KEY,
  estudiante_id INT NOT NULL,
  acudiente_id INT NOT NULL,
  parentesco VARCHAR(50),
  es_principal BOOLEAN NOT NULL DEFAULT FALSE,
  responsable_pago BOOLEAN NOT NULL DEFAULT TRUE,
  recibe_notificaciones BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP,
  UNIQUE (estudiante_id, acudiente_id),
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
  FOREIGN KEY (acudiente_id) REFERENCES acudientes(id)
);

CREATE TABLE tipos_cobro (
  id INT auto_increment PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE,
  descripcion VARCHAR(150),
  activo BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE cuentas_por_cobrar (
  id INT auto_increment PRIMARY KEY,
  estudiante_id INT NOT NULL,
  tipo_cobro_id INT NOT NULL,
  periodo VARCHAR(20) NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  valor DECIMAL(12,2) NOT NULL,
  saldo_pendiente DECIMAL(12,2) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
  FOREIGN KEY (tipo_cobro_id) REFERENCES tipos_cobro(id)
);

CREATE TABLE pagos (
  id INT auto_increment PRIMARY KEY,
  cuenta_por_cobrar_id INT NOT NULL,
  registrado_por_id INT,
  fecha_pago TIMESTAMP NOT NULL,
  valor_pagado DECIMAL(12,2) NOT NULL,
  metodo_pago VARCHAR(30) NOT NULL,
  referencia VARCHAR(100),
  created_at TIMESTAMP,
  FOREIGN KEY (cuenta_por_cobrar_id) REFERENCES cuentas_por_cobrar(id),
  FOREIGN KEY (registrado_por_id) REFERENCES usuarios(id)
);

CREATE TABLE notificaciones_whatsapp (
  id INT auto_increment PRIMARY KEY,
  estudiante_id INT NOT NULL,
  acudiente_id INT NOT NULL,
  cuenta_por_cobrar_id INT,
  telefono_destino VARCHAR(20) NOT NULL,
  mensaje TEXT NOT NULL,
  fecha_envio TIMESTAMP,
  estado_envio VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP,
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
  FOREIGN KEY (acudiente_id) REFERENCES acudientes(id),
  FOREIGN KEY (cuenta_por_cobrar_id) REFERENCES cuentas_por_cobrar(id)
);

CREATE TABLE asistencias (
  id INT auto_increment PRIMARY KEY,
  estudiante_id INT NOT NULL,
  fecha DATE NOT NULL,
  estado VARCHAR(20) NOT NULL,
  hora_ingreso TIME,
  hora_salida TIME,
  observacion VARCHAR(255),
  registrado_por_id INT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE (estudiante_id, fecha),
  FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id),
  FOREIGN KEY (registrado_por_id) REFERENCES usuarios(id)
);

INSERT INTO usuarios 
(nombres, apellidos, correo, password_hash, telefono, rol, activo)
VALUES
('Juan', 'Pérez', 'juan.perez@gmail.com', '$2b$10$Cmdv9271bvtSoonLBBXhl.7kRa4KB76AwMY5kbZQjnTWuN1OStrH.', '3001234567', 'admin', 1),
('Joel', 'Gómez', 'maria.gomez@gmail.com', '$2b$10$rAoDYwQ2wqTxtBx93zfgie07KsgLGRm8fcATZpFjFizCCLW9.8336', '3012345678', 'docente', 1),
('Andres', 'Ramírez', 'carlos.ramirez@gmail.com', '$2b$10$fTzPrsJ54HZRhAvNghfB9epRyiZeaJh4cWSHPu0IOjqZar03jmCdW', '3023456789', 'coordinador', 1),
('Alejandro', 'Martínez', 'laura.martinez@gmail.com', '$2b$10$g65wKMUsyTG1DwgM3E.3i.W/TeE6PCVucdwI01FmnxJtE5QonQT5C', '3034567890', 'docente', 1),
('Guillermo', 'Torres', 'andres.torres@gmail.com', '$2b$10$Nm7HJy2f9m/68RddzP1hwulAuMOeFdvZf2hf8hbqiCiigdlF5mRLG', '3045678901', 'admin', 1);

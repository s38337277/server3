-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

CREATE Table
    if NOT exists Notificacion (
        ide INTEGER AUTO_INCREMENT UNIQUE,
        usuario FLOAT,
        title VARCHAR (150),
        descripcion VARCHAR(350),
        tipoUser ENUM ("cliente", "proveedor"),
        estado BOOLEAN DEFAULT false,
        creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        Foreign Key (usuario) REFERENCES Usuarios(id) on delete CASCADE
    )
/*
INSERT INTO
    `Notificacion`(
        usuario,
        title,
        descripcion,
        `tipoUser`
    )
SELECT
    usuario,
    "Propuesta Aceptada",
    "Raul a aceptado tu propuesta",
    "proveedor"
FROM `Provedor`;

SELECT * FROM `Notificacion`;*/
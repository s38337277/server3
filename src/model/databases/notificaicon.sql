-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway

CREATE Table
    if NOT exists Notificacion (
        ide INTEGER AUTO_INCREMENT PRIMARY KEY,
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
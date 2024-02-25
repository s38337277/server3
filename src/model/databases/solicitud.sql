-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway

CREATE Table
    if NOT exists Solicitud (
        id INT primary KEY AUTO_INCREMENT,
        problema int NOT NULL,
        provedor FLOAT NOT NULL,
        estado BOOLEAN DEFAULT false,
        precio FLOAT NOT NULL,
        descripcion VARCHAR (550) Not null,
        creaacion DATETIME DEFAULT CURRENT_TIMESTAMP,
        updates DATETIME DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER TABLE
    `Solicitud` MODIFY COLUMN estado ENUM(
        "espera",
        "proceso",
        "resuelto",
        "cancelado",
        "deposito"
    ) DEFAULT "espera";


ALTER Table Solicitud ADD COLUMN deposito BOOLEAN DEFAULT false;


DESCRIBE Solicitud;

/*Si la actividad esta en */

DROP Table `Solicitud`;
-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

CREATE Table
    If NOT Exists Ratings(
        id FLOAT PRIMARY KEY AUTO_INCREMENT,
        cliente FLOAT NOT NULL,
        provedor FLOAT NOT NULL,
        solicitud INT NOT NULL,
        descripcion VARCHAR (200),
        Foreign Key (cliente) REFERENCES Usuarios(id),
        Foreign Key (provedor) REFERENCES Provedor(usuario)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER Table Ratings ADD dates DATETIME DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE Ratings DROP id;


DROP Table `Ratings`;
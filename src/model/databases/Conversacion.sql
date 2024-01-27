-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

create TABLE
    Conversacion(
        sala FLOAT PRIMARY KEY AUTO_INCREMENT,
        userCliente FLOAT NOT NULL,
        userProveedor FLOAT NOT NULL,
        creacion DATETIME DEFAULT CURRENT_TIMESTAMP(),
        Foreign Key (userCliente) REFERENCES Usuarios(id) on delete CASCADE,
        Foreign Key (userProveedor) REFERENCES Usuarios(id) on delete CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

ALTER TABLE Conversacion
ADD
    Constraint Unik_Conver UNIQUE (userCliente, userProveedor);

/*
Select * from `Conversacion`;



delete from  Conversacion WHERE userCliente = 2335 and userProveedor = 3095;

ALTER TABLE Conversacion DROP FOREIGN KEY solicitud;

DESCRIBE Conversacion;
show index from Conversacion;

ALTER TABLE `Conversacion` Drop Unik_Conver;

DROP Table `Conversacion`;*/
-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

use Ozbra;

CREATE Table
    if NOT Exists Problema(
        id INT primary KEY AUTO_INCREMENT,
        cliente FLOAT NOT NULL,
        descripcion VARCHAR (450) NOT NULL,
        area VARCHAR (350) NOT NULL,
        inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
        updates DATETIME DEFAULT CURRENT_TIMESTAMP
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER Table Problema ADD COLUMN estado ENUM("espera","resuelto","proceso","cancelado") DEFAULT "espera"; 




ALTER Table `Problema` DROP COLUMN fechaDeseada;
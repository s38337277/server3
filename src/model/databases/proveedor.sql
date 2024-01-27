-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr
use Ozbra;

CREATE Table
    if not Exists Provedor(
        usuario FLOAT PRIMARY KEY,
        estado ENUM (
            "activo",
            "incripcion",
            "suspendido"
        ) DEFAULT "incripcion",
        informacion VARCHAR(250),
        ciudad VARCHAR (250),

    )CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

alter Table Provedor MODIFY COLUMN certificado VARCHAR (250) NOT NULL;

UPDATE `Provedor` SET certificado = "https://github.com/oblador/react-native-animatable"

alter Table Provedor MODIFY COLUMN cedula VARCHAR (250) NOT NULL;

DESCRIBE Provedor;
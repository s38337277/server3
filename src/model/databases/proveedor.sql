-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway
use Ozbra;
/*
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

alter Table Provedor add COLUMN certificado VARCHAR (250) NOT NULL;


alter Table Provedor add COLUMN cedula VARCHAR (250) NOT NULL;
*/
/*UPDATE `Provedor` SET certificado = "https://github.com/oblador/react-native-animatable"
*/DESCRIBE Provedor;

CREATE TABLE Provedor (
    usuario FLOAT NOT NULL PRIMARY KEY,
    estado ENUM('activo', 'incripcion', 'suspendido') DEFAULT 'activo',
    informacion VARCHAR(450),
    ciudad VARCHAR(250),
    antecedentes VARCHAR(250) NOT NULL,
    cedula VARCHAR(250) NOT NULL,
    Foreign Key (usuario) REFERENCES Usuarios(id) on delete CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

DROP Table `Provedor`;

ALTER Table Provedor MODIFY COLUMN estado ENUM('activo', 'inscripción', 'suspendido') DEFAULT 'inscripción';


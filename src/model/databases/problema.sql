-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway

use Ozbra;

/*
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
*/

DESCRIBE Problema;
/*
CREATE TABLE Problema (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, cliente FLOAT NOT NULL, descripcion VARCHAR(450), area VARCHAR(350) NOT NULL, inicio DATETIME DEFAULT CURRENT_TIMESTAMP, updates DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, estado ENUM(
        'espera', 'resuelto', 'cancelado', 'proceso'
    ) DEFAULT 'espera'
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

*/

CREATE TABLE Problema (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cliente FLOAT NOT NULL,
    descripcion VARCHAR(450),
    area VARCHAR(350) NOT NULL,
    inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    updates DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    estado ENUM('espera', 'resuelto', 'cancelado', 'proceso') DEFAULT 'espera',
    FOREIGN KEY (cliente) REFERENCES Usuarios(id) ON DELETE CASCADE
);

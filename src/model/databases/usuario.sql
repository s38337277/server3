-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

CREATE TABLE IF NOT Exists Usuarios (
    id FLOAT PRIMARY KEY AUTO_INCREMENT, mobile VARCHAR(25) UNIQUE, usuario VARCHAR(15) UNIQUE, imgPerfil VARCHAR(150) DEFAULT "https://thumbs.dreamstime.com/b/icono-del-vector-perfil-de-la-cara-avatar-miembro-usuario-125994581.jpg", inicio DATETIME DEFAULT CURRENT_TIMESTAMP, updates DATETIME DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci AUTO_INCREMENT = 1000;

ALTER TABLE Usuarios
MODIFY COLUMN correo VARCHAR(50) UNIQUE NOT NULL;

ALTER TABLE Usuarios
MODIFY COLUMN pais VARCHAR(50) NOT NULL DEFAULT "ecuador";

ALTER TABLE Usuarios MODIFY COLUMN ciudad VARCHAR(50) NOT NULL;

UPDATE Usuarios SET ciudad = "portoviejo"

/*No nulo*/
ALTER TABLE Usuarios MODIFY COLUMN usuario VARCHAR(90) NOT NULL;

ALTER TABLE Usuarios MODIFY COLUMN inicio DATETIME NOT NULL;

DESCRIBE Usuarios;

ALTER Table `Usuarios`
MODIFY COLUMN genero enum('hombre', 'mujer', 'otros')
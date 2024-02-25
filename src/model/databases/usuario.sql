-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway

CREATE TABLE IF NOT Exists Usuarios (
    id FLOAT PRIMARY KEY AUTO_INCREMENT, usuario VARCHAR(50) UNIQUE, imgPerfil VARCHAR(150) DEFAULT "https://thumbs.dreamstime.com/b/icono-del-vector-perfil-de-la-cara-avatar-miembro-usuario-125994581.jpg", inicio DATETIME DEFAULT CURRENT_TIMESTAMP, updates DATETIME DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci AUTO_INCREMENT = 1000;

ALTER TABLE Usuarios
ADD COLUMN correo VARCHAR(50) UNIQUE NOT NULL;

ALTER TABLE Usuarios
ADD COLUMN password VARCHAR(150)  NOT NULL;


ALTER TABLE Usuarios
ADD COLUMN fechaNacimiento DATE NOT NULL;

ALTER TABLE Usuarios ADD pais VARCHAR(50) NOT NULL DEFAULT "ecuador";

ALTER TABLE Usuarios ADD COLUMN ciudad VARCHAR(50) NOT NULL;

UPDATE Usuarios
SET
    ciudad = "portoviejo"
    /*No nulo*/
ALTER TABLE Usuarios
MODIFY COLUMN usuario VARCHAR(90) NOT NULL;

ALTER TABLE Usuarios MODIFY COLUMN inicio DATETIME NOT NULL;

DESCRIBE Usuarios;

ALTER Table `Usuarios`
ADD COLUMN genero enum('hombre', 'mujer', 'otros')
-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr
CREATE Table Messages (
    id_messages FLOAT AUTO_INCREMENT PRIMARY KEY,
    usuario_emisor FLOAT NOT NULL,
    sala_id FLOAT NOT NULL,
    mensaje VARCHAR (680),
    creates DATETIME DEFAULT CURRENT_TIMESTAMP(),
    Foreign Key (usuario_emisor) REFERENCES Usuarios(id) on delete CASCADE,
    Foreign Key (sala_id) REFERENCES Conversacion(sala) on delete CASCADE
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

DROP Table `Messages`;
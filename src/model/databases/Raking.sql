-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

CREATE TABLE
    IF Not EXISTS Ranking (
        usuario FLOAT NOT NULL,
        solicitud int NOT NULL,
        ranking INT CHECk (
            ranking > 0
            AND ranking < 6
        ) NOT NULL,
        comentario VARCHAR (150),
        typeUSer ENUM("cliente", "proveedor") NOT NULL,
        creaates DATETIME DEFAULT CURRENT_TIMESTAMP(),
        Foreign Key (solicitud) REFERENCES Solicitud(id),
        Foreign Key (usuario) REFERENCES Usuarios(id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

DROP Table `Ranking`;

INSERT INTO
    Ranking(
        usuario,
        solicitud,
        comentario,
        typeUSer,
        ranking
    )
SELECT
    Solicitud.provedor,
    Solicitud.id,
    "Buen servicio",
    "proveedor",
    FLOOR(1 + RAND() * 5)
FROM Solicitud
    INNER JOIN Problema on Problema.id = Solicitud.problema;

SELECT * FROM `Ranking`;

ALTER TABLE `Ranking`
ADD
    CONSTRAINT UN_Raking UNIQUE (usuario, solicitud, typeUSer);

UPDATE `Ranking`
SET
    comentario = CONCAT(usuario,"=> ¡Experiencia excepcional! Superó todas las expectativas. Un servicio impecable y altamente recomendado.") 
WHERE ranking = 5
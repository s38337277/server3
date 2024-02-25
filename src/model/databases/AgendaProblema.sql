-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway
/*
CREATE TABLE IF NOT EXISTS AgendaProblema (
    problema INT PRIMARY KEY,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
    ciudad VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    direccion VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    calendario DATE,
    hora TIME
) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
*/


CREATE TABLE AgendaProblema (
    problema INT NOT NULL,
    latitud FLOAT NOT NULL,
    longitud FLOAT NOT NULL,
    ciudad VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    direccion VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
    calendario DATE,
    hora TIME,
    PRIMARY KEY (problema),
    FOREIGN KEY (problema) REFERENCES Problema(id) ON DELETE CASCADE
);



/*
ALTER TABLE `AgendaProblema` ADD COLUMN hora TIME;


Select * from `AgendaProblema`;

UPDATE `AgendaProblema` set resolucion = CURRENT_TIMESTAMP;

*/

DESCRIBE AgendaProblema;
-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

CREATE Table
    if NOT exists AgendaProblema (
        problema int PRIMARY KEY,
        lactitud FLOAT NOT NULL,
        longitud FLOAT NOT NULL,
        ciudad VARCHAR(100),
        direccion VARCHAR (100)
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER Table LocalizacionOferta ADD COLUMN direccion VARCHAR(150);

ALTER TABLE `AgendaProblema` ADD COLUMN calendario DATE;

ALTER TABLE `AgendaProblema` ADD COLUMN hora TIME;


Select * from `AgendaProblema`;

UPDATE `AgendaProblema` set hora = CURRENT_TIME()
/*ALTER TABLE UbicacionProblema ADD CONSTRAINT fk_problema FOREIGN KEY (problema) REFERENCES Problema(id) ON DELETE CASCADE;
 */

UPDATE `AgendaProblema` set resolucion = CURRENT_TIMESTAMP;

/*Resolucon del problema*/

DROP Table `UbicacionProblema`;

--Portoviejo,Tosagua,Chone,Montecristi,NULL,New York,Moscu,Bogota

--UPDATE LocalizacionDem set ciudad = "Portoviejo" WHERE demanda  % 4 = 0;
-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

CREATE Table
    if NOT Exists ImageProblema (
        problema int,
        url VARCHAR(450) NOT NULL,
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER Table `ImageProblema`
ADD
    CONSTRAINT FK_Problema Foreign Key (problema) REFERENCES `Problema`(`Problema`.id) on delete CASCADE;

DROP Table `ImageProblema`;
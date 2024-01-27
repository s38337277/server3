-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

create Table
    if NOT Exists UbicacionUser(
        usuario FLOAT PRIMARY KEY,
        ciudad VARCHAR(250) NOT NULL
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;


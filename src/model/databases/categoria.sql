-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr

CREATE Table
    if Not Exists Categoria(
        categoria varchar (350) PRIMARY KEY
    )CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;


INSERT INTO Categoria (categoria) VALUES ("remodelación y construcción"),("belleza"),("computadoras e informática"),
    ("maestros y técnicos"),("servicios para mascotas"),("servicios domésticos"),("multimedia"),("organización de eventos"),
    ("cargadores, encargados de mantenimiento"),("maquinaria especial"),("tutores y formación"),("reparación de automóviles");
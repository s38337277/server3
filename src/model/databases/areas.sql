-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr
Create Table
    If Not Exists Area(
        areas VARCHAR (350) PRIMARY KEY,
        categoria VARCHAR (350) NOT NULL
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

INSERT INTO
    Area (areas, categoria)
VALUES (
        "construcción de casas y cabañas",
        "remodelación y construcción"
    ), (
        "plomería y calefacción",
        "remodelación y construcción"
    ), (
        "servicios de instalación eléctrica",
        "remodelación y construcción"
    ), (
        "manicura y pedicura",
        "belleza"
    ), ("pestañas y cejas", "belleza"), (
        "estilista, peluquero o barbero",
        "belleza"
    ), ("maquillista", "belleza"), (
        "sitios web",
        "computadoras e informática"
    ), (
        "programación",
        "computadoras e informática"
    ), (
        "ayuda en informática",
        "computadoras e informática"
    ), (
        "Especialistas que hacen distintos tipos de reparaciones en el hogar",
        "maestros y técnicos"
    );

UPDATE Area
set areas = "plomería"
WHERE
    areas = "plomería y calefacción";
-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway
Create Table
    If Not Exists Area(
        areas VARCHAR (350) PRIMARY KEY,
        categoria VARCHAR (350) NOT NULL
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

/*
INSERT INTO
    Area (areas, categoria)
VALUES (
        "estilista",
        "belleza"
    ),(
        "manicurista",
        "belleza"
    ),(
        "maquillaje",
        "belleza"
    );
*/
-- Active: 1685411852797@@127.0.0.1@3306@OzbraPr
CREATE Table
    if Not Exists AreaProve(
        usuario FLOAT,
        area VARCHAR (370),
        CONSTRAINT pk_Area PRIMARY KEY (usuario, area)
    )CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE INDEX index_Area ON AreaProve (usuario);
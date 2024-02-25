-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway
CREATE Table
    if Not Exists AreaProve(
        usuario FLOAT,
        area VARCHAR (370),
        CONSTRAINT pk_Area PRIMARY KEY (usuario, area),
        Foreign Key (usuario) REFERENCES Provedor(usuario) on delete CASCADE
    )CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

CREATE INDEX index_Area ON AreaProve (usuario);

DESCRIBE AreaProve
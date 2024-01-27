CREATE TABLE
    IF NOT EXISTS ImagenProv(
        provedor FLOAT,
        url VARCHAR(200),
        creates DATETIME DEFAULT CURRENT_TIMESTAMP()
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER TABLE ImagenProv
ADD
    CONSTRAINT PK_Imagen PRIMARY KEY (provedor, url);

ALTER Table ImagenProv ADD COLUMN creates DATETIME ;

UPDATE `ImagenProv` set creates = CURRENT_TIMESTAMP();

CREATE INDEX index_Prov ON ImagenProv (provedor);
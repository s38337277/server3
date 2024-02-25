-- Active: 1708581627892@@viaduct.proxy.rlwy.net@53928@railway

CREATE Table
    if NOT Exists ImageProblema (
        problema int,
        url VARCHAR(450) NOT NULL,
        Foreign Key (problema) REFERENCES Problema(id) on delete  CASCADE
    ) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

ALTER Table `ImageProblema`
ADD
    CONSTRAINT FK_Problema Foreign Key (problema) REFERENCES `Problema`(`Problema`.id) on delete CASCADE;

DROP Table `ImageProblema`;
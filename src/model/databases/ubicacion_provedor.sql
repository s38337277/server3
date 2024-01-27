CREATE Table
    Ubicacion_Proveedor (
        provedor FLOAT NOT NULL UNIQUE,
        ciudad VARCHAR (350),
        lactidud FLOAT,
        longitud FLOAT,
        Foreign Key (provedor) REFERENCES Provedor(usuario)
)CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;


UPDATE `Ubicacion_Proveedor` set ciudad = "Portoviejo", lactidud=-1.0558 ,longitud = -80.4542 WHERE provedor % 2 = 0;
/* 2023-10-08 01:02:04 [326 ms] */ 
UPDATE `Ubicacion_Proveedor` set ciudad = "Manta", lactidud=-0.9541 ,longitud = -0.9535 WHERE provedor % 2 = 0;
/* 2023-10-08 01:02:18 [86 ms] */ 
UPDATE `Ubicacion_Proveedor` set ciudad = "Portoviejo", lactidud=-1.0558 ,longitud = -80.4542 WHERE provedor % 5 = 0;
/* 2023-10-08 01:04:07 [184 ms] */ 
UPDATE `Ubicacion_Proveedor` set ciudad = "Guayaquil", lactidud=-2.1962 ,longitud = -79.8862 WHERE ciudad is NULL;


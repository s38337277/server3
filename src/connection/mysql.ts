// Importar el módulo mysql2
import mysql from "mysql2"


// Crear el pool de conexiones a la base de datos MySQL Local

let connection = mysql.createPool({
    database: "ozbra_apk",         // Nombre de la base de datos
    user: "ozbradb",             // Nombre de usuario
    password: "0zbrajczo", // Contraseña
    host: "ozbradb.cnyyusugobke.us-east-2.rds.amazonaws.com",           // Host de la base de datos
    port: 3306,                  // Puerto de la base de datos
    connectionLimit: 20          // Límite máximo de conexiones en el pool
})



/*
connection.getConnection((err, conn) => {
    if (err) {
        console.log(err);
        console.error("Error de conexión:", err.message);
    } else {
        console.log("Conexión exitosa a la base de datos MySQL en Amazon RDS.");
        // Realizar consultas u otras operaciones aquí si la conexión es exitosa
    }
})
*/
// Evento 'acquire': Se emite cuando se adquiere una nueva conexión del pool
connection.on('acquire', function (coon) {
    console.log('Conexión %d adquirida', coon.threadId);
});

// Evento 'release': Se emite cuando se libera una conexión y vuelve al pool
connection.on('release', function (coon) {
    console.log('Conexión %d liberada', coon.threadId);
});

// Evento 'enqueue': Se emite cuando se encola una solicitud de conexión
connection.on('enqueue', function () {
    console.log('Conexión en espera');
})


export default connection

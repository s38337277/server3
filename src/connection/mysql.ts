// Importar el módulo mysql2
import mysql from "mysql2"

// Crear el pool de conexiones a la base de datos MySQL
let connection = mysql.createPool({
    database: "OzbraPr",         // Nombre de la base de datos
    user: "st3v33n",             // Nombre de usuario
    password: "elementocarmesi", // Contraseña
    host: "localhost",           // Host de la base de datos
    port: 3306,                  // Puerto de la base de datos
    connectionLimit: 20          // Límite máximo de conexiones en el pool
})

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

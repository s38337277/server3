import mysql from "mysql2"

let connection = mysql.createPool({
    database: "OzbraPr",
    user: "st3v33n",
    password: "elementocarmesi",
    host: "localhost",
    port: 3306,
    connectionLimit: 20
})



connection.on('acquire', function (coon) {
    console.log('Connection %d  acquired', coon.threadId);
});


connection.on('release', function (coon) {
    console.log('Connection %d released', coon.threadId);
});
connection.on('enqueue', function () {
    console.log('Connection   en espera');
})


export default connection
const mysql = require('mysql2');
require('dotenv').config();

// Creamos el pool de conexiones
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos la promesa para poder usar async/await
const promisePool = pool.promise();

console.log('Intentando conectar a la base de datos...');

// Prueba de conexión rápida
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
    } else {
        console.log('Conexión exitosa a MySQL en el puerto ' + process.env.DB_PORT);
        connection.release();
    }
});

module.exports = promisePool;
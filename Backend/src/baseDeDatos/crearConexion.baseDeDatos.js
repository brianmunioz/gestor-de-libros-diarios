const config = require('../config')
const mysql = require('mysql');
let conn;
function conexionBDD(){
    try {
        conn = mysql.createPool({
            connectionLimit: 100,
            host: config.host,
            user: config.user,
            password: config.password,
            database: config.database,
            debug: false
        });
        console.log('conectado a bdd')
        return conn;
    } catch (error) {
        console.log("Error: No se pudo conectar con la base de datos");
        return conn;
    }
}


module.exports = conexionBDD;
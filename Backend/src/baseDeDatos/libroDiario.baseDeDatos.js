const conexionBDD = require("./crearConexion.baseDeDatos");
let _conn;
class LibroDiarioBDD {
  constructor() {
    _conn = conexionBDD()
  }
  //libro diario 
  async obtenerLibrosDiarios() {
    return new Promise((resolve, reject) => {
      _conn.query('SELECT * FROM libros_diarios', (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async obtenerLibrosDiariosUsuario(id) {
    return new Promise((resolve, reject) => {
      _conn.query('SELECT * FROM libros_diarios where autor = ?',[id], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async agregarLibroDiario(data) {
    return new Promise((resolve, reject) => {
      _conn.query(`INSERT INTO libros_diarios (id, nombre, fecha_creacion,fecha_actualizacion, autor) VALUES (NULL, ? , ? , ? , ? )`, [data.nombre, data.fecha_creacion, data.fecha_actualizacion, data.autor], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async editarLibroDiario(data) {

    return new Promise((resolve, reject) => {
      _conn.query(`UPDATE libros_diarios SET  nombre = ? , fecha_actualizacion= ? WHERE id = ? `,[data.nombre, data.fecha_actualizacion, data.libroDiarioID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async eliminarLibroDiario(libroDiarioID) {

    return new Promise((resolve, reject) => {
      _conn.query(`DELETE FROM libros_diarios WHERE id = ? `,[libroDiarioID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

//acientos contables
  async obtenerAcientos(libroDiarioID) {
    return new Promise((resolve, reject) => {
      _conn.query(`SELECT * FROM acientos WHERE libro_diario= ?`,[libroDiarioID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });

  }
  async agregarAciento(data) {

    return new Promise((resolve, reject) => {
      _conn.query(`INSERT INTO acientos (id, variacion_patrimonial, cuenta, fecha, autor, libro_diario, monto, tipo,operacion) VALUES (NULL, ? , ? , ? , ? , ? , ? , ?,?)`,[data.vp, data.cuenta, data.fecha, data.autor,data.libroDiarioID, data.monto,data.tipo,data.operacion], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async editarAciento(data) {

    return new Promise((resolve, reject) => {
      _conn.query(`UPDATE acientos SET  variacion_patrimonial = ? , cuenta= ? , fecha = ? , monto = ? , tipo = ? WHERE id= ? `,[data.vp,data.cuenta,data.fecha,data.monto,data.tipo,data.acientoID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async eliminarAciento(acientoID) {

    return new Promise((resolve, reject) => {
      _conn.query(`DELETE FROM acientos WHERE id = ? `,[acientoID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

}
module.exports = LibroDiarioBDD
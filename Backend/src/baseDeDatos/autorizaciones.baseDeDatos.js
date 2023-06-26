const conexionBDD = require("./crearConexion.baseDeDatos");
let _conn;
class AutorizacionesBaseDeDatos {
  constructor() {
    _conn = conexionBDD
  }
  async obtenerAutorizacion(id,libro_diario) {
    return new Promise((resolve, reject) => {
      _conn.query('SELECT * FROM autorizacion_libro where autor = ? and libro_diario = ?',[id,libro_diario], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async obtenerUsuariosAutorizados(libro_diario) {
    return new Promise((resolve, reject) => {
      _conn.query('SELECT autorizacion_libro.autor, usuarios.email FROM autorizacion_libro INNER JOIN usuarios where autorizacion_libro.libro_diario = ? and autorizacion_libro.autor = usuarios.id',[libro_diario], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
 async usuarioEstaAutorizado(data){
  return new Promise((resolve, reject) => {
    _conn.query('SELECT autor FROM autorizacion_libro where libro_diario = ? and autor = ?  ',[data.libro_diario,data.usuario], (error, results, fields) => {
      if (error) return reject(error);
      return resolve(results);
    });
  });
 }
 async obtenerLDenLosQueTrabajo(usuario){
  return  new Promise((resolve,reject)=>{
    _conn.query("SELECT DISTINCT * FROM autorizacion_libro JOIN libros_diarios on autorizacion_libro.libro_diario = libros_diarios.id WHERE autorizacion_libro.autor = ? ",[usuario],(error, results,fields)=>{
      if(error) return reject(error);
     return resolve(results)
    })
  })
 }
 
  async agregarAutorizacion(data) {

    return new Promise((resolve, reject) => {
      _conn.query(`INSERT INTO autorizacion_libro (id,fecha, autor, libro_diario) VALUES (NULL, ? , ? , ? )`,[data.fecha, data.autor, data.libro_diario], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

  async eliminarAutorizacion(id,libro_diario) {

    return new Promise((resolve, reject) => {
      _conn.query(`DELETE FROM autorizacion_libro WHERE autor = ?  and libro_diario = ?`,[id,libro_diario], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }

}
module.exports =  AutorizacionesBaseDeDatos
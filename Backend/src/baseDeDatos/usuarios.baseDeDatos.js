const conexionBDD = require("./crearConexion.baseDeDatos");
let _conn;
class UsuariosBDD {
  constructor() {
    _conn = conexionBDD()
  }
  async obtenerUsuarios() {
    return new Promise((resolve, reject) => {
      _conn.query('SELECT * FROM usuarios', (error, results, fields) => {
        if (error) return reject(error);
        const datos = results.map((el)=>{
          return {
            id: el.id,
            email: el.email,
            nombre: el.nombre,
            apellido: el.apellido,
            fecha_nacimiento: el.fecha_nacimiento,
            registrado_desde: el.registrado_desde
          }
        })
        return resolve(datos);
      });
    });
  }
  async buscarUsuarioPorEmail(email, registro) {
    return new Promise((resolve, reject) => {
      _conn.query('SELECT * FROM usuarios WHERE email = ? LIMIT 1', [email], (error, results, fields) => {
        if (error) return reject(false);
        if (results.length !== 0) {
          return resolve({
            existe: true, pass: registro ? results[0].pass : null,
            nombre: results[0].nombre,
            apellido: results[0].apellido,
            id: results[0].id,
            rol: results[0].rol,
            email: results[0].email
          });
        } else {
          return resolve({ existe: false });
        }

      });
    });
  }

  async obtenerUsuario(usuarioID) {
    return new Promise((resolve, reject) => {
      _conn.query('SELECT * FROM usuarios WHERE id= ?', [usuarioID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async cambiarPassword(data) {
    return new Promise((resolve, reject) => {
      _conn.query('UPDATE usuarios SET pass = ? WHERE id = ?', [data.pass, data.id], (error, results, field) => {
        if (error) return reject(error);
        return resolve(results)
      })
    })

  }
  async agregarUsuario(data) {
    return new Promise((resolve, reject) => {
      _conn.query(`INSERT INTO usuarios (
        id,
        nombre,
        apellido,
        fecha_nacimiento,
        fecha_creacion,
        fecha_actualizacion,
        rol,
        email,
        pass,
        registrado_desde
        ) VALUES (NULL, ? , ? , ? , ?, ?, ?, ?, ?, ? )`, [data.nombre, data.apellido, data.fecha_nacimiento, data.fecha_creacion, data.fecha_actualizacion, data.rol, data.email, data.pass, data.registrado_desde], (error, results, fields) => {
        if (error) return reject(error);
        results.mensaje = 'Usuario creado con éxito!';
        results.status = 201;
        return resolve(results);
      });
    });
  }
  async editarUsuario(data) {

    return new Promise((resolve, reject) => {
      _conn.query(`UPDATE usuarios SET  nombre = ?, apellido = ? , fecha_actualizacion= ? WHERE id = ? `, [data.nombre, data.apellido, data.fecha_actualizacion, data.usuarioID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }
  async eliminarUsuario(usuarioID) {

    return new Promise((resolve, reject) => {
      _conn.query(`DELETE FROM usuarios WHERE id = ? `, [usuarioID], (error, results, fields) => {
        if (error) return reject(error);
        return resolve(results);
      });
    });
  }


}
module.exports = UsuariosBDD
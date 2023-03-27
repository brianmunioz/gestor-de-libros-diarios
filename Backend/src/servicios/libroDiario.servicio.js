const LibroDiario = require('../baseDeDatos/libroDiario.baseDeDatos')
let ldiario;
class LibroDiarioServicio {
  constructor() {
    ldiario = new LibroDiario;
  }
  async obtenerLibrosDiarios() {
    return ldiario.obtenerLibrosDiarios();
  }
  async obtenerAcientos(librodiario_id) {
    if (!librodiario_id) {
      const err = new Error('Debe ingresar un id válido');
      err.status = 400
      throw err
    } else {
      return ldiario.obtenerAcientos(librodiario_id);
    }
  }
}
module.exports = LibroDiarioServicio
 const LibroDiarioControlador = require('./libroDiario.controlador');
 const UsuariosControlador = require('./usuarios.controlador');
 const AutorizacionControlador = require('./autorizacion.controlador');

 module.exports = {
    LibroDiarioControlador: new LibroDiarioControlador,
    UsuariosControlador: new UsuariosControlador,
    AutorizacionControlador: new AutorizacionControlador
 }
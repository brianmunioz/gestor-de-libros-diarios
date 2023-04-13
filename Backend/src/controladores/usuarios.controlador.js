const UsuariosServicio = require('../servicios/usuarios.servicio');
let _usuariosServicio;
class UsuariosControlador {
    constructor() {
        _usuariosServicio = new UsuariosServicio;
    }
    async obtenerUsuarios(req, res) {
        const respuesta = await _usuariosServicio.obtenerUsuarios();
        return res.status(200).json(respuesta);
    }
    async cambiarPassword(req, res) {
        const { body } = req;
        const respuesta = await _usuariosServicio.cambiarPassword(body);
        return res.status(201).json(respuesta);
    }
    async agregarUsuario(req, res) {
        const { body } = req;
        const respuesta = await _usuariosServicio.agregarUsuario(body);
        return res.status(201).json(respuesta);
    }
    async editarUsuario(req, res) {
        const { body } = req;
        const respuesta = await _usuariosServicio.editarUsuario(body);
        return res.status(201).json(respuesta);
    }
    async eliminarUsuario(req, res) {
        const { body } = req;
        const respuesta = await _usuariosServicio.eliminarUsuario(body.usuarioID);
        return res.status(200).json(respuesta);

    }
}
module.exports = UsuariosControlador
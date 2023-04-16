const AutorizacionServicio = require('../servicios/autorizacion.servicio');
let _autorizacionServicio;
class AutorizacionControlador {
    constructor() {
        _autorizacionServicio = new AutorizacionServicio;
    }
    async registrar(req, res) {
        const { body } = req;
        const usuarioCreado = await _autorizacionServicio.registrar(body);
        return res.status(201).json(usuarioCreado);
    }
    async iniciarSesion(req, res) {
        const { body } = req;
        const credenciales = await _autorizacionServicio.iniciarSesion(body);
        return res.status(200).json(credenciales);
    }
}
module.exports = AutorizacionControlador;
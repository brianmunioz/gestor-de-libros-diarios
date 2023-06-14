const AutorizacionServicio = require('../servicios/autorizacion.servicio');
let _autorizacionServicio;
class AutorizacionControlador {
    constructor() {
        _autorizacionServicio = new AutorizacionServicio;
    }
    async obtenerAutorizacion(req,res){
        const {user} = req.headers
        const {body}= req;
        const autorizacion = await _autorizacionServicio.obtenerAutorizacion(body,user);
        return res.status(200).json(autorizacion)
    }
    async obtenerUsuariosAutorizados(req, res){
        const {user} = req.headers;
        const {libroDiarioID } = req.params;
        const obtenerAutorizados = await _autorizacionServicio.obtenerUsuariosAutorizados(libroDiarioID, user);
        return res.status(200).json(obtenerAutorizados);
    }
    async agregarAutorizacion(req,res){
        const {user} = req.headers
        const {body}= req;

        const autorizacion = await _autorizacionServicio.agregarAutorizacion(body,user);
        return res.status(201).json(autorizacion)
    }
    async eliminarAutorizacion(req,res){
        const {user} = req.headers
        const {body}= req;

        const eliminar = await _autorizacionServicio.eliminarAutorizacion(body,user);
        return res.status(200).json(eliminar)
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
const LibroDiarioServicio = require('../servicios/libroDiario.servicio');
let _libroDiarioServicio;
class LibroDiarioControlador{
    constructor(){
        _libroDiarioServicio = new LibroDiarioServicio;
    }

    async obtenerLibrosDiarios(req, res) {
        const respuesta = await _libroDiarioServicio.obtenerLibrosDiarios();
        return res.json(respuesta)
    }
    async agregarLibroDiario(req, res) {
        const respuesta = await _libroDiarioServicio.agregarLibroDiario(res.data,req.user.id);
        return res.json(respuesta)
    }
    async editarLibroDiario(req, res) {
        const {libroDiarioID } = req.params;
        const respuesta = await _libroDiarioServicio.editarLibroDiario(res.data,libroDiarioID);
        return res.json(respuesta)
    }
    async eliminarLibroDiario(req, res) {
        const { libroDiarioID } = req.params;
        const respuesta = await _libroDiarioServicio.eliminarLibroDiario(libroDiarioID);
        return res.json(respuesta)
    }
    async obtenerAcientos(req, res) {
        const respuesta = await _libroDiarioServicio.obtenerAcientos();        
        return res.json(respuesta)
    }
    async agregarAciento(req, res) {
        const { libroDiarioID } = req.params;

        const respuesta = await _libroDiarioServicio.agregarAciento(res.data);        
        return res.status(201).json(respuesta, libroDiarioID)
    }
    async editarAciento(req, res) {
        const { IDAciento } = req.params;
        const respuesta = await _libroDiarioServicio.editarAciento(res.data);        
        return res.status(200).json(respuesta, IDAciento)
    }
    async eliminarAciento(req, res) {
        const { acientoID } = req.params;
        const respuesta = await _libroDiarioServicio.eliminarAciento(acientoID);
        return res.json(respuesta)
    }
}

module.exports =  LibroDiarioControlador
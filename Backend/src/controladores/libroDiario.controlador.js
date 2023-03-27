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
    async obtenerAcientos(req, res) {
        const respuesta = await _libroDiarioServicio.obtenerAcientos();        
        return res.json(respuesta)
    }
}

module.exports =  LibroDiarioControlador
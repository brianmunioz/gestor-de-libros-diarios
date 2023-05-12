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
    async obtenerLibrosDiariosUsuario(req, res) {
        const {user} = req.headers
        const respuesta = await _libroDiarioServicio.obtenerLibrosDiariosUsuario(user);
        return res.json(respuesta)
    }
    
    async agregarLibroDiario(req, res) {
        const {body} = req;
        const {user} = req.headers
        const respuesta = await _libroDiarioServicio.agregarLibroDiario(body,user);
        return res.json(respuesta)
    }
    async editarLibroDiario(req, res) {
        const {libroDiarioID } = req.params;
        const {body} = req;
        console.log(user)
        const respuesta = await _libroDiarioServicio.editarLibroDiario(body,libroDiarioID);
        if(respuesta.affectedRows > 0){
            respuesta.status = 200;
            respuesta.mensaje = 'Libro diario editado!';
            }  
        return res.status(200).json(respuesta)
    }
    async eliminarLibroDiario(req, res) {
        const { libroDiarioID } = req.params;
        const respuesta = await _libroDiarioServicio.eliminarLibroDiario(libroDiarioID);
        if(respuesta.affectedRows > 0){
        respuesta.status = 200;
        respuesta.mensaje = 'Libro Diario '+ libroDiarioID+ ' eliminado!';
        }
        
        return res.status(200).json(respuesta)
    }

    //acientos
    async obtenerAcientos(req, res) {
        const {libroDiarioID} = req.params; 
        const respuesta = await _libroDiarioServicio.obtenerAcientos(libroDiarioID);        
        return res.json(respuesta)
    }
    async agregarAciento(req, res) {
        const { libroDiarioID } = req.params;
        // const {user} = req.headers

        const {body} = req;
        const respuesta = await _libroDiarioServicio.agregarAciento(body, libroDiarioID);        
        return res.status(201).json(respuesta)
    }
    async editarAciento(req, res) {
        const { acientoID } = req.params;
        const {body} = req;
        const respuesta = await _libroDiarioServicio.editarAciento(body, acientoID);  
        if(respuesta.affectedRows > 0){
            respuesta.status = 200;
            respuesta.mensaje = 'Aciento editado!';
            }      
        return res.status(200).json(respuesta)
    }
    async eliminarAciento(req, res) {
        const { acientoID } = req.params;
        const respuesta = await _libroDiarioServicio.eliminarAciento(acientoID);
        if(respuesta.affectedRows > 0){
            respuesta.status = 200;
            respuesta.mensaje = 'Aciento de id:'+ acientoID+ ' eliminado!';
            }
        return res.status.status(200).json(respuesta)
    }
}

module.exports =  LibroDiarioControlador
const jwt = require('jsonwebtoken');
const { claveSecretaJWT } = require('../config');
const AutorizacionServicio = require('../servicios/autorizacion.servicio');
const servicioAutorizacion = new AutorizacionServicio();
module.exports =function (accion){
return (req, res, next)=>{
    const token = req.headers['autorizacion'];
    if (!token) {
        const error = new Error('Token inexistente');
        error.status = 401;
        throw error;
    }
    jwt.verify(token, claveSecretaJWT, async function (err, decodedToken) {
        if (err) {
            const error = new Error('Token inválido');
            error.status = 401;
            throw error;
        }
        req.headers.user = decodedToken.usuario.id; 

        if(accion === "Acientos"){
            const {libroDiarioID} = req.params;
           const estaAutorizado = await servicioAutorizacion.usuarioEstaAutorizado(libroDiarioID,req.headers.user);
           if(!(estaAutorizado.length > 0)){
            const error = new Error('No está autorizado para usar este libro');
            error.status = 401;
            throw error;
           }
        }        
        next();
    })
}



} 
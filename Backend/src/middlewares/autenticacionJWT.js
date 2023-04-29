const jwt = require('jsonwebtoken');
const {rol} = require('../config/index');
const { claveSecretaJWT } = require('../config');
module.exports =function (accion){
return (req, res, next)=>{
    const token = req.headers['autorizacion'];
    if (!token) {
        const error = new Error('Token inexistente');
        error.status = 401;
        throw error;
    }
    jwt.verify(token, claveSecretaJWT, function (err, decodedToken) {
        if (err) {
            const error = new Error('Token inválido');
            error.status = 401;
            throw error;
        }
        // if((rol.admin !== decodedToken.user )&& (accion === 'getLD' || accion === 'getUsuarios')){              
        //         const error = new Error('Usted no  está habilitado para realizar esta acción');
        //         error.status = 401;
        //         throw error;
        //     }
        req.user = decodedToken.usuario.id;         
        next();
    })
}



} 
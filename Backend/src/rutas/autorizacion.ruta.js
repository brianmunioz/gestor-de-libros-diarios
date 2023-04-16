const {Router} = require('express');
const {AutorizacionControlador} = require('../controladores/index')
module.exports = function () {
    const router = Router();
    router.post("/iniciarSesion", AutorizacionControlador.iniciarSesion);
    router.post("/registro", AutorizacionControlador.registrar);
 


    return router;
};